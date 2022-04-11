import styled from 'styled-components';

export interface IContainer {
  alignCenter?: boolean;
}

export interface IImage {
  width?: string;
  height?: string;
  src: string;
  alt: string;
}

export const Image = styled.img<IImage>`
  width: ${(props) => props.width || undefined};
  height: ${(props) => props.height || undefined};
`;

export const Container = styled.div<IContainer>`
  text-align: ${(props) => (props.alignCenter ? 'center' : undefined)};
`;
