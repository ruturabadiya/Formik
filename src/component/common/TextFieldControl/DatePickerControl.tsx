import React from 'react';
import DatePicker from "react-datepicker";

interface DatePickerControllerProps {
    name: string;
    placeholder: string;
    onChange: (date: Date | [Date, Date] | null) => void;
    value: Date;
  }
  

  export const DatePickerController: React.FC<any> = ({
    name,
    placeholder = `enter your ${name}`,
    onChange,
    value,
  }) => {
    const selectedDate = value ? new Date(value) : null;
  console.log(selectedDate)
    return (
      <div className="form-group">
        <DatePicker
          name={name}
          placeholderText={placeholder}
          selected={selectedDate}
          onChange={onChange}
          dateFormat="dd-MM-yyyy"
          className="form-control"
        />
      </div>
    );
  };