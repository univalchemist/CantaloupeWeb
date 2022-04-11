import Button from '../Button';
import NavbarAndFooterLink from '../NavbarAndFooterLink';
import {BUTTON_SIZE} from '../CreateCardButton/buttonSize.enum';
import routes from '../../routing/routes';
import Logo from '../Logo';

import * as Styled from './styles';

const NavbarLoggedOut = () => (
  <Styled.Container>
    <Styled.NavbarLeft>
      <Logo />
    </Styled.NavbarLeft>
    <Styled.NavbarRight>
      <Button
        text="Create account"
        size={BUTTON_SIZE.SMALL}
        href={routes.registration.path}
        margin="0px"
      />
      <Styled.LinkWrapper>
        <NavbarAndFooterLink href={routes.login.path} label="Sign in" />
      </Styled.LinkWrapper>
    </Styled.NavbarRight>
  </Styled.Container>
);

export default NavbarLoggedOut;
