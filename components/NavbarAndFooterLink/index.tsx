import Link from 'next/link';

import routes from '../../routing/routes';

import * as Styled from './styles';

export interface INavbarAndFooterLink {
  hasMarginLeft?: boolean;
  label?: string;
  href: routes;
}

const NavbarAndFooterLink = ({
  hasMarginLeft = false,
  label = 'Link',
  href = routes.index.path,
}: INavbarAndFooterLink) => (
  <Link href={href}>
    <Styled.Text hasMarginLeft={hasMarginLeft}>{label}</Styled.Text>
  </Link>
);

export default NavbarAndFooterLink;
