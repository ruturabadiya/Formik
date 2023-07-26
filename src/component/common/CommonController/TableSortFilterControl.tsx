import React, { ChangeEvent } from 'react';
import { TableCell, IconButton, TextField as MuiTextField } from '@mui/material';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface TableSortControlProps {
  name: string;
  onClick?: () => void;
  active?: boolean;
  sortOrder?: "asc" | "desc" | string;
  style?: React.CSSProperties;
}

export const TableSortControl: React.FC<TableSortControlProps> = ({
  name,
  onClick,
  active = true,
  sortOrder,
}) => {
  return (
    <TableCell align="center" style={{ fontWeight: '800', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center' }} onClick={onClick}>
        <div>{name}</div>
        {active && sortOrder && (
          <IconButton size="small">
            {sortOrder === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
          </IconButton>
        )}
      </div>
    </TableCell>
  );
};

interface TableFilterControlProps {
  name: string;
  filterValue?: string;  
  onFilterChange?: (value: string) => void; 
  onClearFilter?: () => void;
}

export const TableFilterControl: React.FC<TableFilterControlProps> = ({
  name,
  filterValue,
  onFilterChange,
  onClearFilter,
}) => {
  return (
    <TableCell align="center" style={{ fontWeight: '800', cursor: 'pointer'}}>
<div>
      {filterValue !== undefined && (
        <MuiTextField
          variant="outlined"
          size="small"
          value={filterValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onFilterChange && onFilterChange(e.target.value)} 
          placeholder={`${name}`}
          style={{ marginTop: 8,  marginLeft: "-23%",
          width: "76%"}}
        />
      )}
       {filterValue && (
      <HighlightOffIcon onClick={() => onClearFilter && onClearFilter()} style={{marginLeft: "4px",marginTop: "8%"}}/>
       )}
       {/* <div onClick={() => onClearFilter && onClearFilter()} style={{marginLeft: "81px",marginTop: "-15%"}}>X</div> */}
          </div>
    </TableCell>
  );
};
