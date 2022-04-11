import {icons} from '../../assets/icons';

import * as Styled from './styles';

interface INotificationVerify {
  margin?: string | undefined;
  status: 'verifying' | 'verified' | undefined;
  msgVerifying: string | undefined;
  msgVerified: string | undefined;
}

export default function NotificationVerify({
  margin = undefined,
  status = undefined,
  msgVerifying = undefined,
  msgVerified = undefined,
}: INotificationVerify) {
  return (
    <Styled.Container margin={margin}>
      {status === 'verifying' && (
        <Styled.Verifying>
          <img
            width="20px"
            height="20px"
            src={icons.verification}
            alt="verification icon"
          />
          {msgVerifying}
        </Styled.Verifying>
      )}
      {status === 'verified' && (
        <Styled.Verified>
          <img
            width="20px"
            height="20px"
            src={icons.checkCircleBlue}
            alt="verification icon"
          />
          {msgVerified}
        </Styled.Verified>
      )}
    </Styled.Container>
  );
}
