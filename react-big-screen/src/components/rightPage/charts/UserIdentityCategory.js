import React, { Component } from 'react';
import { CapsuleChart } from '@jiaminghi/data-view-react';
import { POST } from '../../../../mock/POST'
class UserSituation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: '公务',
          value: 57,
        },
        {
          name: '学生',
          value: 167,
        },
        {
          name: '教师',
          value: 123,
        },
        {
          name: '军区',
          value: 55,
        },
        {
          name: '企业',
          value: 198,
        },
        
      ], 
    };
  }
  componentDidMount() {
    let data=`userId=3`
    
    this.timeTicket = setInterval(() => {
      POST('/DSInfoService/GetTypeValue', data,   re => {
        if (re.status == 200) {
          console.log(re.data)
          this.setState({
            data:[
              {
                name: '上班族',
                value: parseInt(re.data[0]),
              },
              {
                name: '学生',
                value: parseInt(re.data[1]),
              },
              {
                name: '教师',
                value: parseInt(re.data[2]),
              },
              {
                name: '学校',
                value: parseInt(re.data[3]),
              },
              {
                name: '企业',
                value: parseInt(re.data[4]),
              },
              
            ]
          })
        }})
}, 8000);
    
}
  render() {
    const { userIdentityCategory } = this.props;
    // const config = {
    //   ...this.state.config,
    //   // ...userIdentityCategory,
    // };
    return (
      <div>
        {userIdentityCategory ? (
          <CapsuleChart
            config={{
              // 单位
              unit: '（元）',
              showValue: true,
              data:this.state.data
            }}
            style={{
              width: '5.15rem',

            }}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default UserSituation;
