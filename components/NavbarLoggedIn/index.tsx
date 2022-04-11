import {useRouter} from 'next/router';

import IconLink from '../IconLink';
import BackButton from '../BackButton';
import Logo from '../Logo';
import LogoMinimum from '../LogoMinimum';
import {icons} from '../../assets/icons';
import routes from '../../routing/routes';

import * as Styled from './styles';

interface IProps {
  showBackBtn?: boolean;
  showHomeBtn?: boolean;
  noProfile?: boolean;
  noSignOut?: boolean;
  backClick?: () => void;
}

const NavbarLoggedIn: React.FC<IProps> = ({
  showBackBtn = false,
  showHomeBtn = false,
  noProfile,
  noSignOut,
  backClick = undefined,
}) => {
  const router = useRouter();

  return (
    <Styled.Container>
      <Styled.NavbarLeft>
        {/* eslint-disable-next-line no-nested-ternary */}
        {!showBackBtn ? (
          showHomeBtn ? (
            <BackButton
              homeButton
              click={() => router.push(routes.cardDashboard.path)}
            />
          ) : (
            <>
              <Styled.LogoDesktop>
                <Logo />
              </Styled.LogoDesktop>
              <Styled.LogoMobile>
                <LogoMinimum />
              </Styled.LogoMobile>
            </>
          )
        ) : (
          <BackButton
            click={() => {
              if (backClick) {
                backClick();
              } else {
                router.back();
              }
            }}
          />
        )}
      </Styled.NavbarLeft>
      <Styled.NavbarRightLoggedIn>
        {noProfile ? null : (
          <IconLink
            href={routes.profile.path}
            svgWidth="26px"
            svgHeight="26px"
            text="Profile">
            <img src={icons.profile} alt="profile icon" />
          </IconLink>
        )}
        {noSignOut ? null : (
          <IconLink
            svgWidth="26px"
            svgHeight="26px"
            text="Sign out"
            click={() => router.push(routes.signOut.path)}>
            <img src={icons.logout} alt="log out icon orange" />
          </IconLink>
        )}
      </Styled.NavbarRightLoggedIn>
    </Styled.Container>
  );
};

export default NavbarLoggedIn;
