import {COLOR_PRIMARY_GRAY_0} from '../../styles/colors';
import {sharedTextProps} from '../ChangeRouteText';
import * as Styled from '../ChangeRouteText/styles';

interface IProps extends sharedTextProps {
  onClick: (() => void) | (() => Promise<void>) | undefined;
}

export default function GoBackText({
  onClick,
  text = 'Change Route',
  color = COLOR_PRIMARY_GRAY_0,
  margin = undefined,
  alignLeft = false,
  fontWeight = undefined,
}: IProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Styled.Text
      onClick={handleClick}
      color={color}
      margin={margin}
      alignLeft={alignLeft}
      fontWeight={fontWeight}>
      {text}
    </Styled.Text>
  );
}
