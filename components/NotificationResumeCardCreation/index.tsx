// import Card from '../../assets/svgs/card.svg';
import Button from '../Button';
import {COLOR_SECONDARY_BLUE_0} from '../../styles/colors';

import * as Styled from './styles';

interface INotificationResumeCardCreation {
  click: () => void;
}

export default function NotificationResumeCardCreation({
  click = () => false,
}: INotificationResumeCardCreation) {
  return (
    <Styled.Container>
      <Styled.CardWrapper>{/* <Card /> */}</Styled.CardWrapper>
      <Styled.Text>You&apos;re almost ready with card creation</Styled.Text>
      <Styled.ButtonWrapper>
        <Button text="Resume" click={click} color={COLOR_SECONDARY_BLUE_0} />
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
}
