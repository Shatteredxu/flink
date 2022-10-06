package com.ds.control;

import com.alibaba.fastjson.JSON;
import com.ds.leftPage;

import com.ds.utils.JSONResult;
import com.ds.utils.RedisUtil;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("DSInfoService")
public class DSinfoService {
    @RequestMapping(value="GetTotalValue")
    @CrossOrigin("http://localhost:9000")
        public @ResponseBody JSONResult GetTotal(@RequestBody String userId) throws ParseException {
            leftPage leftpage = new leftPage();
            leftpage.setAllOrderValue(Long.parseLong(RedisUtil.getValue("totalvalue").trim()));
            leftpage.setAllOrderNum(Long.parseLong(RedisUtil.getValue("totalNum").trim()));
            leftpage.setAllUserNum(Long.parseLong(RedisUtil.getValue("userNum")));
            leftpage.setOneMinValue(Long.parseLong(RedisUtil.getValue("Min9")));
            String startTime = RedisUtil.getValue("startTime");
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            String endTime = df.format(new Date());
            Date fromDate3 = df.parse(startTime);
            Date toDate3 = df.parse(endTime);
            long from3 = fromDate3.getTime();
            long to3 = toDate3.getTime();
            int minutes = (int) ((to3 - from3) / (1000 * 60));
            System.out.println(minutes);
            if(minutes==0){minutes=1;}
            leftpage.setAccessFrequency(Integer.parseInt(RedisUtil.getValue("totalvalue"))/minutes);
            return JSONResult.ok(leftpage);
        }
    @RequestMapping(value="GetOrderNum")
    @CrossOrigin("http://localhost:9000")
    public @ResponseBody JSONResult GetOrderNum(@RequestBody String userId){
        System.out.println(RedisUtil.getValue("counter"));
        String x= RedisUtil.getValue("totalvalue");
        return JSONResult.ok(x);
    }
    @RequestMapping(value="GetAreaValue")
    @CrossOrigin("http://localhost:9000")
    public @ResponseBody JSONResult GetAreaValue(@RequestBody String userId){
        Double[] areaValue = new Double[33];
        for(int i=1;i<=32;i++){
            String s = "area="+i;
            System.out.println(s);
            String res = RedisUtil.getValue(s);
            if(res==null){
                res = "3000";
            }
            areaValue[i]=Double.parseDouble(res);
        }
        return JSONResult.ok(areaValue);
    }
    @RequestMapping(value="GetTenMins")
    @CrossOrigin("http://localhost:9000")
    public @ResponseBody JSONResult GetTenMins(@RequestBody String userId){
        Long[] TenValue = new Long[10];
        for(int i=0;i<10;i++){
            String s = "Min"+i;
            System.out.println(RedisUtil.getValue(s)+" "+s);
            String res = RedisUtil.getValue(s);
            if(res==null){
                res = "3000";
            }
            TenValue[i]=Long.parseLong(res);
        }
        return JSONResult.ok(TenValue);
    }
    @RequestMapping(value="GetPies")
    @CrossOrigin("http://localhost:9000")
    public @ResponseBody JSONResult GetPies(@RequestBody String userId){
        Long[] PieValue = new Long[7];
        for(int i=0;i<=6;i++){
            String s = "Pie"+i;
            String res = RedisUtil.getValue(s);
            if(res==null){
                res = "3000";
            }
            PieValue[i]=Long.parseLong(res);
        }
        return JSONResult.ok(PieValue);
    }
    @RequestMapping(value="GetTypeValue")
    @CrossOrigin("http://localhost:9000")
    public @ResponseBody JSONResult GetTypeValue(@RequestBody String userId){
        Long[] TypeValue = new Long[5];
        for(int i=1;i<6;i++){
            String s = "Type"+i;
            String res = RedisUtil.getValue(s);
            if(res==null){
                res = "100";
            }
            TypeValue[i-1]=Long.parseLong(res);
        }
        return JSONResult.ok(TypeValue);
    }
    @RequestMapping(value="GetTopItem")
    @CrossOrigin("http://localhost:9000")
    public @ResponseBody JSONResult GetTopItem(@RequestBody String userId){
        int[] TopItem = new int[6];
        for(int i=0;i<5;i++){
            String s = "Top"+i;
            String res = RedisUtil.getValue(s);
            if(res==null){
                res = "0";
            }

            TopItem[i]=Integer.parseInt(res);
        }
        return JSONResult.ok(TopItem);
    }
}
