import {useState} from 'react';

import {icons} from '../../../assets/icons';
import ToggleSwitch from '../../ToggleSwitch';

import * as Styled from './styles';

interface IProps {
  onToggle: (isChecked: boolean) => void;
  isChecked: boolean;
  text?: string;
}

const Click2PayToggleBox: React.FC<IProps> = ({
  children,
  onToggle = () => false,
  isChecked = false,
  text = '',
}) => {
  const [showClick2Pay, setShowClick2Pay] = useState(true);
  const handleToggle = (checkedState: boolean) => {
    setShowClick2Pay(checkedState);
    onToggle(checkedState);
  };

  return (
    <Styled.Container>
      <Styled.Header>
        <span>
          <span>
            <img
              src="https://src.mastercard.com/srci/integration/components/src-ui-kit/assets/icons/src.svg"
              alt="mastercard click to pay icon"
            />
          </span>
          <div>
            <img
              src="https://src.mastercard.com/srci/integration/components/src-ui-kit/assets/mastercard.svg"
              alt="mastercard"
            />
            <img
              src="https://src.mastercard.com/srci/integration/components/src-ui-kit/assets/visa.svg"
              alt="visa"
            />
            <img
              src="https://src.mastercard.com/srci/integration/components/src-ui-kit/assets/amex.svg"
              alt="amex"
            />
            <img
              src="https://src.mastercard.com/srci/integration/components/src-ui-kit/assets/discover.svg"
              alt="discover"
            />
          </div>
        </span>
        <ToggleSwitch isChecked={isChecked} onToggle={handleToggle} />
      </Styled.Header>
      {text ? <Styled.Body show={showClick2Pay}>{text}</Styled.Body> : null}
      <>{children}</>
    </Styled.Container>
  );
};

export default Click2PayToggleBox;
