import styled from 'styled-components';

import {
  COLOR_PRIMARY_GRAY_0,
  COLOR_PRIMARY_ORANGE_0,
  COLOR_WHITE,
} from '../../styles/colors';

export const Label = styled.label<{color: string}>`
  display: flex;
  color: ${(props) => props.color};
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  label {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const Icon = styled.svg`
  fill: none;
  stroke: ${COLOR_WHITE};
  stroke-width: 3px;
`;

export const StyledCheckbox = styled.div<{checked: boolean; color: string}>`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  border: 2px solid
    ${(props) => (props.checked ? COLOR_PRIMARY_ORANGE_0 : props.color)};
  background: ${(props) =>
    props.checked ? COLOR_PRIMARY_ORANGE_0 : 'transparent'};
  border-radius: 4px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;
