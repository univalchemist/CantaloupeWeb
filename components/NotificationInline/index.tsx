import {ReactFragment} from 'react';

import {icons} from '../../assets/icons';

import * as Styled from './styles';

interface INotificationInline {
  msg: ReactFragment | string | undefined;
  btn?: ReactFragment | string | undefined;
  margin?: string | undefined;
  onClick?: () => Promise<boolean> | void | undefined;
}

export default function NotificationInline({
  msg = undefined,
  btn = undefined,
  margin = undefined,
  onClick = undefined,
}: INotificationInline) {
  return (
    <Styled.ErrorContainer margin={margin}>
      <Styled.Msg>{msg}</Styled.Msg>
      {btn && (
        <Styled.Button onClick={onClick} type="button">
          {btn}
          <Styled.Arrow>
            <img src={icons.arrowGray} alt="arrow icon" />
          </Styled.Arrow>
        </Styled.Button>
      )}
    </Styled.ErrorContainer>
  );
}
