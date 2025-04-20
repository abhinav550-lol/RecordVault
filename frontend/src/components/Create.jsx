import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function Create() {
  const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen bg-[#121212]">
      <h1 className="text-2xl poppins mb-4 text-white">Add Record</h1>

      <div className="w-1/2 h-2/3 border border-gray-300 rounded-md p-6 flex flex-col gap-4">
        <FormControl fullWidth size="small">
          <InputLabel
            id="demo-select-small-label"
            sx={{ color: 'white' }}
          >
            What do you want to create?
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={type}
            label="What do you want to create?"
            onChange={handleChange}
            autoFocus
            sx={{
              fontFamily: 'Poppins',
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#90caf9',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#90caf9',
              },
              '.MuiSvgIcon-root': {
                color: 'white',
              },
            }}
          >
            <MenuItem value={10}>Semester Record</MenuItem>
            <MenuItem value={20}>Personal Document</MenuItem>
            <MenuItem value={30}>Certificate</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
