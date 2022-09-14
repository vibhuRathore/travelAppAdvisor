import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import { ErrorRounded } from '@mui/icons-material';
import type { WeatherSuccessResp } from '../../interfaces/weatherResponse';

export default function WeatherCard({
  weatherData,
}: {
  weatherData: WeatherSuccessResp | null;
}) {
  const theme = useTheme();
  if (!weatherData) {
    return (
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1000,
          top: 5,
          right: 5,
          display: 'flex',
        }}
      >
        <Tooltip title="No weather data!" placement="left">
          <ErrorRounded color="error" />
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 1000,
        top: 5,
        right: 5,
        display: 'flex',
        paddingBlock: '0.25rem',
        paddingInline: '0.7rem',
        borderRadius: 1,
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[4],
      }}
    >
      <Box display="flex" flexDirection="column" mr="0.7rem">
        <Box display="flex" alignItems="center" justifyContent="space-around">
          <img height="60px" src={weatherData.current?.condition.icon} alt="" />
          <Typography variant="h4">
            {weatherData.current.temp_c.toFixed(0)}
            <sup style={{ fontSize: '0.5em' }}>°C</sup>
          </Typography>
        </Box>
        <Typography sx={{ letterSpacing: '-0.03rem' }}>
          {weatherData.current.condition.text}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="caption" display="block">
          Precip: {weatherData.current.precip_mm}mm
        </Typography>
        <Typography variant="caption" display="block">
          Humidity: {weatherData.current.humidity}%
        </Typography>
        <Typography variant="caption" display="block">
          Wind: {weatherData.current.wind_kph}km/h
        </Typography>
        <Typography variant="caption" display="block">
          UV Index: {weatherData.current.uv}
        </Typography>
      </Box>
    </Box>
  );
}
