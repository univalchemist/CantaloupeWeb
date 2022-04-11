import {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LoadingContext from '../contexts/loadingContext';
import useAppConfig from '../hooks/useAppConfig';
import {Click2PayCardBrands} from '../models/enums/Click2PayCardBrands';
import {setClick2Pay} from '../redux/actions/click2pay';
import {IRootState} from '../redux/rootStateInterface';

const Click2PayProvider: React.FC = ({children}) => {
  const dispatch = useDispatch();
  const {srcDpaId} = useAppConfig();
  const {loading, setLoading} = useContext(LoadingContext);
  const user = useSelector((state: IRootState) => state.userReducer);
  const [abortFailure, setAbortFailure] = useState<boolean>(false);
  const click2payRedux = useSelector(
    (state: IRootState) => state.click2PayReducer,
  );

  const handleErrors = useCallback(
    (err: any) => {
      // if we error at all, end the process and remove all click to pay refs
      console.log(err);
      setAbortFailure(true);
      setLoading(false);
      dispatch(
        setClick2Pay({
          ...click2payRedux,
          instance: null,
          cards: null,
          idLookup: null,
        }),
      );
    },
    [click2payRedux, dispatch, setLoading, setAbortFailure],
  );

  // initialize click 2 pay js sdk
  useEffect(() => {
    if (abortFailure) {
      return;
    }

    if (!window.Click2Pay || click2payRedux.instance || !user.id) {
      return;
    }

    setLoading(true);

    const c2pInstance = new window.Click2Pay();

    async function initializeClick2Pay() {
      try {
        await c2pInstance.init({
          srcDpaId,
          cardBrands: Object.values(Click2PayCardBrands),
          dpaData: {
            dpaName: 'Cantaloupe Payments Inc.',
            dpaPresentationName: 'Cantaloupe Payments Inc.',
          },
          dpaTransactionOptions: {
            dpaLocale: 'en_US',
            dpaBillingPreference: 'FULL',
            transactionType: 'PURCHASE',
            payloadTypeIndicatorCheckout: 'PAYMENT',
            payloadTypeIndicatorPayload: 'PAYMENT',
            dpaShippingPreference: 'NONE',
            dpaAcceptedBillingCountries: [],
            dpaAcceptedShippingCountries: [],
            threeDsPreference: 'NONE',
            customInputData: {
              'com.mastercard.dcfExperience': 'WITHIN_CHECKOUT',
            },
          },
        });

        setLoading(false);
        dispatch(setClick2Pay({...click2payRedux, instance: c2pInstance}));
      } catch (err) {
        handleErrors(err);
      }
    }

    if (c2pInstance && !click2payRedux.instance) {
      initializeClick2Pay();
    }
  }, [
    user,
    click2payRedux,
    dispatch,
    setLoading,
    srcDpaId,
    handleErrors,
    abortFailure,
  ]);

  useEffect(() => {
    if (abortFailure) {
      return;
    }

    if (click2payRedux?.idLookup && click2payRedux?.cards) {
      return;
    }

    if (user?.email && click2payRedux?.instance) {
      setLoading(true);

      Promise.all([
        click2payRedux.instance.getCards(),
        click2payRedux.instance.idLookup({email: user.email}),
      ])
        .then((results) => {
          dispatch(
            setClick2Pay({
              ...click2payRedux,
              cards: results[0],
              idLookup: results[1],
            }),
          );
          setLoading(false);
        })
        .catch((err) => {
          handleErrors(err);
        });
    }
  }, [user, click2payRedux, dispatch, setLoading, handleErrors, abortFailure]);

  useEffect(() => {
    if (click2payRedux.disabled && !abortFailure) {
      setAbortFailure(true);
    }
  }, [click2payRedux, abortFailure]);

  return <>{children}</>;
};

export default Click2PayProvider;
