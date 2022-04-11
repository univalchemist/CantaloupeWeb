import styled from 'styled-components';

import {
  COLOR_WHITE,
  COLOR_SECONDARY_BLUE_2,
  COLOR_SECONDARY_BLUE_3,
} from '../../styles/colors';
import {BUTTON_SIZE} from '../CreateCardButton/buttonSize.enum';

export interface IButton {
  color: string;
  size: BUTTON_SIZE;
  margin: string | undefined;
}

const setSize = (size: BUTTON_SIZE): string => {
  let sizePx = '24px';

  if (size === BUTTON_SIZE.LARGE) {
    sizePx = '24px';
  }
  if (size === BUTTON_SIZE.SMALL) {
    sizePx = '16px';
  }

  return sizePx;
};

const setLineHeight = (size: BUTTON_SIZE): string => {
  let lineHeightPx = '24px';

  if (size === BUTTON_SIZE.LARGE) {
    lineHeightPx = '28px';
  }
  if (size === BUTTON_SIZE.SMALL) {
    lineHeightPx = '20px';
  }

  return lineHeightPx;
};

const setPadding = (size: BUTTON_SIZE): string => {
  let paddingPx = '21px 45px';

  if (size === BUTTON_SIZE.LARGE) {
    paddingPx = '18px 24px';
  }
  if (size === BUTTON_SIZE.SMALL) {
    paddingPx = '21px 45px';
  }

  return paddingPx;
};

export const Button = styled.button<IButton>`
  margin: ${(props) => (props.margin ? props.margin : '0 0 10px 0')};
  border: 2px solid transparent;
  cursor: pointer;
  background-color: ${(props) => props.color};
  color: ${COLOR_WHITE};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${(props) => setPadding(props.size)};
  border-radius: 16px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => setSize(props.size)};
  line-height: ${(props) => setLineHeight(props.size)};
  width: 100%;

  &:disabled {
    border: 2px solid ${COLOR_SECONDARY_BLUE_3};
    color: ${COLOR_SECONDARY_BLUE_2};
    background-color: unset;
  }
`;
