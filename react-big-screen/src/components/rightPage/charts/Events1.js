import React, { Component } from 'react';
import { POST } from '../../../../mock/POST'
import ReactEcharts from 'echarts-for-react';

export default class Event1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cnt: 0,
      data:[
        {value:335, name:'服装'},
        {value:310, name:'鞋'},
        {value:234, name:'美妆护肤'},
        {value:135, name:'数码电子'},
        {value:748, name:'家电'},
        {value:548, name:'运动户外'}
      ]
    };
  }
  getOption = () => ({
    title : {
      text: this.props.title,
      textStyle: {
        color: '#9AA8D4',
        // fontFamily :'sans-serif',
        // fontWeight : 'bolder',
        // fontSize : '28px'
      }, 
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['上班族','学生','教师','学校','企业']
    },
    series : [
      {
      name: '销售额',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:this.state.data,
      itemStyle: {
        emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.7)'
        }
      }
      }
    ]
  });
  componentDidMount() {
    let data=`userId=3`
    POST('/DSInfoService/GetTypeValue', data,   re => {
        if (re.status === 200) {
          console.log(re.data)
          this.setState({
            data:[
              {value:re.data[0], name:'上班族'},
              {value:re.data[1], name:'学生'},
              {value:re.data[2], name:'教师'},
              {value:re.data[3], name:'学校'},
              {value:re.data[4], name:'企业'},
            ]
          })
        }})
    this.timeTicket = setInterval(() => {
      POST('/DSInfoService/GetTypeValue', data,   re => {
        if (re.status === 200) {
          console.log(re.data)
          this.setState({
            data:[
              {value:re.data[0], name:'上班族'},
              {value:re.data[1], name:'学生'},
              {value:re.data[2], name:'教师'},
              {value:re.data[3], name:'学校'},
              {value:re.data[4], name:'企业'},

            ]
          })
        }})
}, 8000);
    
}
  // onChartClick = (param, echarts) => {
  //   console.log(param, echarts);
  //   alert('chart click');
  //   this.setState({
  //     cnt: this.state.cnt + 1,
  //   })
  // };
  // onChartLegendselectchanged = (param, echart) => {
  //   console.log(param, echart);
  //   alert('chart legendselectchanged');
  // };

  // onChartReady = (echarts) => {
  //   console.log('echart is ready', echarts);
  // };

  render() {
    let onEvents = {
      'click': this.onChartClick,
      'legendselectchanged': this.onChartLegendselectchanged
    };
    return (
      <div className='examples'>
        <div className='parent' >
          <ReactEcharts
            option={this.getOption()}
            style={{height: 200,marginTop:20}}
            onChartReady={this.onChartReady}
            onEvents={onEvents} />
          
        </div>
      </div>
    );
  }
};