import {NextSeo} from 'next-seo';
import {useContext, useEffect, useRef, useState} from 'react';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import {Formik} from 'formik';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';

import * as gtag from '../../../../../utils/gtag';
import {FlexFormBody, DropdownWrapper} from '../../../../../styles/shared';
import PageContainer from '../../../../../components/PageContainer';
import BodyContainer from '../../../../../components/BodyContainer';
import FormInput from '../../../../../components/FormInput';
import Gutter from '../../../../../components/Gutter';
import Header from '../../../../../components/Header';
import Submit from '../../../../../components/Submit';
import FooterButtonAndLink from '../../../../../components/FooterButtonAndLink';
import Navbar from '../../../../../components/Navbar';
import NotificationInline from '../../../../../components/NotificationInline';
import * as gradients from '../../../../../styles/gradients';
import FieldHeader from '../../../../../components/FieldHeader';
import CardListView from '../../../../../components/CardListView';
import {CantaloupeMoreCardType} from '../../../../../models/enums/CantaloupeMoreCardType';
import Divider from '../../../../../components/Divider';
import SpacerContainer from '../../../../../components/SpacerContainer';
import {FONT_SIZE} from '../../../../../components/FieldHeader/fieldHeader.enum';
import DropDown from '../../../../../components/DropDown';
import {formatDateMMDDYYYY, months, years} from '../../../../../utils/dates';
import {
  COLOR_PRIMARY_GRAY_0,
  COLOR_PRIMARY_ORANGE_0,
  COLOR_WHITE,
} from '../../../../../styles/colors';
import {SETUP_REPLENISH} from '../../../../../graphql/mutations/setupReplenish';
import {GET_USER} from '../../../../../graphql/queries/getUser';
import {
  ACCESS_CONTROL_TYPES,
  useAccessControl,
} from '../../../../../hooks/useAccessControl';
import {IRootState} from '../../../../../redux/rootStateInterface';
import {setUser} from '../../../../../redux/actions/user';
import {GET_PAYMENT_METHODS} from '../../../../../graphql/queries/getPaymentMethods';
import {PaymentMethod} from '../../../../../models/PaymentMethod';
import routes from '../../../../../routing/routes';
import {GET_REPLENISHMENTS} from '../../../../../graphql/queries/getReplenishments';
import {Replenishment} from '../../../../../models/Replenishment';
import {CantaloupeMoreReplenishType} from '../../../../../models/enums/CantaloupeMoreReplenishType';
import Checkbox from '../../../../../components/Checkbox';
import FormInputReadOnly from '../../../../../components/FormInputReadOnly';
import {
  alternateAddressFields,
  IAlternateAddressField,
} from '../../../../../data/alternateAddressFields';
import {fundingFields, IFundingField} from '../../../../../data/fundingFields';
import Click2PayToggleBox from '../../../../../components/Click2Pay/Click2PayToggleBox';
import Click2Pay from '../../../../../components/Click2Pay';
import {ReplenishmentRequest} from '../../../../../models/ReplenishmentRequest';
import {convertCardDetailsForClick2Pay} from '../../../../../utils/convertCardDetailsForClick2Pay';
import {Click2PayCardBrands} from '../../../../../models/enums/Click2PayCardBrands';
import ModalClick2PayDcf from '../../../../../components/ModalClick2PayDcf';
import {
  ICard,
  ICheckOutNewCard,
  ICheckOutResponse,
} from '../../../../../models/Click2Pay';
import {Click2PayCheckoutActionCode} from '../../../../../models/enums/Click2PayCheckoutActionCode';
import {setClick2PayCheckout} from '../../../../../redux/actions/click2payCheckout';
import {setClick2Pay} from '../../../../../redux/actions/click2pay';
import LoadingContext from '../../../../../contexts/loadingContext';
import {Click2PayErrors} from '../../../../../models/enums/Click2PayErrors';

const selectMonths = months.map((month, i) => {
  return {name: month, value: (i + 1).toString()};
});

const selectYears = years.map((year) => {
  return {name: year.toString(), value: year.toString()};
});

let errorCount = 0;

const initialValues = {
  address: '',
  city: '',
  state: '',
  postal: '',
  replenish: '',
  replenishMin: '',
  cardnumber: '',
  // naming below is based off autofill standards
  ccmonth: '',
  ccyear: '',
  cvc: '',
};

const Replenish = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const DEFAULT_REPLENISH = '25';
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);
  const {loading, setLoading} = useContext(LoadingContext);
  const [isAutomaticReplenish, setIsAutomaticReplenish] = useState(false);
  const [showAltAddress, setShowAltAddress] = useState(false);
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: IRootState) => state.userReducer);
  const click2payRedux = useSelector(
    (state: IRootState) => state.click2PayReducer,
  );
  const [isClick2PayEnabled, setIsClick2PayEnabled] = useState<boolean>(true);
  const [hasClick2PayAccount, setHasClick2PayAccount] = useState(false);
  const [isClick2PayAddNewCard, setIsClick2PayAddNewCard] = useState(false);
  const [showFullForm, setShowFullForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined,
  );
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
        const autoReplenishment = data.getReplenishments.filter(
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
        // pre-populate fields for change auto replenish
        formRef.current.setFieldValue(
          'replenish',
          autoReplenishment.length
            ? autoReplenishment[0].info[0].replenishAmount
            : 25,
        );
        formRef.current.setFieldValue(
          'replenishMin',
          autoReplenishment.length
            ? autoReplenishment[0].info[0].replenishThreshold
            : 10,
        );

        if (autoReplenishment.length) {
          setTitle('Change Auto Reload');
        } else {
          setTitle('Set Up Auto Reload');
        }
      },
      onError: ({graphQLErrors}: any) => {
        graphQLErrors.forEach(({message, i}: any) => {
          toast.error(message, {
            toastId: `replenish_error_${i}`,
          });
        });
      },
    },
  );
  const {data, loading: loadingPaymentsMethods} = useQuery(
    GET_PAYMENT_METHODS,
    {
      fetchPolicy: 'network-only',
      onCompleted: async () => {
        const method = data.getPaymentMethods.filter(
          (pMethod: PaymentMethod) => pMethod.cardId.toString() === query.id,
        );
        setPaymentMethod(method[0]);
        if (query.type === '1') {
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
    },
  );
  const [setupReplenish] = useMutation(SETUP_REPLENISH, {
    fetchPolicy: 'network-only',
    onCompleted: () => {
      setIsSubmitting(false);
      gtag.event({
        action: 'setup_replenishment',
        category: 'replenishment',
        label: 'User Setup Replenishment',
        value: formRef.current.values.replenish,
      });
      if (Number(query.type) === CantaloupeMoreReplenishType.MANUAL) {
        const balance =
          Math.round(
            (Number(formRef.current.values.replenish) +
              Number(paymentMethod?.balance)) *
              100,
          ) / 100;
        const funding =
          Math.round(Number(formRef.current.values.replenish) * 100) / 100;

        router.push(
          `${routes.addMoneyVerification.path}?balance=${balance}&funding=${funding}`,
        );
      } else {
        router.push(
          `${routes.addMoneyVerificationAuto.path}?min=${formRef.current.values.replenishMin}&funding=${formRef.current.values.replenish}`,
        );
      }
    },
    onError: ({graphQLErrors, networkError}: any) => {
      graphQLErrors.forEach(({message}: any) => {
        toast.error(message, {
          toastId: `server_error_${errorCount}`,
        });
        errorCount += 1;
      });
      networkError?.result.errors.forEach(({message}: any) => {
        toast.error(message, {
          toastId: `network_error_${errorCount}`,
        });
        errorCount += 1;
      });
      setIsSubmitting(false);
    },
  });

  const fallbackToDisableClickToPayError = () => {
    // for any other errors disable click to pay
    dispatch(
      setClick2Pay({
        ...click2payRedux,
        disabled: true,
      }),
    );

    toast.error(
      'Something went wrong, please try again later or check out another way.',
      {
        toastId: `c2p_fallback_error`,
        autoClose: false,
      },
    );

    if (iframeRef?.current?.contentWindow) {
      (iframeRef?.current?.contentWindow as Window).close();
    }

    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  const handleClick2PayCheckoutError = () => {
    setShowFullForm(true);
    setIsClick2PayEnabled(false);

    toast.error(
      'An error was detected and the checkout processing cannot continue, please try another way.',
      {
        toastId: `click2pay_checkout_error`,
        autoClose: false,
      },
    );
  };

  const handleEncryptCardError = (err: any) => {
    if ((err as any).reason === Click2PayErrors.INVALID_PARAMETER) {
      setIsModalOpen(false);
      setIsSubmitting(false);
      toast.error(
        'An error was detected with the credit card info you entered, please check the values and try again.',
        {
          toastId: `encrypt_param_error`,
          autoClose: false,
        },
      );

      return;
    }

    fallbackToDisableClickToPayError();
  };

  const handleCheckoutWithCardError = (err: any) => {
    if ((err as any).reason === Click2PayErrors.CARD_INVALID) {
      setIsModalOpen(false);
      setIsSubmitting(false);
      toast.error('Something went wrong, please select another card.', {
        toastId: `checkout_with_card_invalid_error`,
        autoClose: false,
      });

      return;
    }

    fallbackToDisableClickToPayError();
  };

  const loadNewCards = async () => {
    setLoading(true);
    try {
      const cardResponse = await click2payRedux.instance?.getCards();
      dispatch(
        setClick2Pay({...click2payRedux, cards: cardResponse as ICard[]}),
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if ((err as any).reason === Click2PayErrors.UNKNOWN_ERROR) {
        setIsClick2PayAddNewCard(true);

        return;
      }

      fallbackToDisableClickToPayError();
    }
  };

  const handleCheckoutWithCard = async (srcDigitalCardId: string) => {
    setIsModalOpen(true);

    try {
      const checkOutWithCardPayload: ICheckOutResponse =
        await click2payRedux.instance?.checkoutWithCard({
          srcDigitalCardId,
          windowRef: iframeRef?.current?.contentWindow as Window,
        });

      if (
        checkOutWithCardPayload.checkoutActionCode ===
        Click2PayCheckoutActionCode.COMPLETE
      ) {
        dispatch(
          setClick2PayCheckout({
            checkoutData: checkOutWithCardPayload,
            amount: formRef.current.values.replenish,
            replenishType: Number(query.type),
            cvv: formRef.current.values.cvc,
          }),
        );
        router.push(`${routes.card.path}/${query.id}/checkout`);
      }

      if (
        checkOutWithCardPayload.checkoutActionCode ===
        Click2PayCheckoutActionCode.ERROR
      ) {
        handleClick2PayCheckoutError();
      }

      (iframeRef?.current?.contentWindow as Window).close();
      setIsModalOpen(false);
      setIsSubmitting(false);
    } catch (err) {
      setIsModalOpen(false);
      setIsSubmitting(false);
      (iframeRef?.current?.contentWindow as Window).close();
      handleCheckoutWithCardError(err);
    }
  };

  const click2payCheckoutNewUser = async (
    cardDetails: ReplenishmentRequest,
  ) => {
    const convertedCardDetails = convertCardDetailsForClick2Pay(
      cardDetails,
      user,
    );
    let encryptCardPayload;

    try {
      encryptCardPayload = await click2payRedux.instance?.encryptCard(
        convertedCardDetails,
      );
    } catch (err) {
      handleEncryptCardError(err);
    }

    if (!encryptCardPayload) {
      return;
    }

    try {
      const payload: ICheckOutNewCard = {
        encryptedCard: encryptCardPayload?.encryptedCard,
        cardBrand: encryptCardPayload?.cardBrand as Click2PayCardBrands,
        windowRef: iframeRef?.current?.contentWindow as Window,
      };

      const consumer = {
        emailAddress: user.email,
        mobileNumber: {
          countryCode: '1',
          phoneNumber: user.mobile,
        },
      };

      if (!hasClick2PayAccount) {
        payload.consumer = consumer;
      }

      const checkOutWithNewCardPayload: ICheckOutResponse =
        await click2payRedux.instance?.checkoutWithNewCard(payload);

      (iframeRef?.current?.contentWindow as Window).close();
      setIsModalOpen(false);
      setIsSubmitting(false);

      if (
        checkOutWithNewCardPayload.checkoutActionCode ===
        Click2PayCheckoutActionCode.COMPLETE
      ) {
        // save the data to use on the checkout page
        dispatch(
          setClick2PayCheckout({
            checkoutData: checkOutWithNewCardPayload,
            amount: formRef.current.values.replenish,
            replenishType: Number(query.type),
            cvv: formRef.current.values.cvc,
          }),
        );
        router.push(`${routes.card.path}/${query.id}/checkout`);
      }

      if (
        checkOutWithNewCardPayload.checkoutActionCode ===
        Click2PayCheckoutActionCode.CHANGE_CARD
      ) {
        loadNewCards();
        setIsClick2PayAddNewCard(false);
        setShowFullForm(false);
      }

      if (
        checkOutWithNewCardPayload.checkoutActionCode ===
        Click2PayCheckoutActionCode.ERROR
      ) {
        handleClick2PayCheckoutError();
      }

      if (
        checkOutWithNewCardPayload.checkoutActionCode ===
          Click2PayCheckoutActionCode.CANCEL &&
        isClick2PayAddNewCard
      ) {
        // if the user cancels out of the DCF for add new card
        // the card still gets added
        // show them the refreshed cards list and wipe the cvc field
        setIsClick2PayAddNewCard(false);
        setShowFullForm(false);
        loadNewCards();
        formRef.current.setFieldValue('cvc', '');
      }
    } catch (err) {
      fallbackToDisableClickToPayError();
    }
  };

  const validate = (values: any) => {
    const errors: any = {};

    fundingFields.forEach((field: IFundingField) => {
      if (field.name === 'replenishMin' && !isAutomaticReplenish) {
        return;
      }
      if (!field.validate(values)) {
        errors[field.name] = field.errorMsg;
      }
    });

    if (showAltAddress) {
      alternateAddressFields.forEach((field: IAlternateAddressField) => {
        if (!field.validate(values)) {
          errors[field.name] = field.errorMsg;
        }
      });
    }

    if (!values.ccmonth) {
      errors.ccmonth = 'Please enter a month.';
    }

    if (!values.ccyear) {
      errors.ccmonth = 'Please enter a year.';
    }

    return errors;
  };

  const handleUseClick2PayToggle = (isChecked: boolean) => {
    setIsClick2PayEnabled(isChecked);
    setShowAltAddress(false);
  };

  const onSubmit = (values: any) => {
    const cardDetails: ReplenishmentRequest = {
      cardId: Number(query.id),
      replenishCardNumber: values.cardnumber.toString(),
      replenishExpMonth: Number(values.ccmonth),
      replenishExpYear: Number(values.ccyear),
      replenishSecurityCode: values.cvc.toString(),
      replenishType: Number(query.type),
      amount: Number(values.replenish),
      threshold: isAutomaticReplenish ? Number(values.replenishMin) : 0,
      address1: showAltAddress ? values.address.trim() : user.address1,
      city: showAltAddress ? values.city.trim() : user.city,
      state: showAltAddress ? values.state.toUpperCase().trim() : user.state,
      postal: showAltAddress ? values.postal.trim() : user.postal,
      country: 'US',
    };

    setIsSubmitting(true);

    if (isClick2PayEnabled) {
      setIsModalOpen(true);
      click2payCheckoutNewUser(cardDetails);

      return;
    }

    setupReplenish({
      variables: cardDetails,
    });
  };

  const getSubmitBtnText = () => {
    if (isAutomaticReplenish) {
      return 'Schedule Reload';
    }

    if (isClick2PayEnabled && !hasClick2PayAccount) {
      return 'Enroll in Click to Pay';
    }

    if (isClick2PayEnabled) {
      return 'Add Card to Click to Pay';
    }

    return 'Reload Card';
  };

  useEffect(() => {
    // dont show c2p for auto reloads
    // check and set if the user has a click to pay account detected
    setHasClick2PayAccount(
      !isAutomaticReplenish &&
        (click2payRedux.idLookup?.consumerPresent ||
          !!click2payRedux.isOTPVerified),
    );

    // enable click to pay for manual reloads and only if the SDK loaded
    setIsClick2PayEnabled(!isAutomaticReplenish && !!click2payRedux.instance);
  }, [isAutomaticReplenish, click2payRedux]);

  useEffect(() => {
    if (allowAccess) {
      // if the user is not in the redux store, fetch it from the server
      if (!user.id) {
        getUser();
      }
    }
  }, [user, getUser, allowAccess]);

  useEffect(() => {
    if (isClick2PayAddNewCard) {
      setShowFullForm(true);

      return;
    }

    if (!isClick2PayEnabled) {
      setShowFullForm(true);

      return;
    }

    if (isClick2PayEnabled && hasClick2PayAccount) {
      setShowFullForm(false);
    }
  }, [isClick2PayEnabled, hasClick2PayAccount, isClick2PayAddNewCard]);

  useEffect(() => {
    if (click2payRedux.instance) {
      // always check and get updated click to pay cards
      // a new card might have been added or a user that just created a click to pay profile
      loadNewCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // handle if the click to pay errors out
    // just show standard checkout form
    if (click2payRedux.disabled) {
      setShowFullForm(true);
      setIsClick2PayEnabled(false);
      setHasClick2PayAccount(false);
    }
  }, [click2payRedux]);

  useEffect(() => {
    if (query.type) {
      setIsAutomaticReplenish(
        Number(query.type) === CantaloupeMoreReplenishType.AUTOMATIC,
      );
      if (Number(query.type) === CantaloupeMoreReplenishType.MANUAL) {
        setTitle('Reload Card');
        initialValues.replenish = DEFAULT_REPLENISH;
      }
    }
  }, [query]);

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title={
          isAutomaticReplenish
            ? 'Auto Reload | Cantaloupe MORE'
            : 'Manual Reload | Cantaloupe MORE'
        }
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <ModalClick2PayDcf isOpen={isModalOpen}>
        <iframe
          ref={iframeRef}
          title="dcf"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </ModalClick2PayDcf>
      <PageContainer gradient={gradients.GRADIENT_2}>
        <Gutter>
          <Navbar
            isLoggedIn
            showBackBtn
            noProfile
            noSignOut
            backButtonClick={() =>
              router.push(`${routes.card.path}/${paymentMethod?.cardId}`)
            }
          />
          <Header text={title} leftAlign reducedHeader margin="18px 0 12px" />
          <CardListView
            primary={false}
            type={CantaloupeMoreCardType.PREPAID_CARD}
            amount={paymentMethod?.balance}
            cardNoMsg={`More Card •• ${paymentMethod?.cardNum.substr(
              paymentMethod?.cardNum.length - 4,
            )}`}
            // additionalDetails="Auto-replenishes"
            showArrow={false}
          />
          <SpacerContainer margin="26px 20px">
            <Divider />
          </SpacerContainer>
          {!loadingPaymentsMethods && !loadingReplenishments ? (
            <Formik
              innerRef={formRef}
              initialValues={initialValues}
              validateOnBlur={false}
              validateOnChange={false}
              validate={validate}
              onSubmit={onSubmit}>
              {({
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                values,
                setFieldValue,
                setFieldError,
              }: any) => (
                <FlexFormBody
                  onSubmit={handleSubmit}
                  id="add-money"
                  autoComplete="on">
                  <BodyContainer>
                    <>
                      {fundingFields
                        .filter((field: IFundingField) => {
                          return isAutomaticReplenish
                            ? field.isAutoReplenish
                            : field.isManualReplenish;
                        })
                        .filter((field: IFundingField) => {
                          return showFullForm ? true : field.isClick2Pay;
                        })
                        .map((field: IFundingField) => (
                          <div key={field.name}>
                            <FieldHeader
                              text={field.header}
                              leftAlign
                              fontSize={FONT_SIZE.SMALL}
                              margin="0 0 16px"
                            />

                            {errors[field.name] && touched[field.name] && (
                              <NotificationInline
                                msg={errors[field.name]}
                                margin="0 0 10px"
                              />
                            )}

                            {field.type === 'select' ? (
                              <DropDown
                                name={field.name}
                                options={field.selectOptions || []}
                                initValue=""
                                selectedValue={field.initialSelectValue}
                                bgColor={COLOR_WHITE}
                                autoComplete={field.autoComplete}
                                setFieldValue={setFieldValue}
                                change={handleChange}
                                selectedFontColor={COLOR_PRIMARY_ORANGE_0}
                                blur={handleBlur}
                              />
                            ) : (
                              <FormInput
                                disabled={false}
                                type={field.type}
                                name={field.name}
                                value={values[field.name]}
                                setFieldValue={setFieldValue}
                                placeholder={field.placeholder}
                                placeholderColor={COLOR_PRIMARY_GRAY_0}
                                onlyNumeric={
                                  field.name === 'cardnumber' ||
                                  field.name === 'cvc'
                                }
                                change={(e) => {
                                  handleChange(e);
                                }}
                                blur={(e) => {
                                  setFieldError(
                                    field.name,
                                    field.validate(values)
                                      ? null
                                      : field.errorMsg,
                                  );
                                  handleBlur(e);
                                }}
                                error={errors[field.name]}
                                bgColor={COLOR_WHITE}
                                hideFLoatingLabel
                                isCurrency={field.isCurrency}
                                fontColor={COLOR_PRIMARY_ORANGE_0}
                                autoComplete={field.autoComplete}
                                hidePasswordOption={field.name === 'cvc'}
                              />
                            )}

                            {/* show click 2 pay below first replenish dropdown */}
                            {field.name === 'replenish' ? (
                              <>
                                {hasClick2PayAccount &&
                                !isClick2PayAddNewCard ? (
                                  <>
                                    <FieldHeader
                                      text="Payment Method:"
                                      leftAlign
                                      fontSize={FONT_SIZE.SMALL}
                                      margin="0 0 16px"
                                    />
                                    {click2payRedux.cards?.length ||
                                    click2payRedux.isOTPVerified ||
                                    !isClick2PayEnabled ? null : (
                                      <SpacerContainer margin="0 0 16px">
                                        Checkout faster by entering the OTP and
                                        simply selecting one of your stored
                                        Click to Pay cards.
                                      </SpacerContainer>
                                    )}

                                    <Click2PayToggleBox
                                      isChecked={isClick2PayEnabled}
                                      onToggle={(bool) =>
                                        handleUseClick2PayToggle(bool)
                                      }>
                                      <Click2Pay
                                        show={isClick2PayEnabled}
                                        setIsClick2PayEnabled={
                                          setIsClick2PayEnabled
                                        }
                                        setIsClick2PayAddNewCard={
                                          setIsClick2PayAddNewCard
                                        }
                                        checkoutWithCard={
                                          handleCheckoutWithCard
                                        }
                                      />
                                    </Click2PayToggleBox>
                                  </>
                                ) : null}
                              </>
                            ) : null}

                            {/* format exp date month/year side by side after the cc number */}
                            {field.name === 'cardnumber' && showFullForm ? (
                              <>
                                <FieldHeader
                                  text="Expiration date:"
                                  leftAlign
                                  fontSize={FONT_SIZE.SMALL}
                                  margin="0 0 16px"
                                />
                                {(errors.ccmonth || errors.ccyear) &&
                                  (touched.ccmonth || touched.ccyear) && (
                                    <NotificationInline
                                      msg="Please enter an expiration month and year."
                                      margin="0 0 10px"
                                    />
                                  )}
                                <DropdownWrapper>
                                  <DropDown
                                    name="ccmonth"
                                    options={selectMonths}
                                    initValue="Month"
                                    bgColor={COLOR_WHITE}
                                    autoComplete="cc-exp-month"
                                    setFieldValue={setFieldValue}
                                    change={handleChange}
                                    selectedFontColor={COLOR_PRIMARY_ORANGE_0}
                                    blur={handleBlur}
                                  />
                                  <DropDown
                                    name="ccyear"
                                    options={selectYears}
                                    initValue="Year"
                                    bgColor={COLOR_WHITE}
                                    autoComplete="cc-exp-year"
                                    setFieldValue={setFieldValue}
                                    change={handleChange}
                                    selectedFontColor={COLOR_PRIMARY_ORANGE_0}
                                    blur={handleBlur}
                                  />
                                </DropdownWrapper>
                              </>
                            ) : null}
                          </div>
                        ))}
                    </>

                    {!showAltAddress && !isClick2PayEnabled ? (
                      <>
                        <FieldHeader
                          text="Address"
                          leftAlign
                          fontSize={FONT_SIZE.SMALL}
                          margin="0 0 16px"
                        />
                        <FormInputReadOnly
                          value={user.address1}
                          name="address1"
                          isCurrency={false}
                        />
                      </>
                    ) : null}
                    {!isClick2PayEnabled ? (
                      <Checkbox
                        label="Enter A Different Address"
                        name="agreement"
                        checked={showAltAddress}
                        color={COLOR_PRIMARY_ORANGE_0}
                        change={(e) => {
                          setShowAltAddress(!showAltAddress);
                          handleChange(e);
                        }}
                      />
                    ) : null}

                    {showAltAddress && !isClick2PayEnabled ? (
                      <SpacerContainer margin="26px 0px">
                        {alternateAddressFields.map(
                          (field: IAlternateAddressField) => (
                            <div key={field.name}>
                              <FieldHeader
                                text={field.header}
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
                                disabled={false}
                                type={field.type}
                                name={field.name}
                                value={values[field.name]}
                                setFieldValue={setFieldValue}
                                placeholder={field.placeholder}
                                placeholderColor={COLOR_PRIMARY_GRAY_0}
                                change={(e) => {
                                  handleChange(e);
                                }}
                                blur={(e) => {
                                  setFieldError(
                                    field.name,
                                    field.validate(values)
                                      ? null
                                      : field.errorMsg,
                                  );
                                  handleBlur(e);
                                }}
                                error={errors[field.name]}
                                bgColor={COLOR_WHITE}
                                hideFLoatingLabel
                                isCurrency={false}
                                fontColor={COLOR_PRIMARY_ORANGE_0}
                              />
                            </div>
                          ),
                        )}
                      </SpacerContainer>
                    ) : null}
                    {(isClick2PayAddNewCard || !hasClick2PayAccount) &&
                    !isAutomaticReplenish &&
                    click2payRedux.instance &&
                    !click2payRedux.disabled ? (
                      <SpacerContainer margin="26px 0px 0px">
                        <Click2PayToggleBox
                          isChecked={isClick2PayEnabled}
                          onToggle={(bool) => setIsClick2PayEnabled(bool)}
                          text={
                            isClick2PayAddNewCard
                              ? 'Add your card to Click to Pay and check out faster wherever you see this logo.'
                              : 'Cantaloupe partners with Click to Pay so you can check out faster wherever you see this logo. If you choose to enroll in Click to Pay, your card details, billing information, and email address will be securely shared with them..'
                          }
                        />
                      </SpacerContainer>
                    ) : null}
                  </BodyContainer>
                  {showFullForm ? (
                    <FooterButtonAndLink>
                      <Submit
                        text={getSubmitBtnText()}
                        disabled={isSubmitting}
                      />
                    </FooterButtonAndLink>
                  ) : null}
                </FlexFormBody>
              )}
            </Formik>
          ) : null}
        </Gutter>
      </PageContainer>
    </>
  );
};

export default Replenish;
