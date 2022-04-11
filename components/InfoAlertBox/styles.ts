import styled from 'styled-components';

import {COLOR_WHITE} from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${COLOR_WHITE};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 20px;
`;

export const MsgPrimary = styled.div`
  margin: 0;
  display: flex;
  align-items: flex-start;

  img {
    display: inline-block;
    margin-right: 12px;
  }
`;

export const MsgSecondary = styled.div`
  margin: 16px 0 0 36px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  img {
    display: inline-block;
    margin-right: 12px;
  }
`;
