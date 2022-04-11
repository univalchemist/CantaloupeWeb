import styled from 'styled-components';

import * as colors from '../../styles/colors';

// import {MEDIA} from '../../styles/media.enums';

export const ErrorContainer = styled.div`
  background: ${colors.COLOR_PRIMARY_GRAY_5};
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
`;

export const TextContainer = styled.div`
  color: ${colors.COLOR_ADDITIONAL_LIGHT_GRAY};
  margin-left: 10px;
`;

export const Title = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 150%;
  margin-top: -5px;
  margin-bottom: 5px;
`;

export const Msg = styled.span`
  font-size: 16px;
  line-height: 150%;
`;

export const Icon = styled.div``;
