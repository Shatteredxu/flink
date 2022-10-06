import React, { PureComponent } from 'react';
import { LeftPage, LeftTopBox, LeftBottomBox } from './style';
import { ModuleTitle } from '../../style/globalStyledSet';
import { BorderBox8, BorderBox13,DigitalFlop} from '@jiaminghi/data-view-react';
import UserSituation from './charts/UserSituation';
import { connect } from 'dva';
import { POST } from '../../../mock/POST'

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      number1:0,
      number2:0,
      number3:0,
      number4:0,
      accessFrequency:0
    };
  }
   componentDidMount() {
    let data = `userId=3`
     POST('/DSInfoService/GetTotalValue', data,   re => {
    if (re.status === 200) {
      console.log(re.data)
      this.setState({ number1: re.data.AllOrderNum ,number2:re.data.allUserNum,number3:re.data.AllOrderValue,number4:re.data.OneMinValue,accessFrequency:re.data.accessFrequency})
    }
  })
  this.timeTicket = setInterval(() => {
    POST('/DSInfoService/GetTotalValue', data,   re => {
      if (re.status === 200) {
        console.log(re.data)
        this.setState({ number1: re.data.AllOrderNum ,number2:re.data.allUserNum,number3:re.data.AllOrderValue,number4:re.data.OneMinValue,accessFrequency:re.data.accessFrequency})
      }
    })
}, 5000);
} 
  render() {
    const { userSitua, accessFrequency, } = this.props;
    return (
      <LeftPage>
        {/* 顶部图表 */}
        <LeftTopBox>
          
          <BorderBox8 className='left-top-borderBox12' >
            <div className='left-top'>
              <ModuleTitle>
                <i className='iconfont'>&#xe78f;</i>
                <span>销售信息概览</span>
              </ModuleTitle>
              <div className='title-dis'>
                <span>
                  平均销售额(元/分钟):
                  <span className='title-dis-keyword'>{this.state.accessFrequency}元</span>
                </span>
               
              </div>
              {/* 图表 */}
              <div className="item-box">
              <div className="d-flex"> 
                <span class="coin">￥</span>
              </div>
              <DigitalFlop config={{ number:[this.state.number3],content: '{nt}'}} style={{width: '160px', height: '40px',marginTop:'10px'}} />
              <p className="text" >总销售额
              <span className="colorYellow"> (件)</span>
              </p>
            </div>
            <div className="item-box">
              <div className="d-flex"> 
                <span class="coin">￥</span>
              </div>
              <DigitalFlop config={{ number:[this.state.number1],content: '{nt}'}} style={{width: '160px', height: '40px',marginTop:'10px'}} />
              {/* <span>{this.state.number2}</span> */}
              <p className="text" >总订单量
              <span className="colorYellow"> (件)</span>
              </p>
            </div>
            <div className="item-box">
              <div className="d-flex"> 
                <span class="coin">￥</span>
              </div>
              <DigitalFlop config={{ number:[this.state.number2],content: '{nt}'}} style={{width: '160px', height: '40px',marginTop:'10px'}} />
              <p className="text" >总用户数
              <span className="colorYellow"> (件)</span>
              </p>
            </div>
            
            <div className="item-box">
              <div className="d-flex"> 
                <span class="coin">￥</span>
              </div>
              <DigitalFlop config={{ number:[this.state.number4],content: '{nt}'}} style={{width: '160px', height: '40px',marginTop:'10px'}} />
              <p className="text" >前一分钟销售额
              <span className="colorYellow"> (件)</span>
              </p>
            </div>
            </div>
          </BorderBox8>
        </LeftTopBox>

        {/* 底部图表 */}
        <LeftBottomBox>
          <BorderBox8 className='left-bottom-borderBox13'>
            <div className='left-bottom'>
              <ModuleTitle>
                <i className='iconfont'>&#xe88e;</i>
                <span>热销商品</span>
              </ModuleTitle>
              {/* 图表 */}
              <UserSituation userSitua={userSitua}></UserSituation>
            </div>
          </BorderBox8>
        </LeftBottomBox>
      </LeftPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessFrequency: state.leftPage.accessFrequency,
    peakFlow: state.leftPage.peakFlow,
    userSitua: state.leftPage.userSitua,
    trafficSitua: state.leftPage.trafficSitua,
    number:state.leftPage
  };
};





const mapStateToDispatch = dispatch => ({});

export default connect(mapStateToProps, mapStateToDispatch)(index);
