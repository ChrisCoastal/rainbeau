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
  const [open, setOpen] = useState(false);
  // const [formats, setFormats] = useState('');
  // const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const formSx = {
    m: 1,
    p: 0,
    minWidth: '5.6rem',
    border: 'none',
    transition: 'all 1.2s ease',
    '&:hover': {
      borderColor: '#7dffbe',
    },
  };

  const menuSelectHandler = (
    _event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    console.log(index);

    setSelectedIndex(index);
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);

    setFormat(event.target.value);
  };

  return (
    <FormControl sx={formSx}>
      <Select
        labelId="format"
        id="format"
        value={format}
        onChange={handleChange}
        renderValue={(value) => <Chip key={value} label={value} />}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            value={option}
            selected={index === selectedIndex}
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
