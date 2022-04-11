import * as Styled from './styles';

export interface IProps {
  text: string;
  click: () => void;
}

const SocialButton: React.FC<IProps> = ({children, text, click}) => {
  return (
    <Styled.Button onClick={click}>
      <Styled.Wrapper>
        <Styled.IconContainer>{children}</Styled.IconContainer>
        <Styled.Text>{text}</Styled.Text>
      </Styled.Wrapper>
    </Styled.Button>
  );
};

export default SocialButton;
