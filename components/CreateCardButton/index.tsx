import Link from 'next/link';

import routes from '../../routing/routes';

import * as Styled from './styles';
import {BUTTON_SIZE} from './buttonSize.enum';

interface ICreateCardButton {
  text?: string;
  size: BUTTON_SIZE;
}

const CreateCardButton = ({
  text = 'Create account',
  size = BUTTON_SIZE.LARGE,
}: ICreateCardButton) => (
  <Link href={routes.registration.path}>
    <Styled.Button size={size}>
      <Styled.Text>{text}</Styled.Text>
    </Styled.Button>
  </Link>
);

export default CreateCardButton;
