package utils;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisPoolUtil {

    /**
     * 声明连接池对象，声明成static类型，保证项目在启动时，就加载连接池
     */
    private static JedisPool pool;

    /***
     * Jedis连接池连接的最大值
     */
    private static int maxTotal = 20;

    /***
     * Jedis连接池中最大的空闲连接数
     */
    private static int maxIdel = 20;

    /***
     * Jedis连接池中最小的空闲连接数
     */
    private static int miniIdel = 10;

    /**
     * IP地址
     */
    private static String ip = "192.168.88.128";
    /**
     * 端口号
     */
    private static int port = 6379;

    /**
     * 初始化Jedis连接池
     */
    public static void initJedisPool(){

        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxTotal(maxTotal);
        config.setMaxIdle(maxIdel);
        config.setMinIdle(miniIdel);

        //创建连接池，超时时间为2秒
        pool = new JedisPool(config,ip,port,2000);

    }

    /**
     * 静态代码块初始化连接池
     */
    static {
        initJedisPool();
    }
    /**
     * 从连接池中获取Jedis连接
     * @return jedis连接
     */
    public static Jedis getJedis(){
        return pool.getResource();
    }

    /**
     * 回收jedis连接
     * @param jedis  需要关闭的jedis连接对象
     */
    public static void returnJedis(Jedis jedis) {
        if ( null != jedis ) {
            jedis.close();
        }
    }
}