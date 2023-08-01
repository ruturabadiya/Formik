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
    <div className='dropdownfilter'>
      {select && (
        <select
          className="filter-dropdown"
          name={name}
          value={filterValue}
          onChange={handleSelectChange}
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
        <HighlightOffIcon className='ClearBtn'
          onClick={onClearFilter}
        />
      )}
    </div>
  );
};

