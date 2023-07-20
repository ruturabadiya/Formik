import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { TableCell, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";


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

