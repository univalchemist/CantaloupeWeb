import {NextSeo} from 'next-seo';

import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import Gutter from '../components/Gutter';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import Button from '../components/Button';
import ChangeRouteText from '../components/ChangeRouteText';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../hooks/useAccessControl';
import useAppConfig from '../hooks/useAppConfig';
import * as gradients from '../styles/gradients';
import routes from '../routing/routes';

const Index = () => {
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_OUT);
  const {socialAuthEnabled} = useAppConfig();

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Welcome | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar />
          <BodyContainer>
            <Jumbotron />
          </BodyContainer>
          <FooterButtonAndLink>
            <Button
              text="Create account"
              href={`${routes.registration.path}${
                socialAuthEnabled ? '' : '?step=2'
              }`}
            />
            <ChangeRouteText
              href={routes.login.path}
              text="Already have an account?"
            />
          </FooterButtonAndLink>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default Index;
