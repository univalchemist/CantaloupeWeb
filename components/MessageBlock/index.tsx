import {ReactFragment} from 'react';

import * as Styled from './styles';

interface IMessageBlock {
  title: string | undefined;
  subTitle?: string | undefined;
  message: ReactFragment | undefined;
}

export default function MessageBlock({
  title = undefined,
  subTitle = undefined,
  message = undefined,
}: IMessageBlock) {
  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      {subTitle && <Styled.SubTitle>{subTitle}</Styled.SubTitle>}
      <Styled.Message>{message}</Styled.Message>
    </Styled.Container>
  );
}
