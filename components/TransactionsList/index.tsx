import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {Transactions} from '../../models/Transactions';
import {getDayByName, getMonthByName} from '../../utils/dates';
import {icons} from '../../assets/icons';
import {IRootState} from '../../redux/rootStateInterface';
import {TransactionType} from '../../models/enums/TransactionType';

import * as Styled from './styles';

interface IProps {
  transactions: Transactions[];
  showAllTransactions?: boolean | undefined;
  loading: boolean;
}

const TransactionsList: React.FC<IProps> = ({
  transactions = [],
  showAllTransactions,
  loading = true,
}) => {
  const INIT_DISPLAY = 4;
  const DISPLAY_MORE = 20;
  const [currentDisplayNum, setCurrentDisplayNum] = useState<number>(0);
  const startEndDates = useSelector(
    (state: IRootState) => state.transactionStartEndDatesReducer,
  );

  const sortByDate = (a: Transactions, b: Transactions) => {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
  };
  const getDateDetails = (date: string) => {
    const d = new Date(date);

    return `${getDayByName(d)} ${getMonthByName(d)} ${d.getDate()}`;
  };
  const filterByDisplayNumber = (transaction: Transactions, indx: number) => {
    if (showAllTransactions) {
      return true;
    }

    if (currentDisplayNum === 0) {
      setCurrentDisplayNum(INIT_DISPLAY);

      return indx < currentDisplayNum;
    }

    return indx < currentDisplayNum;
  };
  const filterByDateRange = (transaction: Transactions) => {
    if (startEndDates.start && startEndDates.end) {
      return (
        startEndDates.start.getTime() <= new Date(transaction.date).getTime() &&
        startEndDates.end.getTime() >= new Date(transaction.date).getTime()
      );
    }

    return true;
  };

  const showMoreTransactions = () => {
    setCurrentDisplayNum(currentDisplayNum + DISPLAY_MORE);
  };

  const showLessTransactions = () => {
    window.scroll({top: 0, behavior: 'smooth'});
    setCurrentDisplayNum(4);
  };

  const filteredTransactions = transactions
    ?.filter(filterByDateRange)
    .sort(sortByDate);

  const showMoreArrowIcon =
    !showAllTransactions &&
    filteredTransactions?.length &&
    filteredTransactions?.length > currentDisplayNum;

  const showLessArrowIcon =
    !showMoreArrowIcon &&
    filteredTransactions?.length &&
    filteredTransactions?.length > INIT_DISPLAY;

  useEffect(() => {
    setCurrentDisplayNum(INIT_DISPLAY);
  }, [startEndDates]);

  return (
    <>
      <Styled.List>
        {filteredTransactions
          ?.filter(filterByDisplayNumber)
          .map((transaction: Transactions) => (
            <Styled.Transaction key={transaction.id}>
              <Styled.Logo>
                <img src={icons.transactionRecord} alt="transaction record" />
              </Styled.Logo>
              <Styled.Details>
                <span>{transaction.companyName}</span>
                <span>
                  {transaction.type}{' '}
                  {transaction.city && transaction.state ? (
                    <span>
                      {', '}
                      {transaction.city}
                      {', '}
                      {transaction.state}
                    </span>
                  ) : null}
                </span>

                <span>{getDateDetails(transaction.date)}</span>
              </Styled.Details>
              <Styled.Amount>
                {transaction.type === TransactionType.PURCHASE ||
                transaction.type === TransactionType.PENDING_PURCHASE
                  ? '-'
                  : null}
                $
                {transaction.purchase?.toFixed(2) ||
                  transaction.replenish?.toFixed(2)}
              </Styled.Amount>
            </Styled.Transaction>
          ))}
        {showMoreArrowIcon ? (
          <Styled.ShowMoreIcon onClick={showMoreTransactions}>
            <img src={icons.arrowGray} alt="arrow icon" />
          </Styled.ShowMoreIcon>
        ) : null}
        {showLessArrowIcon ? (
          <Styled.ShowMoreIcon onClick={showLessTransactions}>
            <img src={icons.arrowGray} alt="arrow icon" id="show-less" />
          </Styled.ShowMoreIcon>
        ) : null}
      </Styled.List>
      {filteredTransactions?.length === 0 && !loading ? (
        <Styled.NoResults>No Results</Styled.NoResults>
      ) : null}
    </>
  );
};

export default TransactionsList;
