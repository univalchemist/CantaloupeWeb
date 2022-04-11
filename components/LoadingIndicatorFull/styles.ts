import styled from 'styled-components';

import {COLOR_SECONDARY_GRAY_0} from '../../styles/colors';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Loader = styled.div`
  img {
    animation: rotate 1s linear infinite;

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export const Message = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: ${COLOR_SECONDARY_GRAY_0};
  margin-top: 24px;
`;
