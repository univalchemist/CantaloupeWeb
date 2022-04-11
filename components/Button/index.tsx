import {useRouter} from 'next/router';

import {COLOR_SECONDARY_BLUE_0} from '../../styles/colors';
import {BUTTON_SIZE} from '../CreateCardButton/buttonSize.enum';

import * as Styled from './styles';

interface IButton {
  text: string;
  href?: string;
  color?: string;
  size?: BUTTON_SIZE;
  margin?: string | undefined;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  click?: () => void | undefined;
}

export default function Button({
  text = 'My Button',
  href = undefined,
  color = COLOR_SECONDARY_BLUE_0,
  type = 'button',
  size = BUTTON_SIZE.LARGE,
  margin = undefined,
  disabled = false,
  click = undefined,
}: IButton) {
  const router = useRouter();

  const onClick = () => {
    if (href) {
      router.push(href);

      return;
    }

    if (click) {
      click();
    }
  };

  return (
    <Styled.Button
      type={type}
      onClick={onClick}
      color={color}
      size={size}
      margin={margin}
      disabled={disabled}>
      {text}
    </Styled.Button>
  );
}
