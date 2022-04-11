import Link from 'next/link';

import routes from '../../routing/routes';
import {images} from '../../assets/images';

import * as Styled from './styles';

interface ILogoMinimum {
  href?: string;
}

export default function LogoMinimum({href = routes.index.path}: ILogoMinimum) {
  return (
    <Link href={href}>
      <Styled.Container>
        <img src={images.logoMoreSmall} alt="cantalope more logo" />
      </Styled.Container>
    </Link>
  );
}
