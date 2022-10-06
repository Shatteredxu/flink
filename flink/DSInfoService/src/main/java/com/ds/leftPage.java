package com.ds;

public class leftPage {
    public long AllOrderValue; //总订单量
    public long AllUserNum; //总用户数
    public long AllOrderNum; //商品分类id【服装，鞋，美妆护肤，数码电子，家电，运动户外】
    public long OneMinValue; //用户行为（pv, buy, cart, fav)
    public long AccessFrequency; //

    public long getAllOrderValue() {
        return AllOrderValue;
    }

    public void setAllOrderValue(long allOrderValue) {
        AllOrderValue = allOrderValue;
    }

    public long getAllUserNum() {
        return AllUserNum;
    }

    public void setAllUserNum(long allUserNum) {
        AllUserNum = allUserNum;
    }

    public long getAllOrderNum() {
        return AllOrderNum;
    }

    public void setAllOrderNum(long allOrderNum) {
        AllOrderNum = allOrderNum;
    }

    public long getOneMinValue() {
        return OneMinValue;
    }

    public void setOneMinValue(long oneMinValue) {
        OneMinValue = oneMinValue;
    }

    public long getAccessFrequency() {
        return AccessFrequency;
    }

    public void setAccessFrequency(long accessFrequency) {
        AccessFrequency = accessFrequency;
    }
}
