import React, { useState, useEffect } from 'react';

// Backgrounds for consistency
import bg1 from '../assets/images/background1.jpg';
import bg2 from '../assets/images/background2.jpg';
import bg3 from '../assets/images/background3.jpg';

const Donate = ({ onBack, type }) => {
  const backgrounds = [bg1, bg2, bg3];
  const [currentBG, setCurrentBG] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBG((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Payment Redirection Handlers
  const handlePayPalDonate = () => {
    window.open('https://www.paypal.me/pragyasingh646', '_blank');
  };

  const handleCreditCardDonate = () => {
    // ⚠️ REPLACE with your Stripe payment link, BuyMeACoffee, or custom gateway link
    window.open('https://buy.stripe.com/test_00waEWfoV3EKd6Idf31ZS00', '_blank');
  };

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

      {/* 2. THE FLOATING RECTANGLE CONTAINER */}
      <main style={{ 
        position: 'relative', 
        zIndex: 10, 
        display: 'flex', 
        justify: 'center', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '50px 20px 80px', 
        height: '100%', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          width: '100%', 
          maxWidth: '1100px', 
          borderRadius: '15px', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          height: '80vh', 
          maxHeight: '85vh',
          alignSelf: 'center',
          overflow: 'hidden'
        }}>
          
          {/* DONATE HEADER BAR (Matching modern FAQ and AddEdit styling) */}
          <div style={{ padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
            <h2 style={{ color: '#1d6331', margin: 0, fontSize: '32px', fontWeight: 'normal', fontFamily: "'Desyrel', sans-serif", textTransform: 'uppercase' }}>
              Donate
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span onClick={onBack} style={{ fontSize: '13px', color: '#888', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>
                ← Go Back to Search 
              </span>
            </div>
          </div>

          {/* DONATE CONTENT AREA */}
          <div style={{ display: 'flex', flex: 1, overflowY: 'auto', padding: '35px 40px' }}>
            
            {/* LEFT SIDE: MAIN MESSAGE */}
            <div style={{ flex: 2, paddingRight: '40px', borderRight: '1px solid #eee' }}>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '0.5px' }}>
                  Make a Donation
                </h3>
                <p style={{ color: '#444', lineHeight: '1.8', fontSize: '15.5px' }}>
                  Thank you for supporting Delocator.net. This website began as an art project and is maintained by one person. I never imagined in 2005 that this site would still be used with frequency in 2011. It doesn't cost too much to maintain the site, nonetheless, there are fees and labor that I undertake because I believe in the project. Any donation that you want to make, large or small, will only be applied to maintaining the Delocator website.
                </p>
              </div>

              {/* DONATION ACTIONS */}
              <div style={{ backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '10px', border: '1px solid #eee' }}>
                <p style={{ margin: '0 0 15px 0', fontWeight: 'bold', color: '#333', fontSize: '15px' }}>Support the project:</p>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button 
                    onClick={handlePayPalDonate}
                    style={{ backgroundColor: '#0070ba', color: 'white', padding: '12px 28px', borderRadius: '25px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s', fontSize: '14px' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#005ea6'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0070ba'}
                  >
                    Donate via PayPal
                  </button>
                  <button 
                    onClick={handleCreditCardDonate}
                    style={{ backgroundColor: '#1d6331', color: 'white', padding: '12px 28px', borderRadius: '25px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s', fontSize: '14px' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#144d24'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1d6331'}
                  >
                    Credit Card
                  </button>
                </div>
                <p style={{ marginTop: '15px', fontSize: '12.5px', color: '#777', fontStyle: 'italic' }}>
                  * Even the price of a cup of coffee helps!
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: INFO PANELS */}
            <div style={{ flex: 1, paddingLeft: '40px', display: 'flex', flexDirection: 'column', gap: '35px' }}>
              <div>
                <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                  What you need to know
                </h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  Your donation will only be used to maintain and support Delocator.net. You can donate any amount of money securely using your preferred credit card network or your personal PayPal account dashboard.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                  Help Clean Up Labels
                </h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  Notice a chain store sneaking by your local directory tabs? Skip manual entry databases entirely. Hit our help portal to start an account ticket so we can tune up our algorithms!
                </p>
              </div>

              <div>
                <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                  Open Source Code
                </h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  Delocator is entirely community focused! Our UI structures, string patterns, and API mapping components are hosted on GitHub. Feel free to download or refactor the project files.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;