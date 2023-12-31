import React, { ChangeEvent } from 'react';
import { TableCell, IconButton, TextField as MuiTextField } from '@mui/material';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface TableControllerProps {
  name: string;
  onClick?: () => void;
  active?: boolean;
  sortOrder?: "asc" | "desc" | string;
  filterValue?: string; // New prop for filtering
  onFilterChange?: (value: string) => void; // Callback for filtering
}

export const TableLabelControl: React.FC<TableControllerProps> = ({
  name,
  onClick,
  active = true,
  sortOrder,
  filterValue,
  onFilterChange,
}) => {

  return (
    <TableCell className='tableLableBox'>
  <div className='tableLable' onClick={onClick}>
    <div>{name}</div>
    {active && sortOrder && (
      <IconButton size="small">
        {sortOrder === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
      </IconButton>
    )}
  </div>
  {filterValue !== undefined && ( // Render the filter textbox if filterValue prop is provided
    <MuiTextField
      variant="outlined"
      size="small"
      value={filterValue}
      onChange={(e) => onFilterChange && onFilterChange(e.target.value)} // Check for onFilterChange callback
      placeholder={`${name}`}
      style={{ marginTop: 8 }}
    />
  )}
</TableCell>

  );
};
