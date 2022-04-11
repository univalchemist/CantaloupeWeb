import {images} from '../../assets/images';

import * as Styled from './styles';

interface IProps {
  isApple?: boolean | undefined;
  isGoogle?: boolean | undefined;
  addToWallet: () => void;
  padding?: string;
  centerPass?: boolean;
}

export default function AddToWallet({
  isApple = true,
  isGoogle = false,
  addToWallet = () => false,
  padding = '24px 0',
  centerPass = false,
}: IProps) {
  return (
    <Styled.Container padding={padding} centerPass={centerPass}>
      <Styled.Logo onClick={addToWallet}>
        {isApple ? <img src={images.appleWallet} alt="apple wallet" /> : null}
        {isGoogle ? (
          <img className="google" src={images.googlePay} alt="google pay" />
        ) : null}
      </Styled.Logo>
    </Styled.Container>
  );
}
