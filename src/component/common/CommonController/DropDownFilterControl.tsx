import React, { ChangeEvent } from 'react';

interface DropdownOption {
    value: string;
    label: string;
  }
  
  interface DropdownFilterControlProps {
    name: string;
    filterValue: string;
    onFilterChange: (value: string) => void;
    selectOptions: DropdownOption[];
    select: boolean;
  }
  
 export const DropdownFilterControl: React.FC<DropdownFilterControlProps> = ({
    name,
    filterValue,
    onFilterChange,
    selectOptions,
    select,
  }) => {
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      onFilterChange(newValue);
    };
  
    if (select) {
      return (
        <select
          className="filter-dropdown"
          name={name}
          value={filterValue}
          onChange={handleSelectChange}
          style={{width: "40%",
            height: "5vh"}}
        >
          {selectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
  
    // Add other types of filters here if needed
  
    return (
      <input
        type="text"
        className="filter-input"
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    );
  };