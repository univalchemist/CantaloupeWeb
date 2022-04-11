import {icons} from '../../assets/icons';

import * as Styled from './styles';

interface IProps {
  value: string;
  isCurrency: boolean;
  label?: string;
  name: string;
}

export default function FormInputReadOnly({
  value = '',
  isCurrency = false,
  label = '',
  name = '',
}: IProps) {
  return (
    <Styled.Container>
      {label ? <Styled.Label>{label}</Styled.Label> : null}
      <Styled.InputWrapper>
        {isCurrency ? (
          <img src={icons.dollarSignGray} alt="gray dollar sign icon" />
        ) : null}

        <Styled.Input type="text" name={name} value={value} disabled />
      </Styled.InputWrapper>
    </Styled.Container>
  );
}
