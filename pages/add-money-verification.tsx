import {NextSeo} from 'next-seo';
import router from 'next/router';

import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import Gutter from '../components/Gutter';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import MessageBlock from '../components/MessageBlock';
import Button from '../components/Button';
import routes from '../routing/routes';
import * as gradients from '../styles/gradients';
import {icons} from '../assets/icons';
import {
  ACCESS_CONTROL_TYPES,
  useAccessControl,
} from '../hooks/useAccessControl';
import Image from '../components/Image';

const AddMoneyVerification = () => {
  const {query} = router;
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Manual Reload | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <BodyContainer>
            <Image
              src={icons.checkCircleOrange}
              width="143px"
              height="143px"
              alt="orange circle check icon"
              alignCenter
            />
            <MessageBlock
              title="Done"
              subTitle={`You successfully added $${query.funding} to your More pass`}
              message={
                <>
                  Your new balance is <b>${query.balance}</b>
                </>
              }
            />
          </BodyContainer>
          <FooterButtonAndLink>
            <Button text="Back to home" href={routes.cardDashboard.path} />
          </FooterButtonAndLink>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default AddMoneyVerification;
