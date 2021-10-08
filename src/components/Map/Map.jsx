/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import ReactMapGL, { Marker, WebMercatorViewport } from 'react-map-gl';
import debounce from 'lodash.debounce';
import { LocationOn } from '@mui/icons-material';
import { useBoundsAndCoordinatesUpdate } from '../../contexts/BoundsAndCoordinatesContext';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map() {
  const updateBoundsAndCoordinates = useBoundsAndCoordinatesUpdate();
  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: 78,
    zoom: 10,
  });

  const debouncedContextSetter = useCallback(
    debounce((data) => {
      updateBoundsAndCoordinates(data);
    }, 1000),
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setViewport((previousViewport) => ({
        ...previousViewport,
        latitude,
        longitude,
      }));
    });
  }, []);

  useEffect(() => {
    const viewportData = new WebMercatorViewport(viewport);
    const boundsArray = viewportData.getBounds();
    const sw = { lng: boundsArray[0][0], lat: boundsArray[0][1] };
    const ne = { lng: boundsArray[1][0], lat: boundsArray[1][1] };
    const { latitude, longitude } = viewport;

    debouncedContextSetter({ latitude, longitude, bounds: { sw, ne } });
  }, [viewport]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactMapGL
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/bhardwaj-snigdh/ckugspu7w4v0q18rz9hbi3rs4"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={({ width, height, latitude, longitude, zoom }) => {
          setViewport({ width, height, latitude, longitude, zoom });
        }}
      >
        <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
          <LocationOn color="error" fontSize="large" />
        </Marker>
      </ReactMapGL>
    </div>
  );
}
