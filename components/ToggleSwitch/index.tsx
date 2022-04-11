import {useEffect, useRef} from 'react';

import * as Styled from './styles';

interface IToggle {
  isChecked: boolean;
  onToggle?: (toggleState: boolean) => void;
}

const ToggleSwitch: React.FC<IToggle> = ({
  isChecked = true,
  onToggle = () => false,
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const num = Math.floor(Math.random() * 10000);
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  };

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = isChecked;
    }
  }, [isChecked]);

  return (
    <Styled.Toggle>
      <label htmlFor={`toggle_${num}`}>
        <input
          ref={checkboxRef}
          type="checkbox"
          id={`toggle_${num}`}
          onChange={handleToggle}
        />
        <span />
      </label>
    </Styled.Toggle>
  );
};

export default ToggleSwitch;
