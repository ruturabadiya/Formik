import * as React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';


interface DateRangeFilterControlProps {
  name: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  resetDate: boolean;
  style?: React.CSSProperties;
}
export const DateRangeFilterControl: React.FC<DateRangeFilterControlProps> = ({
  name,
  filterValue,
  onFilterChange,
  resetDate,
}) => {
  const [selectedRange, setSelectedRange] = React.useState<DateRange<Dayjs> | undefined>(undefined);
  const [key, setKey] = React.useState<number>(Date.now()); // State to trigger remount

  // Effect to handle resetting date when parent requests resetDate
  React.useEffect(() => {
    if (resetDate) {
      setSelectedRange(undefined);
      setKey(Date.now()); // Trigger remount
    }
  }, [resetDate]);

  const handleDateChange = (date: DateRange<Dayjs> | undefined) => {
    setSelectedRange(date);

    // Convert the selected date range to a string format that suits your data needs
    const formattedDateRange = date
      ? `${date[0]?.format('DD-MM-YYYY') ?? ''},${date[1]?.format('DD-MM-YYYY') ?? ''}`
      : '';

    // Call the onFilterChange callback to update the filter value in the parent component
    if (onFilterChange) {
      onFilterChange(formattedDateRange);
    }
  };

  const pickerKey = selectedRange
    ? (selectedRange[0]?.format('DD-MM-YYYY') ?? '') + (selectedRange[1]?.format('DD-MM-YYYY') ?? '')
    : 'empty';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ marginLeft: '-3%', width: '269px' }}>
        <DemoContainer components={['DateRangePicker']}>
          <DemoItem component='DateRangePicker'>
            <div className='startEndDateBox'>
              <DateRangePicker
                key={pickerKey} // Utilize the key to trigger remount
                onChange={handleDateChange}
                value={selectedRange}
              />
            </div>
          </DemoItem>
        </DemoContainer>
      </div>
    </LocalizationProvider>
  );
};
