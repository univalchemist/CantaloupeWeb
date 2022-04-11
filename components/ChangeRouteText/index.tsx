import Link from 'next/link';

import {COLOR_PRIMARY_GRAY_0} from '../../styles/colors';

import * as Styled from './styles';

export interface sharedTextProps {
  text: string;
  color?: string;
  margin?: string | undefined;
  alignLeft?: boolean;
  fontWeight?: string | undefined;
}

interface IChangeRouteText extends sharedTextProps {
  href: string;
}

export default function ChangeRouteText({
  href = '/',
  text = 'Change Route',
  color = COLOR_PRIMARY_GRAY_0,
  margin = undefined,
  alignLeft = false,
  fontWeight = undefined,
}: IChangeRouteText) {
  return (
    <Link href={href}>
      <Styled.Text
        color={color}
        margin={margin}
        alignLeft={alignLeft}
        fontWeight={fontWeight}>
        {text}
      </Styled.Text>
    </Link>
  );
}
