// DarkDatePicker.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Ensure correct import
import 'react-datepicker/dist/react-datepicker.css';
import './style.css'; // Custom CSS file to override styles

type DatePickerType = {
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
};

const CustomDatePicker: React.FC<DatePickerType> = (props) => {
  const { selectedDate, handleDateChange } = props;

  return (
    <div className='relative'>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat='yyyy/MM/dd'
        placeholderText='Select a date'
        todayButton='Today'
      />
    </div>
  );
};

export default CustomDatePicker;
