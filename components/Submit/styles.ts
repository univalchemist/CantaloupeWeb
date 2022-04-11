import styled from 'styled-components';

import {
  COLOR_SECONDARY_BLUE_0,
  COLOR_SECONDARY_BLUE_2,
  COLOR_SECONDARY_BLUE_3,
  COLOR_WHITE,
} from '../../styles/colors';

interface IButton {
  disabled: boolean;
}

export const Button = styled.button`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 58px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${COLOR_SECONDARY_BLUE_2};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 2px solid
    ${(props: IButton) =>
      props.disabled ? COLOR_SECONDARY_BLUE_3 : COLOR_SECONDARY_BLUE_0};
  color: ${(props: IButton) =>
    props.disabled ? COLOR_SECONDARY_BLUE_2 : COLOR_WHITE};
  background-color: ${(props: IButton) =>
    props.disabled ? 'unset' : COLOR_SECONDARY_BLUE_0};
`;
