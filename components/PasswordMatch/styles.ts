import styled from 'styled-components';

import {COLOR_GREEN_0, COLOR_RED_0, COLOR_WHITE} from '../../styles/colors';

interface IProps {
  success: boolean;
}

export const Wrapper = styled.div<IProps>`
  display: flex;
  align-items: center;
  background: ${COLOR_WHITE};
  border: 2px solid ${COLOR_WHITE};
  border-radius: 8px;
  color: ${(props: IProps) => (props.success ? COLOR_GREEN_0 : COLOR_RED_0)};
  margin-bottom: 16px;
  padding: 8px;
`;

export const Message = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-left: 12px;
`;
