import  React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Checkbox, ListItemText, useTheme } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function MultipleSelect({ data, selected, setData, label }) {
  const theme = useTheme();
  const [selectedNames, setSelectedNames] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    
    setSelectedNames(
      typeof value === "string" ? value.split(",") : value
    );
    let temp = data.filter(e => value.includes(e.name))
    setData(temp)
  };

  useEffect(() => {
    setSelectedNames(selected.map((item) => item.name));
  }, [selected]);
 
  return (
    <div>
      <FormControl fullWidth variant="standard" sx={{ width: 300, mt: 1 }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={selectedNames}
            onChange={handleChange}
          >
            {data.map((item) => (
              <MenuItem
                key={item.id}
                value={item.name}
                style={getStyles(item.name, selectedNames, theme)}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    </div>
  );
}