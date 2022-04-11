import NavbarLoggedIn from '../NavbarLoggedIn';
import NavbarLoggedOut from '../NavbarLoggedOut';

import * as Styled from './styles';

export interface INavbar {
  isLoggedIn?: boolean;
  showBackBtn?: boolean;
  showHomeBtn?: boolean;
  noProfile?: boolean;
  noSignOut?: boolean;
  backButtonClick?: () => void;
}

const Navbar = ({
  isLoggedIn = false,
  showBackBtn = false,
  showHomeBtn = false,
  noProfile,
  noSignOut,
  backButtonClick = undefined,
}: INavbar) => (
  <Styled.Container>
    {isLoggedIn ? (
      (() => {
        if (showBackBtn)
          return (
            <NavbarLoggedIn
              showBackBtn={showBackBtn}
              noProfile={noProfile}
              noSignOut={noSignOut}
              backClick={backButtonClick}
            />
          );
        if (showHomeBtn)
          return (
            <NavbarLoggedIn
              showHomeBtn={showHomeBtn}
              noProfile={noProfile}
              noSignOut={noSignOut}
            />
          );

        return <NavbarLoggedIn noProfile={noProfile} noSignOut={noSignOut} />;
      })()
    ) : (
      <NavbarLoggedOut />
    )}
  </Styled.Container>
);

export default Navbar;
