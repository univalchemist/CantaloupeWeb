import styled from 'styled-components';

export interface IContainer {
  margin: string;
}

export const Container = styled.div<IContainer>`
  margin: ${(props) => (props.margin ? props.margin : undefined)};

  > img {
    width: 100%;
  }
`;
