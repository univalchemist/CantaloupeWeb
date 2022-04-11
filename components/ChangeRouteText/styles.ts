import styled from 'styled-components';

export interface IText {
  color: string;
  margin: string | undefined;
  alignLeft: boolean;
  fontWeight: string | undefined;
}

export const Text = styled.div<IText>`
  color: ${(props) => props.color};
  cursor: pointer;
  margin: ${(props) => (props.margin ? props.margin : '10px auto 10px auto')};
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '500')};
  line-height: 38px;
  letter-spacing: 0em;
  text-align: ${(props) => (props.alignLeft ? 'left' : 'center')};
`;
