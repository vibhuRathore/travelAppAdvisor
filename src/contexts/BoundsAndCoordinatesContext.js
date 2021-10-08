import { createContext, useContext, useState } from 'react';

export const BoundsAndCoordinatesContext = createContext(null);
export const BoundsAndCoordinatesUpdateContext = createContext(() => {});

export function useBoundsAndCoordinates() {
  return useContext(BoundsAndCoordinatesContext);
}

export function useBoundsAndCoordinatesUpdate() {
  return useContext(BoundsAndCoordinatesUpdateContext);
}

export function BoundsAndCoordinatesProvider({ children }) {
  const [boundsAndCoordinates, setBoundsAndCoordinates] = useState(null);

  return (
    <BoundsAndCoordinatesContext.Provider value={boundsAndCoordinates}>
      <BoundsAndCoordinatesUpdateContext.Provider
        value={setBoundsAndCoordinates}
      >
        {children}
      </BoundsAndCoordinatesUpdateContext.Provider>
    </BoundsAndCoordinatesContext.Provider>
  );
}
