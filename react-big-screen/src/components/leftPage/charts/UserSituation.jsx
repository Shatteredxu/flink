import React, { PureComponent } from 'react';
import { userOptions } from './options';
import { ScrollBoard } from '@jiaminghi/data-view-react';
import { POST } from '../../../../mock/POST'
class UserSituation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        // 表头背景色
        headerBGC: '#443dc5',
        // 奇数行背景色
        oddRowBGC: '#09184F',
        // 偶数行背景色
        evenRowBGC: '#070C34',
        // 行号
        index: true,
        // 行号表头
        indexHeader: '#',
        // 宽2
        columnWidth: [150,200],
        // 对其方式
        align: ['center'],
        // 表行数
        rowNum: 7,
      },
      data:[
        ['安全座椅'],
        ['小米10'],
        ['格力冰箱'],
        ['美的空调'],
        ['kiddle阅读器'],
        ['华为平板'],
      ]
    };
  }
  componentDidMount() {
    var itemId = ['小米10','iphone12','围巾','华为','华为电脑','华为平板','显示器','花花公子书包','复古休闲斜挎包','燃气灶','美的空调','格力冰箱','红木家具','康奈男鞋','BB霜','无印良品','SK-II','安全座椅','kiddle阅读器','iphone12','猪肉铺','鱿鱼丝','方便面','联想笔记本','2080TI显卡','华硕笔记本','圣诞节鲜花','苹果橘子','华硕笔记本','圣诞节鲜花','苹果橘子']
    let data=`userId=3`
    POST('/DSInfoService/GetTopItem', data,   re => {
        if (re.status === 200) {
          console.log(re.data)
          this.setState({
            data:[
              [itemId[re.data[0]]],
              [itemId[re.data[1]]],
              [itemId[re.data[2]]],
              [itemId[re.data[3]]],
              [itemId[re.data[4]]],
              [itemId[re.data[5]]],
              // [itemId[re.data[7]]],
              // [itemId[re.data[8]]],
              // [itemId[re.data[9]]]
            ]
          })
        }})
    this.timeTicket = setInterval(() => {
      POST('/DSInfoService/GetTopItem', data,   re => {
        if (re.status === 200) {
          console.log(re.data)
          this.setState({
            data:[
              [itemId[re.data[0]]],
              [itemId[re.data[1]]],
              [itemId[re.data[2]]],
              [itemId[re.data[3]]],
              [itemId[re.data[4]]],
              [itemId[re.data[5]]],
              // [itemId[re.data[6]]],
              // [itemId[re.data[7]]],
              // [itemId[re.data[8]]],
              // [itemId[re.data[9]]]
            ]
          })
        }})
}, 300000);
    
}
  render() {
    const  userSitua  =  {
      header: ['商品名称'],
      data: this.state.data,
    };
    const config = {
      ...this.state.config,
      ...userSitua,
    };

    return (
      <div>
        {userSitua ? (
          <ScrollBoard
            config={config}
            style={{
              width: '5.475rem',
              height: '6.875rem',
            }}></ScrollBoard>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default UserSituation;
