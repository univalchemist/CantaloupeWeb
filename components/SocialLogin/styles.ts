import styled from 'styled-components';

import {COLOR_PRIMARY_ORANGE_0, COLOR_PRIMARY_GRAY_0} from '../../styles/colors';

export const Container = styled.div`
  padding: 24px 0;
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const TextWrapper = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_PRIMARY_GRAY_0};
`;

export const TextLink = styled.a`
  display: inline-block;
  text-decoration: underline;
  cursor: pointer;
  color: ${COLOR_PRIMARY_ORANGE_0};
`;