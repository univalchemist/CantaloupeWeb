import {NextSeo} from 'next-seo';
import {toast} from 'react-toastify';
import {useLazyQuery, useMutation} from '@apollo/client';
import {useEffect, useState} from 'react';
import {useFormik, FormikValues} from 'formik';

import Gutter from '../components/Gutter';
import PageContainer from '../components/PageContainer';
import Navbar from '../components/Navbar';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../hooks/useAccessControl';
import Header from '../components/Header';
import {GET_USER} from '../graphql/queries/getUser';
import FormInputUpdateUser from '../components/FormInputUpdateUser';
import FieldHeader from '../components/FieldHeader';
import Submit from '../components/Submit';
import * as gradients from '../styles/gradients';
import {UPDATE_USER} from '../graphql/mutations/updateUser';
import NotificationInline from '../components/NotificationInline';
import {getOnlyNumbers} from '../utils/formatPhone';
import {parseErrorMessage} from '../utils/parseErrorMessage';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import {FONT_SIZE} from '../components/FieldHeader/fieldHeader.enum';
import InfoAlertBox from '../components/InfoAlertBox';
import {DETECT_EXISTING_MOBILE_NUMBER} from '../graphql/queries/detectExistingMobileNumber';

interface IFieldKeys {
  [key: string]: string | boolean | undefined;
}
interface IField extends IFieldKeys {
  type: string;
  name: string;
  label: string;
  readOnly: boolean;
  errorMsg: string;
  isAuth0?: boolean;
}

const fields: IField[] = [
  {
    type: 'email',
    name: 'email',
    label: 'Email*',
    readOnly: true,
    errorMsg: '',
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    readOnly: false,
    errorMsg: '',
    isAuth0: true,
  },
  {
    type: 'text',
    name: 'firstName',
    label: 'First Name',
    readOnly: false,
    errorMsg: 'Please enter your first name.',
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'Last Name',
    readOnly: false,
    errorMsg: 'Please enter your last name.',
  },
  {
    type: 'text',
    name: 'mobile',
    label: 'Mobile number',
    readOnly: false,
    errorMsg: 'Invalid mobile number.',
  },
  {
    type: 'text',
    name: 'address1',
    label: 'Street address',
    readOnly: false,
    errorMsg: 'Please enter your address.',
  },
  {
    type: 'text',
    name: 'city',
    label: 'City',
    readOnly: false,
    errorMsg: 'Please enter your city.',
  },
  {
    type: 'text',
    name: 'state',
    label: 'State',
    readOnly: false,
    errorMsg: 'Please enter your state.',
  },
  {
    type: 'text',
    name: 'postal',
    label: 'ZIP / Postal code',
    readOnly: false,
    errorMsg: 'Please enter your zip code.',
  },
];

const Profile = () => {
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);
  const [userLoaded, setUserLoaded] = useState(false);
  const [originalMobileValue, setOriginalMobileValue] = useState<string>('');
  const [isMobileTouched, setIsMobileTouched] = useState<boolean>(false);
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success('Your profile has been updated.', {
        className: 'toast-green',
      });
    },
    onError: (err) => {
      err.graphQLErrors.forEach((e, i) => {
        toast.error(e.message, {
          toastId: `server_error_${i}`,
        });
      });
    },
  });

  const validate = (values: any) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const mutableErrors: any = formik.errors;

    fields.forEach((field: IField) => {
      // let the api validation handle the mobile error
      if (field.name === 'mobile') {
        return;
      }

      if (!values[field.name].trim()) {
        mutableErrors[field.name] = field.errorMsg;
      }
    });

    return mutableErrors;
  };

  const formik: FormikValues = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      mobile: '',
      address1: '',
      city: '',
      state: '',
      postal: '',
    },
    initialErrors: {},
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      updateUser({
        variables: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          address1: values.address1.trim(),
          city: values.city.trim(),
          postal: values.postal.trim(),
          state: values.state.toUpperCase(),
          mobile: getOnlyNumbers(values.mobile),
          country: 'US',
        },
      });
    },
  });

  const [detectExistingMobileNumber] = useLazyQuery(
    DETECT_EXISTING_MOBILE_NUMBER,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data: any) => {
        if (data.detectExistingMobileNumber.isExistingMobileNumber) {
          formik.setFieldError(
            'mobile',
            data.detectExistingMobileNumber.message,
          );
        } else {
          formik.setFieldError('mobile', undefined);
        }
      },
    },
  );

  const checkPhoneUniqueness = (num: string) => {
    // dont check the api if a user retypes their original phone number
    if (getOnlyNumbers(num) === originalMobileValue) {
      formik.setFieldError('mobile', undefined);

      return;
    }

    if (num.length === 16) {
      detectExistingMobileNumber({
        variables: {
          mobile: getOnlyNumbers(num),
        },
      });
    } else if (num.length < 16) {
      const mobile = fields.filter((field: IField) => field.name === 'mobile');
      formik.setFieldError('mobile', mobile[0].errorMsg);
    }
  };

  const [getUser] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (data: any) => {
      if (data.getUser.id) {
        if (data.getUser.mobile) {
          setOriginalMobileValue(data.getUser.mobile);
        }

        fields.forEach((field) => {
          const {isAuth0} = data.getUser;
          if (field.name === 'password') {
            formik.setFieldValue(field.name, '************');
            const f = field;
            f.isAuth0 = isAuth0;
          } else {
            formik.setFieldValue(field.name, data.getUser[field.name]);
            if (field.name === 'firstName' || field.name === 'lastName') {
              const f = field;
              f.readOnly = isAuth0;
            }
          }
        });
      }
      setUserLoaded(true);
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

  useEffect(() => {
    if (allowAccess) {
      getUser();
    }
  }, [getUser, allowAccess]);

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Profile | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar isLoggedIn showHomeBtn noProfile />
          <Header text="Edit Profile" leftAlign />
          <form onSubmit={formik.handleSubmit} id="profile">
            {fields.map((field: IField) => (
              <div key={field.name}>
                {field.name === 'firstName' ? (
                  <FieldHeader
                    text="Details"
                    leftAlign
                    fontSize={FONT_SIZE.MEDIUM}
                  />
                ) : null}
                {field.name === 'mobile' && isMobileTouched ? (
                  <InfoAlertBox msgPrimary="This Phone Number Must Be Unique And In Your Possession." />
                ) : null}
                {formik.errors[field.name] && userLoaded ? (
                  <NotificationInline
                    msg={parseErrorMessage(formik.errors[field.name])}
                    margin="0 0 10px"
                  />
                ) : null}
                <FormInputUpdateUser
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  value={formik.values[field.name]}
                  setFieldValue={formik.setFieldValue}
                  readOnly={field.readOnly}
                  isAuth0={field.isAuth0}
                  onFocus={() => {
                    if (field.name === 'mobile') {
                      setIsMobileTouched(true);
                    }
                  }}
                  isValid={
                    field.name === 'mobile' ? !formik.errors[field.name] : false
                  }
                  onInput={(e) => {
                    if (field.name === 'mobile') {
                      checkPhoneUniqueness(
                        (e.target as HTMLInputElement).value,
                      );
                    }
                  }}
                  blur={(e) => {
                    if (field.name !== 'mobile') {
                      formik.setFieldError(
                        field.name,
                        formik.values[field.name] ? undefined : field.errorMsg,
                      );
                    }

                    formik.handleBlur(e);
                  }}
                  keyup={() => {
                    // remove the error msg if field becomes valid
                    if (formik.values[field.name] && field.name !== 'mobile') {
                      formik.setFieldError(field.name, undefined);
                    }
                  }}
                />
              </div>
            ))}
            <FooterButtonAndLink>
              <Submit text="Update profile" disabled={false} />
            </FooterButtonAndLink>
          </form>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default Profile;
