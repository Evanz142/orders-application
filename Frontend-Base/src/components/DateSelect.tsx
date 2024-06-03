import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import EventIcon from '@mui/icons-material/Event';
import { useUserContext } from '../contexts/UserContext';
import { Dayjs } from 'dayjs';

export default function DateSelect() {
    const { setFilterDates } = useUserContext();

    const handleDateChange = (newValue: [Dayjs | null, Dayjs | null]) => {
        if (newValue[0] && newValue[1]) {
            const startDate = newValue[0].format('YYYY-MM-DD');
            const endDate = newValue[1].format('YYYY-MM-DD');
            setFilterDates([startDate, endDate]);
        }
        else {
            setFilterDates([]);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx = {{ padding: 0, minHeight: 'auto' }} components={['SingleInputDateRangeField']}>
                <DateRangePicker 
                    slotProps = {{ 
                        textField: { 
                            size: 'small', 
                            InputProps: { endAdornment: <EventIcon color="action" /> } 
                        } 
                    }}
                    slots = {{ 
                        field: SingleInputDateRangeField  
                    }} 
                    onChange={handleDateChange}/>
            </DemoContainer>
        </LocalizationProvider>
    );
}
