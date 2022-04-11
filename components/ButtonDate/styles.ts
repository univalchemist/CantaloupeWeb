import styled from 'styled-components';

import {
  COLOR_PRIMARY_ORANGE_0,
  COLOR_SECONDARY_BLUE_2,
  COLOR_SECONDARY_BLUE_3,
} from '../../styles/colors';

interface IButton {
  active: boolean;
}
interface IArrow {
  active: boolean;
}

export const Button = styled.button<IButton>`
  appearance: none;
  border: 1px solid
    ${(props) =>
      props.active ? COLOR_PRIMARY_ORANGE_0 : COLOR_SECONDARY_BLUE_2};
  border-radius: 20px;
  background:  ${(props) =>
    props.active ? 'rgba(255, 207, 176, 0.36)' : COLOR_SECONDARY_BLUE_3};
  color: ${(props) =>
    props.active ? COLOR_PRIMARY_ORANGE_0 : COLOR_SECONDARY_BLUE_2};
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 114%;
  width: 95px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Arrow = styled.span<IArrow>`
  display: inline-block;
  margin-left: 10px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid
    ${(props) =>
      props.active ? COLOR_PRIMARY_ORANGE_0 : COLOR_SECONDARY_BLUE_2};
`;
