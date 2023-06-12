import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ data, selected, setData }) {
  const theme = useTheme();
  const [listData, setListData] = React.useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;

    setListData(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    let array = selected;
    setData(value)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={listData}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {data.map((item) => (
            <MenuItem
              key={item.id}
              value={item}
              style={getStyles(item.name, listData, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}