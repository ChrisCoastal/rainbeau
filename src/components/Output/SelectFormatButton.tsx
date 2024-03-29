import type { FC } from 'react';
import React, { useState } from 'react';

// mui
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectFormatButtonProps {
  options: string[];
  setFormat: React.SetStateAction<any>;
  format: string;
}

const SelectFormatButton: FC<SelectFormatButtonProps> = ({
  options,
  format,
  setFormat,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const selectSx = {
    marginBottom: '0.8rem',
    '& .MuiSelect-select': {
      padding: 0,
    },
    '& .MuiSelect-outined': {
      '&:hover': {
        borderColor: '#7dffbe',
      },
    },
  };

  const formSx = {
    alignSelf: 'end',
    p: 0,
    minWidth: '5.6rem',
    border: 'none',
    transition: 'all 1.2s ease',
    '&:hover': {
      borderColor: '#7dffbe',
    },
  };

  const menuSx = {
    fontSize: '0.8rem',
  };

  const menuSelectHandler = (
    _event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value);
  };

  return (
    <FormControl sx={formSx}>
      <Select
        sx={selectSx}
        labelId="format"
        id="format"
        value={format}
        onChange={handleChange}
        renderValue={(value) => (
          <Chip
            sx={{ border: 'none' }}
            key={value}
            label={value}
            variant="outlined"
          />
        )}
      >
        {options.map((option, index) => (
          <MenuItem
            sx={menuSx}
            key={option}
            value={option}
            selected={index === selectedIndex}
            dense={true}
            onClick={(event) => menuSelectHandler(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFormatButton;
