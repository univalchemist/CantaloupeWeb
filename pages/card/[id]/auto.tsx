import {NextSeo} from 'next-seo';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {FlexBetweenRow} from '../../../styles/shared';
import * as gradients from '../../../styles/gradients';
import Gutter from '../../../components/Gutter';
import PageContainer from '../../../components/PageContainer';
import Navbar from '../../../components/Navbar';
import Header from '../../../components/Header';
import CardListView from '../../../components/CardListView';
import ToggleSwitch from '../../../components/ToggleSwitch';
import CardAutoReloadSettings from '../../../components/CardAutoReloadSettings';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../../../hooks/useAccessControl';
import Divider from '../../../components/Divider';
import FormInputReadOnly from '../../../components/FormInputReadOnly';
import SpacerContainer from '../../../components/SpacerContainer';
import {IRootState} from '../../../redux/rootStateInterface';
import {GET_USER} from '../../../graphql/queries/getUser';
import {setUser} from '../../../redux/actions/user';
import {GET_PAYMENT_METHODS} from '../../../graphql/queries/getPaymentMethods';
import {PaymentMethod} from '../../../models/PaymentMethod';
import {GET_REPLENISHMENTS} from '../../../graphql/queries/getReplenishments';
import {UPDATE_REPLENISH_TYPE} from '../../../graphql/mutations/updateReplenishType';
import {formatDateMMDDYYYY} from '../../../utils/dates';
import {CantaloupeMoreCardType} from '../../../models/enums/CantaloupeMoreCardType';
import {Replenishment} from '../../../models/Replenishment';
import {CantaloupeMoreReplenishType} from '../../../models/enums/CantaloupeMoreReplenishType';
import routes from '../../../routing/routes';

const Card = () => {
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);
  const dispatch = useDispatch();
  const router = useRouter();
  const {query} = router;
  const user = useSelector((state: IRootState) => state.userReducer);
  const [curReplenishment, setCurReplenishment] =
    useState<Replenishment | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined,
  );
  const [isAutoPayChecked, setIsAutoPayChecked] = useState(false);

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
        data.getReplenishments.forEach((replenishment: Replenishment) => {
          if (
            replenishment.info[0].replenishType ===
            CantaloupeMoreReplenishType.AUTOMATIC
          ) {
            setIsAutoPayChecked(
              replenishment.info[0].replenishType ===
                CantaloupeMoreReplenishType.AUTOMATIC,
            );
            setCurReplenishment(replenishment);
          }
        });
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
      const method = data.getPaymentMethods.filter(
        (pMethod: PaymentMethod) => pMethod.cardId.toString() === query.id,
      );
      if (method.length) {
        getReplenishments();
        setPaymentMethod(method[0]);
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
  const [togglePaymentType] = useMutation(UPDATE_REPLENISH_TYPE, {
    fetchPolicy: 'network-only',
    onError: ({graphQLErrors}: any) => {
      graphQLErrors.forEach(({message, i}: any) => {
        toast.error(message, {
          toastId: `error_${i}`,
          autoClose: false,
        });
      });
    },
  });
  const handleAutoReplenishToggle = (isOn: boolean) => {
    if (curReplenishment) {
      setIsAutoPayChecked(false);
      setCurReplenishment(null);
      togglePaymentType({
        variables: {
          replenishType: isOn
            ? CantaloupeMoreReplenishType.AUTOMATIC
            : CantaloupeMoreReplenishType.MANUAL,
          cardId: Number(query.id),
          replenishId: curReplenishment.info[0].replenishId,
          replenCount: 100,
          amount: curReplenishment.info[0].replenishAmount,
        },
      });
    } else {
      router.push(
        `${routes.card.path}/${paymentMethod?.cardId}/replenish/${CantaloupeMoreReplenishType.AUTOMATIC}`,
      );
    }
  };

  useEffect(() => {
    if (allowAccess) {
      // if the user is not in the redux store, fetch it from the server
      if (!user.id) {
        getUser();
      }
    }
  }, [user, getUser, allowAccess]);

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Auto Reload | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT_2}>
        <Gutter>
          <Navbar isLoggedIn showBackBtn noProfile noSignOut />
          <FlexBetweenRow>
            <Header
              text="Auto Reload"
              leftAlign
              reducedHeader
              margin="18px 0 12px"
            />
            {!loadingPaymentMethods && !loadingReplenishments ? (
              <ToggleSwitch
                isChecked={isAutoPayChecked}
                onToggle={handleAutoReplenishToggle}
              />
            ) : null}
          </FlexBetweenRow>
          <CardListView
            primary={false}
            type={CantaloupeMoreCardType.PREPAID_CARD}
            amount={paymentMethod?.balance}
            cardNoMsg={
              paymentMethod
                ? `More Card •• ${paymentMethod?.cardNum.substr(
                    paymentMethod?.cardNum.length - 4,
                  )}`
                : ''
            }
            showArrow={false}
          />
          <SpacerContainer margin="18px 16px 24px">
            <Divider />
          </SpacerContainer>
          {curReplenishment?.info[0].replenishType ===
          CantaloupeMoreReplenishType.AUTOMATIC ? (
            <>
              <CardAutoReloadSettings cardId={query.id} />
              {Object.entries(curReplenishment).map(([key, value]) => {
                if (key === 'info' && value) {
                  return (
                    <div key={curReplenishment.id}>
                      <FormInputReadOnly
                        value={value[0].replenishAmount}
                        isCurrency
                        name={key}
                      />
                      <FormInputReadOnly
                        value={value[0].replenishThreshold}
                        isCurrency
                        label="When balance falls below:"
                        name={key}
                      />
                      <FormInputReadOnly
                        value={`•• ${value[0].replenishCardNum.substr(
                          value[0].replenishCardNum.length - 4,
                        )}`}
                        isCurrency={false}
                        label="Bank credit card number:"
                        name={key}
                      />
                    </div>
                  );
                }

                return null;
              })}
            </>
          ) : null}
        </Gutter>
      </PageContainer>
    </>
  );
};

export default Card;
