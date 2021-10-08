import { createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import Header from './components/Header';
import List from './components/List';
import Map from './components/Map';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100vw' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
