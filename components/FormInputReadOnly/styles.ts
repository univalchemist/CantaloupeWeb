import styled from 'styled-components';

import {
  COLOR_ADDITIONAL_LIGHT_GRAY,
  COLOR_PRIMARY_GRAY_0,
  COLOR_BLACK,
} from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_BLACK};
  margin-bottom: 16px;
`;

export const InputWrapper = styled.div`
  background: ${COLOR_ADDITIONAL_LIGHT_GRAY};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  margin-bottom: 24px;
  padding: 20px 16px;
  position: relative;
  display: flex;

  img {
    margin-right: 8px;
  }
`;

export const Input = styled.input`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: ${COLOR_PRIMARY_GRAY_0};
  appearance: none;
  border: none;
  background: ${COLOR_ADDITIONAL_LIGHT_GRAY};
`;
