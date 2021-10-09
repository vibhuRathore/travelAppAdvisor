import { Grid } from '@mui/material';
import List from '../List';
import Map from '../Map';

export default function Main() {
  return (
    <Grid
      container
      height={{ md: 'calc(100vh - 5rem)' }}
      sx={{
        width: '95%',
        marginInline: 'auto',
      }}
    >
      <Grid height={{ xs: '60vh', md: '100%' }} item xs={12} md={4}>
        <List />
      </Grid>
      <Grid item height={{ xs: '60vh', md: '100%' }} xs={12} md={8}>
        <Map />
      </Grid>
    </Grid>
  );
}
