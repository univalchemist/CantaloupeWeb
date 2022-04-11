import styled from 'styled-components';

import {
  COLOR_PRIMARY_ORANGE_0,
  COLOR_PRIMARY_GRAY_0,
} from '../../styles/colors';

export interface Text {
  orange?: boolean | undefined;
}

export const Container = styled.div`
  display: flex;
`;

export const Text = styled.div<Text>`
  color: ${(props) =>
    props.orange ? COLOR_PRIMARY_ORANGE_0 : COLOR_PRIMARY_GRAY_0};
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-left: 12px;
`;
