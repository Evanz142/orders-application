import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface DropdownSelectProps {
  id: string;
  name: string;
  value: any;
  onChange: (event: SelectChangeEvent<any>) => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({ id, name, value, onChange }) => {
  return (
    <FormControl sx={{minWidth: 160 }} size="medium">
      <InputLabel id={`${id}-label`}>Order Type</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        value={value}
        label="Order Type"
        onChange={onChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>Standard</MenuItem>
        <MenuItem value={2}>Sale Order</MenuItem>
        <MenuItem value={3}>Purchase Order</MenuItem>
        <MenuItem value={4}>Transfer Order</MenuItem>
        <MenuItem value={5}>Return Order</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropdownSelect;
