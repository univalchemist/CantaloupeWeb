import styled from 'styled-components';

import * as colors from './colors';

export const Header = styled.div`
  color: ${colors.COLOR_BLACK};
  margin-top: 8px;
  font-family: sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
`;

export const SubmitButton = styled.button`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 300px;
  cursor: pointer;
  color: ${(props) =>
    props.disabled ? colors.COLOR_BLACK : colors.COLOR_WHITE};
  background-color: ${(props) =>
    props.disabled ? colors.COLOR_LIGHT_GREY : props.color};
`;

export const FlexBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const FlexBetweenRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FlexFormBody = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;

  > *:first-child {
    margin-right: 16px;
  }
`;
