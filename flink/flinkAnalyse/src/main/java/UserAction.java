public class UserAction {

    public long userId; //用户id
    public long itemId; //商品id
    public int categoryId; //商品分类id【服装，鞋，美妆护肤，数码电子，家电，运动户外】
    public String behavior; //用户行为（pv, buy, cart, fav)
    public long value1 ;//金额
    public int area; //地区
    public int num; //数量
    public int type; //身份【学生，老师，上班族，企业，学校】
    public double getValue1() {
        return value1;
    }

    public void setValue1(Long value1) {
        this.value1 = value1;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getArea() {
        return area;
    }

    public void setArea(int area) {
        this.area = area;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public long timestamp; //操作时间戳

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getBehavior() {
        return behavior;
    }

    public void setBehavior(String behavior) {
        this.behavior = behavior;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
    @Override
    public String toString() {
        return "UserAction{" +
                "用户id=" + userId +
                "类别id=" + categoryId +
                "商品id=" + itemId +
                ", area='" + area + '\'' +
                "type=" + type +
                ", value1=" + value1 +
                '}';
    }
}
