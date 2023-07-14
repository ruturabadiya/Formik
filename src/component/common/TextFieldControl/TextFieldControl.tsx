import React,{ChangeEvent,SelectHTMLAttributes,useState} from 'react';
import { Field, ErrorMessage } from 'formik';
import { TableCell } from '@mui/material';

interface LocalControllerProps {
    name:  string ;
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
  }
  
  export const TableLabel: React.FC<TableControllerProps> = ({
    name
  }) => (
    <>
      <TableCell align="center" style={{ fontWeight: '800' }}>
        {name}
      </TableCell>
    </>
  );


  interface SelectControllerProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    name: string;
    defaultValue?: string; // Add a defaultValue prop
    onChange: { (e: ChangeEvent<any>): void; <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void; };
    as: string;
  }
  
  const dropdown = [
    { key: 'male', value: 'Male' },
    { key: 'female', value: 'Female' }
  ];
  
  export const DropdownFieldController: React.FC<SelectControllerProps> = ({
    name,
    defaultValue,
    onChange,
    placeholder,
    as,
    ...selectProps
  }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue || '');
  
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(event.target.value);
      onChange(event);
    };
  
    return (
      <>
        <div className="field">
          <select
            className='gender'
            name={name}
            value={selectedValue}
            onChange={handleChange}
            {...selectProps}
          >
            <option value="">{placeholder}</option>
            {dropdown.map(option => (
              <option key={option.value} value={option.value}>{option.key}</option>
            ))}
          </select>
        </div>
        <div className="row p-0 m-0 w-100">
          <ErrorMessage name={name} component="div" className="text-danger" />
        </div>
      </>
    );
  };