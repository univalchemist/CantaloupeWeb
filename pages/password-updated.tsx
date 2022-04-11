import {NextSeo} from 'next-seo';

import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import Gutter from '../components/Gutter';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import Button from '../components/Button';
import MessageBlock from '../components/MessageBlock';
import ChangeRouteText from '../components/ChangeRouteText';
import Navbar from '../components/Navbar';
import * as gradients from '../styles/gradients';
import {COLOR_PRIMARY_ORANGE_0} from '../styles/colors';
import routes from '../routing/routes';

const PasswordUpdated = () => (
  <>
    <NextSeo
      title="Password Updated | Cantaloupe MORE"
      description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
      canonical="https://cantaloupe.com/"
    />
    <PageContainer gradient={gradients.GRADIENT}>
      <Gutter>
        <Navbar />
        <BodyContainer>
          <MessageBlock
            title="Your password is updated"
            message={
              <>
                <a href="/login">
                  <span
                    style={{color: COLOR_PRIMARY_ORANGE_0, fontWeight: 500}}>
                    You can now sign in
                  </span>
                </a>{' '}
                with your new password to More
              </>
            }
          />
        </BodyContainer>
        <FooterButtonAndLink>
          <Button text="Sign in" href={routes.login.path} />
          <ChangeRouteText
            href={routes.index.path}
            text="Back to welcome screen"
          />
        </FooterButtonAndLink>
      </Gutter>
    </PageContainer>
  </>
);

export default PasswordUpdated;
