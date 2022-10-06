import React, { PureComponent } from 'react';
import UserIdentityCategory from './charts/UserIdentityCategory';
import Events  from './charts/Events';
import Event1  from './charts/Events1';
import { ModuleTitle } from '../../style/globalStyledSet';
import { connect } from 'dva';
import {
  RightPage,
  RightTopBox,
  RightCenterBox,
  RightBottomBox,
} from './style';
import { BorderBox8} from '@jiaminghi/data-view-react';
class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title1:'物体类别购买情况',
      title2:'各种身份消费比例'
    };
  }
  render() {
    const { offline, browseCategories, userIdentityCategory } = this.props;
    return (
      <RightPage>
        <RightTopBox>
          <div className='right-top'>
          <BorderBox8 style={{padding:1}}><Events title={this.state.title1}></Events></BorderBox8>
          
          </div>
        </RightTopBox>

        <RightCenterBox >
        <BorderBox8 style={{padding:1,marginTop:50}}><Event1 title={this.state.title2}></Event1></BorderBox8>
        </RightCenterBox>

        <RightBottomBox >
        <BorderBox8 style={{padding:1}}>
        <ModuleTitle>
            <i className='iconfont'>&#xe7fd;</i>
            <span>各种身份人群消费情况</span>
          </ModuleTitle>
          <UserIdentityCategory
            userIdentityCategory={userIdentityCategory}></UserIdentityCategory>
        </BorderBox8>
        </RightBottomBox>
      </RightPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    browseCategories: state.rightPage.browseCategories,
    userIdentityCategory: state.rightPage.userIdentityCategory,
    offline: state.rightPage.offline,
  };
};

const mapStateToDispatch = dispatch => ({});

export default connect(mapStateToProps, mapStateToDispatch)(index);
