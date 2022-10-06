import styled from 'styled-components';

export const LeftPage = styled.div`
  width: 420px;
  height: 370px;
  padding: 0.2rem;
  padding-bottom: 0px;
  .item-box {
    position: relative;
    top:30px;
    width: 50%;
    color: #d3d6dd;
    display: inline-block;
    // 金币
    .coin {
      position: absolute;
      top:10px;
      font-size: 28px;
      color: #ffc107;
    }
    .d-flex{
      left: 0px;
      top: 17px;
      font-size: 18px;
      color: #ffc107;
    }
    .text{
      display: inline-block;
      // margin-top: 8px;
      margin-left:10px;
    }
    .colorYellow {
      color: yellowgreen;
      margin-top: 8px;
      display: inline-block;
    }
  }
}
`;

export const LeftTopBox = styled.div`
  position: relative;
  height: 4.375rem;
  width: 100%;
  .left-top-borderBox12 {
    width: inherit;
    height: inherit;
    padding: 0.1875rem;
    .left-top {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      .title-dis {
        margin-top: 0.1875rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.2rem;
        color: #c0c9d2;
        &-keyword {
          padding-left: 0.125rem;
          color: #47dae8;
        }
      }
    }
  }
`;
export const LeftBottomBox = styled.div`
  position: relative;
  margin-top: 0.25rem;
  height: 7.75rem;
  width: 100%;
  .left-bottom-borderBox13 {
    width: inherit;
    height: inherit;
    padding: 0.25rem 0.1875rem;
    .left-bottom {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
    }
  }
`;
