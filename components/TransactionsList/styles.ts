import styled from 'styled-components';

import {
  COLOR_ADDITIONAL_GRAY,
  COLOR_PRIMARY_GRAY_0,
  COLOR_PRIMARY_ORANGE_0,
  COLOR_PRIMARY_GRAY_10,
} from '../../styles/colors';

export const List = styled.ul`
  list-style-type: none;
  background: rgba(192, 198, 233, 0.17);
  border-radius: 10px;
  padding: 0;
`;

export const Transaction = styled.li`
  display: flex;
  padding: 20px 15px;
  border-top: 1px solid ${COLOR_PRIMARY_GRAY_10};

  &:first-child {
    border-top: none;
  }
`;

export const Logo = styled.div`
  height: 50px;
  width: 50px;
  background: rgba(144, 144, 147, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: rgba(247, 247, 247, 0.72);
  border-radius: 12px;
  text-transform: uppercase;
`;
export const Details = styled.div`
  flex: 1;
  padding: 0 20px;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR_PRIMARY_GRAY_0};

  > span {
    display: block;
  }

  > span:first-child {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${COLOR_PRIMARY_ORANGE_0};
  }

  span:first-letter {
    text-transform: capitalize;
  }
`;
export const Amount = styled.div`
  color: ${COLOR_ADDITIONAL_GRAY};
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;
export const ShowMoreIcon = styled.button`
  width: 100%;
  border: none;
  appearance: none;
  background: transparent;
  padding: 20px 0 10px;

  img {
    transform: rotate(90deg);
  }

  #show-less {
    transform: rotate(270deg);
  }
`;

export const NoResults = styled.div`
  margin: 0 0 25px;
  font-size: 24px;
`;
