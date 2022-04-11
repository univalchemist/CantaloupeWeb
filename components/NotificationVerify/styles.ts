import styled from 'styled-components';

import * as colors from '../../styles/colors';

// import {MEDIA} from '../../styles/media.enums';

interface IContainer {
  margin: string | undefined;
}

export const Container = styled.div<IContainer>`
  margin: ${(props) => (props.margin ? props.margin : '10px 0')};
  border-radius: 8px;
  overflow: hidden;
  font-family: Rubik;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

export const Verifying = styled.div`
  color: ${colors.COLOR_WHITE};
  background: ${colors.COLOR_PRIMARY_ORANGE_0};
  padding: 10px 8px;
  display: flex;
  align-items: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  img {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 10px;
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`;

export const Verified = styled.div`
  color: ${colors.COLOR_SECONDARY_BLUE_1};
  background: ${colors.COLOR_WHITE};
  padding: 10px 8px;
  display: flex;
  align-items: center;

  img {
    width: 20px;
    min-width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 10px;
  }
`;
