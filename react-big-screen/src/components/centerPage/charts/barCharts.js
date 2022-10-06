import React, { Component } from 'react';
import { POST } from '../../../../mock/POST'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import ReactEcharts from 'echarts-for-react';
class EchartsTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[120, 200, 150, 80, 70, 110, 130,10,20,5]
        };
      }
    getOption = () => ({
            title: { text: '前十分钟销售额总览',
            textStyle: {
                color: '#9AA8D4',
                fontFamily :'sans-serif',
                // fontWeight : 'bolder',
                // fontSize : '20px'
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
                data: this.state.data,
                type: 'bar',
                barWidth : 50,//柱图宽度
                barGap:'30',//柱图间距
            }]
      })
    componentDidMount() {
        let data=`userId=3`
        POST('/DSInfoService/GetTenMins', data,   re => {
            if (re.status === 200) {
              console.log(re.data)
              this.setState({
                data:re.data
              })
            }})
        this.timeTicket = setInterval(() => {
            POST('/DSInfoService/GetTenMins', data,   re => {
                if (re.status === 200) {
                  console.log(re.data)
                  this.setState({
                    data:re.data
                  })
                }})
    }, 60000);
        
    }
    render() {
        return (
            <div className='examples'>
        <div className='parent'>
          <label> SVG renderer chart </label>
          <ReactEcharts
            option={this.getOption()}
            style={{height: '400px', width: '800px'}}
            opts={{ renderer: 'svg' }}
            className='react_for_echarts' />
          <label> code below: </label>
          <pre>
            
          </pre>
        </div>
      </div>
        );
    }
}

export default EchartsTest;