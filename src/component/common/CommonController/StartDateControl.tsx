import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface StartDateFilterControlProps {
  name: string;
  filterValue?: Dayjs | null;
  onFilterChange?: (value: Dayjs | null) => void;
  resetDate: boolean;
  style?: React.CSSProperties;
}

export const StartDateFilterControl: React.FC<StartDateFilterControlProps> = ({
  name,
  filterValue,
  onFilterChange,
  resetDate,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(filterValue || null);
  const [key, setKey] = React.useState<number>(Date.now()); // State to trigger remount

  // Effect to handle resetting date when parent requests resetDate
  React.useEffect(() => {
    if (resetDate) {
      setSelectedDate(null);
      setKey(Date.now()); // Trigger remount
    }
  }, [resetDate]);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);

    // Call the onFilterChange callback to update the filter value in the parent component
    if (onFilterChange) {
      onFilterChange(date);
    }
  };

  return (
    <Stack spacing={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{    marginLeft: "64%"}}>
        <DatePicker
          key={key} // This key will trigger the remount when resetDate changes
          value={selectedDate}
          onChange={(newValue, context) => {
            if (context.validationError == null) {
              handleDateChange(newValue);
            }
          }}
          minDate={dayjs('2022-01-01')}
          maxDate={dayjs('2022-12-31')}
        />
        </div>
      </LocalizationProvider>
    </Stack>
  );
};
