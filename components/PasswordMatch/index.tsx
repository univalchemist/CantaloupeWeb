import {icons} from '../../assets/icons';

import * as Styled from './styles';

interface IProps {
  active: boolean;
  success: boolean;
  message: string;
}

export default function PasswordMatch({
  active = false,
  success = false,
  message = '',
}: IProps) {
  return active ? (
    <Styled.Wrapper success={success}>
      <img
        src={success ? icons.checkGreen : icons.xRed}
        alt={success ? 'icon grren check' : 'icon red x'}
      />
      <Styled.Message>{message}</Styled.Message>
    </Styled.Wrapper>
  ) : null;
}
