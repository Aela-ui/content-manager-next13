import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComponent({ data, selected, setData, type }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    setData(value);
  };

  return (
    <div>
      {type === 'object' ? (
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selected.name}
            onChange={handleChange}
          >
            {data.map((item) => (
              <MenuItem
                key={item.id}
                value={item}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>)
      : (
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selected}
            onChange={handleChange}
          >
            {data.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )} 
    </div>
  );
}