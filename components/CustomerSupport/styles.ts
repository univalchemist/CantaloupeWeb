import styled from 'styled-components';

import {
  COLOR_SECONDARY_GRAY_0,
  COLOR_PRIMARY_ORANGE_0,
  COLOR_PRIMARY_ORANGE_2,
} from '../../styles/colors';

export const Wrapper = styled.div`
  margin-bottom: 24px;
  flex: 1;
`;

export const SubHeaderBlack = styled.h2`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin: 0 0 24px;
  color: ${COLOR_SECONDARY_GRAY_0};
`;

export const SubHeaderOrange = styled.h2`
  font-family: Rubik;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  margin: 0 0 24px;
  color: ${COLOR_PRIMARY_ORANGE_0};
`;

export const Text = styled.p`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  margin: 0 0 24px;
`;

export const Email = styled.a`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_PRIMARY_ORANGE_0};
`;

export const Divider = styled.div`
  margin: 24px 0;
  border: 1px solid ${COLOR_PRIMARY_ORANGE_2};
`;

export const More = styled.span`
  color: ${COLOR_PRIMARY_ORANGE_0};
`;

export const Link = styled.a`
  color: ${COLOR_PRIMARY_ORANGE_0};
  text-decoration: none;
`;
