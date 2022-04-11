import * as Styled from './styles';

export interface IFooterButtonAndLink {
  fixed?: boolean;
  bgColor?: string | undefined;
}

const FooterButtonAndLink: React.FC<IFooterButtonAndLink> = ({
  children,
  fixed = false,
  bgColor = undefined,
}) => (
  <Styled.Container bgColor={bgColor} fixed={fixed}>
    {children}
  </Styled.Container>
);

export default FooterButtonAndLink;
