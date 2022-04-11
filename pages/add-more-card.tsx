import {NextSeo} from 'next-seo';
import {useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {isAndroid} from 'react-device-detect';

import {FlexFormBody} from '../styles/shared';
import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import FormInput from '../components/FormInput';
import Gutter from '../components/Gutter';
import Submit from '../components/Submit';
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
import NotificationInline from '../components/NotificationInline';
import {FONT_SIZE} from '../components/FieldHeader/fieldHeader.enum';
import {REGISTER_STORED_VALUE_CARD} from '../graphql/mutations/registerStoredValueCard';
import {clearRegistrationForm} from '../redux/actions/registration';
import InfoWarning from '../components/InfoWarning';

interface IField {
  type: string;
  name: string;
  placeholder: string;
  header?: string;
  errorMsg?: string;
  maxLength?: number;
  validate: (values: string) => boolean;
}

const fields: IField[] = [
  {
    type: 'text',
    name: 'cardNumber',
    placeholder: 'Enter More Card Number',
    header: 'More Card Number:',
    maxLength: 19,
    validate: (values: any) => values.cardNumber,
  },
  {
    type: 'text',
    name: 'securityCode',
    placeholder: 'Enter 4 Digit Code',
    header: 'Security Code:',
    maxLength: 4,
    validate: (values: any) => values.securityCode,
  },
];

const initialValues = {
  cardNumber: '',
  securityCode: '',
};

const AddMoreCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);
  const triggerToast = (msg: string, id: string) => {
    toast.error(msg, {
      // prevent duplicates
      toastId: id,
    });
  };
  const [registerCard] = useMutation(REGISTER_STORED_VALUE_CARD, {
    context: {useApolloNetworkStatus: true},
    onCompleted: () => {
      router.push(routes.moreCardAdded.path);
    },
    onError: (err) => {
      err.graphQLErrors.forEach((e, i) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        triggerToast(e.message, `server_error_${i}`);
      });
      setIsSubmitting(false);
    },
  });

  useEffect(() => {
    // if we get here from the register user flow
    dispatch(clearRegistrationForm());
  }, [dispatch]);

  if (!allowAccess) {
    return null;
  }

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.cardNumber || values.cardNumber.length < 19) {
      errors.cardNumber = 'Please enter a valid card number.';
    }

    if (!values.securityCode || values.securityCode.length < 4) {
      errors.securityCode = 'Please enter a valid security code.';
    }

    return errors;
  };

  const onSubmit = (values: any) => {
    setIsSubmitting(true);

    const {cardNumber, securityCode} = values;

    registerCard({
      variables: {
        cardNumber: cardNumber.trim(),
        securityCode: securityCode.trim(),
      },
    });
  };

  return (
    <>
      <NextSeo
        title="Add Card | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar isLoggedIn showBackBtn noProfile noSignOut />
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnChange={false}
            validate={validate}>
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
              <FlexFormBody onSubmit={handleSubmit} id="addMoreCard">
                <BodyContainer alignTop verticalOffset="30">
                  <Header text="Add More Card" leftAlign reducedHeader />
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

                      <FormInput
                        type={field.type}
                        name={field.name}
                        value={values[field.name]}
                        setFieldValue={setFieldValue}
                        maxLength={field.maxLength}
                        onlyNumeric
                        placeholder={field.placeholder}
                        change={handleChange}
                        disabled={false}
                        blur={(e) => {
                          setFieldError(
                            field.name,
                            field.validate(values) ? null : field.errorMsg,
                          );
                          handleBlur(e);
                        }}
                        error={errors[field.name]}
                        hideFLoatingLabel
                      />
                    </div>
                  ))}
                  <InfoWarning
                    question
                    text="Don't Yet Have A More Card? Please Contact Your Program Administrator."
                  />
                </BodyContainer>
                {isAndroid ? (
                  <InfoWarning text="The ability to add a pass to your Google Pay wallet is coming soon" />
                ) : null}
                <FooterButtonAndLink>
                  <Submit text="Add More Card" disabled={isSubmitting} />
                </FooterButtonAndLink>
              </FlexFormBody>
            )}
          </Formik>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default AddMoreCard;
