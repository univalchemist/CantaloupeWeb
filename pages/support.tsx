import {NextSeo} from 'next-seo';

import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import Navbar from '../components/Navbar';
import Gutter from '../components/Gutter';
import * as gradients from '../styles/gradients';
import CustomerSupport from '../components/CustomerSupport';

const Support = () => (
  <>
    <NextSeo
      title="Support | Cantaloupe MORE"
      description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
      canonical="https://cantaloupe.com/"
    />
    <PageContainer gradient={gradients.GRADIENT}>
      <Gutter>
        <Navbar isLoggedIn showHomeBtn noProfile noSignOut />
        <BodyContainer>
          <CustomerSupport />
        </BodyContainer>
      </Gutter>
    </PageContainer>
  </>
);

export default Support;
