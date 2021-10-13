/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import {
  AppBar,
  Autocomplete,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import debounce from 'lodash.debounce';
import { useViewport, useViewportUpdate } from '../../contexts/ViewportContext';
import { getAutocompletionData } from '../../api';

export default function Header() {
  const setViewportContext = useViewportUpdate();
  const viewportContext = useViewport();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedOptionsFetcher = useCallback(
    debounce(
      (searchText) =>
        getAutocompletionData(searchText).then((data) => {
          setIsLoading(false);
          setOptions(data);
        }),
      400
    ),
    []
  );

  useEffect(() => {
    if (inputValue.length < 3) {
      setOptions([]);
      return;
    }
    setIsLoading(true);
    debouncedOptionsFetcher(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (!value) return;
    const { latitude, longitude } = value;
    setViewportContext({ ...viewportContext, latitude, longitude });
  }, [value]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          sx={{ display: { xs: 'none', sm: 'block', marginRight: 'auto' } }}
        >
          Travel Advisor
        </Typography>
        <Typography
          variant="h6"
          sx={{ display: { xs: 'none', md: 'block' }, marginX: 10 }}
        >
          Explore new places
        </Typography>
        <Autocomplete
          id="search-place-autocomplete"
          clearOnEscape
          autoHighlight
          includeInputInList
          autoComplete
          sx={{
            width: 250,
            marginRight: { xs: 1, md: 0 },
            marginLeft: { xs: 'auto', md: 0 },
          }}
          renderInput={(params) => (
            <TextField
              sx={{ color: 'white' }}
              {...params}
              label="Search..."
              variant="filled"
            />
          )}
          filterOptions={(x) => x}
          options={options}
          value={value}
          isOptionEqualToValue={(option, value) => {
            return JSON.stringify(option) === JSON.stringify(value);
          }}
          onChange={(e, newValue) => setValue(newValue)}
          onInputChange={(e, newInput) => setInputValue(newInput)}
          loading={isLoading}
        />
      </Toolbar>
    </AppBar>
  );
}
