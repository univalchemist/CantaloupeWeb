import styled from 'styled-components';

import {COLOR_BLACK} from '../../styles/colors';

export interface ILink {
  hasMarginLeft: boolean;
}

export const Text = styled.div`
  margin-left: ${(props: ILink) => (props.hasMarginLeft ? '53px' : '0')};
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_BLACK};
  cursor: pointer;
`;
