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
  width: 100%;

  svg {
    max-width: 168px;
    width: 100%;
  }

  @media (min-width: ${MEDIA.MEDIUM}) {
    width: auto;
  }
`;

export const NavbarRight = styled.div`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: ${MEDIA.MEDIUM}) {
    display: flex;
  }
`;

export const LinkWrapper = styled.div`
  margin-left: 20px;
  min-width: 100px;
  text-align: center;
`;
