import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import * as gradients from '../styles/gradients';
import Gutter from '../components/Gutter';
import PageContainer from '../components/PageContainer';
import Navbar from '../components/Navbar';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../hooks/useAccessControl';
import CardListView from '../components/CardListView';
import {CantaloupeMoreCardType} from '../models/enums/CantaloupeMoreCardType';
import Divider from '../components/Divider';
import {icons} from '../assets/icons';
import NavListItem from '../components/NavListItem';
import routes from '../routing/routes';
import Footer from '../components/Footer';
import {GET_PAYMENT_METHODS} from '../graphql/queries/getPaymentMethods';
import {GET_USER} from '../graphql/queries/getUser';
import {IRootState} from '../redux/rootStateInterface';
import {setUser} from '../redux/actions/user';
import {CONNECT_TO_BAKKT} from '../graphql/mutations/connectToBakkt';
import {PaymentMethod} from '../models/PaymentMethod';
import SpacerContainer from '../components/SpacerContainer';
import {GET_REPLENISHMENTS} from '../graphql/queries/getReplenishments';
import apolloClient from '../apollo-client';
import {formatDateMMDDYYYY} from '../utils/dates';
import {Replenishment} from '../models/Replenishment';
import {CantaloupeMoreReplenishType} from '../models/enums/CantaloupeMoreReplenishType';
import {BakktStatus} from '../models/UserInfo';
import AddItemIcon from '../components/AddItemIcon';
import {User} from '../models/User';
import useIsMounted from '../hooks/useIsMounted';
import Modal from '../components/Modal';

const CardDashboard = () => {
  const router = useRouter();
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);
  const isMounted = useIsMounted();
  const [bakktSignInUrl, setBakktSignInUrl] = useState(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [autoReplenishCardStates, setAutoReplenishCardStates] = useState<any>(
    {},
  );
  const user = useSelector((state: IRootState) => state.userReducer);
  const [paymentMethods, setPaymentMethods] = useState<
    PaymentMethod[] | undefined
  >(undefined);
  const dispatch = useDispatch();
  const [getUser] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (data: any) => {
      if (data.getUser.id) {
        dispatch(setUser(data.getUser));
      }
    },
    onError: ({graphQLErrors}: any) => {
      graphQLErrors.forEach(({message, i}: any) => {
        toast.error(message, {
          toastId: `getUser_${i}`,
        });
      });
    },
  });
  const {data} = useQuery(GET_PAYMENT_METHODS, {
    fetchPolicy: 'network-only',
    onCompleted: async () => {
      const hasPrepaidCard = data.getPaymentMethods.some(
        (paymentMethod: PaymentMethod) => {
          return paymentMethod.cardType === CantaloupeMoreCardType.PREPAID_CARD;
        },
      );

      setPaymentMethods(data.getPaymentMethods);
      data.getPaymentMethods.map((paymentMethod: PaymentMethod) => {
        if (paymentMethod.cardType === 'PREPAID CARD') {
          return apolloClient
            .query({
              fetchPolicy: 'network-only',
              query: GET_REPLENISHMENTS,
              variables: {
                cardId: Number(paymentMethod.cardId),
                startTime: '01/01/1970',
                endTime: formatDateMMDDYYYY(new Date()),
                maxRows: 1000000,
              },
            })
            .then((resp) => {
              if (resp.data.getReplenishments.length) {
                const obj: any = {};

                obj[paymentMethod.cardId] = resp.data.getReplenishments.some(
                  (replenishment: Replenishment) => {
                    if (replenishment.info.length) {
                      return (
                        replenishment.info[0].replenishType ===
                        CantaloupeMoreReplenishType.AUTOMATIC
                      );
                    }

                    return false;
                  },
                );

                // if the user changed routes and the requests are still pending
                // check if the component is still mounted before updating state
                if (isMounted.current) {
                  setAutoReplenishCardStates((prev: any) => {
                    return {...prev, ...obj};
                  });
                }
              }
            });
        }

        return null;
      });
    },
    onError: ({graphQLErrors}: any) => {
      graphQLErrors.forEach(({message, i}: any) => {
        toast.error(message, {
          toastId: `getPaymentMethod_${i}`,
        });
      });
    },
  });
  const [getBakktUrl] = useMutation(CONNECT_TO_BAKKT, {
    context: {useApolloNetworkStatus: false},
    fetchPolicy: 'network-only',
    onCompleted: (val) => {
      if (!val.connectToBakkt.signInUrl.includes('https')) {
        setBakktSignInUrl(
          val.connectToBakkt.signInUrl.replace('http', 'https'),
        );
      } else {
        setBakktSignInUrl(val.connectToBakkt.signInUrl);
      }
    },
    onError: ({graphQLErrors}: any) => {
      graphQLErrors.forEach(({message, i}: any) => {
        toast.error(message, {
          toastId: `bakktUrl_${i}`,
        });
      });
    },
  });
  const viewCard = (id: number) => {
    router.push(`${routes.card.path}/${id}`);
  };
  const handleBakkt = (id: number) => {
    if (user.bakktConnectionStatus !== BakktStatus.SUCCESS && bakktSignInUrl) {
      setOpenModal(true);
    } else {
      viewCard(id);
    }
  };
  const handleCPayModalBtnClick = (bool: boolean) => {
    if (bool && bakktSignInUrl) {
      window.location = bakktSignInUrl;
    } else {
      setOpenModal(false);
    }
  };
  const getCardNoMsg = (
    paymentMethod: PaymentMethod,
    profile: User,
  ): string => {
    if (paymentMethod.cardType === CantaloupeMoreCardType.CRYPTO) {
      return profile.bakktConnectionStatus === BakktStatus.SUCCESS
        ? 'CPay Card'
        : 'Add CPay Card';
    }

    return `More Card •• ${paymentMethod?.cardNum.substr(
      paymentMethod?.cardNum.length - 4,
    )}`;
  };

  useEffect(() => {
    if (allowAccess) {
      // if the user is not in the redux store, fetch it from the server
      if (!user.id) {
        getUser();
      }
    }
  }, [user, getUser, allowAccess]);

  useEffect(() => {
    if (allowAccess && paymentMethods?.length) {
      const hasCryptoCard = paymentMethods.some(
        (paymentMethod: PaymentMethod) =>
          paymentMethod.cardType === CantaloupeMoreCardType.CRYPTO,
      );
      if (hasCryptoCard) {
        getBakktUrl();
      }
    }
  }, [getBakktUrl, allowAccess, paymentMethods]);

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Dashboard | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar isLoggedIn noSignOut />
          {paymentMethods
            ?.filter((paymentMethod: PaymentMethod) => {
              // make sure we are only displaying supported card types
              return Object.values(CantaloupeMoreCardType).includes(
                paymentMethod.cardType,
              );
            })
            .map((paymentMethod: PaymentMethod, i: number) => (
              <CardListView
                key={paymentMethod.cardId}
                marginTop={i === 0}
                primary={false}
                type={paymentMethod.cardType}
                amount={paymentMethod.balance}
                cardNoMsg={getCardNoMsg(paymentMethod, user)}
                hasFunding={
                  paymentMethod.cardType !== CantaloupeMoreCardType.CRYPTO
                }
                additionalDetails={
                  autoReplenishCardStates[paymentMethod.cardId]
                    ? 'Auto Reloads'
                    : undefined
                }
                isBakktConnected={
                  user.bakktConnectionStatus === BakktStatus.SUCCESS
                }
                onClick={
                  paymentMethod.cardType === CantaloupeMoreCardType.CRYPTO
                    ? () => handleBakkt(paymentMethod.cardId)
                    : () => viewCard(paymentMethod.cardId)
                }
              />
            ))}
          <Modal
            isOpen={openModal}
            title="CPay Pass"
            body="Now you can link your CPay pass to your Bakkt account. Bakkt is More's exclusive partner for digital token payments."
            btnText="Ok"
            linkText="Cancel"
            onBtnClick={handleCPayModalBtnClick}
            onClose={() => {
              setOpenModal(false);
            }}
          />
          <AddItemIcon
            text="Add More Card"
            click={() => router.push(routes.addMoreCard.path)}>
            <img src={icons.plusOrange} alt="orange plus icon" />
          </AddItemIcon>
          <Divider margin="0px 12px 24px" />
          <SpacerContainer margin="0 12px 0">
            <NavListItem
              click={() => router.push(routes.transactions.path)}
              text="Transactions">
              <img src={icons.clockOrange} alt="orange clock icon" />
            </NavListItem>
            <NavListItem
              click={() => router.push(routes.support.path)}
              text="FAQ">
              <img
                src={icons.questionMarkCircleOrange}
                alt="orange question mark icon"
              />
            </NavListItem>
          </SpacerContainer>
          <Divider margin="4px 12px 24px" />
          <Footer />
        </Gutter>
      </PageContainer>
    </>
  );
};

export default CardDashboard;
