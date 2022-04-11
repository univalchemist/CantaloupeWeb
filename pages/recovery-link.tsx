import {NextSeo} from 'next-seo';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import router from 'next/router';

import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import Gutter from '../components/Gutter';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import * as gradients from '../styles/gradients';
import routes from '../routing/routes';
import Button from '../components/Button';
import MessageBlock from '../components/MessageBlock';
import {COLOR_PRIMARY_ORANGE_0} from '../styles/colors';
import {IRootState} from '../redux/rootStateInterface';
import Navbar from '../components/Navbar';

const RecoveryLink = () => {
  const {email} = useSelector(
    (state: IRootState) => state.recoveryLinkEmailReducer,
  );

  useEffect(() => {
    // if there is no email in the redux store, send the user back home
    if (!email) {
      router.push(routes.index.path);
    }
  }, [email]);

  return (
    <>
      <NextSeo
        title="Account Recovery | Cantaloupe"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar />
          <BodyContainer>
            <MessageBlock
              title="We've sent you a reset link"
              message={
                <>
                  If there is an account on file for{' '}
                  <span
                    style={{color: COLOR_PRIMARY_ORANGE_0, fontWeight: 500}}>
                    {email}
                  </span>
                  , you will receive an email with a password reset link.
                </>
              }
            />
          </BodyContainer>
          <FooterButtonAndLink>
            <Button text="Back to welcome screen" href={routes.index.path} />
          </FooterButtonAndLink>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default RecoveryLink;
