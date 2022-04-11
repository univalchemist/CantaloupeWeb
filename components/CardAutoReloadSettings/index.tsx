import {icons} from '../../assets/icons';
import {COLOR_PRIMARY_GRAY_0} from '../../styles/colors';
import IconLink from '../IconLink';
import routes from '../../routing/routes';

import * as Styled from './styles';

interface IProps {
  cardId: string | string[] | undefined;
}

export default function CardAutoReloadSettings({cardId = ''}: IProps) {
  return (
    <>
      <Styled.Container>
        <Styled.Title>Auto Reload Settings</Styled.Title>
        <IconLink
          href={`${routes.card.path}/${cardId}/replenish/1`}
          text="Change"
          color={COLOR_PRIMARY_GRAY_0}>
          <img src={icons.edit} alt="edit icon gray" />
        </IconLink>
      </Styled.Container>
      <Styled.Msg>
        If you make any changes to the automatic reload, you must re-enter the
        credit card information.
      </Styled.Msg>
    </>
  );
}
