import {NextSeo} from 'next-seo';
import router from 'next/router';
import {useContext, useEffect} from 'react';

import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import Gutter from '../components/Gutter';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import Button from '../components/Button';
import MessageBlock from '../components/MessageBlock';
import Navbar from '../components/Navbar';
import * as gradients from '../styles/gradients';
import routes from '../routing/routes';
import RoutesContext from '../contexts/routes';

const MoreCardAdded = () => {
  const prevRoutes = useContext(RoutesContext);

  useEffect(() => {
    const previousRoute = prevRoutes[prevRoutes.length - 1];
    // do not let the user come back here with browser back button
    if (previousRoute === routes.cardDashboard.path) {
      router.push(routes.cardDashboard.path);
    }
  }, [prevRoutes]);

  return (
    <>
      <NextSeo
        title="Card Added | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar />
          <BodyContainer>
            <MessageBlock
              title="More Card Added"
              message="More card was successfully added to your account"
            />
          </BodyContainer>
          <FooterButtonAndLink>
            <Button text="Proceed To Home" href={routes.cardDashboard.path} />
          </FooterButtonAndLink>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default MoreCardAdded;
