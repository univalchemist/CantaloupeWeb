import styled from 'styled-components';

export const Container = styled.a<{reverse: boolean}>`
  display: flex;
  flex-direction: ${(props) => (props.reverse ? 'row-reverse' : 'row')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export interface ISvg {
  width: string | undefined;
  height: string | undefined;
  color: string;
}

export const SvgContainer = styled.span<ISvg>`
  width: ${(props) => (props.width ? props.width : 'unset')};
  height: ${(props) => (props.height ? props.height : 'unset')};
  display: inline-block;
  margin-left: 16px;

  svg {
    fill: ${(props) => props.color};
  }
`;

export const TextLink = styled.span<{color: string; reverse: boolean}>`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.color};
  margin: ${(props) => (props.reverse ? '0 10px 0 0' : '0 0 0 10px')};
  flex-shrink: 0;
`;
