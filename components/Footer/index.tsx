import {useRouter} from 'next/router';

import routes from '../../routing/routes';

import * as Styled from './styles';

const Footer: React.FC = () => {
  const router = useRouter();
  const date = new Date();

  return (
    <Styled.Container>
      <Styled.Copy>{`\u00A9 ${date.getFullYear()} Cantaloupe, Inc, All Rights Reserved.`}</Styled.Copy>
      <Styled.Link
        onClick={() =>
          router.push(`${routes.privacyPolicy.path}?from=Dashboard`)
        }>
        Privacy Policy
      </Styled.Link>
      <Styled.Link
        onClick={() => router.push(`${routes.terms.path}?from=Dashboard`)}>
        Terms of Use
      </Styled.Link>
      <Styled.Link
        href="http://www.cantaloupe.com/wp-content/uploads/2021/04/website-cookie-policy.pdf"
        target="_blank"
        rel="noopener noreferrer">
        Cookie Policy
      </Styled.Link>
    </Styled.Container>
  );
};

export default Footer;
