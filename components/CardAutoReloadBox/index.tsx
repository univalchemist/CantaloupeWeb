import {icons} from '../../assets/icons';

import * as Styled from './styles';

interface ICardAutoReloadBox {
  active?: boolean;
  replenishMin?: number;
  balance?: number;
  onClick: () => void;
}

export default function CardAutoReloadBox({
  active = false,
  replenishMin = 0,
  balance = 0,
  onClick = () => false,
}: ICardAutoReloadBox) {
  return (
    <Styled.Container onClick={onClick}>
      <Styled.Header>
        <div>Auto Reload</div>
        <Styled.Active active={active}>
          {active ? 'Active' : 'Inactive'}
        </Styled.Active>
      </Styled.Header>
      <Styled.Body>
        {active ? (
          <>
            <Styled.Balance>${balance}</Styled.Balance>
            <Styled.ReplenishMin>
              <div>
                When Balance Falls
                <br />
                Below ${replenishMin}
              </div>
            </Styled.ReplenishMin>
          </>
        ) : (
          <Styled.InactiveMsg>
            This adds money to your card when the balance falls below a
            threshold.
          </Styled.InactiveMsg>
        )}
        <img src={icons.arrowGray} width="12px" alt="arrow icon gray" />
      </Styled.Body>
    </Styled.Container>
  );
}
