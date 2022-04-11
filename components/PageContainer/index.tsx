import * as Styled from './styles';

interface IPageContainer {
  children: any;
  gradient?: string;
}

const PageContainer: React.FC<IPageContainer> = ({children, gradient}) => (
  <Styled.PageContainer gradient={gradient}>
    <Styled.ContainerMax>{children}</Styled.ContainerMax>
  </Styled.PageContainer>
);

export default PageContainer;
