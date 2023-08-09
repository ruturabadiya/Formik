import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { TableCell } from '@mui/material';

interface NumberControllerProps {
  name: string;
  type?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export const NumberFieldController: React.FunctionComponent<NumberControllerProps> = ({
  name,
  type = 'number',
  placeholder = `enter your ${name}`,
  onChange,
}) => (
  <>
    <div className="field">
      <Field name={name} type={type} placeholder={placeholder} onChange={onChange}  />
    </div>
    <div className='row p-0 m-0 w-100'>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>

  </>
);