import styled from 'styled-components';

import {MEDIA} from '../../styles/media.enums';

export const Container = styled.div`
  position: relative;
  z-index: 100;
  padding: 24px 0 0 0;

  @media (min-width: ${MEDIA.MEDIUM}) {
    padding: 68px 0 0 0;
  }
`;
