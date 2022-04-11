import styled from 'styled-components';

import {
  COLOR_GREEN_20,
  COLOR_GREEN_50,
  COLOR_PRIMARY_GRAY_6,
  COLOR_PRIMARY_GRAY_10,
} from '../../styles/colors';

export const Toggle = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
  height: 24px;
  position: relative;

  input[type='checkbox'] {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    cursor: pointer;
  }

  input[type='checkbox'] + span::before {
    content: ' ';
    display: block;
    height: 24px;
    width: 40px;
    border: 1px solid ${COLOR_PRIMARY_GRAY_10};
    border-radius: 99px;
    position: absolute;
    top: 0px;
    left: 0px;
    background: ${COLOR_PRIMARY_GRAY_10};
  }

  input[type='checkbox'] + span::after {
    content: ' ';
    display: block;
    height: 24px;
    width: 24px;
    border: 1px solid ${COLOR_PRIMARY_GRAY_6};
    border-radius: 50%;
    position: absolute;
    top: 0px;
    left: -1px;
    background: ${COLOR_PRIMARY_GRAY_6};
    transition: all 0.3s ease-in;
    box-shadow: 0px 1px 2px rgba(58, 58, 68, 0.24),
      0px 2px 4px rgba(90, 91, 106, 0.24);
  }

  input[type='checkbox']:checked + span::after {
    left: 17px;
    border: 1px solid ${COLOR_GREEN_50};
    background: ${COLOR_GREEN_50};
  }
  input[type='checkbox']:checked + span::before {
    border: 1px solid ${COLOR_GREEN_20};
    background: ${COLOR_GREEN_20};
  }
`;
