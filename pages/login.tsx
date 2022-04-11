import {NextSeo} from 'next-seo';
import {useCallback, useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {Formik} from 'formik';
import {useAuth0} from '@auth0/auth0-react';

import {FlexFormBody} from '../styles/shared';
import ChangeRouteText from '../components/ChangeRouteText';
import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import FormInput from '../components/FormInput';
import Gutter from '../components/Gutter';
import Header from '../components/Header';
import Submit from '../components/Submit';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import Navbar from '../components/Navbar';
import NotificationVerify from '../components/NotificationVerify';
import NotificationInline from '../components/NotificationInline';
import SocialLogin from '../components/SocialLogin';
import GoBackText from '../components/GoBackText';
import routes from '../routing/routes';
import {getQueryStringValue} from '../utils/getQueryStringByName';
import {setUser} from '../redux/actions/user';
import useAppConfig from '../hooks/useAppConfig';
import {LOGIN_USER} from '../graphql/queries/loginUser';
import {VERIFY_USER} from '../graphql/mutations/verifyUser';
import * as gradients from '../styles/gradients';
import {COLOR_PRIMARY_ORANGE_0} from '../styles/colors';
import LoadingIndicatorFull from '../components/LoadingIndicatorFull';

interface IField {
  type: string;
  name: string;
  placeholder: string;
}

const fields: IField[] = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'Email',
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Password',
  },
];

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {loginWithRedirect, user, getAccessTokenSilently, logout} = useAuth0();
  const {socialAuthEnabled} = useAppConfig();
  const [isSocialLogin, setIsSocialLogin] = useState(socialAuthEnabled);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialAuthLoadingRedirect, setSocialAuthLoadingRedirect] = useState<
    boolean | undefined
  >();
  const [verification, setVerification] = useState<
    'verifying' | 'verified' | null
  >(null);
  const [verifiedMsg, setVerifiedMsg] = useState<string>(
    'Your account is now verified. Please sign in.',
  );
  const [loginUser] = useLazyQuery(LOGIN_USER, {
    fetchPolicy: 'network-only',
    onCompleted: async (data: any) => {
      if (data.loginUser) {
        await localStorage.setItem('token', data.loginUser.accessToken);
        dispatch(setUser(data.loginUser));
        router.push(routes.cardDashboard.path);
      }
    },
    onError: async (err: any) => {
      err.graphQLErrors.forEach((e: any, i: number) => {
        toast.error(e.message, {
          toastId: `server_error_${i}`,
        });
      });
      setIsSubmitting(false);
      await logout({localOnly: true});

      setSocialAuthLoadingRedirect(false);
      localStorage.removeItem('token');
      localStorage.removeItem('auth0.is.authenticated');
      localStorage.removeItem('_legacy_auth0.is.authenticated');
    },
  });
  const [verifyUser] = useMutation(VERIFY_USER, {
    onCompleted: () => {
      setVerification('verified');
    },
    onError: (err) => {
      err.graphQLErrors.forEach((e, i) => {
        if (e.message === 'Your account is already verified') {
          setVerifiedMsg('Your account is already verified');
          setVerification('verified');
        } else {
          setVerification(null);
          toast.error(`${e.message}`, {
            toastId: `server_error_${i}`,
          });
        }
      });
    },
  });

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = 'Please enter your email.';
    }

    if (!values.password) {
      errors.password = 'Please enter your password.';
    }

    return errors;
  };

  const onSubmit = (values: any) => {
    setIsSubmitting(true);
    loginUser({
      variables: {
        email: values?.email?.trim(),
        password: values?.password?.trim(),
      },
    });
  };

  const changeRoute = () => {
    setIsSocialLogin(false);
  };

  const handleUserVerification = useCallback(
    (email: string, passcode: string) => {
      setVerification('verifying');

      verifyUser({
        variables: {
          email,
          passcode,
        },
      });
    },
    [verifyUser],
  );

  const continueWithSocial = (connection: string) => {
    loginWithRedirect({
      connection,
      redirectUri: document.location.href,
    });
  };

  const handleGoBackClick = () => {
    if (isSocialLogin || !socialAuthEnabled) {
      router.push(routes.index.path);
    } else {
      setIsSocialLogin(true);
    }
  };

  const goBackText =
    isSocialLogin || !socialAuthEnabled ? 'Back home' : 'Back to login options';

  useEffect(() => {
    const email = getQueryStringValue('email');
    const passcode = getQueryStringValue('passcode');

    if (email && passcode) {
      setIsSocialLogin(false);
      handleUserVerification(email, passcode);
    }
  }, [handleUserVerification]);

  useEffect(() => {
    const auth0Code = getQueryStringValue('code');

    setSocialAuthLoadingRedirect(!!auth0Code);
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const token = await getAccessTokenSilently({
            audience: 'https://cantaloupe-payments',
            scope: 'profile',
          });
          if (token) {
            localStorage.setItem('token', token);
            await logout({localOnly: true});
            loginUser();
          }
        } catch (e) {
          toast.error('There was an error logging you in, please try again.', {
            toastId: 'login_error',
          });

          setSocialAuthLoadingRedirect(false);
        }
      }
    })();
  }, [getAccessTokenSilently, loginUser, logout, user]);

  if (socialAuthLoadingRedirect === undefined) {
    return null;
  }

  return socialAuthLoadingRedirect ? (
    <LoadingIndicatorFull message="Signing You In..." />
  ) : (
    <>
      <NextSeo
        title="Log In | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar />
          {isSocialLogin ? (
            <SocialLogin
              continueWithEmail={changeRoute}
              continueWithSocial={continueWithSocial}
            />
          ) : (
            <Formik
              initialValues={initialValues}
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
              }: any) => (
                <FlexFormBody
                  onSubmit={handleSubmit}
                  id="login"
                  autoComplete="on">
                  <BodyContainer>
                    <Header text="Sign in" />
                    {verification && (
                      <NotificationVerify
                        status={verification}
                        msgVerifying="Please wait, we’re validating your account"
                        msgVerified={verifiedMsg}
                      />
                    )}
                    {fields.map((field: IField) => (
                      <div key={field.name}>
                        {errors[field.name] && touched[field.name] && (
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
                          change={handleChange}
                          blur={handleBlur}
                          error={false}
                          hidePasswordOption={field.name === 'password'}
                        />
                      </div>
                    ))}
                    <ChangeRouteText
                      href={routes.passwordForgot.path}
                      text="Forgot password?"
                      color={COLOR_PRIMARY_ORANGE_0}
                      margin="-10px 0 0 0"
                      fontWeight="400"
                      alignLeft
                    />
                  </BodyContainer>
                  <FooterButtonAndLink>
                    <Submit
                      text="Sign in"
                      disabled={!values.email || isSubmitting}
                    />
                    <GoBackText text={goBackText} onClick={handleGoBackClick} />
                  </FooterButtonAndLink>
                </FlexFormBody>
              )}
            </Formik>
          )}
        </Gutter>
      </PageContainer>
    </>
  );
};

export default Login;
