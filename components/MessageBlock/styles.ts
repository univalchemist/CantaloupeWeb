import styled from 'styled-components';

import * as colors from '../../styles/colors';

// import {MEDIA} from '../../styles/media.enums';

export const Container = styled.div`
  padding: 20px 0 20px 0;
  width: 100%;
`;

export const Title = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 40px;
  line-height: 44px;
  text-align: center;
  margin-bottom: 24px;
  color: ${colors.COLOR_BLACK};
`;

export const SubTitle = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 16px;
  color: ${colors.COLOR_PRIMARY_GRAY_0};
`;

export const Message = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: ${colors.COLOR_PRIMARY_GRAY_0};
`;

export const Email = styled.span`
  color: ${colors.COLOR_PRIMARY_ORANGE_0};
`;
