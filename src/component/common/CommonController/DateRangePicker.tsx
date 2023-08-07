import  React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface DateRangeFilterControlProps {
  name: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  resetDate: boolean;
  onClearFilter: () => void;
}
export const DateRangeFilterControl: React.FC<DateRangeFilterControlProps> = ({
  name,
  filterValue,
  onFilterChange,
  resetDate,
  onClearFilter,
}) => {
  const [selectedRange, setSelectedRange] = React.useState<DateRange<Dayjs> | undefined>(undefined);
  const [key, setKey] = React.useState<number>(Date.now()); 

  // Effect to handle resetting date when parent requests resetDate
  React.useEffect(() => {
    if (resetDate) {
      setSelectedRange(undefined);
      setKey(Date.now()); // Trigger remount
    }
  }, [resetDate]);

  const handleDateChange = (date: DateRange<Dayjs> | undefined) => {
    setSelectedRange(date);

    const formattedDateRange = date
      ? `${date[0]?.format('DD-MM-YYYY') ?? ''},${date[1]?.format('DD-MM-YYYY') ?? ''}`
      : '';

    if (onFilterChange) {
      onFilterChange(formattedDateRange);
    }
  };
  
  const handleClearFilter = () => {
    setSelectedRange(undefined);
    setKey(Date.now()); 
    if (onClearFilter) {
      onClearFilter();
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='DateRange'>
          <DemoContainer components={['DateRangePicker']}>
            <DemoItem component='DateRangePicker'>
              <div className='startEndDateBox'>
              <DateRangePicker
                  key={key} 
                  onChange={handleDateChange}
                  value={selectedRange}
                  format='DD-MM-YYYY'
                  className='customDatePicker' 
                />
              </div>
            </DemoItem>
          </DemoContainer>
        </div>
      </LocalizationProvider>
      <div className='dateClear'>
        <HighlightOffIcon onClick={handleClearFilter} />
      </div>
    </>
  );
};
