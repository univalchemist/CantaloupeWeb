import styled from 'styled-components';

import {COLOR_PRIMARY_GRAY_0} from '../../styles/colors';

export const Container = styled.a`
  display: flex;
  flex-direction: row;
  display: inline-block;
`;

export const Arrow = styled.div`
  display: inline-block;
  margin-right: 10px;
  transform: rotate(180deg);

  img {
    margin-top: 2px;
  }
`;

export const BackLink = styled.span`
  color: ${COLOR_PRIMARY_GRAY_0};
  font-family: Rubik;
  font-weight: 500;
  display: inline-block;
`;
