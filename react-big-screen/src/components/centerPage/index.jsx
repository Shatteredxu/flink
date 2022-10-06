import React, { PureComponent } from 'react';
import { CenterPage, CenterBottom } from './style';
import Map from './charts/Map';
import { connect } from 'dva';
import EchartsTest from './charts/barCharts'
import { BorderBox6, BorderBox13,DigitalFlop,BorderBox7} from '@jiaminghi/data-view-react';
class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalValue:33710897
    };
  }
  formatter (number) {
    const numbers = number.toString().split('').reverse()
    const segs = []
  
    while (numbers.length) segs.push(numbers.splice(0, 3).join(''))
    return segs.join(',').split('').reverse().join('')
  }
  render() {
    const { detailsList, mapData } = this.props;
    
        
    return (
      <CenterPage>
        
        <div className='map'>
        {/* <span className="number" style={{'color':'#f5e8ef',display:'inline-block',position: 'relative',left: 0,top: 0,fontSize:'32px'}}>总销售额：<DigitalFlop config={{number: [123456],content: '{nt}元'}} style={{width: '200px', height: '50px','color':'#f5e8ef',display:'inline-block'}} /></span> */}
        
        <Map ></Map>
        </div>
        
        <CenterBottom>
          <div className='detail-list'>
          <EchartsTest></EchartsTest>
          </div>
        </CenterBottom>
      </CenterPage>
    );
  }
}
const mapStateToProps = state => {
  return {
    detailsList: state.centerPage.detailsList,
    mapData: state.centerPage.mapData,
  };
};

const mapStateToDispatch = dispatch => ({});

export default connect(mapStateToProps, mapStateToDispatch)(index);
