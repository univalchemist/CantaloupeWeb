import * as Styled from './styles';

interface INotificationSystem {
  msg: string | undefined;
  title: string | undefined;
  icon: JSX.Element | undefined;
}

export default function NotificationSystem({
  msg = undefined,
  title = undefined,
  icon = undefined,
}: INotificationSystem) {
  return (
    <Styled.ErrorContainer>
      <Styled.Icon>{icon}</Styled.Icon>
      <Styled.TextContainer>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Msg>{msg}</Styled.Msg>
      </Styled.TextContainer>
    </Styled.ErrorContainer>
  );
}
