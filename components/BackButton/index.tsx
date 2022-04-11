import router from 'next/router';

import {icons} from '../../assets/icons';

import * as Styled from './styles';

export interface IBackButtonProps {
  click?: () => void;
  homeButton?: boolean;
}
const BackButton: React.FC<IBackButtonProps> = ({click, homeButton}) => {
  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (click) {
      e.preventDefault();
      click();
    } else {
      router.back();
    }
  };

  return (
    <Styled.Container onClick={handleOnClick}>
      <Styled.Arrow>
        <img src={icons.arrowGray} alt="arrow icon" />
      </Styled.Arrow>
      <Styled.BackLink>{homeButton ? 'HOME' : 'BACK'}</Styled.BackLink>
    </Styled.Container>
  );
};

export default BackButton;
