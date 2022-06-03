import React, { useState, useRef, useContext } from "react";
import styled, { css } from 'styled-components';
import Modal from 'react-modal';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 	
import ko from 'date-fns/locale/ko';
    registerLocale('ko', ko);

const DatePickerItem = ({openDatePicker, setOpenDatePicker,startDate,onChange,endDate}) => {
    return (
        <Modal 
        ariaHideApp={false} // allElement 경고창 제거
        isOpen={openDatePicker} 
        onRequestClose={() => setOpenDatePicker(false)}
        style={{
            overlay: {
              position: 'fixed',
              zIndex: '6'
            },
            content: {
              top: '150px',
              left: '500px',
              right: '500px',
              bottom: '140px',
              borderRadius: '1rem',
              boxShadow: '0px 0px 4px lightgray',
            }
          }}
        >
        <div style={{ textAlign: 'center'}}>    
        <DatePicker
            locale="ko"
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
        />
         </div>
     </Modal>
    )
};

export default DatePickerItem;