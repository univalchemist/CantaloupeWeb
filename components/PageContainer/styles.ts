import styled from 'styled-components';

interface IPageContainer {
  gradient?: string;
}

export const PageContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  background: ${(props: IPageContainer) => props.gradient || 'unset'};
  display: flex;
  flex-direction: column;
`;

export const ContainerMax = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex: 1;
  flex-direction: column;
`;
