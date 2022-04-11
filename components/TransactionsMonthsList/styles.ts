import styled from 'styled-components';

import {
  COLOR_ADDITIONAL_GRAY,
  COLOR_PRIMARY_GRAY_0,
  COLOR_PRIMARY_GRAY_10,
  COLOR_BLACK,
} from '../../styles/colors';

export const List = styled.ul`
  list-style-type: none;
  background: rgba(192, 198, 233, 0.17);
  border-radius: 10px;
  padding: 0;
  margin-top: 0;
`;

export const TransactionMonth = styled.li`
  padding: 20px 15px;
  border-top: 1px solid ${COLOR_PRIMARY_GRAY_10};

  &:first-child {
    border-top: none;
  }
`;

export const Button = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Header = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 44px;
  color: ${COLOR_BLACK}
`;

export const MonthLogo = styled.div`
  height: 50px;
  width: 50px;
  background: rgba(144, 144, 147, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: rgba(247, 247, 247, 0.72);
  border-radius: 12px;
  text-transform: uppercase;
`;
export const MonthDetails = styled.div`
  flex: 1;
  padding: 0 20px;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR_PRIMARY_GRAY_0};
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  span {
    display: block;
  }

  span:first-child {
    font-family: Rubik;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: ${COLOR_ADDITIONAL_GRAY};
  }
`;
export const Arrow = styled.div`
  color: ${COLOR_ADDITIONAL_GRAY};
  text-align: center;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;
