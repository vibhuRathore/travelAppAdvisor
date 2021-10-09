import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BoundsAndCoordinatesProvider } from './contexts/BoundsAndCoordinatesContext';
import Header from './components/Header';
import Main from './components/Main';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BoundsAndCoordinatesProvider>
        <Header />
        <Main />
      </BoundsAndCoordinatesProvider>
    </ThemeProvider>
  );
}
