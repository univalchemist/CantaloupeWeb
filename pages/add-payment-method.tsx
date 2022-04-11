import {NextSeo} from 'next-seo';

import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import Navbar from '../components/Navbar';
import {Gutter} from '../components/Gutter/styles';

const AddPaymentMethod = () => {
  // const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);

  // if (allowAccess) {
  //   return null;
  // }

  return (
    <>
      <NextSeo
        title="Add Payment Method | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer>
        <Gutter>
          <Navbar />
          <BodyContainer />
        </Gutter>
      </PageContainer>
    </>
  );
};

export default AddPaymentMethod;
