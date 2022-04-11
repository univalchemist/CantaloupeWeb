import styled from 'styled-components';

import * as colors from '../../styles/colors';

// import {MEDIA} from '../../styles/media.enums';

export interface IContainer {
  margin: string | undefined;
}

export const ErrorContainer = styled.div`
  background: ${colors.COLOR_WHITE};
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${(props: IContainer) => (props.margin ? props.margin : '0')};
  box-shadow: 0px 100px 80px rgba(188, 111, 36, 0.07),
    0px 41.7776px 33.4221px rgba(188, 111, 36, 0.0503198),
    0px 22.3363px 17.869px rgba(188, 111, 36, 0.0417275),
    0px 12.5216px 10.0172px rgba(188, 111, 36, 0.035),
    0px 6.6501px 5.32008px rgba(188, 111, 36, 0.0282725),
    0px 2.76726px 2.21381px rgba(188, 111, 36, 0.0196802);
`;

export const Msg = styled.span`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${colors.COLOR_PRIMARY_ORANGE_0};

  a {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  border: none;
  appearance: none;
  color: ${colors.COLOR_PRIMARY_ORANGE_0};
  background: ${colors.COLOR_ADDITIONAL_LIGHT_GRAY};
  padding: 6px 12px;
  margin-left: 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-width: 100px;
  min-height: 40px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
`;

export const Arrow = styled.div`
  display: inline-block;
  margin-left: 10px;

  img {
    margin-top: 2px;
  }
`;
