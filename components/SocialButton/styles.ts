import styled from 'styled-components';

import {COLOR_WHITE} from '../../styles/colors';

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  appearance: none;
  border: none;
  background: ${COLOR_WHITE};
  border-radius: 16px;
  margin-bottom: 12px;
  padding: 16px;
  cursor: pointer;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: inline-block;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 273px;
`;

export const IconContainer = styled.div`
  display: inline-block;
  margin-right: 12px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div`
  display: inline-block;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;
