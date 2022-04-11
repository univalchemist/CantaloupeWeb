import * as Styled from './styles';

interface IHeader {
  text: string;
  leftAlign?: boolean;
  reducedHeader?: boolean;
  margin?: string;
}

export default function Header({
  text,
  leftAlign = false,
  reducedHeader,
  margin,
}: IHeader) {
  return (
    <Styled.Text
      leftAlign={leftAlign}
      reducedHeader={reducedHeader}
      margin={margin}>
      {text}
    </Styled.Text>
  );
}
