import {NextSeo} from 'next-seo';
import {useSelector} from 'react-redux';

import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import Gutter from '../components/Gutter';
import Navbar from '../components/Navbar';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import MessageBlock from '../components/MessageBlock';
import Button from '../components/Button';
import routes from '../routing/routes';
import {IRootState} from '../redux/rootStateInterface';
import {COLOR_PRIMARY_ORANGE_0} from '../styles/colors';
import * as gradients from '../styles/gradients';

const EmailVerification = () => {
  const {email} = useSelector((state: IRootState) => state.registrationReducer);

  return (
    <>
      <NextSeo
        title="Email Verification | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar />
          <BodyContainer>
            <MessageBlock
              title="Good News!"
              subTitle="Thanks for registering with More"
              message={
                <>
                  We’ve sent a message to{' '}
                  <span style={{color: COLOR_PRIMARY_ORANGE_0}}>{email}</span>{' '}
                  to verify your email address.
                </>
              }
            />
          </BodyContainer>
          <FooterButtonAndLink>
            <Button text="Continue" href={routes.cardDashboard.path} />
          </FooterButtonAndLink>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default EmailVerification;
