import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useViewportBounds } from '../../contexts/ViewportContext';
import List from '../List';
import Map from '../Map';
import { getPlacesData } from '../../api';

export default function Main() {
  const viewportBounds = useViewportBounds();
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!viewportBounds) return;
    setIsLoading(true);
    const { sw, ne } = viewportBounds;
    getPlacesData(sw, ne, type).then((data) => {
      setIsLoading(false);
      setPlaces(data);
    });
  }, [viewportBounds, type]);

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
        <List
          rating={rating}
          setRating={setRating}
          type={type}
          setType={setType}
          isLoading={isLoading}
          places={places}
        />
      </Grid>
      <Grid item height={{ xs: '60vh', md: '100%' }} xs={12} md={8}>
        <Map />
      </Grid>
    </Grid>
  );
}
