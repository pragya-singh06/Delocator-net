import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

import bg1 from '../assets/images/background1.jpg';
import bg2 from '../assets/images/background2.jpg';
import bg3 from '../assets/images/background3.jpg';

const mapContainerStyle = { width: '100%', height: '100%' };

const GOOGLE_MAPS_LIBRARIES = ['marker', 'places'];

const CHAIN_KEYWORDS = [
  // ─── Coffee / Cafés ────────────────────────────────────────────────────────
  'starbucks', 'dunkin', 'peet', 'caribou', 'tim horton', 'costa coffee', 
  'biggby', 'scooter', 'dutch bros', 'coffee bean', 'panera', 'mcdonald', 
  'mccafe', 'taco bell', 'burger king', 'sonic', 'einstein bros', 'bruegger', 
  'first watch', 'ihop', 'denny', 'la la land', 'philz', 'blue bottle', 
  'dutch bros', 'gloria jean', 'java house', 'coffee time', 'pj\'s coffee','mojo','arwa','7 brew',

  // ─── Bookstores ─────────────────────────────────────────────────────────────
  'barnes', 'noble', 'half price book', 'books-a-million', 'hastings', 
  'borders', 'powell', 'kinokuniya', 'hudson book', 'vroman',

  // ─── Movie Theaters ──────────────────────────────────────────────────────────
  'amc', 'regal', 'cinemark', 'cineplex', 'imax', 'marcus theater', 
  'marcus theatre', 'bow tie', 'harkins', 'showcase', 'century theater', 
  'century theatre', 'mjr', 'emagine', 'goodrich', 'alamo drafthouse', 
  'regency', 'laemmle', 'landmark theater', 'landmark theatre', 'cgv',

  // ─── Music / Record Stores ───────────────────────────────────────────────────
  'best buy', 'walmart', 'target', 'fye', 'guitar center', 'sam ash', 
  'music & arts', 'amoeba', 'rasputin', ' Newbury comics',

  // ─── Organic / Grocery ───────────────────────────────────────────────────────
  'whole foods', 'trader joe', 'sprouts', 'fresh thyme', 'earth fare', 
  'natural grocer', 'vitamin cottage', 'wegmans', 'meijer', 'kroger', 
  'safeway', 'albertson', 'publix', 'aldi', 'costco', 'sam\'s club', 
  'fresh market', 'giant food', 'stop & shop', 'food lion', 'h-e-b', 'heb', 
  'winn-dixie', 'central market', 'tom thumb', 'vons', 'ralphs', 'pavilions', 
  'smart & final', 'bristol farms', 'gelson', 'erewhon', 'h mart', '99 ranch','randalls',
];

function getNormalizedCorporateName(name) {
  if (!name) return null;
  
  const lowerName = name.toLowerCase().trim();
  
  const matched = CHAIN_KEYWORDS.find((kw) => {
    const cleanKw = kw.trim().toLowerCase();
    return lowerName.includes(cleanKw);
  });
  
  if (matched) {
    return matched.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  return null;
}

function isChain(name, types = []) {
  return !!getNormalizedCorporateName(name);
}

// ─── Category map ────────────────────────────────────────────────────────────
const CATEGORY_MAP = {
  '3': 'cinema theater',
  '1': 'coffee shop cafe',
  '2': 'bookstore',
  '9': 'record music store',
  '0': 'organic grocery health food',
};

const Results = ({ zip: initialZip, type: initialType, onBack }) => {
  const backgrounds = [bg1, bg2, bg3];
  const [currentBG, setCurrentBG]   = useState(0);
  const [zipInput, setZipInput]     = useState(initialZip || '90210');
  const [typeInput, setTypeInput]   = useState(initialType || '3');
  const [mapCenter, setMapCenter]   = useState({ lat: 34.0522, lng: -118.2437 });
  const [mapZoom, setMapZoom]       = useState(11);
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [allStores, setAllStores]   = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const markersRef = useRef([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    const id = setInterval(
      () => setCurrentBG((p) => (p + 1) % backgrounds.length),
      5000,
    );
    return () => clearInterval(id);
  }, [backgrounds.length]);

  const localStores     = allStores.filter((s) => s.isLocal);
  const corporateStores = allStores.filter((s) => !s.isLocal);

  useEffect(() => {
    if (!mapInstance || allStores.length === 0 || !window.google?.maps) return;
    
    const bounds = new window.google.maps.LatLngBounds();
    allStores.forEach((store) => {
      bounds.extend({ lat: store.lat, lng: store.lng });
    });
    
    mapInstance.fitBounds(bounds);
    
    if (allStores.length === 1) {
      mapInstance.setZoom(14);
    }
  }, [mapInstance, allStores]);

  useEffect(() => {
    if (!mapInstance || !isLoaded) return;
    if (!window.google?.maps?.marker?.AdvancedMarkerElement) return;

    markersRef.current.forEach((m) => { if (m) m.map = null; });
    markersRef.current = [];

    const { AdvancedMarkerElement } = window.google.maps.marker;

    const newMarkers = allStores.map((store) => {
      const { PinElement } = window.google.maps.marker;
      const pin = new PinElement({
        background: store.isLocal ? '#1d6331' : '#b91c1c',
        borderColor: store.isLocal ? '#145226' : '#7f1d1d',
        glyphColor: '#ffffff',
      });

      const marker = new AdvancedMarkerElement({
        map: mapInstance,
        position: { lat: store.lat, lng: store.lng },
        title: store.name,
        content: pin.element,
      });

      marker.addListener('gmp-click', () => handleStoreSelect(store));
      return marker;
    });

    markersRef.current = newMarkers;

    return () => {
      markersRef.current.forEach((m) => { if (m) m.map = null; });
      markersRef.current = [];
    };
  }, [mapInstance, allStores, isLoaded]);

  const handleDelocateSubmit = useCallback(
    (e, overrideZip, overrideType) => {
      if (e) e.preventDefault();
      if (!isLoaded) return;
      if (!window.google?.maps?.places) return;

      const zip  = overrideZip  ?? zipInput;
      const type = overrideType ?? typeInput;

      setSelectedStore(null);
      setIsSearching(true);

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode(
        { address: zip, componentRestrictions: { country: 'US' } },
        (results, status) => {
          if (status !== 'OK' || !results?.length) {
            setIsSearching(false);
            alert(`Could not locate zip code "${zip}". Status: ${status}`);
            return;
          }

          const loc = results[0].geometry.location;
          const location = { lat: loc.lat(), lng: loc.lng() };

          setMapCenter(location);
          setMapZoom(13);
          if (mapInstance) mapInstance.panTo(location);

          const keyword = CATEGORY_MAP[type] || 'business';
          const service = new window.google.maps.places.PlacesService(mapInstance);

          service.nearbySearch(
            { location, radius: 25000, keyword },
            (placesResults, placesStatus) => {
              setIsSearching(false);

              if (
                placesStatus !== window.google.maps.places.PlacesServiceStatus.OK ||
                !placesResults
              ) {
                setAllStores([]);
                return;
              }

              const parsed = placesResults.map((place, i) => {
                const corporateBrandName = getNormalizedCorporateName(place.name);
                const isLocalStore = !corporateBrandName;

                return {
                  id:      place.place_id || i,
                  name:    isLocalStore ? place.name : corporateBrandName,
                  address: place.vicinity || 'Address on map',
                  city:    results[0].formatted_address,
                  zip,
                  lat:     place.geometry.location.lat(),
                  lng:     place.geometry.location.lng(),
                  isLocal: isLocalStore,
                  rating:  place.rating ?? 'N/A',
                  review:  `Located near ${place.vicinity}.`,
                };
              });

              setAllStores(parsed);
            },
          );
        },
      );
    },
    [isLoaded, mapInstance, zipInput, typeInput],
  );

  useEffect(() => {
    if (initialZip && isLoaded && mapInstance) {
      handleDelocateSubmit(null, initialZip, initialType);
    }
  }, [isLoaded, mapInstance]);

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setMapZoom(15);
    if (mapInstance) mapInstance.panTo({ lat: store.lat, lng: store.lng });
    else setMapCenter({ lat: store.lat, lng: store.lng });
  };

  const handleMapLoad = useCallback((map) => {
    setMapInstance(map);
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#111', fontFamily: "'Rokkitt', serif" }}>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {backgrounds.map((img, index) => (
          <div
            key={index}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              transition: 'opacity 2.5s ease-in-out',
              opacity: index === currentBG ? 1 : 0,
            }}
          />
        ))}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }} />
      </div>

      <main style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', padding: '120px 20px 100px', height: '100%', overflowY: 'auto' }}>
        <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '1200px', borderRadius: '15px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '90%' }}>

          <form
            onSubmit={handleDelocateSubmit}
            style={{ padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <h2 style={{ color: '#1d6331', margin: 0, fontSize: '32px', fontWeight: 'normal', fontFamily: "'Desyrel', sans-serif", textTransform: 'uppercase' }}>
                Search
              </h2>
              
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px' }}>
              <span style={{ fontWeight: 'bold' }}>I want</span>
              <select
                value={typeInput}
                onChange={(e) => setTypeInput(e.target.value)}
                style={{ borderBottom: '1px solid #ccc', borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '4px 2px', color: '#333', backgroundColor: 'transparent', fontFamily: "'Rokkitt', serif", fontSize: '15px', fontWeight: 'bold' }}
              >
                <option value="3">Movies</option>
                <option value="1">Coffee Shops</option>
                <option value="2">Bookstores</option>
                <option value="9">Music</option>
                <option value="0">Organic Food</option>
              </select>
              <span style={{ fontWeight: 'bold' }}>in</span>
              <input
                type="text"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                style={{ width: '65px', borderBottom: '1px solid #ccc', borderTop: 'none', borderLeft: 'none', borderRight: 'none', textAlign: 'center', color: '#333', fontWeight: 'bold', backgroundColor: 'transparent', fontFamily: "'Rokkitt', serif", fontSize: '15px' }}
              />
              <button
                type="submit"
                disabled={isSearching || !isLoaded}
                style={{ backgroundColor: isSearching ? '#aaa' : '#1d6331', color: 'white', padding: '8px 22px', borderRadius: '25px', border: 'none', fontWeight: 'bold', fontSize: '13px', marginLeft: '10px', cursor: isSearching ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}
              >
                {isSearching ? 'Searching…' : 'Delocate!'}
              </button>
            </div>
          </form>

          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

            <div style={{ width: '400px', borderRight: '1px solid #eee', overflowY: 'auto', backgroundColor: '#fdfdfd', padding: '25px 30px' }}>

              <h3 style={{ color: '#1d6331', fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #1d6331', display: 'inline-block', marginBottom: '20px', letterSpacing: '0.5px' }}>
                Local Stores ({localStores.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                {localStores.length > 0 ? localStores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => handleStoreSelect(store)}
                    style={{ padding: '15px', borderLeft: '4px solid #1d6331', backgroundColor: selectedStore?.id === store.id ? '#f0fdf4' : 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '0 8px 8px 0', cursor: 'pointer', transition: 'all 0.2s ease' }}
                  >
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold', color: '#111' }}>{store.name}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#555', textTransform: 'uppercase', fontWeight: 'bold' }}>{store.address}</p>
                    <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#999', fontWeight: 'bold' }}>Rating: ★ {store.rating}</p>
                  </div>
                )) : (
                  <p style={{ fontSize: '14px', color: '#777', fontStyle: 'italic' }}>
                    {isSearching ? 'Searching for stores…' : 'Search a zip code to find local stores.'}
                  </p>
                )}
              </div>

              <h3 style={{ color: '#b91c1c', fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #b91c1c', display: 'inline-block', marginBottom: '20px', letterSpacing: '0.5px' }}>
                Corporate Chains ({corporateStores.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.9 }}>
                {corporateStores.length > 0 ? corporateStores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => handleStoreSelect(store)}
                    style={{ padding: '15px', borderLeft: '4px solid #b91c1c', backgroundColor: selectedStore?.id === store.id ? '#fef2f2' : '#f9f9f9', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', borderRadius: '0 8px 8px 0', cursor: 'pointer', transition: 'all 0.2s ease' }}
                  >
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '15px', fontWeight: 'bold', color: '#333' }}>{store.name}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666', fontWeight: 'bold' }}>{store.address}</p>
                  </div>
                )) : (
                  <p style={{ fontSize: '14px', color: '#777', fontStyle: 'italic' }}>No corporate chains flagged in this search.</p>
                )}
              </div>
              <div style={{ height: '40px' }} />
            </div>

            <div style={{ flex: 1, backgroundColor: '#e5e3df', position: 'relative' }}>
              {!isLoaded ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666', fontWeight: 'bold' }}>
                  Loading map…
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={mapZoom}
                  onLoad={handleMapLoad}
                  options={{
                    mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID',
                  }}
                >
                  {selectedStore && (
                    <InfoWindow
                      position={{ lat: selectedStore.lat, lng: selectedStore.lng }}
                      onCloseClick={() => setSelectedStore(null)}
                    >
                      <div style={{ padding: '6px', maxWidth: '240px', color: '#222', fontFamily: "'Rokkitt', serif" }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 'bold', color: selectedStore.isLocal ? '#1d6331' : '#b91c1c' }}>
                          {selectedStore.name}
                        </h4>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#555', fontWeight: 'bold' }}>{selectedStore.address}</p>
                        <div style={{ borderTop: '1px solid #ddd', paddingTop: '6px' }}>
                          <span style={{ color: '#eab308', fontWeight: 'bold', fontSize: '13px' }}>★ {selectedStore.rating}</span>
                          <p style={{ margin: '4px 0 0', fontSize: '12px', fontStyle: 'italic', color: '#444', lineHeight: '1.4' }}>
                            "{selectedStore.review}"
                          </p>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ padding: '15px 30px', backgroundColor: '#f1f1f1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', color: '#444' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#1d6331', borderRadius: '50%' }} /> Local stores
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', color: '#444' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#b91c1c', borderRadius: '50%' }} /> Corporate stores
              </div>
            </div>
            <span style={{ fontSize: '12px', color: '#1d6331', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>
              View website
            </span>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Results;