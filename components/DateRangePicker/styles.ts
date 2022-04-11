import styled from 'styled-components';

import {
  COLOR_PRIMARY_ORANGE_0,
  COLOR_PRIMARY_ORANGE_1,
  COLOR_SECONDARY_BLUE_3,
  COLOR_SECONDARY_BLUE_2,
  COLOR_PRIMARY_GRAY_9,
  COLOR_WHITE,
} from '../../styles/colors';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Footer = styled.div`
  background: ${COLOR_WHITE};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 0 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;

  button {
    width: 112px;
    height: 40px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -25px;
  right: 10px;
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;

  img {
    width: 25px;
    height: 25px;
  }
`;

export const ClearButton = styled.a`
  text-decoration: underline;
  display: inline-block;
  width: 94px;
  text-align: center;
  cursor: pointer;
`;

export const Calendar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;

  .rdrDateDisplayWrapper {
    display: none;
  }

  .rdrCalendarWrapper {
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    max-width: 400px;
    margin-top: 10px;
  }

  .rdrMonth {
    width: 100%;
  }

  .rdrMonthAndYearPickers select {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 143%;
    color: ${COLOR_PRIMARY_ORANGE_0};
    background: none;
  }

  .rdrMonthPicker,
  .rdrYearPicker {
    position: relative;
    display: flex;
    align-items: center;

    &:after {
      content: '';
      position: absolute;
      right: 10px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 7px solid ${COLOR_PRIMARY_ORANGE_0};
      pointer-events: none;
    }
  }

  .rdrEndEdge,
  .rdrStartEdge {
    color: ${COLOR_PRIMARY_ORANGE_0} !important;
  }

  .rdrEndEdge + .rdrDayNumber span,
  .rdrStartEdge + .rdrDayNumber span {
    color: ${COLOR_WHITE} !important;
  }

  .rdrInRange {
    color: ${COLOR_SECONDARY_BLUE_3} !important;
  }

  .rdrDayNumber span {
    color: ${COLOR_PRIMARY_GRAY_9} !important;
  }

  .rdrDayPassive span {
    color: ${COLOR_PRIMARY_ORANGE_1} !important;
  }

  .rdrDayStartPreview,
  .rdrDayInPreview,
  .rdrDayEndPreview {
    color: ${COLOR_SECONDARY_BLUE_2} !important;
  }

  .rdrPprevButton i {
    border-color: transparent ${COLOR_SECONDARY_BLUE_2} transparent transparent;
  }
  .rdrNextButton i {
    border-color: transparent transparent transparent ${COLOR_SECONDARY_BLUE_2};
  }

  .rdrDayToday .rdrDayNumber span:after{
    background: ${COLOR_PRIMARY_ORANGE_0} !important;
  }

  .rdrDayToday .rdrStartEdge + .rdrDayNumber span:after,
  .rdrDayToday .rdrEndEdge + .rdrDayNumber span:after {
    background: ${COLOR_WHITE} !important;
  }

  .rdrWeekDays {
    padding-top: 10px;
    border-top: 1px solid ${COLOR_SECONDARY_BLUE_3};
  }

  .rdrDays {
    padding-bottom: 10px;
    border-bottom: 1px solid ${COLOR_SECONDARY_BLUE_3};
  }
`;
