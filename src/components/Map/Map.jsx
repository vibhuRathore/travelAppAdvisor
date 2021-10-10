/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import debounce from 'lodash.debounce';
import { LocationOn } from '@mui/icons-material';
import { useViewportUpdate } from '../../contexts/ViewportContext';

import 'mapbox-gl/dist/mapbox-gl.css';

// workaround for transpiling error of Mapbox GL JS (slows site)
import mapboxgl from 'mapbox-gl';

mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default function Map() {
  const setViewportContext = useViewportUpdate();
  const [viewport, setViewport] = useState(null);

  const debouncedViewportContextSetter = useCallback(
    debounce((data) => {
      setViewportContext(data);
    }, 750),
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setViewportContext({ ...viewport, longitude, latitude });
        setViewport((previousViewport) => ({
          ...previousViewport,
          latitude,
          longitude,
          zoom: 10,
        }));
      },
      () => {
        const fallbackViewport = {
          latitude: 34.0161,
          longitude: 75.315,
          zoom: 9,
        };
        setViewportContext(fallbackViewport);
        setViewport(fallbackViewport);
      }
    );
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {viewport && (
        <ReactMapGL
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/bhardwaj-snigdh/ckugspu7w4v0q18rz9hbi3rs4"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={({ width, height, latitude, longitude, zoom }) => {
            const newViewport = { width, height, latitude, longitude, zoom };
            setViewport(newViewport);
            debouncedViewportContextSetter(newViewport);
          }}
        >
          <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
            <LocationOn color="error" fontSize="large" />
          </Marker>
        </ReactMapGL>
      )}
    </div>
  );
}
