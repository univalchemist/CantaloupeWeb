import * as Styled from './styles';

interface IBodyContainer {
  alignTop?: boolean | undefined;
  alignBottom?: boolean | undefined;
  verticalOffset?: string | undefined;
}

const BodyContainer: React.FC<IBodyContainer> = ({
  children,
  alignTop,
  alignBottom,
  verticalOffset,
}) => (
  <Styled.Container
    alignTop={alignTop}
    alignBottom={alignBottom}
    verticalOffset={verticalOffset}>
    {children}
  </Styled.Container>
);

export default BodyContainer;
