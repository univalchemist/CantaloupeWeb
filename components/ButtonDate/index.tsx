import * as Styled from './styles';

interface IProps {
  active: boolean;
  click: () => void;
}

const ButtonDate: React.FC<IProps> = ({active = true, click = () => false}) => (
  <Styled.Button active={active} onClick={click}>
    Date
    <Styled.Arrow active={active} />
  </Styled.Button>
);

export default ButtonDate;
