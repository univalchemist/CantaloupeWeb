import * as Styled from './styles';

interface IButton {
  disabled: boolean;
  text: string;
  onClick?: () => void;
}

const Submit = ({disabled, text, onClick}: IButton) => (
  <Styled.Button type="submit" disabled={disabled} onClick={onClick}>
    {text}
  </Styled.Button>
);

export default Submit;
