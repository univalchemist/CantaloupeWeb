import styled from 'styled-components';

import * as colors from '../../styles/colors';

interface WrapperProps {
  active: boolean;
  disabled: boolean;
  bgColor: string;
  hideFLoatingLabel: boolean;
}

interface LabelProps {
  active: boolean;
  htmlFor: string;
}

interface InputProps {
  active: boolean;
  disabled: boolean;
  hideFLoatingLabel: boolean;
  fontColor: string;
  placeholderColor: string;
}

const setBgColor = (color: string, disabled: boolean): string => {
  if (disabled) {
    return colors.COLOR_PRIMARY_GRAY_6;
  }
  if (color) {
    return color;
  }

  return colors.COLOR_WHITE;
};

const setWrapperPadding = (active: boolean, hideLabel: boolean): string => {
  if (hideLabel) {
    return '15px';
  }
  if (active) {
    return '30px 15px 10px';
  }

  return '0px 15px';
};

const setInputPadding = (active: boolean, hideLabel: boolean): string => {
  if (hideLabel) {
    return '0px';
  }
  if (active) {
    return '0px';
  }

  return '20px 0px';
};

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  background: ${(props) => setBgColor(props.bgColor, props.disabled)};
  border-radius: 16px;
  margin-bottom: 20px;
  transition: padding 250ms ease-in-out;
  display: ${(props) => (props.hideFLoatingLabel ? 'flex' : undefined)};
  padding: ${(props) =>
    setWrapperPadding(props.active, props.hideFLoatingLabel)};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.04);

  &.error {
    border: 1px solid ${colors.COLOR_PRIMARY_ORANGE_0};
  }

  &:focus-within {
    box-shadow: 0px 100px 80px rgba(188, 111, 36, 0.07),
      0px 41.7776px 33.4221px rgba(188, 111, 36, 0.0503198),
      0px 22.3363px 17.869px rgba(188, 111, 36, 0.0417275),
      0px 12.5216px 10.0172px rgba(188, 111, 36, 0.035),
      0px 6.6501px 5.32008px rgba(188, 111, 36, 0.0282725),
      0px 2.76726px 2.21381px rgba(188, 111, 36, 0.0196802);
  }
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  border: none;
  appearance: none;
  margin: 4px 0;
  caret-color: ${(props) => props.fontColor};
  color: ${(props) => props.fontColor};
  padding: ${(props) => setInputPadding(props.active, props.hideFLoatingLabel)};
  transition: all 250ms ease-in-out;
  font-size: ${(props) => (props.hideFLoatingLabel ? '20px' : '16px')};
  font-weight: 500;
  opacity: ${(props) => (props.active || props.hideFLoatingLabel ? '1' : '0')};
  background: transparent;

  &:focus {
    border: none;
    outline: none;
  }

  &:disabled {
    background-color: transparent;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${colors.COLOR_PRIMARY_ORANGE_0};
    transition: background-color 5000s ease-in-out 0s;
  }

  ::placeholder {
    color: ${(props) => props.placeholderColor};
  }
`;

export const FloatingLabel = styled.label<LabelProps>`
  position: absolute;
  left: 15px;
  top: ${(props) => (props.active ? '30%' : '50%')};
  transform: translateY(-50%);
  font-size: ${(props) => (props.active ? '15px' : '18px')};
  pointer-events: none;
  transition: all 250ms ease-in-out;
  font-family: Rubik;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${colors.COLOR_PRIMARY_GRAY_0};
`;

export const CheckCircle = styled.span`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  height: 28px;
  width: 28px;
  text-align: center;
  justify-content: center;
`;

export const ClearButton = styled.span`
  position: absolute;
  z-index: 1000;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  height: 24px;
  min-width: 29px;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  appearance: none;
  background-color: transparent;
`;

export const Currency = styled.span`
  margin-right: 5px;
`;

export const ShowHide = styled.span`
  color: ${colors.COLOR_PRIMARY_GRAY_0};
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
`;
