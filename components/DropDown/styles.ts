import styled from 'styled-components';

export interface ISelect {
  bgColor: string;
  fontColor: string;
  selectedFontColor: string;
  active: boolean;
}

export const Container = styled.div`
  position: relative;
  margin-bottom: 24px;
  flex: 1;
`;

export const Select = styled.select<ISelect>`
  appearance: none;
  border: none;
  background: ${(props) => props.bgColor};
  color: ${(props) =>
    props.active ? props.selectedFontColor : props.fontColor};
  padding: 16px 60px 16px 12px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  width: 100%;
`;

export const Arrow = styled.div`
  position: absolute;
  width: 12px;
  height: 22px;
  right: 21px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  transform: rotate(90deg);
  pointer-events: none;

  img {
    width: 100%;
  }
`;
