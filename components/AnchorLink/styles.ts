import styled from 'styled-components';

export interface IAnchor {
  color: string;
  margin: string;
}

export const Anchor = styled.a<IAnchor>`
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  display: inline-block;
  line-height: 20px;
  font-weight: 500;
`;
