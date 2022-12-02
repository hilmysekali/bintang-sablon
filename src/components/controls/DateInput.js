import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';
import moment from 'moment/moment';

const DateInput = ({ name, control, label, rules }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={moment().format("YYYY-MM-DD HH:mm:ss")}
            render={
                ({ field: { name, value, onChange }, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            name={name}
                            onChange={(e) => {
                                if (e instanceof moment) {
                                    if (e.isValid()) {
                                        onChange(e.format("YYYY-MM-DD HH:mm:ss"));
                                    } else {
                                        onChange('');
                                    }
                                }
                            }
                            }
                            value={value}
                            label={`${label} ${rules['required'] ? '*' : ''}`}
                            renderInput={(params) =>
                                <TextField
                                    error={error !== undefined}
                                    helperText={error ? error.message : ''}
                                    {...params}
                                    fullWidth
                                />}
                        />
                    </LocalizationProvider>
                )}
        />
    )
}

export default DateInput