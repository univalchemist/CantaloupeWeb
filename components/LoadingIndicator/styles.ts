import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
`;

export const Loader = styled.div<{show: boolean}>`
  width: 32px;
  height: 32px;

  display: ${(props) => (props.show ? 'block' : 'none')};

  svg {
    animation: rotate 1s linear infinite;

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
