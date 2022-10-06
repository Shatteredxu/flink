package utils;

import redis.clients.jedis.Jedis;

import java.text.SimpleDateFormat;
import java.util.Date;


public class RedisUtil {
    /**
     * 设置Strring类型的值
     * @param key
     * @param value
     * @return
     */
    public static boolean setKey(String key, String value) {

        Jedis jedis = null;

        try {
            jedis = JedisPoolUtil.getJedis();
            String set = jedis.set(key, value);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            JedisPoolUtil.returnJedis(jedis);
        }
        return true;

    }


    /***
     * 获取String类型的值
     * @param key
     * @return
     */
    public static String getValue(String key) {

        Jedis jedis = null;
        String value = "";
        try {
            jedis = JedisPoolUtil.getJedis();
            value = jedis.get(key);
            return value;
        }catch (Exception e) {
            e.printStackTrace();
        }finally {
            JedisPoolUtil.returnJedis(jedis);
        }
        return value;
    }

    /***
     * 根据key值删除数据,可批量删除
     * @param keys
     * @return
     */
    public static boolean delKey (String... keys) {
        Jedis jedis = null;
        try {
            jedis = JedisPoolUtil.getJedis();
            jedis.del(keys);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
        }finally {
            JedisPoolUtil.returnJedis(jedis);
        }
        return false;
    }


    /**
     * 判断key值是否存在
     * @param key
     * @return
     */
    public static boolean isExists(String key) {
        Jedis jedis = null;
        boolean isExists = false;
        try{
            jedis = JedisPoolUtil.getJedis();
            isExists = jedis.exists(key);
        }catch (Exception e) {
            e.printStackTrace();
        }finally {
            JedisPoolUtil.returnJedis(jedis);
        }
        return isExists;
    }
    public static void setTenMin(String value){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(df.format(new Date())+"Redis中的value"+value);
        int s[] = new int[]{0,1,2,3,4,5,6,7,8,9};
        int k = -1;
        for(int i=0;i<10;i++){
            if(RedisUtil.getValue("Min"+i)==null){
                k=i;
                break;
            }
        }
        if(k!=-1){
            RedisUtil.setKey("Min"+k,value);
        }else{
            String temp=RedisUtil.getValue("Min"+0);
            for(int i=0;i<10;i++){
                RedisUtil.setKey("Min"+i,RedisUtil.getValue("Min"+i+1));
            }
            RedisUtil.setKey("Min9",value);

        }

    }
    public static void main(String[] args) {
//        RedisUtil.setKey("test2","test22");
//        String value = RedisUtil.getValue("test2");
//        System.out.println(value);
        Jedis jedis = new Jedis("192.168.88.128", 6379);
//        jedis.auth("123456");
        System.out.println(jedis.ping());
    }
}
