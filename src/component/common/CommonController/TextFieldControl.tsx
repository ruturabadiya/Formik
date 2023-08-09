import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { TableCell } from '@mui/material';

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
      <Field name={name} type={type} placeholder={placeholder} onChange={onChange}  />
    </div>
    <div className='row p-0 m-0 w-100'>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>

  </>
);



interface TableControllerProps {
  value: string;
}

export const TableController: React.FC<TableControllerProps> = ({
  value
}) => (
  <>
    <TableCell align="left" style={{ fontWeight: '800' }}>
      {value}
    </TableCell>
  </>
);

interface TextAreaControllerProps {
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<any>) => void;
}

const StyledTextareaField = (props:any) => (
  <Field {...props} as="textarea" id="description" name="description" children={props.children}></Field>
);
export const TextAreaController: React.FunctionComponent<TextAreaControllerProps> = ({
  name,
  placeholder = `enter your ${name}`,
  onChange,
}) => (
  <>
    <div className="descriptionBox">
      <StyledTextareaField
              as={StyledTextareaField}
              className='textarea' name={name}  placeholder={placeholder} onChange={onChange} 
            />
    </div>
    <div className='row p-0 m-0 w-100'>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>

  </>
);
