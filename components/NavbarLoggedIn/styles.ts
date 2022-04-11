import styled from 'styled-components';

import {MEDIA} from '../../styles/media.enums';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const NavbarLeft = styled.div`
  display: flex;
  justify-content: center;
  width: auto;

  svg {
    max-width: 168px;
    width: 100%;
  }
`;

export const NavbarRightLoggedOut = styled.div`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: ${MEDIA.MEDIUM}) {
    display: flex;
  }
`;

export const NavbarRightLoggedIn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LinkWrapper = styled.div`
  margin: 0 20px;
`;

export const LogoDesktop = styled.div`
  display: none;

  @media (min-width: ${MEDIA.MEDIUM}) {
    display: block;
  }
`;

export const LogoMobile = styled.div`
  display: block;

  @media (min-width: ${MEDIA.MEDIUM}) {
    display: none;
  }
`;

export const Anchor = styled.a``;
