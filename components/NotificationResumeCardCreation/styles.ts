import styled from 'styled-components';

import * as colors from '../../styles/colors';

// import {MEDIA} from '../../styles/media.enums';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: c
`;

export const CardWrapper = styled.div``;

export const Text = styled.span`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  display: inline-block;
  margin: 0 12px;
  text-align: center;
  color: ${colors.COLOR_PRIMARY_GRAY_0};
`;


export const ButtonWrapper = styled.div`
  max-width: 260px;
  width: 100%;
`;
