/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import {
  AppBar,
  Autocomplete,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import debounce from 'lodash.debounce';
import { Search, DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import { useViewport, useViewportUpdate } from '../../contexts/ViewportContext';
import { useColorModeToggle } from '../../contexts/ColorModeContext';
import { getAutocompletionData } from '../../api';

export default function Header() {
  const theme = useTheme();
  const toggleColorMode = useColorModeToggle();
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
    <AppBar sx={{ justifyContent: 'center', height: '4rem' }} position="static">
      <Toolbar>
        <img height="55%" src="/food-tray.png" alt="" />
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            fontSize: { xs: '1rem', sm: '1.5rem' },
            width: { xs: '7ch', sm: 'auto' },
            marginLeft: { xs: 0.3, sm: 1 },
            marginRight: 'auto',
          }}
        >
          Dine-er
        </Typography>
        <Tooltip title="Toggle theme" enterDelay={500}>
          <IconButton
            onClick={toggleColorMode}
            color="default"
            sx={{ marginX: { md: 5 } }}
          >
            {theme.palette.mode === 'light' ? (
              <LightModeRounded />
            ) : (
              <DarkModeRounded />
            )}
          </IconButton>
        </Tooltip>
        <Autocomplete
          id="search-place-autocomplete"
          clearOnEscape
          autoHighlight
          includeInputInList
          autoComplete
          size="small"
          sx={{
            width: { xs: 200, sm: 250 },
            marginRight: { xs: 1, md: 0 },
            marginLeft: { xs: 'auto', md: 0 },
            '& input': { color: 'white' },
            '& label': { color: '#d5d5d5 !important' },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search..."
              InputProps={{
                ...params.InputProps,
                label: 'Search',
                startAdornment: (
                  <>
                    <Search sx={{ color: '#d5d5d5' }} />
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
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
