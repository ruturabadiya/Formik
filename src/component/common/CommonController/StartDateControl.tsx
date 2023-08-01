import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface StartDateFilterControlProps {
  name: string;
  filterValue?: string;
  onFilterChange?: (value: Dayjs | null) => void;
  resetDate: boolean;
  onClearFilter?: () => void;
}

export const StartDateFilterControl: React.FC<StartDateFilterControlProps> = ({
  name,
  filterValue,
  onFilterChange,
  resetDate,
  onClearFilter,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    filterValue ? dayjs(filterValue) : null
  );

  React.useEffect(() => {
    if (resetDate) {
      setSelectedDate(null);
    }
  }, [resetDate]);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (onFilterChange) {
      onFilterChange(date);
    }
  };

  const handleClearFilter = () => {
    setSelectedDate(null);
    if (onClearFilter) {
      onClearFilter(); 
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className='startDateBox'>
            <DatePicker
              value={selectedDate}
              onChange={(date) => {
                handleDateChange(date); 
              }}
              format="DD-MM-YYYY"
              className='customDatePicker'
            />
          </div>
        </LocalizationProvider>
      </Stack>
      <div className="startDate">
        <HighlightOffIcon onClick={handleClearFilter} />
      </div>
    </>
  );
};
