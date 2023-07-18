import React, { ChangeEvent, SelectHTMLAttributes ,useRef, useImperativeHandle, forwardRef } from 'react';
import { Field, ErrorMessage } from 'formik';
import { TableCell, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import DatePicker from "react-datepicker";

interface LocalControllerProps {
  name: string;
  type?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export const TextFieldController: React.FunctionComponent<LocalControllerProps> = ({
  name,
  type = 'text',
  placeholder = `enter your ${name}`,
  onChange,
}) => (
  <>
    <div className="field">
      <Field name={name} type={type} placeholder={placeholder} onChange={onChange} />
    </div>
    <div className='row p-0 m-0 w-100'>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>

  </>
);

interface TableControllerProps {
  name: string;
  onClick?: () => void;
  active?: boolean;
  sortOrder?: "asc" | "desc" | string;
}

export const TableLabel: React.FC<TableControllerProps> = ({
  name,
  onClick,
  active = true,
  sortOrder
}) => (
  <TableCell align="center" style={{ fontWeight: '800', cursor: 'pointer' }} onClick={onClick}>
    {name}
    {active && sortOrder && (
      <IconButton size="small">
        {sortOrder === "asc" ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
      </IconButton>
    )}
  </TableCell>
);


interface SelectControllerProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  name: string;
  onChange: { (e: ChangeEvent<any>): void; <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void; };
  as: string;
}

const dropdown = [
  { key: 'male', value: 'Male' },
  { key: 'female', value: 'Female' }
];

export const DropdownFieldController: React.FC<SelectControllerProps> = ({
  name,
  onChange,
  placeholder,
  as,
  ...selectProps
}) => {

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
  };

  return (
    <>
      <div className="field">
        <select
          className="gender"
          name={name}
          onChange={handleChange}
          {...selectProps}
        >
          <option value="">{placeholder}</option>
          {dropdown.map(option => (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          ))}
        </select>
      </div>
      <div className="row p-0 m-0 w-100">
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </>
  );
};


interface DateControllerProps {
  name: string;
  placeholder: string;
  values: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CommonDatePicker: React.ForwardRefRenderFunction<any, DateControllerProps> = (
  { name, placeholder = `Enter your ${name}`, values: IData, onChange },
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (date: Date) => {
    const syntheticEvent = {
      target: {
        name: "dOB",
        value: date.toISOString(),
      },
    } as React.ChangeEvent<HTMLInputElement>;

    if (inputRef.current) {
      inputRef.current.value = syntheticEvent.target.value;
    }

    onChange(syntheticEvent);
  };

  useImperativeHandle(ref, () => inputRef.current, [inputRef]);

  return (
    <div className="form-group">
      <DatePicker
        name={name}
        placeholderText={placeholder}
        onChange={handleDateChange}
        selected={IData ? new Date(IData) : null}
        dateFormat="dd-MM-yyyy"
        className="form-control"
      />
    </div>
  );
};

export default forwardRef(CommonDatePicker);