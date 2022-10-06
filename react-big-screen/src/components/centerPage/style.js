import styled from 'styled-components';

export const CenterPage = styled.div`
 
  display: flex;
  flex-direction: column;
  align-items: center;
  .number{
    font-size: 28px;
    color: #f5e8ef
    display:block;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;

export const CenterBottom = styled.div`
  display: flex;
  margin-bottom: 0.25rem;
  width: 150%;
  height: 3.25rem;

  .map{
    margin-top:30px;
  }
  .detail-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: space-between;
    justify-content: space-around;
    width: 100%;
    &-item {
      display: flex;
      align-items: center;
      position: relative;
      height: 1.5625rem;
      padding: 0 0.125rem;
      width: 32%;
      border-radius: 5px;
      border: 1px solid #343f4b;
      background-color: rgba(19, 25, 47, 0.8);
      img {
        width: 1.25rem;
        height: 1.25rem;
      }
      .detail-item-text {
        margin-left: 0.125rem;
        h3 {
          color: #bcdcff;
          font-size: 16px;
          margin-bottom: 0.25rem;
        }
        span {
          font-weight: 500px;
          font-size: 0.25rem;
          font-weight: bolder;
          background: linear-gradient(to bottom, #fff, #4db6e5);
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
        }
        .unit {
          font-size: 0.2rem;
          margin-left: 0.125rem;
        }
      }
    }
  }
`;
