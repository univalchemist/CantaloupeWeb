import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import {ISupportedValidationChannels, ICard} from '../../../models/Click2Pay';
import {Click2PayErrors} from '../../../models/enums/Click2PayErrors';
import {Click2PayValidationChannels} from '../../../models/enums/Click2PayValidationChannels';
import {setClick2Pay} from '../../../redux/actions/click2pay';
import {IRootState} from '../../../redux/rootStateInterface';
import OTPChannelSelection from '../OTPChannelSelection';

import * as Styled from './styles';

interface IProps {
  onComplete: (cards: ICard[]) => void;
  setIsClick2PayEnabled: (bool: boolean) => void;
}

export default function OTP({
  onComplete = () => false,
  setIsClick2PayEnabled = () => false,
}: IProps) {
  const click2pay = useSelector((state: IRootState) => state.click2PayReducer);
  const dispatch = useDispatch();
  const click2payRedux = useSelector(
    (state: IRootState) => state.click2PayReducer,
  );
  const otpInputElem = useRef<HTMLElement>(null);
  const [showOTPChannels, setShowOTPChannels] = useState<boolean | undefined>();
  const [maskedIdentityValue, setMaskedIdentityValue] = useState<
    string | undefined
  >();
  const [network, setNetwork] = useState<string | undefined>();
  const [supportedValidationChannels, setSupportedValidationChannels] =
    useState<ISupportedValidationChannels[] | undefined>();

  const initValidation = useCallback(
    async (channel?: Click2PayValidationChannels) => {
      try {
        const obj = channel
          ? {requestedValidationChannelId: channel}
          : undefined;
        const promiseResolvedPayload =
          await click2pay?.instance?.initiateValidation(obj);

        setNetwork(promiseResolvedPayload?.network);
        setMaskedIdentityValue(promiseResolvedPayload?.maskedValidationChannel);
        setSupportedValidationChannels(
          promiseResolvedPayload?.supportedValidationChannels,
        );
      } catch (error) {
        // if there is any error returned, cancel out of click to pay
        dispatch(
          setClick2Pay({
            ...click2payRedux,
            disabled: true,
          }),
        );
      }
    },
    [click2pay, click2payRedux, dispatch],
  );

  const validateOTPUser = useCallback(
    async (val: string) => {
      try {
        const result = await click2pay?.instance?.validate({value: val});
        onComplete(result as ICard[]);
      } catch (error) {
        if ((error as any).reason === Click2PayErrors.CODE_INVALID) {
          otpInputElem.current?.setAttribute(
            'error-reason',
            (error as any).reason,
          );

          return;
        }

        if (
          (error as any).reason === Click2PayErrors.RETRIES_EXCEEDED ||
          (error as any).reason === Click2PayErrors.ACCT_INACCESSIBLE
        ) {
          toast.error(
            'Your account is inaccessible at this time, please checkout another way.',
            {
              toastId: `server_OTP`,
            },
          );
        } else {
          toast.error(
            'An unknown error occurred, please check out another way.',
            {
              toastId: `c2p_otp_error`,
              autoClose: false,
            },
          );
        }

        // for any other errors disable click to pay
        dispatch(
          setClick2Pay({
            ...click2payRedux,
            disabled: true,
          }),
        );
      }
    },
    [click2pay, onComplete, click2payRedux, dispatch],
  );

  const handleOTPChannelChange = (channel: Click2PayValidationChannels) => {
    if (!channel) {
      setIsClick2PayEnabled(false);
    } else {
      initValidation(channel);
    }

    setShowOTPChannels(false);
  };

  useEffect(() => {
    let storedRef: HTMLElement;
    let otpVal = '';

    const handleOTPContinue = () => {
      if (otpVal) {
        validateOTPUser(otpVal);
      }
    };

    const handleOTPChanged = (e: Event) => {
      otpVal = (e as any).detail;
    };

    const handleShowOTPChannels = () => {
      const otpRoot = otpInputElem.current?.shadowRoot;
      const inputElems = otpRoot?.querySelectorAll('input');
      setShowOTPChannels(true);

      // clear old value and remove errors
      if (inputElems) {
        inputElems[0].value = '';
        inputElems[1].value = '------';
      }

      otpInputElem.current?.setAttribute('error-reason', '');
    };

    if (otpInputElem && otpInputElem.current) {
      otpInputElem.current.addEventListener(
        'alternateRequested',
        handleShowOTPChannels,
      );
      otpInputElem.current.addEventListener('continue', handleOTPContinue);
      otpInputElem.current.addEventListener('otpChanged', handleOTPChanged);

      storedRef = otpInputElem.current;
    }

    return () => {
      storedRef.removeEventListener(
        'alternateRequested',
        handleShowOTPChannels,
      );
      storedRef.removeEventListener('continue', handleOTPContinue);
      storedRef.removeEventListener('otpChanged', handleOTPChanged);
    };
  }, [validateOTPUser]);

  useEffect(() => {
    initValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.Container>
      <div style={{display: showOTPChannels ? 'none' : 'block'}}>
        <src-otp-input
          style={{
            '--src-root-container-border-color': 'transparent',
          }}
          ref={otpInputElem}
          display-header="false"
          masked-identity-value={maskedIdentityValue}
          network-id={network}
        />
      </div>
      {showOTPChannels ? (
        <OTPChannelSelection
          supportedValidationChannels={supportedValidationChannels}
          handleOTPChannelChange={handleOTPChannelChange}
        />
      ) : null}
    </Styled.Container>
  );
}
