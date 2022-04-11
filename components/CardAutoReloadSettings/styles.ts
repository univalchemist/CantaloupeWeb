import styled from 'styled-components';

import {COLOR_BLACK, COLOR_PRIMARY_GRAY_1} from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: ${COLOR_BLACK};
  flex: 1;
`;

export const Msg = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${COLOR_PRIMARY_GRAY_1};
  margin: 16px 0;
`;
