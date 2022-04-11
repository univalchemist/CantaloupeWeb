import styled from 'styled-components';

export interface IContainer {
  alignTop?: boolean | undefined;
  alignBottom?: boolean | undefined;
  verticalOffset?: string | undefined;
}

const setAlignment = (props: IContainer): string => {
  let containerAlignment = 'center';

  if (props.alignTop) {
    containerAlignment = 'flex-start';
  }
  if (props.alignBottom) {
    containerAlignment = 'flex-end';
  }

  return containerAlignment;
};

export const Container = styled.div<IContainer>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => setAlignment(props)};
  flex: 1;

  > *:first-child {
    margin-top: ${(props) =>
      props.verticalOffset ? `${props.verticalOffset}px` : '0'};
  }
`;
