import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class TopCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: '十分钟销售额总览',textStyle: {
                color: 'green'
              }, },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            xAxis: {
                type: 'category',
                data: ['一分钟', '两分钟', '三分钟', '四分钟', '五分钟', '六分钟', '七分钟','八分钟','九分钟','十分钟']
            },
            yAxis: {
                type: 'value'
            },
            textStyle: {
                color: '#9AA8D4'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130,10,20,5],
                type: 'bar',
                barWidth : 50,//柱图宽度
                barGap:'30',//柱图间距
            }]
        });
    }
    render() {
        return (
            <div id="main" style={{ width: 100, height: 100 }}></div>
        );
    }
}

export default TopCharts;