import {NextSeo} from 'next-seo';
import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {Formik} from 'formik';

import {FlexFormBody} from '../styles/shared';
import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import FormInput from '../components/FormInput';
import Gutter from '../components/Gutter';
import Submit from '../components/Submit';
import {validatePassword} from '../utils/formValidation';
import routes from '../routing/routes';
import * as gradients from '../styles/gradients';
import Navbar from '../components/Navbar';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../hooks/useAccessControl';
import FieldHeader from '../components/FieldHeader';
import Header from '../components/Header';
import {CHANGE_PASSWORD} from '../graphql/mutations/changePassword';
import NotificationInline from '../components/NotificationInline';
import PasswordMatch from '../components/PasswordMatch';
import {IPasswordMatch} from '../models/PasswordMatch';
import {FONT_SIZE} from '../components/FieldHeader/fieldHeader.enum';

interface IField {
  type: string;
  name: string;
  placeholder: string;
  header?: string;
}

const fields: IField[] = [
  {
    type: 'password',
    name: 'oldPassword',
    placeholder: 'Old password',
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Create Password *',
    header: 'Create new password:',
  },
  {
    type: 'password',
    name: 'confirmPassword',
    placeholder: 'Confirm Password *',
  },
];

const initialValues = {
  oldPassword: '',
  password: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<IPasswordMatch>({
    password: {
      success: false,
      active: false,
      message: 'Password Does Not Meet Criteria',
    },
    confirmPassword: {
      success: false,
      active: false,
      message: 'Passwords Do not Match',
    },
  });
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);
  const triggerToast = (msg: string, id: string) => {
    toast.error(msg, {
      // prevent duplicates
      toastId: id,
    });
  };
  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      router.push(routes.profile.path);
      triggerToast('Your password is updated.', '0');
    },
    onError: (err) => {
      err.graphQLErrors.forEach((e, i) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        triggerToast(e.message, `server_error_${i}`);
      });
      setIsSubmitting(false);
    },
  });

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

    const {oldPassword, password, confirmPassword} = values;

    changePassword({
      variables: {
        password: oldPassword.trim(),
        newPassword: password.trim(),
        newPasswordConfirm: confirmPassword.trim(),
      },
    });
  };

  return (
    <>
      <NextSeo
        title="Password Change | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar isLoggedIn showBackBtn noProfile noSignOut />
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
                id="changePassword"
                style={{width: '100%'}}>
                <BodyContainer alignTop verticalOffset="30">
                  <Header text="Change password" leftAlign reducedHeader />
                  {fields.map((field: IField) => (
                    <div key={field.name}>
                      {field.header && (
                        <FieldHeader
                          text={field.header}
                          leftAlign
                          fontSize={FONT_SIZE.MEDIUM}
                        />
                      )}
                      {errors[field.name] && touched[field.name] && (
                        <NotificationInline
                          msg={errors[field.name]}
                          margin="0 0 10px"
                        />
                      )}

                      {field.name === 'password' ||
                      field.name === 'confirmPassword' ? (
                        <PasswordMatch
                          active={passwordMatch[field.name].active}
                          success={passwordMatch[field.name].success}
                          message={passwordMatch[field.name].message}
                        />
                      ) : null}

                      <FormInput
                        type={
                          field.name !== 'oldPassword' ? 'text' : 'password'
                        }
                        hidePasswordOption
                        name={field.name}
                        value={values[field.name]}
                        setFieldValue={setFieldValue}
                        placeholder={field.placeholder}
                        change={handleChange}
                        disabled={false}
                        keyup={() => {
                          validatePasswordMatch(values);
                        }}
                        blur={handleBlur}
                        error={errors[field.name]}
                      />
                    </div>
                  ))}
                </BodyContainer>
                <FooterButtonAndLink>
                  <Submit
                    text="Update password"
                    disabled={
                      values.confirmPassword !== values.password ||
                      !values.oldPassword ||
                      isSubmitting ||
                      Object.keys(errors).length > 0
                    }
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

export default ChangePassword;
