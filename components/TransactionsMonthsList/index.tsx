import {Fragment} from 'react';
import {useDispatch} from 'react-redux';

import {Transactions} from '../../models/Transactions';
import {icons} from '../../assets/icons';
import {saveTransactionStartEndDates} from '../../redux/actions/transactionStartEndDates';
import {TransactionDates} from '../../models/TransactionDates';
import {
  getMonthByName,
  getFirstAndLastDayOfMonth,
  months,
} from '../../utils/dates';
import {saveDateRange} from '../../redux/actions/dateRange';

import * as Styled from './styles';

const getNumOfTransactionsInMonth = (
  month: string,
  transactions: Transactions[],
) =>
  transactions.filter(
    (transaction) => month === getMonthByName(new Date(transaction.date)),
  ).length;

const splitByYear = (transactions: Transactions[]) =>
  transactions.reduce((acc: {[index: number]: Transactions[]}, transaction) => {
    const year = new Date(transaction.date).getFullYear();

    return {
      ...acc,
      [year]: [...(acc[year] || []), transaction],
    };
  }, {});

interface IProps {
  transactions: Transactions[] | [];
}

const TransactionsMonthsList: React.FC<IProps> = ({transactions}) => {
  const dispatch = useDispatch();

  const getLogo = (name: string) => {
    return name.substring(0, 3);
  };
  const goToTransactions = (month: number, curYear: number) => {
    const startEndOdMonth = getFirstAndLastDayOfMonth(
      new Date(curYear, month, 1, 0, 0, 0, 0),
    );

    const transactionStartEnd: TransactionDates = {
      start: startEndOdMonth.start,
      end: startEndOdMonth.end,
    };

    dispatch(saveTransactionStartEndDates(transactionStartEnd));
    dispatch(
      saveDateRange({
        startDate: startEndOdMonth.start,
        endDate: startEndOdMonth.end,
        key: 'selection',
      }),
    );
    window.scroll({top: 0, behavior: 'smooth'});
  };

  return (
    <>
      {Object.entries(splitByYear(transactions)) // [[year: string, transactions: Transactions[]]]
        .sort((a, b) => parseInt(b[0], 10) - parseInt(a[0], 10)) // most recent year first
        .map(([transactionYear, transactionsPerYear]) => {
          const currentYear = new Date().getFullYear();
          let displayMonths = [...months].reverse();
          const year = parseInt(transactionYear, 10);
          if (year === currentYear) {
            const currentMonth = getMonthByName(new Date());
            const i = displayMonths.findIndex(
              (month) => month === currentMonth,
            );
            displayMonths = displayMonths.slice(i);
          }

          return (
            <Fragment key={year}>
              <Styled.Header>{year}</Styled.Header>
              <Styled.List>
                {transactionsPerYear.length > 0 &&
                  displayMonths.map((month: string, indx: number) => {
                    const monthTransactions = getNumOfTransactionsInMonth(
                      month,
                      transactionsPerYear,
                    );

                    return (
                      <Styled.TransactionMonth key={month}>
                        <Styled.Button
                          onClick={() =>
                            goToTransactions(
                              displayMonths.length - 1 - indx,
                              year,
                            )
                          }>
                          <Styled.MonthLogo>{getLogo(month)}</Styled.MonthLogo>
                          <Styled.MonthDetails>
                            <span>{month}</span>
                            <span>
                              {`${monthTransactions} Transaction${
                                monthTransactions !== 1 ? 's' : ''
                              }`}
                            </span>
                          </Styled.MonthDetails>
                          <Styled.Arrow>
                            <img src={icons.arrowGray} alt="arrow icon" />
                          </Styled.Arrow>
                        </Styled.Button>
                      </Styled.TransactionMonth>
                    );
                  })}
              </Styled.List>
            </Fragment>
          );
        })}
    </>
  );
};

export default TransactionsMonthsList;
