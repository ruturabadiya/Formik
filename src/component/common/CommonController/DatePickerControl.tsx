import { ErrorMessage, useFormikContext } from 'formik';
import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerControllerProps {
    name: string;
    placeholder: string;
    onChange: (date: Date | [Date, Date] | null) => void;
  }
  

  export const DatePickerController: React.FC<DatePickerControllerProps> = ({
    name,
    placeholder = `enter your ${name}`,
  }) => {
    const {setFieldValue,values}:any=useFormikContext()
    const selectedDate = values ? new Date(values[name]) : null;
    return (
      <>
      <div className="form-group">
        <DatePicker
          name={name}
          placeholderText={placeholder}
          selected={selectedDate}
          onChange={(date,e:any) => { setFieldValue(name,date)}}
          dateFormat="DD-MM-yyyy"
          className="form-control"
        />
      </div>
       <div className="row p-0 m-0 w-100">
       <ErrorMessage name={name} component="div" className="text-danger" />
     </div>
     </>
    );
  };

