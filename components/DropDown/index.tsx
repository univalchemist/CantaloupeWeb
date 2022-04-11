import {
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
  useState,
} from 'react';

import {icons} from '../../assets/icons';
import {COLOR_WHITE, COLOR_PRIMARY_GRAY_1} from '../../styles/colors';

import * as Styled from './styles';

export interface ISelect {
  value: string;
  name: string;
}
export interface IDropDown {
  options: ISelect[];
  initValue: string;
  selectedValue?: string;
  bgColor?: string;
  fontColor?: string;
  selectedFontColor?: string;
  autoComplete?: string;
  name: string;
  setFieldValue?: (name: string, val: string) => void;
  change?: ChangeEventHandler<HTMLSelectElement>;
  blur?: FocusEventHandler<HTMLSelectElement>;
}

const DropDown: React.FC<IDropDown> = ({
  options = [],
  initValue = 'Select an Option',
  selectedValue = undefined,
  bgColor = COLOR_WHITE,
  fontColor = COLOR_PRIMARY_GRAY_1,
  selectedFontColor = COLOR_PRIMARY_GRAY_1,
  autoComplete = '',
  name = '',
  setFieldValue = () => false,
  change = undefined,
  blur = undefined,
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (selectedValue) {
      setActive(true);
      setFieldValue(name, selectedValue);
    }
  }, [selectedValue, setFieldValue, name]);

  return (
    <Styled.Container>
      <Styled.Select
        name={name}
        autoComplete={autoComplete}
        bgColor={bgColor}
        defaultValue={selectedValue || 'DEFAULT'}
        fontColor={fontColor}
        selectedFontColor={selectedFontColor}
        active={active}
        onBlur={blur}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
          setActive(e.target.value !== 'DEFAULT');
          if (change) change(e);
        }}>
        <option value="DEFAULT" disabled hidden>
          {initValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </Styled.Select>
      <Styled.Arrow>
        <img src={icons.arrowGray} alt="gray arrow icon" />
      </Styled.Arrow>
    </Styled.Container>
  );
};

export default DropDown;
