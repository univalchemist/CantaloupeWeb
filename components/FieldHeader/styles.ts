import styled from 'styled-components';

import {COLOR_BLACK} from '../../styles/colors';

import {FONT_SIZE} from './fieldHeader.enum';

export interface IText {
  leftAlign?: boolean;
  fontSize: FONT_SIZE;
  margin: string;
}

export const Text = styled.div<IText>`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: ${(props) => props.fontSize};
  line-height: 20px;
  color: ${COLOR_BLACK};
  text-align: ${(props) => (props.leftAlign ? 'left' : 'center')};
  width: 100%;
  margin: ${(props) => (props.margin ? props.margin : '0 0 20px')};
`;
