import styled from 'styled-components';

import {COLOR_SECONDARY_GRAY_0} from '../../styles/colors';

interface IContainer {
  padding: string;
  centerPass: boolean;
}

export const Container = styled.div<IContainer>`
  padding: ${(props) => props.padding};
  text-align: ${(props) => (props.centerPass ? 'center' : 'left')};
`;

export const Logo = styled.div`
  cursor: pointer;

  .google {
    width: 100%;
  }
`;

export const Message = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR_SECONDARY_GRAY_0};
  margin: 12px 0;
`;
