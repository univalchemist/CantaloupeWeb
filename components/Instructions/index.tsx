import * as Styled from './styles';

interface IInstructions {
  text?: string;
}

export default function Instructions({
  text = '1. To get started, please link a payment account',
}: IInstructions) {
  return <Styled.Text>{text}</Styled.Text>;
}
