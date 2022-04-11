import styled from 'styled-components';

import {
  COLOR_SECONDARY_GRAY_0,
  COLOR_GREEN_60,
  COLOR_PRIMARY_ORANGE_0,
  COLOR_PRIMARY_GRAY_1,
  COLOR_PRIMARY_GRAY_5,
} from '../../styles/colors';

export const Container = styled.button`
  appearance: none;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 16px 20px;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: ${COLOR_SECONDARY_GRAY_0};
  }
`;

export const Active = styled.span<{active: boolean}>`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => (props.active ? COLOR_GREEN_60 : COLOR_PRIMARY_GRAY_5)};
`;

export const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
`;

export const Balance = styled.span`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 32px;
  color: ${COLOR_PRIMARY_ORANGE_0};
`;

export const ReplenishMin = styled.span`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${COLOR_PRIMARY_GRAY_1};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  margin-left: 12px;

  div {
    text-align: left;
    line-height: 18px;
  }
`;

export const InactiveMsg = styled.span`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  flex: 1;
  text-align: left;
  padding-right: 10px;
  color: ${COLOR_PRIMARY_GRAY_1};
`;
