import React, { useState, useRef, useContext } from "react";
import styled, { css } from 'styled-components';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 	
import ko from 'date-fns/locale/ko';
    registerLocale('ko', ko);

const DatePickerItem = ({startDate,onChange,endDate}) => {
    return (
 
        <DatePicker
            locale="ko"
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
        />
  
     
    )
};

export default DatePickerItem;