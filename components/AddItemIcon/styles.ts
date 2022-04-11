import styled from 'styled-components';

import {
  COLOR_SECONDARY_BLUE_0,
  COLOR_WHITE,
  COLOR_PRIMARY_ORANGE_0,
  COLOR_PRIMARY_GRAY_0,
  COLOR_PRIMARY_GRAY_1,
  COLOR_PRIMARY_GRAY_2,
} from '../../styles/colors';

export const Container = styled.button`
  display: flex;
  align-items: center;
  padding: 24px 0;
  margin: 0 20px;
  appearance: none;
  background: none;
  border: none;
`;

export const Icon = styled.span`
  margin-right: 12px;
`;

export const Text = styled.span`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;
