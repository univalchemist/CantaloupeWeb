import router from 'next/router';

import {icons} from '../../assets/icons';

import * as Styled from './styles';

export interface IInfoAlertBox {
  msgPrimary: string;
  msgSecondary?: string;
}
const InfoAlertBox: React.FC<IInfoAlertBox> = ({
  msgPrimary = '',
  msgSecondary = '',
}) => {
  return (
    <Styled.Container>
      <Styled.MsgPrimary>
        <img src={icons.infoGray} alt="info icon gray" />
        <span>{msgPrimary}</span>
      </Styled.MsgPrimary>
      {msgSecondary ? (
        <Styled.MsgSecondary>
          <span>{msgSecondary}</span>
        </Styled.MsgSecondary>
      ) : null}
    </Styled.Container>
  );
};

export default InfoAlertBox;
