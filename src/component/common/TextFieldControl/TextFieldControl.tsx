import React, { ChangeEvent, SelectHTMLAttributes } from 'react';
import { Field, ErrorMessage } from 'formik';
import { TableCell, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';

const StyledDemoContainer = styled.div`
  background: white;
  margin-top: 6%;
  width: 100%;
  margin-left: 0%;
`;

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
  onChange?: (date: Date | null) => void;
}

export const DatePickerController: React.FunctionComponent<DateControllerProps> = ({
  name,
  placeholder = `enter your ${name}`,
  onChange,
}) => {
  const handleDateChange = (date: Date | null) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
      <StyledDemoContainer>
        <DatePicker label={placeholder} onChange={handleDateChange} />
      </StyledDemoContainer>
      </DemoContainer>
    </LocalizationProvider>
  );
};