/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import debounce from 'lodash.debounce';
import { useMediaQuery, useTheme } from '@mui/material';
import { useViewport, useViewportUpdate } from '../../contexts/ViewportContext';
import CustomMarker from './CustomMarker';
import WeatherCard from './WeatherCard';

import 'mapbox-gl/dist/mapbox-gl.css';

// workaround for transpiling error of Mapbox GL JS (slows site)
import mapboxgl from 'mapbox-gl';

mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default function Map({
  places,
  setClickedPlace,
  weatherData,
  isLoading,
}) {
  const theme = useTheme();
  const viewportContext = useViewport();
  const setViewportContext = useViewportUpdate();
  const [viewport, setViewport] = useState(null);
  const isMobile = useMediaQuery('(max-width: 600px)');

  console.log('Theme Toggled', theme.palette.mode);

  const debouncedViewportContextSetter = useCallback(
    debounce((data) => {
      setViewportContext(data);
    }, 750),
    []
  );

  useEffect(() => {
    if (!viewportContext) return;
    setViewport(viewportContext);
  }, [viewportContext]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        const currentLocation = { latitude, longitude, zoom: 12 };
        setViewportContext(currentLocation);
        setViewport(currentLocation);
      },
      () => {
        const fallbackViewport = {
          latitude: 30.3165,
          longitude: 78.0322,
          zoom: 12,
        };
        setViewportContext(fallbackViewport);
        setViewport(fallbackViewport);
      }
    );
  }, []);

  const markers = useMemo(() => {
    if (!places || isLoading) return null;
    return places.map((place, i) => (
      <CustomMarker
        key={place.location_id}
        index={i}
        setClickedPlace={setClickedPlace}
        place={place}
        isMobile={isMobile}
      />
    ));
  }, [places, isMobile, isLoading]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {viewport && (
        <>
          <WeatherCard weatherData={weatherData} />
          <ReactMapGL
            style={{ position: 'relative' }}
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            zoom={viewport.zoom}
            width="100%"
            height="100%"
            mapStyle={
              theme.palette.mode === 'dark'
                ? 'mapbox://styles/bhardwaj-snigdh/cl81gemux00co14mpzf3t4ge0'
                : 'mapbox://styles/bhardwaj-snigdh/ckugspu7w4v0q18rz9hbi3rs4'
            }
            preventStyleDiffing
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={({
              width,
              height,
              latitude,
              longitude,
              zoom,
            }) => {
              const newViewport = { width, height, latitude, longitude, zoom };
              setViewport(newViewport);
              debouncedViewportContextSetter(newViewport);
            }}
          >
            {markers}
          </ReactMapGL>
        </>
      )}
    </div>
  );
}
