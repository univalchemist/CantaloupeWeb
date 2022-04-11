import {NextSeo} from 'next-seo';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {Formik} from 'formik';
import {useMutation} from '@apollo/client';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';

import {FlexFormBody} from '../styles/shared';
import {FORGOT_PASSWORD} from '../graphql/mutations/forgotPassword';
import ChangeRouteText from '../components/ChangeRouteText';
import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import FormInput from '../components/FormInput';
import Gutter from '../components/Gutter';
import Header from '../components/Header';
import Submit from '../components/Submit';
import {validateEmail} from '../utils/formValidation';
import routes from '../routing/routes';
import * as gradients from '../styles/gradients';
import {setRecoveryLinkEmail} from '../redux/actions/recoveryLinkEmail';
import NotificationInline from '../components/NotificationInline';
import Navbar from '../components/Navbar';
import FooterButtonAndLink from '../components/FooterButtonAndLink';

interface IField {
  type: string;
  name: string;
  placeholder: string;
}

const field: IField = {
  type: 'text',
  name: 'email',
  placeholder: 'Email',
};

const initialValues = {
  email: '',
};

const ForgotPassword = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const triggerToast = (msg: string, id: string) => {
    toast.error(msg, {
      toastId: id,
    });
  };
  const [forgotPassword] = useMutation(FORGOT_PASSWORD, {
    onCompleted: (data: any) => {
      if (data.forgotPassword.isAuth0) {
        triggerToast(data.forgotPassword.message, 'toast_err');
      } else {
        router.push(routes.recoveryLink.path);
      }
      setIsSubmitting(false);
    },
    onError: (err) => {
      err.graphQLErrors.forEach((e, i) => {
        triggerToast(e.message, `server_error_${i}`);
      });
      setIsSubmitting(false);
    },
  });

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email || !validateEmail(values.email)) {
      errors.email = 'Please enter a valid email address';
    }

    return errors;
  };

  const onSubmit = (values: any) => {
    setIsSubmitting(true);

    forgotPassword({
      variables: {
        email: values.email.trim(),
      },
    });

    dispatch(setRecoveryLinkEmail(values.email.trim()));
  };

  return (
    <>
      <NextSeo
        title="Forgot Password | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar />
          <Formik
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
                  <Header text="Forgot password?" />
                  <div>
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
                      keyup={() => {
                        // remove the error msg if field becomes valid
                        if (!values.email || !validateEmail(values.email)) {
                          setFieldError(field.name, undefined);
                        }
                      }}
                    />
                  </div>
                </BodyContainer>
                <FooterButtonAndLink>
                  <Submit
                    text="Send me a reset link"
                    disabled={!values.email || isSubmitting}
                  />
                  <ChangeRouteText
                    href={routes.index.path}
                    text="Back to welcome screen"
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

export default ForgotPassword;
