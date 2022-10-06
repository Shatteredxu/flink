import React, { Component } from 'react';
import { POST } from '../../../../mock/POST'
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import ReactEcharts from 'echarts-for-react';
import 'echarts/map/js/china';
require('echarts/map/js/china.js');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
        {name: '北京',value: this.randomData() },
        {name: '天津',value: this.randomData() },
        {name: '上海',value: this.randomData() },
        {name: '重庆',value: this.randomData() },
        {name: '河北',value: this.randomData() },
        {name: '河南',value: this.randomData() },
        {name: '云南',value: this.randomData() },
        {name: '辽宁',value: this.randomData() },
        {name: '黑龙江',value: this.randomData() },
        {name: '湖南',value: this.randomData() },
        {name: '安徽',value: this.randomData() },
        {name: '山东',value: this.randomData() },
        {name: '新疆',value: this.randomData() },
        {name: '江苏',value: this.randomData() },
        {name: '浙江',value: this.randomData() },
        {name: '江西',value: this.randomData() },
        {name: '湖北',value: this.randomData() },
        {name: '广西',value: this.randomData() },
        {name: '甘肃',value: this.randomData() },
        {name: '山西',value: this.randomData() },
        {name: '内蒙古',value: this.randomData() },
        {name: '陕西',value: this.randomData() },
        {name: '吉林',value: this.randomData() },
        {name: '福建',value: this.randomData() },
        {name: '贵州',value: this.randomData() },
        {name: '广东',value: this.randomData() },
        {name: '青海',value: this.randomData() },
        {name: '西藏',value: this.randomData() },
        {name: '四川',value: this.randomData() },
        {name: '宁夏',value: this.randomData() },
        {name: '海南',value: this.randomData() },
        {name: '台湾',value: this.randomData() },
        // {name: '香港',value: this.randomData() },
        // {name: '澳门',value: this.randomData() }
      ]
    };
  }
  timeTicket = null;
  // getInitialState = () => ({option: this.getOption()});

  componentDidMount() {
    // if (this.timeTicket) {
    //   clearInterval(this.timeTicket);
    // }
    // this.timeTicket = setInterval(() => {
    //   const option = this.state.option;
    //   const r = new Date().getSeconds();
    //   option.title.text = 'iphone销量' + r;
    //   option.series[0].name = 'iphone销量' + r;
    //   option.legend.data[0] = 'iphone销量' + r;
    //   this.setState({ option: option });
    // }, 1000);
    let data = `userId=3`
    POST('/DSInfoService/GetAreaValue', data,   re => {
    if (re.status === 200) {
      console.log(re.data)
      this.setState({ data:  [
        {name: '北京',value: re.data[1] },
        {name: '天津',value: re.data[2] },
        {name: '上海',value: re.data[3] },
        {name: '重庆',value: re.data[4] },
        {name: '河北',value: re.data[5] },
        {name: '河南',value: re.data[6] },
        {name: '云南',value: re.data[7] },
        {name: '辽宁',value: re.data[8] },
        {name: '黑龙江',value: re.data[9] },
        {name: '湖南',value: re.data[10] },
        {name: '安徽',value: re.data[11] },
        {name: '山东',value: re.data[12] },
        {name: '新疆',value: re.data[13] },
        {name: '江苏',value: re.data[14] },
        {name: '浙江',value: re.data[15] },
        {name: '江西',value: re.data[16] },
        {name: '湖北',value: re.data[17] },
        {name: '广西',value: re.data[18] },
        {name: '甘肃',value: re.data[19] },
        {name: '山西',value: re.data[20] },
        {name: '内蒙古',value: re.data[21] },
        {name: '陕西',value: re.data[22] },
        {name: '吉林',value: re.data[23] },
        {name: '福建',value: re.data[24] },
        {name: '贵州',value: re.data[25] },
        {name: '广东',value: re.data[26] },
        {name: '青海',value: re.data[27] },
        {name: '西藏',value: re.data[28] },
        {name: '四川',value: re.data[29] },
        {name: '宁夏',value: re.data[30] },
        {name: '海南',value: re.data[31] },
        {name: '台湾',value: re.data[32] },
        // {name: '香港',value: re.data[33] },
        // {name: '澳门',value: re.data[34] }
      ]})
    }
  })
  this.timeTicket = setInterval(() => {
    POST('/DSInfoService/GetAreaValue', data,   re => {
      if (re.status === 200) {
        console.log(re.data)
        this.setState({ data:  [
          {name: '北京',value: re.data[1] },
          {name: '天津',value: re.data[2] },
          {name: '上海',value: re.data[3] },
          {name: '重庆',value: re.data[4] },
          {name: '河北',value: re.data[5] },
          {name: '河南',value: re.data[6] },
          {name: '云南',value: re.data[7] },
          {name: '辽宁',value: re.data[8] },
          {name: '黑龙江',value: re.data[9] },
          {name: '湖南',value: re.data[10] },
          {name: '安徽',value: re.data[11] },
          {name: '山东',value: re.data[12] },
          {name: '新疆',value: re.data[13] },
          {name: '江苏',value: re.data[14] },
          {name: '浙江',value: re.data[15] },
          {name: '江西',value: re.data[16] },
          {name: '湖北',value: re.data[17] },
          {name: '广西',value: re.data[18] },
          {name: '甘肃',value: re.data[19] },
          {name: '山西',value: re.data[20] },
          {name: '内蒙古',value: re.data[21] },
          {name: '陕西',value: re.data[22] },
          {name: '吉林',value: re.data[23] },
          {name: '福建',value: re.data[24] },
          {name: '贵州',value: re.data[25] },
          {name: '广东',value: re.data[26] },
          {name: '青海',value: re.data[27] },
          {name: '西藏',value: re.data[28] },
          {name: '四川',value: re.data[29] },
          {name: '宁夏',value: re.data[30] },
          {name: '海南',value: re.data[31] },
          {name: '台湾',value: re.data[32] },
          // {name: '香港',value: re.data[33] },
          // {name: '澳门',value: re.data[34] }
        ]})
      }
    })
}, 8000);
  };
  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  };
  randomData() {
    return Math.round(Math.random()*1000);
  };
  getOption = () => {
    return {
      
    };
  };
  render() {
    var option = {
      title: {
        text: '销售额总览',
        left: 'left',
        textStyle: {
            color: "#fff"
        }
      },
      tooltip: {
        trigger: 'item',
        fontSize: 18
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data:['iphone3','iphone4','iphone5']
      },
      visualMap: {
        min: 2000,
        max: 10000,
        left: 'left',
        top: 'bottom',
        text: ['高','低'],       // 文本，默认为数值文本
        calculable: true,
        textStyle: {
            color: "#8fc8f2"
        },
      },
      series: [
        {
          name: '销售额',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 8,
                "font-family":"STFangsong"
        },
            },
            emphasis: {
              show: true
            }
          },
          data:this.state.data
        },
      ]
    }
    return (
      <div className='examples'>
          <ReactEcharts
            option={option}
            style={{height: '380px', width: '650px',marginTop:'40px'}}
            className='react_for_echarts' />
         
      </div>
    );
  };
}