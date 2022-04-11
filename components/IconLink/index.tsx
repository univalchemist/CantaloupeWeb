import router from 'next/router';

import {COLOR_PRIMARY_ORANGE_0} from '../../styles/colors';

import * as Styled from './styles';

export interface IIconLink {
  svgWidth?: string;
  svgHeight?: string;
  text?: string | undefined;
  href?: string | undefined;
  click?: () => Promise<boolean>;
  color?: string;
  reverse?: boolean;
}

const IconLink: React.FC<IIconLink> = ({
  children,
  svgWidth,
  svgHeight,
  text = undefined,
  href = undefined,
  click = undefined,
  color = COLOR_PRIMARY_ORANGE_0,
  reverse = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (click) {
      e.preventDefault();
      click();

      return;
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <Styled.Container reverse={reverse} onClick={handleClick}>
      <Styled.SvgContainer width={svgWidth} height={svgHeight} color={color}>
        {children}
      </Styled.SvgContainer>
      {text && (
        <Styled.TextLink color={color} reverse={reverse}>
          {text}
        </Styled.TextLink>
      )}
    </Styled.Container>
  );
};

export default IconLink;
