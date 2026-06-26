import React, { useState, useEffect } from 'react';

// Backgrounds for consistency
import bg1 from '../assets/images/background1.jpg';
import bg2 from '../assets/images/background2.jpg';
import bg3 from '../assets/images/background3.jpg';

const FAQ = ({ onBack, type, zip }) => {
  const backgrounds = [bg1, bg2, bg3];
  const [currentBG, setCurrentBG] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBG((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const faqs = [
    {
      q: "How does Delocator pull data? Do I need to manually register every shop?",
      a: "Nope! Unlike previous iterations that relied entirely on manually entered data, this updated version queries the live Google Maps API directly. It instantly pulls real-time listings based on your location and separates major corporate chains from independent local gems."
    },
    {
      q: "What does Delocate mean?",
      a: "Delocate is a playful counter-term to the standard corporate 'store locator' widget found on massive multi-national conglomerate websites. Instead of hunting for the nearest corporate outlet, you 'Delocate' to find a locally-focused, independent alternative."
    },
    {
      q: "What if a store is sorted into the wrong category or label?",
      a: "Our algorithm automatically reads through live business titles and runs them through advanced keyword logic strings to sort them. If a local shop gets flagged as a chain, or a massive brand sneaks past into the local directory, click on our 'Add & Edit' panel in the main hub to submit an automated validation query so we can adjust our keyword rules!"
    },
    {
      q: "Why does Delocator.net list the addresses of Starbucks and other chain stores?",
      a: "Web users are free to make their own decisions about where they purchase a cup of coffee. By placing the sheer amount of chain stores next to the (typically shorter) list of locally owned shops, the website attempts to persuade viewers to support local industries."
    },
    {
      q: "...But couldn't somebody use this site to find a Starbucks?",
      a: "Sure, but wouldn't they just go to Starbucks.com if that was what they wanted?"
    },
    {
      q: "Can I use this site outside the US?",
      a: "Right now, the system handles real-time address for US zip codes, but because we are utilizing global mapping APIs, we could potentially scale up our support boundaries for multi-national queries in our upcoming development release cycles!"
    }
  ];

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#111', fontFamily: "'Rokkitt', serif" }}>
      
      {/* 1. BACKGROUND LAYER */}
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
              transition: 'opacity 2.5s ease-in-out',
              opacity: index === currentBG ? 1 : 0
            }}
          />
        ))}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
      </div>

      {/* 2. THE MAIN FAQ CARD CONTAINER */}
      <main style={{ 
        position: 'relative', 
        zIndex: 10, 
        display: 'flex', 
        justify: 'center', 
        justifyContent: 'center',
        alignItems: 'center', 
        padding: '50px 20px 120px', 
        height: '100%', 
        overflowY: 'auto' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          width: '100%', 
          maxWidth: '1100px', 
          borderRadius: '15px', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '80vh',
          maxHeight: '85vh',
          alignSelf: 'center'
        }}>
          
          {/* FAQ HEADER BAR */}
          <div style={{ padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
            <h2 style={{ color: '#1d6331', margin: 0, fontSize: '32px', fontWeight: 'normal', fontFamily: "'Desyrel', sans-serif", textTransform: 'uppercase' }}>
              FAQ
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span onClick={onBack} style={{ fontSize: '13px', color: '#888', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>
                ← Go Back to Search
              </span>
            </div>
          </div>

          {/* FAQ CONTENT AREA */}
          <div style={{ display: 'flex', flex: 1, overflowY: 'auto', padding: '35px 40px' }}>
            
            {/* LEFT SIDE: QUESTIONS */}
            <div style={{ flex: 2, paddingRight: '40px', borderRight: '1px solid #eee' }}>
              {faqs.map((item, index) => (
                <div 
                  key={index} 
                  style={{ 
                    marginBottom: index === faqs.length - 1 ? '40px' : '35px' 
                  }}
                >
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#222', fontWeight: 'bold' }}>
                    Q. {item.q}
                  </h4>
                  <p style={{ margin: 0, fontSize: '14.5px', color: '#555', lineHeight: '1.6' }}>
                    <span style={{ fontWeight: 'bold', color: '#1d6331' }}>Ans.</span> {item.a}
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE: INFO PANELS */}
            <div style={{ flex: 1, paddingLeft: '40px', display: 'flex', flexDirection: 'column', gap: '35px' }}>
              <div>
                <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                  Help Clean Up Labels
                </h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                  Notice a chain store sneaking by your local tabs? Skip manual entry databases entirely. Hit our specialized help portal to issue an account feedback ticket so we can tune up our string analytics algorithms.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                  Open Source Code
                </h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                  Delocator is entirely community focused! Our UI structures, string patterns, and API mapping components are hosted on GitHub. Feel free to download, refactor, or clone the environment for localized branches.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;