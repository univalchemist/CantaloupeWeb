import {icons} from '../../assets/icons';

import * as Styled from './styles';

export interface INavListItem {
  click: () => void;
  text: string;
}

const NavListItem: React.FC<INavListItem> = ({children, click, text}) => {
  return (
    <Styled.Container onClick={click}>
      <Styled.Icon>{children}</Styled.Icon>
      <span>{text}</span>
      <Styled.ArrowIcon>
        <img src={icons.arrowGray} width="12px" alt="gray arrow icon" />
      </Styled.ArrowIcon>
    </Styled.Container>
  );
};

export default NavListItem;
