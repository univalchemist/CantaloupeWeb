import styled from 'styled-components';

import {COLOR_ADDITIONAL_GRAY, COLOR_BLACK} from '../../../styles/colors';

export interface IBody {
  show: boolean;
}

export const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 5px;
  padding: 22px 16px 16px;
  margin-bottom: 22px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;

  span:last-child {
    font-size: 15px;
    font-weight: 400;
  }
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR_BLACK};
  margin-bottom: 12px;
`;

export const Address = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR_ADDITIONAL_GRAY};
  padding-bottom: 22px;

  &:first-child {
    color: ${COLOR_BLACK};
  }
`;
