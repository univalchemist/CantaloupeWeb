import {NextSeo} from 'next-seo';
import {useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {Formik} from 'formik';

import {FlexFormBody} from '../styles/shared';
import ChangeRouteText from '../components/ChangeRouteText';
import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import FormInput from '../components/FormInput';
import Gutter from '../components/Gutter';
import Submit from '../components/Submit';
import {validatePassword} from '../utils/formValidation';
import routes from '../routing/routes';
import * as gradients from '../styles/gradients';
import MessageBlock from '../components/MessageBlock';
import Navbar from '../components/Navbar';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../hooks/useAccessControl';
import {COMPLETE_FORGOT_PASSWORD} from '../graphql/mutations/completeForgotPassword';
import NotificationInline from '../components/NotificationInline';
import {getQueryStringValue} from '../utils/getQueryStringByName';
import {IPasswordMatch} from '../models/PasswordMatch';
import PasswordMatch from '../components/PasswordMatch';
import {COLOR_PRIMARY_ORANGE_0} from '../styles/colors';

interface IField {
  type: string;
  name: string;
  placeholder: string;
}

const fields: IField[] = [
  {
    type: 'password',
    name: 'password',
    placeholder: 'Create Password',
  },
  {
    type: 'password',
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
  },
];

const initialValues = {
  password: '',
  confirmPassword: '',
};

const CreateNewPassword = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [passcode, setPasscode] = useState<string | null>(null);
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_OUT);

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

  const triggerToast = (msg: string, id: string) => {
    toast.error(msg, {
      // prevent duplicates
      toastId: id,
    });
  };

  const [completeForgotPassword] = useMutation(COMPLETE_FORGOT_PASSWORD, {
    onCompleted: () => {
      router.push(routes.login.path);
      triggerToast('Your password is updated.', '0');
    },
    onError: (err) => {
      err.graphQLErrors.forEach((e, i) => {
        triggerToast(e.message, `server_error_${i}`);
      });
      setIsSubmitting(false);
    },
  });

  useEffect(() => {
    const emailParam = getQueryStringValue('email');
    const passcodeParam = getQueryStringValue('passcode');

    if (!passcodeParam || !emailParam) {
      router.push(routes.index.path);
    }
    setEmail(emailParam);
    setPasscode(passcodeParam);
  }, [router]);

  if (!allowAccess) {
    return null;
  }

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.password || !validatePassword(values.password)) {
      errors.password =
        'Password must be between 8 and 20 characters. It must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and a special character from this list: $@.!"%*#?&\'()+,-/\\;:<>={}|~[]^';
    }

    return errors;
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

  const onSubmit = (values: any) => {
    setIsSubmitting(true);

    const {password, confirmPassword} = values;

    if (passcode && email) {
      completeForgotPassword({
        variables: {
          email: email.trim(),
          passcode: passcode.trim(),
          newPassword: password.trim(),
          newPasswordConfirm: confirmPassword.trim(),
        },
      });
    }
  };

  return (
    <>
      <NextSeo
        title="Create New Password | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar />
          <Formik
            initialValues={initialValues}
            validateOnBlur
            validateOnChange={false}
            validate={validate}
            onSubmit={onSubmit}>
            {({
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
            }: any) => (
              <FlexFormBody
                onSubmit={handleSubmit}
                id="registration"
                style={{width: '100%'}}>
                <BodyContainer>
                  <MessageBlock
                    title="Create new password"
                    message={
                      <>
                        Create a new password for your account{' '}
                        <span style={{color: COLOR_PRIMARY_ORANGE_0}}>
                          {email}
                        </span>
                      </>
                    }
                  />
                  {fields.map((field: IField) => (
                    <div key={field.name}>
                      {errors[field.name] && (
                        <NotificationInline
                          msg={errors[field.name]}
                          margin="0 0 10px"
                        />
                      )}
                      <PasswordMatch
                        active={passwordMatch[field.name].active}
                        success={passwordMatch[field.name].success}
                        message={passwordMatch[field.name].message}
                      />
                      <FormInput
                        type={field.type}
                        name={field.name}
                        value={values[field.name]}
                        setFieldValue={setFieldValue}
                        placeholder={field.placeholder}
                        change={handleChange}
                        disabled={false}
                        error={errors[field.name]}
                        keyup={() => {
                          validatePasswordMatch(values);
                        }}
                        blur={handleBlur}
                        hidePasswordOption
                      />
                    </div>
                  ))}
                </BodyContainer>
                <FooterButtonAndLink>
                  <Submit
                    text="Update password"
                    disabled={
                      !values.password ||
                      !values.confirmPassword ||
                      values.password !== values.confirmPassword ||
                      Object.keys(errors).length > 0 ||
                      isSubmitting
                    }
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

export default CreateNewPassword;
