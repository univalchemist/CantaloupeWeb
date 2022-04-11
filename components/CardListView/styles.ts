import styled from 'styled-components';

import {
  COLOR_SECONDARY_BLUE_0,
  COLOR_WHITE,
  COLOR_PRIMARY_ORANGE_0,
  COLOR_PRIMARY_GRAY_0,
  COLOR_PRIMARY_GRAY_1,
  COLOR_PRIMARY_GRAY_2,
} from '../../styles/colors';

export interface IContainer {
  marginTop: boolean;
}

export interface ICardWrapper {
  primary: boolean;
}

export interface IAmount {
  hasFunding: boolean;
  hide: boolean;
}

export interface IInfo {
  centerText: boolean;
}

export const Container = styled.button<IContainer>`
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: stretch;
  margin-top: ${(props) => (props.marginTop ? '48px' : '16px')};
`;

export const CardWrapper = styled.div<ICardWrapper>`
  position: relative;
  display: inline-block;

  img {
    margin-left: -5px;
  }

  &:before {
    content: 'Primary';
    position: absolute;
    top: -7px;
    right: 0;
    padding: 0px 8px;
    border-radius: 99px;
    background: ${COLOR_SECONDARY_BLUE_0};
    align-items: center;
    justify-content: center;
    display: ${(props) => (props.primary ? 'flex' : 'none')};
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 20px;
    color: ${COLOR_WHITE};
    text-transform: uppercase;
  }
`;

export const Info = styled.div<IInfo>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  justify-content: center;
  padding: 0 16px;
`;

export const Amount = styled.div<IAmount>`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 32px;
  margin-bottom: 20px;
  display: ${(props) => (props.hide ? 'none' : 'block')};
  color: ${(props) =>
    props.hasFunding ? COLOR_PRIMARY_ORANGE_0 : COLOR_PRIMARY_GRAY_2};
`;

export const CardNumber = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_PRIMARY_GRAY_0};
`;

export const Details = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-top: 8px;
  color: ${COLOR_PRIMARY_GRAY_1};
`;
export const ArrowIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 30px;
`;
