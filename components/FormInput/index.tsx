/* eslint-disable no-nested-ternary */
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import {icons} from '../../assets/icons';
import {formatPhoneNumber} from '../../utils/formatPhone';
import {
  COLOR_PRIMARY_ORANGE_0,
  COLOR_PRIMARY_GRAY_0,
} from '../../styles/colors';

import * as Styled from './styles';

interface IFormInput {
  type: string;
  name: string;
  maxLength?: number;
  placeholder: string;
  placeholderColor?: string;
  value?: string | undefined;
  isValid?: boolean | undefined;
  hidePasswordOption?: boolean;
  validationIcon?: boolean;
  error: boolean;
  disabled: boolean;
  bgColor?: string;
  hideFLoatingLabel?: boolean;
  isCurrency?: boolean;
  fontColor?: string;
  autoComplete?: string;
  onlyNumeric?: boolean;
  onInput?: () => void;
  setFieldValue?: (name: string, val: string) => void;
  blur?: FocusEventHandler<HTMLInputElement> | undefined;
  change?: ChangeEventHandler<HTMLInputElement> | undefined;
  keyup?: KeyboardEventHandler<HTMLInputElement> | undefined;
}

export default function FormInput({
  type = 'text',
  name = '',
  maxLength,
  placeholder = 'Placeholder',
  placeholderColor = COLOR_PRIMARY_GRAY_0,
  value = undefined,
  isValid = false,
  hidePasswordOption,
  validationIcon = false,
  error = false,
  disabled = false,
  bgColor = '#fff',
  hideFLoatingLabel = false,
  isCurrency = false,
  fontColor = COLOR_PRIMARY_ORANGE_0,
  autoComplete = '',
  onlyNumeric,
  onInput = () => false,
  setFieldValue = () => false,
  blur = undefined,
  change = undefined,
  keyup = undefined,
}: IFormInput) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setHasFocus(true);
    setIsActive(true);
  };

  const handleBlur = () => {
    setHasFocus(false);

    // do not animate placeholder back if there is a value
    if (inputRef.current?.value === '') {
      setIsActive(false);
    }
  };

  const showClearIcon = () => {
    // we need to hide the clear icon for the email field when it is valid and show a check icon for being valid
    if (hasFocus && validationIcon && !isValid) {
      return true;
    }
    // show the clear icon for all other fields that do not have a valid check, even if they are valid
    if (hasFocus && !validationIcon) {
      return true;
    }

    return false;
  };

  const handleClearButton = () => {
    setFieldValue(name, '');
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.dispatchEvent(new Event('input', {bubbles: true}));
    }, 0);
  };

  const forceLowerCase = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type !== 'email') return;

    (e.target as HTMLInputElement).value = (
      e.target as HTMLInputElement
    ).value.toLowerCase();
  };

  useEffect(() => {
    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, [name]);

  useEffect(() => {
    let hasMounted = false;

    // if there is a value passed on load, set the field to active and show the value
    if (!hasMounted && value) {
      setIsActive(true);
      hasMounted = true;
    }
  }, [value]);

  useEffect(() => {
    if (name === 'mobile' && value) {
      setFieldValue(name, formatPhoneNumber(value));
    }
  }, [value, name, setFieldValue]);

  return (
    <Styled.Wrapper
      active={isActive}
      disabled={disabled}
      bgColor={bgColor}
      hideFLoatingLabel={hideFLoatingLabel}
      className={`${isValid ? 'valid' : undefined} ${
        error ? 'error' : undefined
      }`}>
      <Styled.Input
        ref={inputRef}
        id={`id_${name}`}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        fontColor={fontColor}
        hideFLoatingLabel={hideFLoatingLabel}
        placeholder={hideFLoatingLabel ? placeholder : undefined}
        placeholderColor={placeholderColor}
        type={
          hidePasswordOption && showPassword
            ? 'text'
            : hidePasswordOption && !showPassword
            ? 'password'
            : type
        }
        name={name}
        maxLength={
          name === 'password' || name === 'confirmPassword'
            ? 20
            : name === 'mobile'
            ? 16
            : maxLength
        }
        onKeyUp={(e) => {
          if (keyup) keyup(e);
          forceLowerCase(e);
        }}
        onBlur={blur}
        onInput={onInput}
        onChange={(e) => {
          const onlyNumbers = /^[0-9\b]+$/;
          if (onlyNumeric) {
            if (e.target.value === '' || onlyNumbers.test(e.target.value)) {
              setFieldValue(name, e.target.value);
              if (change) change(e);
            }
          } else {
            setFieldValue(name, e.target.value);
            if (change) change(e);
          }
        }}
        active={isActive}
        className={error ? 'error' : undefined}
      />
      {validationIcon && isValid && (
        <Styled.CheckCircle>
          <img src={icons.checkCircleOrange} alt="" />
        </Styled.CheckCircle>
      )}
      {hidePasswordOption ? (
        <Styled.ClearButton onClick={() => setShowPassword(!showPassword)}>
          <Styled.ShowHide>{showPassword ? 'Hide' : 'Show'}</Styled.ShowHide>
        </Styled.ClearButton>
      ) : (
        showClearIcon() && (
          <Styled.ClearButton onMouseDown={handleClearButton}>
            {!value && <img src={icons.clearGray} alt="clear x icon gray" />}
            {value && <img src={icons.clearOrange} alt="clear x icon orange" />}
          </Styled.ClearButton>
        )
      )}
      {isCurrency ? (
        <Styled.Currency>
          <img
            src={
              value?.toString().length
                ? icons.dollarSignOrange
                : icons.dollarSignGray
            }
            alt="dollar sign icon orange"
          />
        </Styled.Currency>
      ) : null}
      {!hideFLoatingLabel ? (
        <Styled.FloatingLabel active={isActive} htmlFor={`id_${name}`}>
          {placeholder}
        </Styled.FloatingLabel>
      ) : null}
    </Styled.Wrapper>
  );
}
