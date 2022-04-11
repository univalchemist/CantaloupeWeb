/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextSeo} from 'next-seo';
import {useState, useRef, useEffect, useCallback} from 'react';
import {
  useLazyQuery,
  useMutation,
  useApolloClient,
  ApolloError,
} from '@apollo/client';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';

import * as gtag from '../utils/gtag';
import {FlexFormBody} from '../styles/shared';
import ChangeRouteText from '../components/ChangeRouteText';
import PageContainer from '../components/PageContainer';
import FormInput from '../components/FormInput';
import Gutter from '../components/Gutter';
import Header from '../components/Header';
import Submit from '../components/Submit';
import FieldHeader from '../components/FieldHeader';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import NotificationInline from '../components/NotificationInline';
import GoBackText from '../components/GoBackText';
import Checkbox from '../components/Checkbox';
import SocialLogin from '../components/SocialLogin';
import Navbar from '../components/Navbar';
import {CREATE_USER} from '../graphql/mutations/createUser';
import {DETECT_EXISTING_USER} from '../graphql/queries/detectExistingUser';
import routes from '../routing/routes';
import * as gradients from '../styles/gradients';
import {COLOR_PRIMARY_ORANGE_0, COLOR_WHITE} from '../styles/colors';
import {IRootState} from '../redux/rootStateInterface';
import {
  saveRegistrationForm,
  clearRegistrationForm,
} from '../redux/actions/registration';
import {getOnlyNumbers} from '../utils/formatPhone';
import {fields, IField} from '../data/registrationFields';
import PasswordMatch from '../components/PasswordMatch';
import {IPasswordMatch} from '../models/PasswordMatch';
import {validatePassword} from '../utils/formValidation';
import {parseErrorMessage} from '../utils/parseErrorMessage';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../hooks/useAccessControl';
import useAppConfig from '../hooks/useAppConfig';
import {SocialAuthTypes} from '../models/Registration';
import {DETECT_EXISTING_MOBILE_NUMBER} from '../graphql/queries/detectExistingMobileNumber';
import InfoAlertBox from '../components/InfoAlertBox';

const DETECT_EXISTING_USER_ERR0R_MESSAGE =
  'That Email Address Is Already In Use. Would You Like To Log In Instead?';

const Registration = () => {
  const client = useApolloClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_OUT);
  const {getAccessTokenSilently, user, logout, loginWithRedirect} = useAuth0();
  const formRef = useRef<any>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAppleLogin, setIsAppleLogin] = useState<boolean>(false);
  const [enableEmailEdit, setEnableEmailEdit] = useState<boolean>(false);
  const [isSocialAuthLogin, setIsSocialAuthLogin] = useState<boolean>(false);
  const initialValues = useSelector(
    (state: IRootState) => state.registrationReducer,
  );
  const {socialAuthEnabled} = useAppConfig();
  const onLoginClick = () => {
    router.push(routes.login.path);
  };

  const [passwordMatch, setPasswordMatch] = useState<IPasswordMatch>({
    password: {
      success: false,
      active: false,
      message: 'Password Does Not Meet Criteria',
    },
    confirmPassword: {
      success: false,
      active: false,
      message: 'Passwords Do Not Match',
    },
  });

  const [registerUser] = useMutation(CREATE_USER, {
    onCompleted: async (data) => {
      if (data.createUser.success) {
        await localStorage.setItem('token', data.createUser.accessToken);

        gtag.event({
          action: 'user_registration',
          category: 'engagement',
          label: 'User Registration',
        });

        if (isSocialAuthLogin) {
          toast.success('Your account was created successfully.', {
            toastId: `accountCreatedSuccess`,
          });
          router.push(routes.cardDashboard.path);
        } else {
          router.push(routes.emailVerification.path);
        }
      }
    },
    onError: async (err) => {
      const token = await localStorage.getItem('token');
      if (token) {
        localStorage.setItem('token-temp', token);
        localStorage.removeItem('token');
      }
      err.graphQLErrors.forEach((e, i) => {
        toast.error(e.message, {
          toastId: `server_error_${i}`,
        });
      });
    },
  });

  const [detectExistingMobileNumber] = useLazyQuery(
    DETECT_EXISTING_MOBILE_NUMBER,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data: any) => {
        if (data.detectExistingMobileNumber.isExistingMobileNumber) {
          formRef.current.setFieldError(
            'mobile',
            data.detectExistingMobileNumber.message,
          );
        } else {
          formRef.current.setFieldError('mobile', undefined);
        }
      },
    },
  );

  const detectExistingUser = async (email: string) => {
    try {
      const {data} = await client.query({
        query: DETECT_EXISTING_USER,
        variables: {email},
      });

      return data.detectExistingUser;
    } catch (err) {
      if (err instanceof ApolloError) {
        err.graphQLErrors.forEach((e, i) => {
          toast.error(e.message, {
            toastId: `server_error_${i}`,
          });
        });
      }

      return err;
    }
  };

  const validate = async (values: any) => {
    // we use the current list of errors cause we are checking email and mobile via an api call, we do not want to change their errors here
    const mutableErrors: any = formRef.current.errors;

    if (currentStep === 2) {
      if (!fields[0].validate(values)) {
        mutableErrors.email = fields[0].errorMsg;
      } else {
        const detectExistingUserResponse = await detectExistingUser(
          values.email,
        );
        if (detectExistingUserResponse?.isExistingUser) {
          mutableErrors.email = DETECT_EXISTING_USER_ERR0R_MESSAGE;
        }
      }

      return mutableErrors;
    }

    fields.forEach(async (field: IField) => {
      // we check email and mobile validation via an api call
      if (field.name === 'mobile') {
        return;
      }

      if (!field.validate(values)) {
        mutableErrors[field.name] = field.errorMsg;
      }
    });

    if (!values.agreement) {
      mutableErrors.agreement =
        'You must consent to our Privacy Policy and Terms of Use.';
    }

    if (isSocialAuthLogin) {
      delete mutableErrors.password;
      delete mutableErrors.confirmPassword;
    }

    return mutableErrors;
  };

  const canSubmit = (errors: any, touched: any) => {
    const mutableTouched = {...touched};

    delete mutableTouched.socialAuthType;
    delete mutableTouched.canEditEmail;
    delete mutableTouched.cardId;

    if (isSocialAuthLogin) {
      delete mutableTouched.password;
      delete mutableTouched.confirmPassword;
    }

    return (
      Object.entries(mutableTouched).length !== 0 &&
      Object.entries(mutableTouched).every(([k, v]) => v) &&
      Object.entries(errors).every(([k, v]) => !v)
    );
  };

  const validatePasswordMatch = (values: any) => {
    if (values.password === '' && values.confirmPassword === '') {
      return;
    }

    setPasswordMatch({
      password: {
        active: true,
        success: validatePassword(values.password),
        message: !validatePassword(values.password)
          ? 'Password Does Not Meet Criteria'
          : 'Password Meets Criteria',
      },
      confirmPassword: {
        active: true,
        success: values.password === values.confirmPassword,
        message:
          values.password !== values.confirmPassword
            ? 'Passwords Do Not Match'
            : 'Passwords Match',
      },
    });
  };

  const onSubmit = async (values: any) => {
    if (currentStep === 2) {
      setCurrentStep(3);
    }

    if (currentStep === 3) {
      if (isSocialAuthLogin) {
        const token = await localStorage.getItem('token-temp');
        if (token) {
          localStorage.setItem('token', token);
          localStorage.removeItem('token-temp');
        }
      }

      registerUser({
        variables: {
          email: values.email.trim(),
          password: values.password.trim(),
          confirmPassword: values.password.trim(),
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          address1: values.address.trim(),
          city: values.city.trim(),
          state: values.state.trim().toUpperCase(),
          postal: values.postal.trim(),
          country: 'US', // hardcoded for POC
          mobile: getOnlyNumbers(values.mobile),
        },
      });
    }
  };

  const submitText = currentStep === 3 ? 'Complete' : 'Next Step';

  const continueWithSocial = (connection: string) => {
    loginWithRedirect({
      connection,
      redirectUri: document.location.href,
    });
  };

  const handleGoBackClick = async () => {
    if (currentStep !== 1 && !(currentStep === 2 && !socialAuthEnabled)) {
      setIsAppleLogin(false);
      setIsSocialAuthLogin(false);
      dispatch(clearRegistrationForm());
      router.replace(routes.registration.path, undefined, {shallow: true});
      passwordMatch.confirmPassword.active = false;
      passwordMatch.password.active = false;
      setCurrentStep(1);

      return;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('auth0.is.authenticated');
    localStorage.removeItem('_legacy_auth0.is.authenticated');
    await logout({localOnly: true});
    setCurrentStep(1);
    router.push(routes.index.path);
  };

  const goBackText =
    currentStep === 1 || (currentStep === 2 && !socialAuthEnabled)
      ? 'Back home'
      : 'Back to login options';

  const continueWithEmail = () => {
    setCurrentStep(2);
  };

  const filters = (field: IField) => {
    if (currentStep === 2) {
      return field.step === 2;
    }

    if (currentStep === 3) {
      if (
        (field.name === 'password' || field.name === 'confirmPassword') &&
        isSocialAuthLogin
      ) {
        return false;
      }

      return true;
    }

    return false;
  };

  const getAppleName = (name: string) => {
    const splitName = name?.split(' ');
    const appleLastName = splitName.pop();
    const appleFirstName = splitName.join(' ');

    return {
      firstName:
        appleFirstName.charAt(0).toUpperCase() + appleFirstName.slice(1),
      lastName: appleLastName
        ? appleLastName.charAt(0).toUpperCase() + appleLastName.slice(1)
        : '',
    };
  };

  const checkPhoneUniqueness = useCallback(() => {
    if (formRef?.current?.values) {
      setTimeout(() => {
        if (formRef.current.values.mobile.length === 16) {
          detectExistingMobileNumber({
            variables: {
              mobile: getOnlyNumbers(formRef.current.values.mobile),
            },
          });
        } else {
          const mobile = fields.filter(
            (field: IField) => field.name === 'mobile',
          );
          formRef.current.setFieldError('mobile', mobile[0].errorMsg);
        }
      }, 0);
    }
  }, [detectExistingMobileNumber]);

  useEffect(() => {
    // when we render new fields (step 1 -> step 2 -> step 3) or return from another
    // page, all fields are set to touched so here we reset all the blank fields
    if (currentStep === 3 && formRef.current) {
      Object.entries(formRef.current.values).forEach(([key, val]) => {
        if (!val) {
          formRef.current.setFieldTouched(key, false);
        }
      });

      checkPhoneUniqueness();
    }
  }, [currentStep, checkPhoneUniqueness]);

  useEffect(() => {
    // reset form fields for social auth on return from PP and TOS
    if (currentStep === 3 && formRef.current) {
      if (initialValues.socialAuthType) {
        setIsSocialAuthLogin(true);
        setEnableEmailEdit(
          initialValues.canEditEmail ? initialValues.canEditEmail : false,
        );
      }
      if (initialValues.socialAuthType === SocialAuthTypes.APPLE) {
        setIsAppleLogin(true);
      }
    }
  }, [currentStep, initialValues, user]);

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const token = await getAccessTokenSilently();
          if (token) {
            localStorage.setItem('token-temp', token);
            await logout({localOnly: true});

            const socialAuthType: SocialAuthTypes | undefined = user.sub?.split(
              '|',
            )[0] as SocialAuthTypes;
            const isApple = socialAuthType === SocialAuthTypes.APPLE;
            // if you opt out of showing your apple email, it will display as @privaterelay.appleid.com
            // we need to allow the user to enter their own email
            const isHiddenAppleEmail =
              user.email?.indexOf('privaterelay.appleid') !== -1;
            const appleName =
              isApple && user.name
                ? getAppleName(user.name)
                : {firstName: '', lastName: ''};

            if (!user.email || isHiddenAppleEmail) {
              setEnableEmailEdit(true);
            }

            dispatch(
              saveRegistrationForm({
                email: isHiddenAppleEmail ? '' : (user.email as string),
                firstName: isApple
                  ? (appleName.firstName as string)
                  : (user.given_name as string),
                lastName: isApple
                  ? (appleName.lastName as string)
                  : (user.family_name as string),
                socialAuthType,
                canEditEmail: !user.email || isHiddenAppleEmail,
              }),
            );

            if (socialAuthType) {
              setIsSocialAuthLogin(true);
              setIsAppleLogin(isApple);
            }

            setCurrentStep(3);
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log({e});
        }
      }
    })();
  }, [
    getAccessTokenSilently,
    registerUser,
    logout,
    user,
    dispatch,
    enableEmailEdit,
  ]);

  useEffect(() => {
    if (currentStep === 1 && !socialAuthEnabled) {
      setCurrentStep(2);
    }
  }, [socialAuthEnabled, currentStep]);

  useEffect(() => {
    if (router?.query?.step) {
      setCurrentStep(Number(router.query.step));
    }
  }, [router]);

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Create Account | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          {currentStep === 1 ? (
            <>
              <Navbar />
              <SocialLogin
                isRegistration
                continueWithEmail={continueWithEmail}
                continueWithSocial={continueWithSocial}
              />
            </>
          ) : (
            <Formik
              innerRef={formRef}
              initialValues={initialValues}
              validateOnBlur={false}
              validateOnChange={false}
              validate={validate}
              onSubmit={onSubmit}>
              {({
                errors,
                setFieldTouched,
                setFieldValue,
                setFieldError,
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                values,
              }: any) => (
                <FlexFormBody
                  autoComplete="on"
                  onSubmit={handleSubmit}
                  id="registration">
                  <Header text="Create Account" />
                  {fields.filter(filters).map((field: IField) => {
                    let isFieldDisabled = false;

                    if (isSocialAuthLogin) {
                      switch (field.name) {
                        case 'email':
                          isFieldDisabled = !enableEmailEdit;
                          break;
                        case 'firstName':
                          isFieldDisabled = !isAppleLogin;
                          break;
                        case 'lastName':
                          isFieldDisabled = !isAppleLogin;
                          break;
                        default:
                      }
                    }

                    return (
                      <div key={field.name}>
                        {field.header ? (
                          <FieldHeader text={field.header} />
                        ) : null}
                        {field.name === 'mobile' ? (
                          <InfoAlertBox
                            msgPrimary="This Phone Number Must Be Unique And In Your Possession."
                            msgSecondary="If You Already Used This Phone Number, Please Try Resetting The User Information Via User Profile Update."
                          />
                        ) : null}
                        {errors[field.name] && touched[field.name] ? (
                          <NotificationInline
                            margin="0 0 10px"
                            msg={parseErrorMessage(errors[field.name])}
                            {...(field.name === 'email' &&
                              errors[field.name] ===
                                DETECT_EXISTING_USER_ERR0R_MESSAGE && {
                                btn: 'Login',
                                onClick: onLoginClick,
                              })}
                          />
                        ) : null}
                        {field.name === 'password' ||
                        field.name === 'confirmPassword' ? (
                          <PasswordMatch
                            active={passwordMatch[field.name].active}
                            success={passwordMatch[field.name].success}
                            message={passwordMatch[field.name].message}
                          />
                        ) : null}
                        <FormInput
                          type={field.type}
                          name={field.name}
                          value={values[field.name]}
                          placeholder={field.placeholder}
                          disabled={isFieldDisabled}
                          error={errors[field.name] && touched[field.name]}
                          isValid={!errors[field.name] && touched[field.name]}
                          validationIcon={field.enableValidationIcon}
                          setFieldValue={setFieldValue}
                          change={(e) => {
                            handleChange(e);
                            if (field.name === 'mobile') checkPhoneUniqueness();
                          }}
                          onInput={() => {
                            if (field.name === 'mobile') checkPhoneUniqueness();
                          }}
                          autoComplete={
                            currentStep === 3 && field.name === 'email'
                              ? 'off'
                              : 'on'
                          }
                          blur={async (e) => {
                            if (field.name !== 'mobile') {
                              const validated = field.validate(values);

                              if (field.name === 'email' && validated) {
                                const detectExistingUserResponse =
                                  await detectExistingUser(values[field.name]);
                                if (
                                  detectExistingUserResponse?.isExistingUser
                                ) {
                                  setFieldError(
                                    field.name,
                                    DETECT_EXISTING_USER_ERR0R_MESSAGE,
                                  );
                                }
                              } else {
                                setFieldError(
                                  field.name,
                                  validated ? undefined : field.errorMsg,
                                );
                              }

                              handleBlur(e);
                              dispatch(saveRegistrationForm(values));
                            }
                          }}
                          keyup={(e) => {
                            if (e.key !== 'Tab') {
                              setFieldTouched(field.name);
                              validatePasswordMatch(values);
                            }
                            // remove the error msg if field becomes valid
                            // ignore the mobile field, api call handles that
                            if (
                              field.validate(values) &&
                              field.name !== 'mobile'
                            ) {
                              setFieldError(field.name, undefined);
                            }
                          }}
                          hidePasswordOption={
                            field.name === 'password' ||
                            field.name === 'confirmPassword'
                          }
                        />
                      </div>
                    );
                  })}
                  {currentStep === 3 && (
                    <>
                      {!values.agreement && touched.agreement ? (
                        <NotificationInline
                          msg={errors.agreement}
                          margin="0 0 10px"
                        />
                      ) : null}
                      <Checkbox
                        label="I have read and agree to Cantaloupe’s:"
                        name="agreement"
                        checked={values.agreement}
                        change={(e) => {
                          setFieldTouched('agreement', e.target.checked);
                          setFieldError(
                            'agreement',
                            e.target.checked
                              ? undefined
                              : 'You must consent to our Privacy Policy and Terms of Use.',
                          );
                          dispatch(
                            saveRegistrationForm({
                              ...values,
                              ...{agreement: e.target.checked},
                            }),
                          );
                          handleChange(e);
                        }}
                      />
                      <ChangeRouteText
                        alignLeft
                        text="Terms of Use"
                        margin="5px 0 0 32px"
                        href={routes.terms.path}
                        color={COLOR_PRIMARY_ORANGE_0}
                      />
                      <ChangeRouteText
                        alignLeft
                        text="Privacy Policy"
                        margin="-7px 0 24px 32px"
                        href={routes.privacyPolicy.path}
                        color={COLOR_PRIMARY_ORANGE_0}
                      />
                    </>
                  )}
                  <FooterButtonAndLink
                    fixed={canSubmit(errors, touched)}
                    bgColor={
                      canSubmit(errors, touched) ? COLOR_WHITE : undefined
                    }>
                    <Submit text={submitText} disabled={false} />
                    <GoBackText onClick={handleGoBackClick} text={goBackText} />
                  </FooterButtonAndLink>
                </FlexFormBody>
              )}
            </Formik>
          )}
          {currentStep === 1 ? (
            <GoBackText onClick={handleGoBackClick} text={goBackText} />
          ) : null}
        </Gutter>
      </PageContainer>
    </>
  );
};

export default Registration;
