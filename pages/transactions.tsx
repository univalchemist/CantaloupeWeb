import {NextSeo} from 'next-seo';
import {useState, useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import {toast} from 'react-toastify';

import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import Navbar from '../components/Navbar';
import Gutter from '../components/Gutter';
import * as gradients from '../styles/gradients';
import Header from '../components/Header';
import {
  useAccessControl,
  ACCESS_CONTROL_TYPES,
} from '../hooks/useAccessControl';
import TransactionsList from '../components/TransactionsList';
import ButtonDate from '../components/ButtonDate';
import DateRangePicker from '../components/DateRangePicker';
import {GET_TRANSACTION_HISTORY} from '../graphql/queries/getTransactionHistory';
import {Transactions} from '../models/Transactions';
import TransactionsMonthsList from '../components/TransactionsMonthsList';
import {formatDateMMDDYYYY} from '../utils/dates';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const variables = {
  startTime: formatDateMMDDYYYY(new Date('01/01/1970')),
  endTime: formatDateMMDDYYYY(tomorrow),
  maxRows: 10000,
};

const TransactionsSearch = () => {
  const {allowAccess} = useAccessControl(ACCESS_CONTROL_TYPES.LOGGED_IN);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);

  const [getTransactionHistory] = useLazyQuery(GET_TRANSACTION_HISTORY, {
    fetchPolicy: 'network-only',
    onCompleted: (data: any) => {
      if (firstLoading) setFirstLoading(false);
      if (data.getTransactionHistory) {
        setTransactions(data.getTransactionHistory);
      }
    },
    onError: ({graphQLErrors}: any) => {
      if (firstLoading) setFirstLoading(false);
      graphQLErrors.forEach(({message, i}: any) => {
        toast.error(message, {
          toastId: `getUser_${i}`,
        });
      });
    },
  });

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleOnClose = () => {
    setShowCalendar(false);
  };

  useEffect(() => {
    getTransactionHistory({variables});
  }, []);

  if (!allowAccess) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Transactions | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar isLoggedIn showBackBtn noSignOut />
          <BodyContainer alignTop verticalOffset="30">
            <Header text="Transactions" leftAlign />
            <ButtonDate active={!showCalendar} click={toggleCalendar} />
            {showCalendar && <DateRangePicker onClose={handleOnClose} />}
            <TransactionsList
              transactions={transactions}
              loading={firstLoading}
            />
            <TransactionsMonthsList transactions={transactions} />
          </BodyContainer>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default TransactionsSearch;
