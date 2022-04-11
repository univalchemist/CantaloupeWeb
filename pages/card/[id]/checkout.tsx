import {NextSeo} from 'next-seo';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {Formik} from 'formik';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

import {FlexFormBody} from '../../../styles/shared';
import PageContainer from '../../../components/PageContainer';
import BodyContainer from '../../../components/BodyContainer';
import FormInput from '../../../components/FormInput';
import Gutter from '../../../components/Gutter';
import Header from '../../../components/Header';
import Submit from '../../../components/Submit';
import {validateEmail} from '../../../utils/formValidation';
import routes from '../../../routing/routes';
import * as gradients from '../../../styles/gradients';
import NotificationInline from '../../../components/NotificationInline';
import Navbar from '../../../components/Navbar';
import FooterButtonAndLink from '../../../components/FooterButtonAndLink';
import CardListView from '../../../components/CardListView';
import {CantaloupeMoreCardType} from '../../../models/enums/CantaloupeMoreCardType';
import {GET_PAYMENT_METHODS} from '../../../graphql/queries/getPaymentMethods';
import {PaymentMethod} from '../../../models/PaymentMethod';
import SpacerContainer from '../../../components/SpacerContainer';
import Divider from '../../../components/Divider';
import {
  ACCESS_CONTROL_TYPES,
  useAccessControl,
} from '../../../hooks/useAccessControl';
import {IRootState} from '../../../redux/rootStateInterface';
import {GET_USER} from '../../../graphql/queries/getUser';
import {setUser} from '../../../redux/actions/user';
import Click2PayCheckoutBox from '../../../components/Click2Pay/CheckoutBox';
import FieldHeader from '../../../components/FieldHeader';
import {FONT_SIZE} from '../../../components/FieldHeader/fieldHeader.enum';
import useAppConfig from '../../../hooks/useAppConfig';
import {REQUEST_C2P_REPLENISH} from '../../../graphql/mutations/requestC2PReplenish';

interface IField {
  type: string;
  name: string;
  placeholder: string;
}

const field: IField = {
  type: 'password',
  name: 'cvv',
  placeholder: 'CVV',
};

const initialValues = {
  cvv: '',
};

// checkout page is used for click to pay checkout only
const Checkout = () => {
  const router = useRouter();
  const {query} = router;
  const {srcDpaId} = useAppConfig();
  const formRef = useRef<any>(null);
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);
  const user = useSelector((state: IRootState) => state.userReducer);
  const click2payCheckoutRedux = useSelector(
    (state: IRootState) => state.click2PayCheckoutReducer,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [decodedCheckout, setDecodedCheckout] = useState<any | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined,
  );
  const dispatch = useDispatch();

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
        });
      });
    },
  });

  const {data, loading: loadingPaymentsMethods} = useQuery(
    GET_PAYMENT_METHODS,
    {
      fetchPolicy: 'network-only',
      onCompleted: async () => {
        const method = data.getPaymentMethods.filter(
          (pMethod: PaymentMethod) => pMethod.cardId.toString() === query.id,
        );
        setPaymentMethod(method[0]);
      },
      onError: async (err: any) => {
        err.graphQLErrors.forEach((e: any, i: number) => {
          toast.error(e.message, {
            toastId: `server_error_${i}`,
          });
        });
      },
    },
  );

  const [requestC2PReplenish] = useMutation(REQUEST_C2P_REPLENISH, {
    context: {useApolloNetworkStatus: true},
    onCompleted: async () => {
      const balance =
        Math.round(
          (Number(click2payCheckoutRedux.amount) +
            Number(paymentMethod?.balance)) *
            100,
        ) / 100;
      const funding =
        Math.round(Number(click2payCheckoutRedux.amount) * 100) / 100;

      router.push(
        `${routes.addMoneyVerification.path}?balance=${balance}&funding=${funding}`,
      );
      setIsSubmitting(false);
    },
    onError: async (err) => {
      setIsSubmitting(false);
      err.graphQLErrors.forEach((e, i) => {
        toast.error(e.message, {
          toastId: `server_error_${i}`,
        });
      });

      if (click2payCheckoutRedux.cvv) {
        router.push(`${routes.card.path}/${paymentMethod?.cardId}/replenish/2`);
      }
    },
  });

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.cvv || values.cvv.length < 3 || values.cvv.length > 4) {
      errors.cvv = 'Please enter a valid security code, 3 or 4 digits only.';
    }

    return errors;
  };

  const onSubmit = useCallback(
    (values: any) => {
      setIsSubmitting(true);

      requestC2PReplenish({
        variables: {
          xSrcCxFlowId:
            click2payCheckoutRedux.checkoutData?.headers['x-src-cx-flow-id'],
          merchantTransactionId:
            click2payCheckoutRedux.checkoutData?.headers[
              'merchant-transaction-id'
            ],
          srcDpaId,
          cardId: Number(query.id),
          amount: Number(click2payCheckoutRedux.amount),
          replenishType: 2,
          replenCount: 100,
          replenishSecurityCode: Number(values.cvv),
          transactionCurrencyCode: 'USD',
        },
      });
    },
    [click2payCheckoutRedux, query, requestC2PReplenish, srcDpaId],
  );

  useEffect(() => {
    if (allowAccess) {
      // if the user is not in the redux store, fetch it from the server
      if (!user.id) {
        getUser();
      }
    }
  }, [user, getUser, allowAccess]);

  useEffect(() => {
    if (!click2payCheckoutRedux.checkoutData) {
      router.push(routes.cardDashboard.path);

      return;
    }

    setDecodedCheckout(
      jwt_decode(click2payCheckoutRedux.checkoutData?.checkoutResponse),
    );
  }, [click2payCheckoutRedux, router, onSubmit, formRef]);

  useEffect(() => {
    // we will hide the cvc input field if it was previously entered
    // but here we need to set the field value
    if (click2payCheckoutRedux.cvv && formRef.current) {
      formRef.current.setFieldValue('cvv', click2payCheckoutRedux.cvv);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRef.current, click2payCheckoutRedux]);

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Checkout | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT_2}>
        <Gutter>
          <Navbar isLoggedIn showBackBtn noProfile noSignOut />
          <Header
            text="Reload Card"
            leftAlign
            reducedHeader
            margin="18px 0 12px"
          />
          <SpacerContainer margin="0px 8px">
            <CardListView
              primary={false}
              type={CantaloupeMoreCardType.PREPAID_CARD}
              amount={paymentMethod?.balance}
              cardNoMsg={`More Card •• ${paymentMethod?.cardNum.substr(
                paymentMethod?.cardNum.length - 4,
              )}`}
              showArrow={false}
            />
          </SpacerContainer>

          <SpacerContainer margin="26px 20px 32px">
            <Divider />
          </SpacerContainer>
          <Click2PayCheckoutBox
            cardData={decodedCheckout}
            amount={click2payCheckoutRedux.amount}
          />
          <Formik
            innerRef={formRef}
            initialErrors={{}}
            initialValues={initialValues}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={onSubmit}>
            {({
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
              setFieldError,
            }: any) => (
              <FlexFormBody onSubmit={handleSubmit} id="forgot">
                <BodyContainer>
                  {click2payCheckoutRedux.cvv ? null : (
                    <div>
                      <FieldHeader
                        text="Security Code:"
                        leftAlign
                        fontSize={FONT_SIZE.SMALL}
                        margin="0 0 16px"
                      />
                      {errors[field.name] && (
                        <NotificationInline
                          msg={errors[field.name]}
                          margin="0 0 10px"
                        />
                      )}
                      <FormInput
                        key={field.name}
                        type={field.type}
                        name={field.name}
                        value={values[field.name]}
                        setFieldValue={setFieldValue}
                        placeholder={field.placeholder}
                        change={handleChange}
                        blur={handleBlur}
                        error={errors[field.name]}
                        disabled={false}
                        hidePasswordOption
                        keyup={() => {
                          // remove the error msg if field becomes valid
                          if (!values.email || !validateEmail(values.email)) {
                            setFieldError(field.name, undefined);
                          }
                        }}
                      />
                    </div>
                  )}
                </BodyContainer>
                <FooterButtonAndLink>
                  <Submit
                    text="Reload Card"
                    disabled={!values.cvv || isSubmitting}
                  />
                </FooterButtonAndLink>
              </FlexFormBody>
            )}
          </Formik>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default Checkout;
