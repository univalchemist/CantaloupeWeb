import Link from 'next/link';

import routes from '../../routing/routes';
import {images} from '../../assets/images';

import * as Styled from './styles';

interface ILogo {
  href?: string;
}

export default function Logo({href = routes.index.path}: ILogo) {
  return (
    <Link href={href}>
      <Styled.Container>
        <img src={images.logoMoreFull} alt="cantaloupe more logo" />
      </Styled.Container>
    </Link>
  );
}
