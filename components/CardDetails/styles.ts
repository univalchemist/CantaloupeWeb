import styled from 'styled-components';

import {
  COLOR_SECONDARY_GRAY_0,
  COLOR_PRIMARY_ORANGE_0,
  COLOR_WHITE,
  COLOR_PRIMARY_GRAY_1,
} from '../../styles/colors';

export interface ILabel {
  primary: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 12px;
  }
`;

export const Balance = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  color: ${COLOR_SECONDARY_GRAY_0};

  span {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 32px;
    color: ${COLOR_PRIMARY_ORANGE_0};
  }
`;

export const CardNumber = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;

export const Replenish = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin: 16px 0 32px;
  color: ${COLOR_PRIMARY_GRAY_1};
`;

export const Button = styled.button`
  appearance: none;
  background: ${COLOR_PRIMARY_ORANGE_0};
  border: none;
  color: ${COLOR_WHITE};
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 126%;
  border-radius: 99px;
  padding: 2px 8px;
`;

export const IsPrimary = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${COLOR_PRIMARY_GRAY_1};
`;

export const SetPrimary = styled.a`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  display: block;
  color: ${COLOR_PRIMARY_ORANGE_0};
`;

export const PayrollDeductLabel = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 20px;
  color: ${COLOR_SECONDARY_GRAY_0};
`;
