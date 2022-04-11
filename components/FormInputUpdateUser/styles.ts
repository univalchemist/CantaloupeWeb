import styled from 'styled-components';

import {
  COLOR_ADDITIONAL_LIGHT_GRAY,
  COLOR_PRIMARY_GRAY_1,
  COLOR_PRIMARY_GRAY_0,
  COLOR_PRIMARY_ORANGE_0,
  COLOR_PRIMARY_GRAY_3,
} from '../../styles/colors';

interface IWrapperProps {
  disabled: boolean;
}

interface IBorderProps {
  disabled: boolean;
}

interface IInputProps {
  name: string;
}
export const Wrapper = styled.div<IWrapperProps>`
  background: ${(props) =>
    props.disabled ? COLOR_ADDITIONAL_LIGHT_GRAY : 'transparent'};
  box-shadow: ${(props) =>
    props.disabled
      ? '0px 1px 2px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.04)'
      : 'none'};
  border-radius: 16px;
  padding: 8px 16px;
  color: ${COLOR_PRIMARY_GRAY_0};
  margin-bottom: 16px;
  position: relative;
`;

export const Border = styled.div<IBorderProps>`
  display: flex;
  flex-direction: column;
  border-bottom: ${(props) =>
    props.disabled ? 'none' : `1px solid ${COLOR_PRIMARY_GRAY_3}`};
  padding-bottom: ${(props) => (props.disabled ? `0px` : '8px')};
`;

export const Label = styled.label`
  display: block;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const Input = styled.input<IInputProps>`
  display: block;
  appearance: none;
  border: none;
  background: transparent;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: ${COLOR_PRIMARY_ORANGE_0};
  width: 100%;
  caret-color: ${COLOR_PRIMARY_ORANGE_0};

  &:disabled {
    opacity: 1;
    -webkit-text-fill-color: ${(props) =>
      props.name === 'password'
        ? COLOR_PRIMARY_ORANGE_0
        : COLOR_PRIMARY_GRAY_1};
    color: ${(props) =>
      props.name === 'password'
        ? COLOR_PRIMARY_ORANGE_0
        : COLOR_PRIMARY_GRAY_1};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${COLOR_PRIMARY_ORANGE_0};
    transition: background-color 5000s ease-in-out 0s;
  }

  &:focus-visible {
    border: none;
    outline: none;
  }
`;

export const Edit = styled.a`
  appearance: none;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_PRIMARY_GRAY_0};

  img {
    margin-right: 8px;
  }
`;

export const ClearButton = styled.span`
  z-index: 1000;
  display: flex;
  height: 28px;
  width: 33px;
  padding: 4px;
  text-align: center;
  justify-content: center;
  cursor: pointer;
`;

export const IconValid = styled.span`
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
