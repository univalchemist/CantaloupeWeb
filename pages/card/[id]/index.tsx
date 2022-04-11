import {NextSeo} from 'next-seo';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {isIOS, isAndroid} from 'react-device-detect';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import * as gtag from '../../../utils/gtag';
import * as gradients from '../../../styles/gradients';
import Gutter from '../../../components/Gutter';
import PageContainer from '../../../components/PageContainer';
import Navbar from '../../../components/Navbar';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../../../hooks/useAccessControl';
import Divider from '../../../components/Divider';
import {icons} from '../../../assets/icons';
import NavListItem from '../../../components/NavListItem';
import Footer from '../../../components/Footer';
import {images} from '../../../assets/images';
import SpacerContainer from '../../../components/SpacerContainer';
import CardDetails from '../../../components/CardDetails';
import AddToWallet from '../../../components/AddToWallet';
import {CREATE_OR_FIND_PRONTO_PASS} from '../../../graphql/mutations/createOrFindProntoPass';
import {IRootState} from '../../../redux/rootStateInterface';
import {GET_USER} from '../../../graphql/queries/getUser';
import {setUser} from '../../../redux/actions/user';
import {GET_PAYMENT_METHODS} from '../../../graphql/queries/getPaymentMethods';
import {PaymentMethod} from '../../../models/PaymentMethod';
import routes from '../../../routing/routes';
import {BakktStatus} from '../../../models/UserInfo';
import {GET_REPLENISHMENTS} from '../../../graphql/queries/getReplenishments';
import {formatDateMMDDYYYY} from '../../../utils/dates';
import CardAutoReloadBox from '../../../components/CardAutoReloadBox';
import {Replenishment} from '../../../models/Replenishment';
import {CantaloupeMoreReplenishType} from '../../../models/enums/CantaloupeMoreReplenishType';
import {CantaloupeMoreCardType} from '../../../models/enums/CantaloupeMoreCardType';
import Modal from '../../../components/Modal';
import InfoWarning from '../../../components/InfoWarning';

const Card = () => {
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);
  const user = useSelector((state: IRootState) => state.userReducer);
  const [curAutoReplenish, setCurHasAutoReplenish] = useState<Replenishment>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [prontoPassUrl, setProntoPassUrl] = useState<string | Location>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined,
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const {query} = router;

  const [getUser] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (data: any) => {
      if (data.getUser.id) {
        dispatch(setUser(data.getUser));
      }
    },
    onError: ({graphQLErrors}: any) => {
      graphQLErrors.forEach(({message}: any) => {
        toast.error(message, {
          toastId: 'getUser',
          autoClose: false,
          className: 'toast-white',
        });
      });
    },
  });
  const [getReplenishments, {loading: loadingReplenishments}] = useLazyQuery(
    GET_REPLENISHMENTS,
    {
      fetchPolicy: 'network-only',
      variables: {
        cardId: Number(paymentMethod?.cardId),
        startTime: '01/01/1970',
        endTime: formatDateMMDDYYYY(new Date()),
        maxRows: 1000000,
      },
      onCompleted: (data: {getReplenishments: Replenishment[]}) => {
        setCurHasAutoReplenish(
          data.getReplenishments.find((replenishment: Replenishment) => {
            if (replenishment.info.length) {
              return (
                replenishment.info[0].replenishType ===
                CantaloupeMoreReplenishType.AUTOMATIC
              );
            }

            return false;
          }),
        );
      },
      onError: ({graphQLErrors}: any) => {
        graphQLErrors.forEach(({message}: any) => {
          toast.error(message, {
            toastId: 'getUser',
            autoClose: false,
            className: 'toast-white',
          });
        });
      },
    },
  );
  const {data, loading: loadingPaymentMethods} = useQuery(GET_PAYMENT_METHODS, {
    fetchPolicy: 'network-only',
    onCompleted: async () => {
      const method: PaymentMethod[] = data.getPaymentMethods.filter(
        (pMethod: PaymentMethod) => pMethod.cardId.toString() === query.id,
      );

      setPaymentMethod(method[0]);

      // only get replenishments for Prepaid More Cards, omit crypto and payroll deduct
      if (
        method.length &&
        method[0].cardType === CantaloupeMoreCardType.PREPAID_CARD
      ) {
        getReplenishments();
      }
    },
    onError: async (err: any) => {
      err.graphQLErrors.forEach((e: any, i: number) => {
        toast.error(e.message, {
          toastId: `server_error_${i}`,
        });
      });
    },
  });
  const addMoney = () => {
    if (curAutoReplenish) {
      setOpenModal(true);

      return;
    }
    // replenish 1 = auto, 2 = manual
    router.push(`${routes.card.path}/${paymentMethod?.cardId}/replenish/2`);
  };
  const handleModalBtnClick = (isModalPrimaryButton: boolean) => {
    if (isModalPrimaryButton) {
      router.push(`${routes.card.path}/${paymentMethod?.cardId}/replenish/2`);
    }

    setOpenModal(false);
  };
  const [createOrFindProntoPass] = useMutation(CREATE_OR_FIND_PRONTO_PASS, {
    fetchPolicy: 'network-only',
    onCompleted: (obj) => {
      // need to update this to handle google pay when that feature is enabled (prontoPassURLAndroid)
      const passURL = obj?.createOrFindProntoPass?.prontoPassURLiOS;

      if (passURL) {
        setProntoPassUrl(passURL);
      } else {
        toast.error('There was an error adding the pass. Please try again.', {
          toastId: 'errorOpeningProntoLink',
        });
      }
    },
    onError: ({graphQLErrors}: any) => {
      graphQLErrors.forEach(({message}: any) => {
        toast.error(message, {
          toastId: 'createOrFindProntoPass',
        });
      });
    },
  });
  const handleAddToWallet = () => {
    if (!paymentMethod && !prontoPassUrl) {
      toast.error('There was an error setting up your pass', {
        toastId: 'createOrFindProntoPass-no-card-id',
      });

      return;
    }

    gtag.event({
      action: 'add_pass_to_wallet',
      category: 'pass',
      label: 'User Added Pass to Wallet',
    });

    document.location = prontoPassUrl;
  };

  const showPass = () => {
    return (
      query.id !== 'bakkt' || user.bakktConnectionStatus === BakktStatus.SUCCESS
    );
  };

  const handleAutoReplenishRoute = () => {
    if (curAutoReplenish) {
      router.push(`${routes.card.path}/${query.id}/auto`);
    } else {
      router.push(`${routes.card.path}/${paymentMethod?.cardId}/replenish/1`);
    }
  };

  const getCardImg = (cardType: CantaloupeMoreCardType | undefined) => {
    if (cardType === CantaloupeMoreCardType.CRYPTO) {
      return images.cardBakktConnected;
    }
    if (cardType === CantaloupeMoreCardType.PAYROLL_DEDUCT_CARD) {
      return images.cardMorePayrollDeduct;
    }

    return images.cardMorePrepaid;
  };

  useEffect(() => {
    if (allowAccess) {
      // if the user is not in the redux store, fetch it from the server
      if (!user.id) {
        getUser();
      }
    }
  }, [user, getUser, query, allowAccess]);

  useEffect(() => {
    if (paymentMethod) {
      createOrFindProntoPass({
        variables: {
          cardId: paymentMethod.cardId,
        },
      });
    }
  }, [paymentMethod, createOrFindProntoPass]);

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Card Details | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <Modal
        isOpen={openModal}
        title="You Have Auto Reload Turned On"
        body='"Performing a manual reload will cancel your current auto reload settings. Do you wish to proceed?"'
        btnText="Yes, Proceed"
        linkText="No, Take Me Back"
        onBtnClick={handleModalBtnClick}
        onClose={() => {
          setOpenModal(false);
        }}
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar isLoggedIn showHomeBtn noProfile noSignOut />
          <SpacerContainer margin="48px 12px 24px">
            {paymentMethod ? (
              <img
                src={getCardImg(paymentMethod.cardType)}
                alt={`more card ${paymentMethod.cardType}`}
              />
            ) : null}
          </SpacerContainer>
          {paymentMethod &&
          paymentMethod.cardType !== CantaloupeMoreCardType.CRYPTO ? (
            <SpacerContainer margin="0 32px 0">
              <CardDetails
                isPayrollDeduct={
                  paymentMethod.cardType ===
                  CantaloupeMoreCardType.PAYROLL_DEDUCT_CARD
                }
                balance={paymentMethod.balance}
                autoReplenish={false}
                primaryCard={false}
                moreCardNumber={`More Card •• ${paymentMethod.cardNum.substr(
                  paymentMethod.cardNum.length - 4,
                )}`}
              />
            </SpacerContainer>
          ) : null}
          {!loadingReplenishments &&
          !loadingPaymentMethods &&
          paymentMethod?.cardType === CantaloupeMoreCardType.PREPAID_CARD ? (
            <SpacerContainer margin="16px 12px 16px">
              <CardAutoReloadBox
                active={curAutoReplenish !== undefined}
                balance={curAutoReplenish?.info[0].replenishAmount}
                replenishMin={curAutoReplenish?.info[0].replenishThreshold}
                onClick={handleAutoReplenishRoute}
              />
            </SpacerContainer>
          ) : null}
          {!loadingReplenishments && !loadingPaymentMethods ? (
            <>
              <SpacerContainer margin="16px 32px 8px 12px">
                {paymentMethod?.cardId &&
                paymentMethod?.cardType ===
                  CantaloupeMoreCardType.PREPAID_CARD ? (
                  <NavListItem click={addMoney} text="Manually Reload">
                    <img src={icons.balance} alt="orange balance icon" />
                  </NavListItem>
                ) : null}
              </SpacerContainer>
              <SpacerContainer margin="16px 12px 0">
                {showPass() && !isAndroid && (
                  <AddToWallet
                    isApple={!isAndroid}
                    isGoogle={isAndroid}
                    addToWallet={handleAddToWallet}
                    padding="8px 16px 0"
                    centerPass
                  />
                )}
                {showPass() && isAndroid ? (
                  <>
                    <img
                      src={images.googlePayDisabled}
                      alt="add to google pay disabled"
                    />
                    <SpacerContainer margin="16px 0 0">
                      <InfoWarning text="The ability to add a pass to your Google Pay wallet is coming soon" />
                    </SpacerContainer>
                  </>
                ) : null}
              </SpacerContainer>
            </>
          ) : null}

          <Divider margin="32px 8px 24px" />
          <Footer />
        </Gutter>
      </PageContainer>
    </>
  );
};

export default Card;
