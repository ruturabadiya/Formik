import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';
import { LicenseInfo } from '@mui/x-license-pro';

LicenseInfo.setLicenseKey('');

interface DateRangeFilterControlProps {
    name: string;
    filterValue?: string; // New prop for filtering
    onFilterChange?: (value: string) => void; // Callback for filtering
  }
  export const DateRangeFilterControl: React.FC<DateRangeFilterControlProps> = ({
      name,
      filterValue,
      onFilterChange,
    }) => {
      const [selectedRange, setSelectedRange] = React.useState<DateRange<Dayjs>>([
        filterValue ? dayjs(filterValue.split(',')[0]) : dayjs('2001-01-01'),
        filterValue ? dayjs(filterValue.split(',')[1]) : dayjs('2023-07-24'),
      ])
  
      const handleDateChange = (date: DateRange<Dayjs>) => {
        setSelectedRange(date);
    
        // Convert the selected date range to a string format that suits your data needs
        const formattedDateRange = `${date[0]!.format('DD-MM-YYYY')},${date[1]!.format('DD-MM-YYYY')}`;
    
        // Call the onFilterChange callback to update the filter value in the parent component
        if (onFilterChange) {
          onFilterChange(formattedDateRange);
        }
      };
  
      return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateRangePicker',
        ]}
      >
        <DemoItem  component="DateRangePicker">
          <DateRangePicker
            onChange={handleDateChange}
            value={selectedRange}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
