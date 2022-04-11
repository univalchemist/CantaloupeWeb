import styled from 'styled-components';

import {
  COLOR_PRIMARY_GRAY_0,
  COLOR_PRIMARY_ORANGE_0,
  COLOR_SECONDARY_BLUE_0,
} from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Title = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 40px;
  line-height: 48px;
  text-align: center;
  text-transform: capitalize;
  color: ${COLOR_PRIMARY_ORANGE_0};
  padding: 0 24px;
`;

export const Body = styled.div`
  font-size: 24px;
  line-height: 28px;
  font-weight: 300;
  text-align: center;
  color: ${COLOR_PRIMARY_GRAY_0};
  margin-top: 24px;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Footer = styled.div`
  margin-top: 24px;
  text-align: center;
`;

export const Link = styled.a`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: ${COLOR_SECONDARY_BLUE_0};
  margin-top: 24px;
  display: block;
  cursor: pointer;
`;
