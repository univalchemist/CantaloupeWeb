import * as Styled from './styles';

interface IAddItemIcon {
  text: string;
  click: () => void;
}

const AddItemIcon: React.FC<IAddItemIcon> = ({
  children,
  text = '',
  click = () => false,
}) => {
  return (
    <Styled.Container onClick={() => click()}>
      <Styled.Icon>{children}</Styled.Icon>
      <Styled.Text>{text}</Styled.Text>
    </Styled.Container>
  );
};

export default AddItemIcon;
