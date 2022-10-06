import com.alibaba.fastjson.JSONObject;
import com.ds.utils.RedisUtil;
import com.sun.org.apache.regexp.internal.RE;
import org.apache.flink.api.common.functions.AggregateFunction;
import org.apache.flink.api.common.functions.FilterFunction;
import org.apache.flink.api.common.functions.RichMapFunction;
import org.apache.flink.api.common.serialization.SimpleStringSchema;
import org.apache.flink.api.common.state.ListState;
import org.apache.flink.api.common.state.ListStateDescriptor;
import org.apache.flink.api.java.tuple.Tuple;
import org.apache.flink.api.java.tuple.Tuple1;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.TimeCharacteristic;
import org.apache.flink.streaming.api.datastream.AllWindowedStream;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.datastream.SingleOutputStreamOperator;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.functions.KeyedProcessFunction;
import org.apache.flink.streaming.api.functions.timestamps.BoundedOutOfOrdernessTimestampExtractor;
import org.apache.flink.streaming.api.functions.windowing.WindowFunction;
import org.apache.flink.streaming.api.windowing.assigners.TumblingProcessingTimeWindows;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.streaming.api.windowing.windows.TimeWindow;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer010;
import org.apache.flink.util.Collector;

import java.sql.Timestamp;
import java.util.*;

/**
 * @author xwj
 * @Date 2020-12-07
 */
 class TopNJob {

    //最对延迟到达的时间
    public static final long MAX_EVENT_DELAY = 10L;
    static Set<Long> set = new HashSet<Long>();
    public static void main(String[] args) throws Exception {

        //构建流执行环境
        StreamExecutionEnvironment env  = StreamExecutionEnvironment.getExecutionEnvironment();
        //设置并行度1，方便打印
        env.setParallelism(1);

        /** ProcessingTime：事件被处理的时间。也就是由机器的系统时间来决定。
         EventTime：事件发生的时间。一般就是数据本身携带的时间。
         */
        //设置下eventTime，默认为processTime即系统处理时间，我们需要统计一小时内的数据，也就是数据带的时间eventTime
        env.setStreamTimeCharacteristic(TimeCharacteristic.EventTime);

        //kafka
        Properties prop = new Properties();
        prop.put("bootstrap.servers", KafkaWriter.BROKER_LIST);
        prop.put("zookeeper.connect", "192.168.88.128:2181");
        prop.put("group.id", KafkaWriter.TOPIC_USER_ACTION);
        prop.put("key.serializer", KafkaWriter.KEY_SERIALIZER);
        prop.put("value.serializer", KafkaWriter.VALUE_SERIALIZER);
        prop.put("auto.offset.reset", "latest");

        DataStreamSource<String> dataStreamSource = env.addSource(new FlinkKafkaConsumer010<>(
                KafkaWriter.TOPIC_USER_ACTION,
                new SimpleStringSchema(),
                prop
        ));

        //从kafka里读取数据，转换成UserAction对象
        DataStream<UserAction> dataStream = dataStreamSource.map(value -> JSONObject.parseObject(value, UserAction.class));

        //将乱序的数据进行抽取出来，设置watermark，数据如果晚到10秒的会被丢弃
        DataStream<UserAction> timedData = dataStream.assignTimestampsAndWatermarks(new UserActionTSExtractor());

        //为了统计5分钟购买的最多的，所以我们需要过滤出购买的行为
        DataStream<UserAction> filterData = timedData.filter(new FilterFunction<UserAction>() {
            @Override
            public boolean filter(UserAction userAction) throws Exception {
                return userAction.getBehavior().contains("buy");
            }
        });

//       计算当前总销售额
        dataStreamSource.map(new RichMapFunction<String, Long>() {
            Long totalvalue = 0L;
            @Override
            public Long map(String Value) throws Exception {
                Long v = JSONObject.parseObject(Value,UserAction.class).value1;
                totalvalue+=v;
                RedisUtil.setKey("totalvalue", String.valueOf(totalvalue));
                System.out.println("当前总销售额有"+totalvalue);
                return totalvalue;
            }
        }).setParallelism(1);

//         计算当前总订单量
        dataStreamSource.map(new RichMapFunction<String, Integer>() {
            int totalNum = 0;
            @Override
            public Integer map(String Value) throws Exception {
//                Double v = JSONObject.parseObject(Value,UserAction.class).value1;
                totalNum+=1;
                RedisUtil.setKey("totalNum", String.valueOf(totalNum));
                System.out.println("订单数有"+totalNum);
                return totalNum;
            }
        }).setParallelism(1);

        //DO 统计用户数量（可否使用hashset）
//      DataStream<ItemBuyCount> windowedData1 =filterData.keyBy("userId").aggregate(new CountAgg(), new WindowResultFunciton());
        dataStreamSource.map(new RichMapFunction<String, Integer>() {
            int i=0;
            @Override
            public Integer map(String s) throws Exception {
                Long userId = JSONObject.parseObject(s,UserAction.class).userId;
                if(!set.contains(userId)){
                    set.add(userId);
                    i++;
                }
                System.out.println("当前用户有"+i);
                RedisUtil.setKey("userNum", String.valueOf(i));
                return 1;
            }
        }).setParallelism(1);
        //TODO 计算前一分钟的销售额和订单量(X)
//        AllWindowedStream<UserAction, TimeWindow> all =filterData.windowAll(TumblingProcessingTimeWindows.of(Time.seconds(60)));
//        all. process(new LastMinOrder());
//        dataStreamSource.map(new RichMapFunction<String, Integer>() {
//            @Override
//            public Integer map(String s) throws Exception {
//
//                return 1;
//            }
//        });


        //DO 计算不同身份的消费比例（没问题）
        filterData.keyBy("type").sum("value1").map(new RichMapFunction<UserAction,Integer>() {
            @Override
            public Integer map(UserAction u) throws Exception {
                System.out.println("不同身份的消费比例"+u.toString());

                System.out.println("Type"+u.type+u.value1+"");
                RedisUtil.setKey("Type"+u.type,String.valueOf(u.value1));
                return 1;
            }
        }).setParallelism(1);;
        //DO 计算不同类别物体的购买情况（没问题）
        filterData.keyBy("categoryId").sum("value1").map(new RichMapFunction<UserAction,UserAction>() {
            @Override
            public UserAction map(UserAction u) throws Exception {
//                Jedis jedis =  RedisUtil.getInstance();
                System.out.println("Pie"+u.categoryId+"+"+u.value1+"");
                RedisUtil.setKey("Pie"+u.categoryId,String.valueOf(u.value1));
                System.out.println("不同类别物体购买情况"+u.toString());
                return u;
            }
        }).setParallelism(1);;
        //DO 计算前十分钟每分钟销售额（已测试)
        AllWindowedStream<UserAction, TimeWindow> all =filterData.windowAll(TumblingProcessingTimeWindows.of(Time.seconds(60)));
        SingleOutputStreamOperator<UserAction> summed = all.sum("value1");
        summed.map(new RichMapFunction<UserAction, Integer>() {
            @Override
            public Integer map(UserAction u) throws Exception {
                RedisUtil.setTenMin(u.value1+"");
                return 1;
            }
        }).setParallelism(1);


        summed.print();
        //DO 各省份消费情况
        filterData.keyBy("area").sum("value1").map(new RichMapFunction<UserAction,Integer>() {
            @Override
            public Integer map(UserAction u) throws Exception {
                RedisUtil.setKey("area="+u.getArea(), String.valueOf(u.getValue1()));
                return 1;
            }
        }).setParallelism(1);
        //窗口统计点击量 滑动的窗口 5分钟一次  统计一小时最高的  比如 [09:00, 10:00), [09:05, 10:05), [09:10, 10:10)…
        DataStream<ItemBuyCount> windowedData = filterData
                .keyBy("itemId")
                .timeWindow(Time.minutes(10L), Time.minutes(3L))
                .aggregate(new CountAgg(), new WindowResultFunciton());

        //Top N 计算最热门的商品
        DataStream<List<ItemBuyCount>> topItems = windowedData
                .keyBy("windowEnd")
                //点击前3的商品
                .process(new TopNHotItems(6));

//        topItems.print();

        env.execute("Top N Job");
    }


    /**
     * 用于行为时间戳抽取器，最多十秒延迟，也就是晚到10秒的数据会被丢弃掉
     */
    public static class UserActionTSExtractor extends BoundedOutOfOrdernessTimestampExtractor<UserAction> {


        public UserActionTSExtractor() {
            super(Time.seconds(MAX_EVENT_DELAY));
        }

        @Override
        public long extractTimestamp(UserAction userAction) {
            return userAction.getTimestamp();
        }
    }

    /**
     * 商品购买量（窗口操作的输出类型）
     */
    public static class ItemBuyCount {
        public long itemId; //商品ID;
        public long windowEnd; //窗口结束时间戳
        public long buyCount; //购买数量

        public static ItemBuyCount of(long itemId, long windowEnd, long buyCount) {
            ItemBuyCount itemBuyCount = new ItemBuyCount();
            itemBuyCount.itemId = itemId;
            itemBuyCount.windowEnd = windowEnd;
            itemBuyCount.buyCount = buyCount;
            return itemBuyCount;
        }
    }
    /**
     *
     * COUNT 聚合函数实现，每出现一条记录加一。AggregateFunction<输入，汇总，输出>
     */
    public static class CountAgg implements AggregateFunction<UserAction, Long, Long> {

        @Override
        public Long createAccumulator() {
            return 0L;
        }

        @Override
        public Long add(UserAction userAction, Long acc) {
            return acc + 1;
        }

        @Override
        public Long getResult(Long acc) {
            return acc;
        }

        @Override
        public Long merge(Long acc1, Long acc2) {
            return acc1 + acc2;
        }
    }

    /**
     * 用于输出结果的窗口WindowFunction<输入，输出，键，窗口>
     */
    public static class WindowResultFunciton implements WindowFunction<Long, ItemBuyCount, Tuple, TimeWindow> {

        @Override
        public void apply(
                Tuple key, //窗口主键即itemId
                TimeWindow window, //窗口
                Iterable<Long> aggregationResult, //集合函数的结果，即count的值
                Collector<ItemBuyCount> collector //输出类型collector
        ) throws Exception {
            Long itemId = ((Tuple1<Long>) key).f0;
            Long count =aggregationResult.iterator().next();
            collector.collect(ItemBuyCount.of(itemId, window.getEnd(), count));

        }
    }


    /**
     * 求某个窗口中前N名的热门点击商品，key为窗口时间戳，输出为Top N 的结果字符串
     */
    public static class TopNHotItems extends KeyedProcessFunction<Tuple, ItemBuyCount, List<ItemBuyCount>> {

        private final int topSize;

        public TopNHotItems(int topSize) {
            this.topSize = topSize;
        }

        //用于存储商品与购买数的状态，待收齐同一个窗口的数据后，再触发 Top N 计算
        private ListState<ItemBuyCount> itemState;

        @Override
        public void open(Configuration parameters) throws Exception {
            super.open(parameters);
            //状态注册
            ListStateDescriptor<ItemBuyCount> itemViewStateDesc = new ListStateDescriptor<ItemBuyCount>(
                    "itemState-state", ItemBuyCount.class
            );
            itemState = getRuntimeContext().getListState(itemViewStateDesc);
        }

        @Override
        public void processElement(
                ItemBuyCount input,
                Context context,
                Collector<List<ItemBuyCount>> collector
        ) throws Exception {
            //每条数据都保存到状态
            itemState.add(input);
            //注册 windowEnd+1 的 EventTime Timer, 当触发时，说明收集好了所有 windowEnd的商品数据
            context.timerService().registerEventTimeTimer(input.windowEnd + 1);
        }


        @Override
        public void onTimer(long timestamp, OnTimerContext ctx, Collector<List<ItemBuyCount>> out) throws Exception {
            //获取收集到的所有商品点击量
            List<ItemBuyCount> allItems = new ArrayList<ItemBuyCount>();
            for(ItemBuyCount item : itemState.get()) {
                allItems.add(item);
            }
            //提前清除状态中的数据，释放空间
            itemState.clear();
            //按照点击量从大到小排序
            allItems.sort(new Comparator<ItemBuyCount>() {
                @Override
                public int compare(ItemBuyCount o1, ItemBuyCount o2) {
                    return (int) (o2.buyCount - o1.buyCount);
                }
            });

            List<ItemBuyCount> itemBuyCounts = new ArrayList<>();
            //将排名信息格式化成String，方便打印
            StringBuilder result = new StringBuilder();
            result.append("========================================\n");
            result.append("时间：").append(new Timestamp(timestamp-1)).append("\n");
            for (int i=0;i<topSize;i++) {
                ItemBuyCount currentItem = allItems.get(i);
                // No1:  商品ID=12224  购买量=2413
                result.append("No").append(i).append(":")
                        .append("  商品ID=").append(currentItem.itemId)
                        .append("  购买量=").append(currentItem.buyCount)
                        .append("\n");
                itemBuyCounts.add(currentItem);
                RedisUtil.setKey("Top"+i,currentItem.itemId+"");
                System.out.println("商品id"+ currentItem.itemId+"购买量"+ currentItem.buyCount);
            }
            result.append("====================================\n\n");
            out.collect(itemBuyCounts);
        }
    }

}