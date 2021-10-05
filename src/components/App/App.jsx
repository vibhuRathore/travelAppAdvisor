import { CssBaseline, Grid } from '@material-ui/core';

import Header from '../Header';
import List from '../List';
import Map from '../Map';

export default function App() {
  return (
    <>
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
    </>
  );
}
