import styled from 'styled-components';

import {COLOR_WHITE} from '../../styles/colors';

import {BUTTON_SIZE} from './buttonSize.enum';

interface IButton {
  size: string;
}

export const Button = styled.div`
  color: ${COLOR_WHITE};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 0px;
  position: static;
  height: 64px;
  left: 0px;
  top: 0px;
  background: #5576d1;
  border-radius: 16px;
  flex: none;
  order: 0;
  flex-grow: 0;
  width: ${(props: IButton) =>
    props.size === BUTTON_SIZE.LARGE ? '345px' : '205px'};
  margin: ${(props: IButton) =>
    props.size === BUTTON_SIZE.SMALL ? '0 35px 0 53px' : '0'};
`;

export const Text = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  color: ${COLOR_WHITE};
  line-height: 70px;
`;
