import styled from 'styled-components';

import {COLOR_PRIMARY_ORANGE_1} from '../../styles/colors';

export interface IDivider {
  color?: string;
  margin?: string;
}

export const Container = styled.div<IDivider>`
  height: 1px;
  background: ${(props) =>
    props.color ? props.color : COLOR_PRIMARY_ORANGE_1};
  margin: ${(props) => (props.margin ? props.margin : undefined)};
`;
