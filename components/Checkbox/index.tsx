import {ChangeEventHandler} from 'react';

import {COLOR_PRIMARY_GRAY_0} from '../../styles/colors';

import * as Styled from './styles';

interface IProps {
  checked: boolean;
  label: string;
  name: string;
  change: ChangeEventHandler<HTMLInputElement>;
  color?: string;
}

export default function Checkbox({
  checked = false,
  label,
  name,
  change,
  color = COLOR_PRIMARY_GRAY_0,
}: IProps) {
  return (
    <Styled.Label htmlFor={name} color={color}>
      <Styled.CheckboxContainer>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={change}
        />
        <Styled.StyledCheckbox checked={checked} color={color}>
          <Styled.Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Styled.Icon>
        </Styled.StyledCheckbox>
      </Styled.CheckboxContainer>
      {label}
    </Styled.Label>
  );
}
