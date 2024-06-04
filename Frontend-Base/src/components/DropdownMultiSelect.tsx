import React from 'react';
import { Autocomplete, TextField, FormControl } from '@mui/material';

interface MultiSelectDropdownProps {
  id: string;
  value: any[];
  onChange: (event: React.ChangeEvent<{}>, value: any[]) => void;
}

const options = [
  { label: 'Standard', value: 1 },
  { label: 'Sale Order', value: 2 },
  { label: 'Purchase Order', value: 3 },
  { label: 'Transfer Order', value: 4 },
  { label: 'Return Order', value: 5 }
];

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ id, value, onChange }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
      <Autocomplete
        multiple
        id={id}
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Order Type"
            placeholder="Select order types"
            size="small"
          />
        )}
        
      />
    </FormControl>
  );
}

export default MultiSelectDropdown;
