import React, { useState, useEffect } from 'react';

// Backgrounds
import bg1 from '../assets/images/background1.jpg';
import bg2 from '../assets/images/background2.jpg';
import bg3 from '../assets/images/background3.jpg';

const Contact = ({ onBack }) => {
  const backgrounds = [bg1, bg2, bg3];
  const [currentBG, setCurrentBG] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBG((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#111', fontFamily: "'Rokkitt', serif" }}>
      
      {/* 1. BACKGROUND LAYER */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {backgrounds.map((img, index) => (
          <div key={index} style={{ 
              position: 'absolute', inset: 0, backgroundImage: `url(${img})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              transition: 'opacity 2.5s ease-in-out', opacity: index === currentBG ? 1 : 0
          }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
      </div>

      {/* 2. MAIN CARD */}
      <main style={{ 
        position: 'relative', 
        zIndex: 10, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '50px 20px 100px', 
        height: '100%', 
        overflowY: 'auto' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          width: '100%', 
          maxWidth: '1100px', // 👈 Updated from 800px to match AddEdit
          borderRadius: '15px', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '80vh',      // 👈 Updated from 70vh to match AddEdit
          maxHeight: '85vh',   // 👈 Added to match AddEdit
          alignSelf: 'center', 
          overflow: 'hidden'
        }}>
          
          {/* HEADER */}
          <div style={{ padding: '20px 30px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#1d6331', margin: 0, fontSize: '32px', fontWeight: 'normal', fontFamily: "'Desyrel', sans-serif", textTransform: 'uppercase' }}>
              Contact
            </h2>
            <span onClick={onBack} style={{ fontSize: '12px', color: '#888', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>
              ← Go Back to Search
            </span>
          </div>

          {/* CONTENT */}
          <div style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px' }}>
              Have questions, feedback, or more exciting Delocator ideas? Get in touch with us! 
              We are actively monitoring the project and appreciate all community input.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '400px' }}>
              {/* Instagram Link */}
              <a 
                href="https://www.instagram.com/lab.synthe/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  backgroundColor: '#E1306C', color: 'white', padding: '15px', borderRadius: '25px', 
                  textDecoration: 'none', fontWeight: 'bold', fontSize: '15px', transition: 'transform 0.2s'
                }}
              >
                Follow @LabSynthE on Instagram
              </a>

              {/* Email Link */}
              <a 
                href="mailto:pragya.singh6906@gmail.com"
                style={{ 
                  backgroundColor: '#1d6331', color: 'white', padding: '15px', borderRadius: '25px', 
                  textDecoration: 'none', fontWeight: 'bold', fontSize: '15px', transition: 'transform 0.2s'
                }}
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;