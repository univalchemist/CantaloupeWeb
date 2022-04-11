import styled from 'styled-components';

import {COLOR_BLACK} from '../../styles/colors';

export interface IHeaderProps {
  leftAlign: boolean | undefined;
  reducedHeader: boolean | undefined;
  margin: string | undefined;
}

export const Text = styled.h1<IHeaderProps>`
  color: ${COLOR_BLACK};
  text-align: ${(props) => (props.leftAlign ? 'left' : 'center')};
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: ${(props) => (props.reducedHeader ? '32px' : '40px')};
  line-height: ${(props) => (props.reducedHeader ? '40px' : '44px')};
  margin: ${(props) => (props.margin ? props.margin : '50px 0 24px')};
`;
