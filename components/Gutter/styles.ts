import styled from 'styled-components';

import {MEDIA} from '../../styles/media.enums';

export const Gutter = styled.div`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;

  @media (min-width: ${MEDIA.MEDIUM}) {
    padding: 0 75px;
  }
`;
