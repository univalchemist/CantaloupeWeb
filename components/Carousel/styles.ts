import styled from 'styled-components';

import {COLOR_BLACK} from '../../styles/colors';

export const Slide = styled.div`
  margin: 0 0;

  img {
    width: 90% !important;
  }
`;

export const Title = styled.h1`
  font-size: 27px;
  font-weight: 300;
  text-align: center;
  color: ${COLOR_BLACK};
  margin: 0px 0 60px;
  padding: 0 32px;
  text-transform: capitalize;
`;

export const ImageContainer = styled.div`
  position: relative;
  padding-bottom: 83%;
`;

export const Image = styled.div<{bgImage: string}>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url(' ${(props) => (props.bgImage ? props.bgImage : '')}');
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: 110%;
`;
