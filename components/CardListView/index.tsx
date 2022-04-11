import {images} from '../../assets/images';
import {icons} from '../../assets/icons';
import {CantaloupeMoreCardType} from '../../models/enums/CantaloupeMoreCardType';

import * as Styled from './styles';

interface ICardListView {
  marginTop?: boolean;
  primary?: boolean;
  type: CantaloupeMoreCardType;
  amount?: number;
  cardNoMsg: string;
  additionalDetails?: string;
  hasFunding?: boolean;
  showArrow?: boolean;
  isBakktConnected?: boolean;
  onClick?: () => void;
}

const CardListView = ({
  marginTop = false,
  primary = false,
  type = CantaloupeMoreCardType.PREPAID_CARD,
  amount = 0,
  cardNoMsg = '',
  additionalDetails = '',
  hasFunding = true,
  showArrow = true,
  isBakktConnected = false,
  onClick = () => false,
}: ICardListView) => {
  const getCardType = (target: CantaloupeMoreCardType) => {
    if (target === CantaloupeMoreCardType.PREPAID_CARD) {
      return images.cardMorePrepaid;
    }
    if (target === CantaloupeMoreCardType.PAYROLL_DEDUCT_CARD) {
      return images.cardMorePayrollDeduct;
    }
    if (target === CantaloupeMoreCardType.CRYPTO && isBakktConnected) {
      return images.cardBakktConnected;
    }

    return images.cardBakktNotConnected;
  };

  return (
    <Styled.Container marginTop={marginTop} onClick={onClick}>
      <Styled.CardWrapper primary={primary}>
        <img src={getCardType(type)} alt={`more card ${type}`} />
      </Styled.CardWrapper>
      <Styled.Info centerText={amount === undefined && !additionalDetails}>
        {type !== CantaloupeMoreCardType.CRYPTO ? (
          <Styled.Amount hasFunding={hasFunding} hide={amount === undefined}>
            ${amount.toFixed(2)}
          </Styled.Amount>
        ) : null}
        <Styled.CardNumber>{cardNoMsg}</Styled.CardNumber>
        <Styled.Details>{additionalDetails}</Styled.Details>
      </Styled.Info>
      {showArrow ? (
        <Styled.ArrowIcon>
          <img src={icons.arrowGray} width="12px" alt="gray arrow icon" />
        </Styled.ArrowIcon>
      ) : null}
    </Styled.Container>
  );
};

export default CardListView;
