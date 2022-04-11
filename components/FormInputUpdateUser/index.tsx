import {
  FocusEventHandler,
  FormEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';

import {icons} from '../../assets/icons';
import routes from '../../routing/routes';
import {formatPhoneNumber} from '../../utils/formatPhone';

import * as Styled from './styles';

export interface IProps {
  name: string;
  label: string;
  type: string;
  value: string;
  setFieldValue: (name: string, val: string) => void;
  readOnly?: boolean;
  isAuth0?: boolean;
  onFocus?: () => void;
  isValid?: boolean;
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
  blur?: FocusEventHandler<HTMLInputElement> | undefined;
  keyup?: KeyboardEventHandler<HTMLInputElement> | undefined;
}

const FormInputUpdateUser: React.FC<IProps> = ({
  name = '',
  label = '',
  type = 'text',
  value = '',
  setFieldValue = () => false,
  readOnly = false,
  isAuth0,
  onFocus = () => false,
  isValid,
  onInput = () => false,
  blur = undefined,
  keyup = undefined,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const handleClearButton = () => {
    setFieldValue(name, '');
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const handleOnFocus = () => {
    setHasFocus(true);
  };
  const handleOnBlur = () => {
    setHasFocus(false);
  };

  useEffect(() => {
    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener('focus', handleOnFocus);
      inputElement.addEventListener('blur', handleOnBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleOnFocus);
        inputElement.removeEventListener('blur', handleOnBlur);
      }
    };
  }, [name]);

  useEffect(() => {
    if (name === 'mobile') {
      setFieldValue(name, formatPhoneNumber(value));
    }
  }, [value, name, setFieldValue]);

  return (
    <Styled.Wrapper disabled={readOnly}>
      <Styled.Border disabled={readOnly}>
        <Styled.Label>{label}</Styled.Label>
        <Styled.InputWrapper>
          <Styled.Input
            ref={inputRef}
            name={name}
            type={type}
            value={value}
            onChange={(e) => {
              setFieldValue(name, e.target.value);
            }}
            onFocus={onFocus}
            disabled={readOnly || name === 'password'}
            onInput={(e) => onInput(e)}
            onKeyUp={(e) => {
              if (keyup) keyup(e);
            }}
            onBlur={(e) => {
              if (blur) blur(e);
            }}
          />
          {name === 'password' && !isAuth0 ? (
            <Link href={routes.passwordChange.path}>
              <Styled.Edit>
                <img src={icons.edit} alt="edit icon" />
                Change
              </Styled.Edit>
            </Link>
          ) : null}
          {isValid && (
            <Styled.IconValid>
              <img src={icons.checkCircleOrange} alt="" />
            </Styled.IconValid>
          )}
          {hasFocus && !isValid ? (
            <Styled.ClearButton onMouseDown={handleClearButton}>
              {!value && <img src={icons.clearGray} alt="clear x icon gray" />}
              {value && (
                <img src={icons.clearOrange} alt="clear x icon orange" />
              )}
            </Styled.ClearButton>
          ) : null}
        </Styled.InputWrapper>
      </Styled.Border>
    </Styled.Wrapper>
  );
};

export default FormInputUpdateUser;
