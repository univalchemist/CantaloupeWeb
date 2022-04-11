import {COLOR_PRIMARY_GRAY_3} from '../../../styles/colors';
import Divider from '../../Divider';

import * as Styled from './styles';

interface IProps {
  cardData: any;
  amount: number | null;
}

export default function Click2PayCheckoutBox({
  cardData = null,
  amount = null,
}: IProps) {
  return (
    <>
      {cardData ? (
        <Styled.Container>
          <Styled.Header>
            <span>Total</span>
            <span>${amount}</span>
          </Styled.Header>
          <Divider color={COLOR_PRIMARY_GRAY_3} margin="12px 0px" />
          <Styled.Title>Pay With</Styled.Title>
          <src-card
            card-art={cardData.maskedCard.digitalCardData.artUri}
            descriptor-name={
              cardData.maskedCard.digitalCardData.descriptorName ||
              cardData.maskedCard.dcf.name.toUpperCase()
            }
            account-number-suffix={cardData.maskedCard.panLastFour}
            card-status={cardData.maskedCard.digitalCardData.status}
            locale="en_US"
          />

          {cardData.maskedCard.maskedBillingAddress ? (
            <>
              <Divider color={COLOR_PRIMARY_GRAY_3} margin="12px 0px" />
              <Styled.Address>
                <div>Address</div>
                <div>{cardData.maskedCard.maskedBillingAddress.name}</div>
                <div>{cardData.maskedCard.maskedBillingAddress.line1}</div>
                <div>{cardData.maskedCard.maskedBillingAddress.line2}</div>
                <div>{cardData.maskedCard.maskedBillingAddress.line3}</div>
                <div>
                  {cardData.maskedCard.maskedBillingAddress.city},{' '}
                  {cardData.maskedCard.maskedBillingAddress.state}{' '}
                  {cardData.maskedCard.maskedBillingAddress.zip}
                </div>
              </Styled.Address>
            </>
          ) : null}
        </Styled.Container>
      ) : null}
    </>
  );
}
