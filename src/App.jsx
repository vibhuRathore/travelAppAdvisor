import ColorModeProvider from './contexts/ColorModeContext';
import { ViewportProvider } from './contexts/ViewportContext';
import Header from './components/Header';
import Main from './components/Main';

export default function App() {
  return (
    <ColorModeProvider>
      <ViewportProvider>
        <Header />
        <Main />
      </ViewportProvider>
    </ColorModeProvider>
  );
}
