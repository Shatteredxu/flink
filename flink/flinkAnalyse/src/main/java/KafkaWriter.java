import com.alibaba.fastjson.JSON;
import org.apache.commons.lang3.RandomUtils;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import utils.RedisUtil;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

/**
 * @author
 * @Date 2019-12-07
 */
public class KafkaWriter {

    //本地的kafka机器列表
    public static final String BROKER_LIST = "192.168.88.128:9092";
    //kafka的topic
    public static final String TOPIC_USER_ACTION = "test";
    //key序列化的方式，采用字符串的形式
    public static final String KEY_SERIALIZER = "org.apache.kafka.common.serialization.StringSerializer";
    //value的序列化的方式
    public static final String VALUE_SERIALIZER = "org.apache.kafka.common.serialization.StringSerializer";
    //用户的行为列表
    public static final List<String> userBehaviors = Arrays.asList("pv", "buy", "cart", "fav");

    public static void writeToKafka(int num) throws Exception{
        Properties props = new Properties();
        props.put("bootstrap.servers", BROKER_LIST);
        props.put("key.serializer", KEY_SERIALIZER);
        props.put("value.serializer", VALUE_SERIALIZER);

        KafkaProducer<String, String> producer = new KafkaProducer<String, String>(props);

        UserAction userAction = new UserAction();
        userAction.setUserId(RandomUtils.nextLong(1,500));
        userAction.setItemId(RandomUtils.nextLong(1, 30));
        userAction.setCategoryId(RandomUtils.nextInt(1, 7));
        userAction.setArea(RandomUtils.nextInt(1, 32));
        userAction.setBehavior(userBehaviors.get(RandomUtils.nextInt(1,2)));
        userAction.setNum(RandomUtils.nextInt(1, 10));
        userAction.setType(RandomUtils.nextInt(1, 6));
        userAction.setValue1(RandomUtils.nextLong(1,500));
        userAction.setTimestamp(System.currentTimeMillis());

        //转换成JSON
        String userActionJson = JSON.toJSONString(userAction);

        //包装成kafka发送的记录
        ProducerRecord<String, String> record = new ProducerRecord<String, String>(TOPIC_USER_ACTION, null,
                null, userActionJson);
        //发送到缓存
        producer.send(record);
        System.out.println("producer"+num+"向kafka发送数据:" + userActionJson);
        //立即发送
        producer.flush();

    }

    public static void main(String[] args) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        System.out.println(df.format(new Date()));// new Date()为获取当前系统时间
        RedisUtil.setKey("startTime",df.format(new Date())+"");
        Producer1 p1 = new Producer1() ;    // 实例化对象
        Producer2 p2 = new Producer2() ;    // 实例化对象
        Thread t1 = new Thread(p1) ;       // 实例化Thread类对象
        Thread t2 = new Thread(p2) ;       // 实例化Thread类对象
        t1.start() ;    // 启动多线程
        t2.start() ;    // 启动多线程
    }

}
class Producer1 implements Runnable{

    @Override
    public void run() {
        while(true) {
            try {
                //每1秒写一条数据
                TimeUnit.MILLISECONDS.sleep(1000);
                KafkaWriter.writeToKafka(1);
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }
}
class Producer2 implements Runnable{
    @Override
    public void run() {
        while(true) {
            try {
                //每1秒写一条数据
                TimeUnit.MILLISECONDS.sleep(1000);
                KafkaWriter.writeToKafka(2);
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }
}