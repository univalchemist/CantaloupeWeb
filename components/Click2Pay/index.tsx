import {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ICard} from '../../models/Click2Pay';
import {setClick2Pay} from '../../redux/actions/click2pay';
import {IRootState} from '../../redux/rootStateInterface';
import FieldHeader from '../FieldHeader';
import {FONT_SIZE} from '../FieldHeader/fieldHeader.enum';

import OTP from './OTP';
import * as Styled from './styles';

interface IClick2Pay {
  show: boolean;
  setIsClick2PayEnabled: (bool: boolean) => void;
  checkoutWithCard: (srcDigitalCardId: string) => void;
  setIsClick2PayAddNewCard: (bool: boolean) => void;
}

export default function Click2Pay({
  show = false,
  setIsClick2PayEnabled = () => false,
  checkoutWithCard = () => false,
  setIsClick2PayAddNewCard = () => false,
}: IClick2Pay) {
  const dispatch = useDispatch();
  const cardListRef = useRef<any>(null);
  const click2payRedux = useSelector(
    (state: IRootState) => state.click2PayReducer,
  );

  const handleOTPComplete = (ccCards: ICard[]) => {
    dispatch(
      setClick2Pay({
        ...click2payRedux,
        cards: ccCards,
        isOTPVerified: true,
      }),
    );
  };

  const initCardList = useCallback(async () => {
    await customElements.whenDefined('src-card-list');
    const cardListElem = document.querySelector('src-card-list');
    // add cards to c2p ui component
    (cardListElem as any).loadCards(click2payRedux.cards || []);
  }, [click2payRedux]);

  useEffect(() => {
    const elem = cardListRef.current;
    const handleSelectSrcDigitalCardId = (event: any) => {
      checkoutWithCard((event as any).detail);
    };

    const handleClickAddCardLink = () => {
      setIsClick2PayAddNewCard(true);
    };

    if (elem) {
      (elem as any).addEventListener(
        'selectSrcDigitalCardId',
        handleSelectSrcDigitalCardId,
      );
      (elem as any).addEventListener(
        'clickAddCardLink',
        handleClickAddCardLink,
      );
    }

    return () => {
      if (elem) {
        (elem as any).removeEventListener(
          'selectSrcDigitalCardId',
          handleSelectSrcDigitalCardId,
        );
        (elem as any).removeEventListener(
          'clickAddCardLink',
          handleClickAddCardLink,
        );
      }
    };
  }, [cardListRef, checkoutWithCard, setIsClick2PayAddNewCard]);

  useEffect(() => {
    if (click2payRedux?.isOTPVerified || click2payRedux.cards?.length) {
      initCardList();
    }
  }, [click2payRedux, initCardList]);

  return (
    <div style={{display: show ? 'block' : 'none'}}>
      <Styled.Container>
        {!click2payRedux?.isOTPVerified &&
        click2payRedux.cards?.length === 0 ? (
          <OTP
            onComplete={handleOTPComplete}
            setIsClick2PayEnabled={setIsClick2PayEnabled}
          />
        ) : (
          <Styled.CardListWrapper>
            <FieldHeader
              text="Choose A Card:"
              leftAlign
              fontSize={FONT_SIZE.SMALL}
              margin="0 0 16px"
            />
            <Styled.CardList>
              <src-card-list
                ref={cardListRef}
                style={{
                  '--src-list-margin-bottom': '-15px',
                  '--src-color-background': '#fff',
                }}
                id="srcCardList"
                locale="en_US"
                display-header="false"
                display-cancel-option="false"
                display-add-card="true"
                card-selection-type="gridView"
              />
            </Styled.CardList>
          </Styled.CardListWrapper>
        )}
      </Styled.Container>
    </div>
  );
}
