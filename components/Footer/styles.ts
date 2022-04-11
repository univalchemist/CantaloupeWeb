import styled from 'styled-components';

import {COLOR_PRIMARY_GRAY_0, COLOR_PRIMARY_GRAY_1} from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const Copy = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 24px;
  color: ${COLOR_PRIMARY_GRAY_0};
`;

export const Link = styled.a`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 12px;
  color: ${COLOR_PRIMARY_GRAY_1};
`;
