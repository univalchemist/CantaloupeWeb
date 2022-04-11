import styled from 'styled-components';

import {COLOR_BOXSHADOW_0} from '../../styles/colors';

export interface IContainer {
  fixed: boolean;
  bgColor: string | undefined;
}

export const Container = styled.div<IContainer>`
  padding: 20px ${(props) => (props.bgColor ? '15px' : '0px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 24px;
  background: ${(props) => (props.bgColor ? props.bgColor : 'transparent')};
  position: ${(props) => (props.fixed ? 'sticky' : undefined)};
  margin: ${(props) => (props.fixed ? '0 0 20px' : undefined)};
  bottom: ${(props) => (props.fixed ? '25px' : undefined)};
  left: ${(props) => (props.fixed ? '0' : undefined)};
  right: ${(props) => (props.fixed ? '0' : undefined)};
  width: inherit;
  box-shadow: ${(props) =>
    props.fixed && props.bgColor
      ? `0px -4px 20px ${COLOR_BOXSHADOW_0}`
      : undefined};

  button {
    margin-bottom: 0;
  }

  div {
    margin: 12px 0 0 0;
  }
`;
