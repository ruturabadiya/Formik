import React, { ChangeEvent } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface DropdownOption {
    value: string;
    label: string;
  }
  
  interface DropdownFilterControlProps {
    name: string;
    filterValue: string;
    onFilterChange: (value: string) => void;
    onClearFilter: () => void;
    selectOptions: DropdownOption[];
    select: boolean;
  }

 export const DropdownFilterControl: React.FC<DropdownFilterControlProps> = ({
    name,
    filterValue,
    onFilterChange,
    onClearFilter,
    selectOptions,
    select,
  }) => {
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      onFilterChange(newValue);
    };

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {select && (
          <select
            className="filter-dropdown"
            name={name}
            value={filterValue}
            onChange={handleSelectChange}
            style={{
              width: "107%",
      height: "6vh",
      marginTop: "15%",
      backgroundColor: "#f0f8ff"
            }}
          >
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        {!select && (
          <input
            type="text"
            className="filter-input"
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
          />
        )}
        {filterValue && (
          <HighlightOffIcon
            style={{
              position: 'absolute',
              top: '50%',
              right: '-30px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
            onClick={onClearFilter}
          />
        )}
      </div>
    );
  };