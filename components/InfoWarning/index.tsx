import {icons} from '../../assets/icons';

import * as Styled from './styles';

interface IInfoWarning {
  question?: boolean;
  text: string;
}

export default function InfoWarning({
  question,
  text = 'My Button',
}: IInfoWarning) {
  return (
    <Styled.Container>
      <img
        src={question ? icons.questionMarkCircleOrange : icons.infoLightGray}
        alt={question ? 'question icon orange' : 'info icon gray'}
      />
      <Styled.Text orange={question}>{text}</Styled.Text>
    </Styled.Container>
  );
}
