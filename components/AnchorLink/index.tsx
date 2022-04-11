import {COLOR_PRIMARY_ORANGE_0} from '../../styles/colors';

import * as Styled from './styles';

export interface IAnchorLink {
  text: string;
  color?: string;
  margin?: string;
  onClick: () => void;
}
const AnchorLink: React.FC<IAnchorLink> = ({
  text = 'link',
  color = COLOR_PRIMARY_ORANGE_0,
  margin = '0',
  onClick = () => false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Styled.Anchor color={color} margin={margin} onClick={handleClick}>
      {text}
    </Styled.Anchor>
  );
};

export default AnchorLink;
