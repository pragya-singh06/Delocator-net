import React, { useState, useEffect } from 'react';

// Imports
import bg1 from '../assets/images/background1.jpg';
import bg2 from '../assets/images/background2.jpg';
import bg3 from '../assets/images/background3.jpg';
import logo from '../assets/images/logo_large.png';
import starTrio from '../assets/images/star_trio.png';

const Home = ({ onSearch }) => {
  const [zip, setZip] = useState('90210');
  const [type, setType] = useState('3');
  const [currentBG, setCurrentBG] = useState(0);

  const backgrounds = [bg1, bg2, bg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBG((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#111', fontFamily: "'Rokkitt', serif" }}>
      
      {/* 1. BACKGROUND CYCLE LAYER */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {backgrounds.map((img, index) => (
          <div
            key={index}
            style={{ 
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'opacity 2s ease-in-out',
              opacity: index === currentBG ? 1 : 0,
              zIndex: 0
            }}
          />
        ))}
        {/* Dark overlay to make text pop */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>
      </div>

      {/* 2. CENTERED CONTENT LAYER */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white' 
      }}>
        
        <img src={logo} alt="Logo" style={{ width: '150px', marginBottom: '20px' }} />
        
        <h1 style={{ fontSize: '4rem', fontWeight: 'normal', margin: '0 0 10px 0', textShadow: '2px 2px 10px rgba(0,0,0,0.5)', fontFamily: "'Desyrel', sans-serif" }}>
          HELP YOUR COMMUNITY
        </h1>

        <img src={starTrio} alt="stars" style={{ height: '30px', marginBottom: '20px', filter: 'brightness(0) invert(1)' }} />

        <p style={{ fontSize: '1.5rem', fontStyle: 'italic', maxWidth: '600px', marginBottom: '40px', fontFamily: "'Rokkitt', serif" }}>
          find independently owned & run stores in your neighborhood
        </p>

        {/* 3. SEARCH BAR STRIP */}
        <form 
          onSubmit={(e) => { e.preventDefault(); onSearch(zip, type); }}
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.95)', 
            padding: '20px 40px', 
            borderRadius: '50px', 
            display: 'flex', 
            gap: '20px', 
            alignItems: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ color: '#444', fontSize: '1.2rem', fontFamily: "'Rokkitt', serif", fontWeight: 'bold' }}>
            I want 
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', border: 'none', borderBottom: '2px solid #ccc', outline: 'none', backgroundColor: 'transparent', fontFamily: "'Rokkitt', serif", fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}
            >
              <option value="3">Movies</option>
              <option value="1">Coffee Shops</option>
              <option value="2">Bookstores</option>
              <option value="9">Music</option>
              <option value="0">Organic Food</option>
            </select>
          </div>

          <div style={{ color: '#444', fontSize: '1.2rem', fontFamily: "'Rokkitt', serif", fontWeight: 'bold' }}>
            in 
            <input 
              type="text" 
              value={zip} 
              onChange={(e) => setZip(e.target.value)}
              style={{ marginLeft: '10px', width: '80px', textAlign: 'center', border: 'none', borderBottom: '2px solid #ccc', outline: 'none', backgroundColor: 'transparent', fontFamily: "'Rokkitt', serif", fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#1d6331', 
              color: 'white', 
              padding: '12px 30px', 
              borderRadius: '30px', 
              fontWeight: 'bold', 
              border: 'none', 
              cursor: 'pointer',
              fontFamily: "'Rokkitt', serif",
              fontSize: '1.1rem'
            }}
          >
            Delocate!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;