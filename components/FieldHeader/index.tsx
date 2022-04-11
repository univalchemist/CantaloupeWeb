import * as Styled from './styles';
import {FONT_SIZE} from './fieldHeader.enum';

export interface IFieldHeader {
  text: string;
  leftAlign?: boolean;
  fontSize?: FONT_SIZE;
  margin?: string;
}

const FieldHeader = ({
  text = '',
  leftAlign = false,
  fontSize = FONT_SIZE.LARGE,
  margin = '0 0 20px',
}: IFieldHeader) => (
  <Styled.Text leftAlign={leftAlign} fontSize={fontSize} margin={margin}>
    {text}
  </Styled.Text>
);

export default FieldHeader;
