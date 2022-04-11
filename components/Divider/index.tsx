import {COLOR_PRIMARY_ORANGE_0} from '../../styles/colors';

import * as Styled from './styles';
import {IDivider} from './styles';

const Divider: React.FC<IDivider> = ({
  color = COLOR_PRIMARY_ORANGE_0,
  margin = '0',
}) => {
  return <Styled.Container color={color} margin={margin} />;
};

export default Divider;
