import {useEffect, useState} from 'react';

import * as Styled from './styles';

interface ICardDetails {
  balance?: number;
  moreCardNumber?: string;
  autoReplenish?: boolean;
  primaryCard?: boolean;
  isPayrollDeduct?: boolean;
}

const CardDetails: React.FC<ICardDetails> = ({
  balance = 0,
  moreCardNumber = '',
  autoReplenish = false,
  primaryCard = false,
  isPayrollDeduct = undefined,
}) => {
  const [isPrimary, setIsPrimary] = useState(false);
  const setAsPrimary = () => {
    // api call to update replenish
  };

  useEffect(() => {
    if (primaryCard) {
      setIsPrimary(primaryCard);
    }
  }, [primaryCard]);

  return (
    <Styled.Container>
      {!isPayrollDeduct ? (
        <Styled.Balance>
          Balance<span>${balance.toFixed(2)}</span>
        </Styled.Balance>
      ) : (
        <Styled.PayrollDeductLabel>
          Card Type: Payroll Deduct
        </Styled.PayrollDeductLabel>
      )}
      <Styled.CardNumber>
        <span>{moreCardNumber}</span>
      </Styled.CardNumber>

      {/* {isPrimary ? (
        <Styled.IsPrimary>This is the Primary Card</Styled.IsPrimary>
      ) : (
        <Styled.SetPrimary onClick={setAsPrimary}>
          Set It As Primary Card
        </Styled.SetPrimary>
      )} */}
      {autoReplenish ? (
        <Styled.Replenish>
          <span>Auto Reloads</span>
        </Styled.Replenish>
      ) : null}
    </Styled.Container>
  );
};

export default CardDetails;
