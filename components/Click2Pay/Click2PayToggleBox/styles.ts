import styled from 'styled-components';

import {
  COLOR_PRIMARY_GRAY_0,
  COLOR_SECONDARY_GRAY_0,
} from '../../../styles/colors';

export interface IBody {
  show: boolean;
}

export const Container = styled.div`
  padding: 16px 20px 16px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${COLOR_SECONDARY_GRAY_0};
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  text-transform: capitalize;

  div {
    display: flex;
    align-items: center;

    img {
      margin-right: 4px;
    }
  }

  > span {
    display: flex;
    align-items: center;

    span {
      display: flex;
      padding-right: 8px;
      margin-right: 8px;
      border-right: 1px solid;
    }
  }
`;

export const Body = styled.div<IBody>`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR_PRIMARY_GRAY_0};
  margin-top: ${(props) => (props.show ? '16px' : '0px')};
  transition: all 0.2s ease-in-out;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  max-height: ${(props) => (props.show ? '110px' : '0px')};
`;
