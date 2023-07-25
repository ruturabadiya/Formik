import * as React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';


interface DateRangeFilterControlProps {
    filterValue?: string; // New prop for filtering
    onFilterChange?: (value: string) => void; // Callback for filtering
  }
  export const DateRangeFilterControl: React.FC<DateRangeFilterControlProps> = ({
      filterValue,
      onFilterChange,
    }) => {
      const [selectedRange, setSelectedRange] = React.useState<DateRange<Dayjs>>()
  
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
      <div  style={{
          marginLeft: "-29%",
          width: "207px",
         }}>
      <DemoContainer
        components={[
          'DateRangePicker',
        ]}
      >
        <div className='dateRange'>
        <DemoItem  component="DateRangePicker">
          <DateRangePicker
            onChange={handleDateChange}
            value={selectedRange}
          />
        </DemoItem>
        </div>
      </DemoContainer>
      </div>
    </LocalizationProvider>
  );
}
