//import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from 'react';

interface SearchProps {
  setFilterSearchString: (searchString: string) => void,
}

const Search: React.FC<SearchProps> = ({ setFilterSearchString }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    setFilterSearchString(searchString);
  };

  return (
    <Paper
      component="form"
      sx={{ display: 'flex', alignItems: 'center', width: 300 }}
    >
      <InputBase
        onChange={handleInputChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Table"
        inputProps={{ 'aria-label': 'search table' }}
      />
      <IconButton type="button" sx={{}} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Search;
