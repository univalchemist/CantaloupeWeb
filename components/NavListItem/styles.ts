import styled from 'styled-components';

export const Container = styled.button`
  appearance: none;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  width: 100%;
  padding: 0;
`;

export const Icon = styled.span`
  display: flex;
  justify-content: center;
  width: 32px;
  margin-right: 16px;
`;

export const ArrowIcon = styled.span`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  flex: 1;
`;
