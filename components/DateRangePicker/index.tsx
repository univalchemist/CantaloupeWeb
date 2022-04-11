import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange, Range} from 'react-date-range';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../Button';
import {BUTTON_SIZE} from '../CreateCardButton/buttonSize.enum';
import {saveDateRange} from '../../redux/actions/dateRange';
import {IRootState} from '../../redux/rootStateInterface';
import {icons} from '../../assets/icons';
import {saveTransactionStartEndDates} from '../../redux/actions/transactionStartEndDates';

import * as Styled from './styles';

interface IProps {
  onClose?: () => void;
}

const DateRangePicker: React.FC<IProps> = ({onClose = () => false}) => {
  const dispatch = useDispatch();
  const dateRange = useSelector((state: IRootState) => state.dateRangeReducer);
  const [state, setState] = useState<Range[]>([dateRange]);
  const setEndOfDay = (dt: Date) => {
    return new Date(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      23,
      59,
      59,
      999,
    );
  };

  const handleChange = (item: any) => {
    setState([
      {
        startDate: item.selection.startDate,
        endDate: setEndOfDay(item.selection.endDate),
        key: 'selection',
      },
    ]);
    dispatch(saveDateRange(item.selection));
    dispatch(
      saveTransactionStartEndDates({
        start: item.selection.startDate,
        end: setEndOfDay(item.selection.endDate),
      }),
    );
  };

  const clearRange = () => {
    setState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]);
    dispatch(
      saveDateRange({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }),
    );
    dispatch(saveTransactionStartEndDates({start: undefined, end: undefined}));
  };

  return (
    <Styled.Wrapper>
      <Styled.CloseButton onClick={onClose}>
        <img src={icons.closeX} alt="close button" />
      </Styled.CloseButton>
      <Styled.Calendar>
        <DateRange
          editableDateInputs
          onChange={handleChange}
          moveRangeOnFirstSelection={false}
          ranges={state}
          maxDate={new Date()}
        />
        <Styled.Footer>
          <Styled.ClearButton onClick={clearRange}>Clear</Styled.ClearButton>
          <Button
            text="Next"
            margin="0"
            size={BUTTON_SIZE.SMALL}
            click={onClose}
          />
        </Styled.Footer>
      </Styled.Calendar>
    </Styled.Wrapper>
  );
};

export default DateRangePicker;
