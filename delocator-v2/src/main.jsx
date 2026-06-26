import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoadScript } from '@react-google-maps/api'

const GOOGLE_MAPS_LIBRARIES = ['marker', 'places'];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your entire application single-instance style */}
    <LoadScript
      id="google-map-script"
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_MAPS_LIBRARIES}
    >
      <App />
    </LoadScript>
  </React.StrictMode>,
)