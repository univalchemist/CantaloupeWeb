import {useEffect, useRef} from 'react';

import {ISupportedValidationChannels} from '../../../models/Click2Pay';
import {Click2PayValidationChannels} from '../../../models/enums/Click2PayValidationChannels';

import * as Styled from './styles';

interface IProps {
  supportedValidationChannels: ISupportedValidationChannels[] | undefined;
  handleOTPChannelChange: (type: Click2PayValidationChannels) => void;
}

export default function OTPChannelSelection({
  supportedValidationChannels = [],
  handleOTPChannelChange = () => false,
}: IProps) {
  const otpChannels = useRef<HTMLElement>(null);

  useEffect(() => {
    if (otpChannels && otpChannels.current) {
      (otpChannels.current as any).identityValidationChannels =
        supportedValidationChannels;
    }
  }, [supportedValidationChannels]);

  useEffect(() => {
    let storedRef: HTMLElement;
    const handleContinue = (e: Event) => {
      handleOTPChannelChange((e as any).detail.validationChannelId);
    };

    if (otpChannels && otpChannels.current) {
      otpChannels.current.addEventListener('continue', handleContinue, false);
      storedRef = otpChannels.current;
    }

    return () => {
      if (storedRef) {
        storedRef.removeEventListener('continue', handleContinue, false);
      }
    };
  }, [handleOTPChannelChange]);

  return (
    <Styled.Container>
      <src-otp-channel-selection
        style={{'--src-root-container-border-color': 'none'}}
        ref={otpChannels}
        display-header="false"
      />
    </Styled.Container>
  );
}
