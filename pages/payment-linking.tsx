import {NextSeo} from 'next-seo';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useMutation} from '@apollo/client';
import {toast} from 'react-toastify';

import Gutter from '../components/Gutter';
import Navbar from '../components/Navbar';
import PageContainer from '../components/PageContainer';
import * as gradients from '../styles/gradients';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../hooks/useAccessControl';
import NotificationInline from '../components/NotificationInline';
import {BakktStatus} from '../models/UserInfo';
import {FINALIZE_BAKKT} from '../graphql/mutations/finalizeBakkt';
import routes from '../routing/routes';
import {icons} from '../assets/icons';

const Container = styled.div`
  max-width: 500px;
  margin: 15px auto 0;
`;

const PaymentLinking = () => {
  const [bakktStatus, setBakktStatus] = useState<BakktStatus | null>(null);
  const router = useRouter();
  const [finalizeBakktLinking] = useMutation(FINALIZE_BAKKT, {
    onCompleted: () => {
      if (bakktStatus === BakktStatus.SUCCESS) {
        router.push(routes.cardDashboard.path);
      }
    },
    onError: () => {
      toast.error(
        'There was an error confirming your Bakkt account was linked.',
        {
          toastId: 'finalizeBakktLinking',
        },
      );
    },
  });

  useEffect(() => {
    if (router.asPath !== router.route) {
      // sometimes url params were undefined, this check makes sure they are not
      const {status} = router.query;
      if (status) {
        setBakktStatus(status as BakktStatus);
        finalizeBakktLinking({
          variables: {
            status,
          },
        });
      }
    }
  }, [setBakktStatus, finalizeBakktLinking, router]);

  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Payment Linking | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar isLoggedIn />
          <Container>
            {bakktStatus === BakktStatus.SUCCESS && (
              <NotificationInline msg="You Bakkt account was successfully linked" />
            )}
            {(bakktStatus === BakktStatus.FAILED ||
              bakktStatus === BakktStatus.CANCELLED) && (
              <NotificationInline
                msg={
                  bakktStatus === BakktStatus.FAILED
                    ? 'You Bakkt account failed to connect'
                    : 'You Bakkt account connection was canceled'
                }
                onClick={() => router.push(routes.cardDashboard.path)}
                btn={
                  <>
                    <b>Try Again</b>
                    <img src={icons.arrowGray} alt="arrow icon" />
                  </>
                }
              />
            )}
          </Container>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default PaymentLinking;
