import React, { useState, useEffect } from 'react';

import bg1 from '../assets/images/background1.jpg';
import bg2 from '../assets/images/background2.jpg';
import bg3 from '../assets/images/background3.jpg';

const AddEdit = ({ onBack }) => {
  const backgrounds = [bg1, bg2, bg3];
  const [currentBG, setCurrentBG] = useState(0);
  
  const [isHuman, setIsHuman] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'incorrect-label',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBG((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      issueType: 'incorrect-label',
      message: ''
    });
    setFormStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isHuman) {
      alert("Please check the 'I'm not a robot' box first!");
      return;
    }

    setFormStatus('Sending...');

    try {
      const response = await fetch('https://formspree.io/f/xjgqwwya', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _to: 'pragya.singh6906@gmail.com',
          subject: `Delocator Support: ${formData.issueType}`,
          ...formData
        })
      });

      if (response.ok) {
        setFormStatus('Success! Your inquiry has been sent.');
        handleReset();
      } else {
        setFormStatus('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormStatus('Error sending email. Check your internet connection.');
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#111', fontFamily: "'Rokkitt', serif" }}>
      
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
          
          <div style={{ padding: '20px 30px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: '#1d6331', margin: 0, fontSize: '32px', fontWeight: 'normal', fontFamily: "'Desyrel', sans-serif", textTransform: 'uppercase' }}>
              Delocator Help & Feedback
            </h1>
            <span onClick={onBack} style={{ fontSize: '12px', color: '#888', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>
              ← Go Back to Search
            </span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '30px 40px' }}>
            <div style={{ color: '#444', lineHeight: '1.6', fontSize: '15px' }}>
              
              <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>EXPLORING THE MAP</h3>
              <p style={{ marginBottom: '25px' }}>
                Delocator queries live Google Maps API locations within your zip code area. Our system processes real-time queries to cleanly separate mega-corporates from independently owned local establishments. Use our delocator to find alternative coffee shops, small bookstores, record shops, independent movie cinemas, and organic family-owned grocers near you.
              </p>

              <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>REPORTING LABELS & MISINFORMATION</h3>
              <p style={{ marginBottom: '35px' }}>
                Because our system utilizes a search method using partial brand name keywords (e.g., "Starbucks", "Barnes & Noble") to sort businesses, a local storefront or stylized corporate branch can occasionally get mixed up or sorted into the wrong directory tab. If you find a corporate chain hiding in the Local directory, or an independent shop flagged as a major corporation, please click the captcha below and notify us using our internal support query form. 
              </p>

              <p style={{ fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>1. SECURITY CHECKPOINT: PLEASE CONFIRM YOU ARE HUMAN</p>
              
              <div style={{ border: '1px solid #ccc', padding: '15px', width: '300px', display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#f9f9f9', marginBottom: '25px', borderRadius: '4px' }}>
                  <input 
                    type="checkbox" 
                    checked={isHuman}
                    onChange={(e) => setIsHuman(e.target.checked)}
                    style={{ transform: 'scale(1.5)', cursor: 'pointer' }} 
                  />
                  <span style={{ fontSize: '14px' }}>I'm not a robot</span>
                  <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" style={{ height: '30px', marginLeft: 'auto' }} />
              </div>

              {isHuman && (
                <div style={{ animation: 'fadeIn 0.5s ease-in-out', borderTop: '2px solid #1d6331', paddingTop: '25px', marginTop: '25px' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '20px', color: '#333', maxWidth: '600px', margin: '0 auto 20px', textAlign: 'center' }}>2. SUBMIT AN ACCOUNTABILITY INQUIRY OR BUG REPORT</p>
                  
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: 'bold', fontSize: '13px', color: '#555' }}>Your Name:</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: 'bold', fontSize: '13px', color: '#555' }}>Your Email Address:</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: 'bold', fontSize: '13px', color: '#555' }}>Type of Inquiry:</label>
                      <select 
                        name="issueType" 
                        value={formData.issueType}
                        onChange={handleInputChange}
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px', backgroundColor: 'white' }}
                      >
                        <option value="incorrect-label">Corporate/Local Labeling Mistake</option>
                        <option value="missing-store">Missing Establishment from Map Filters</option>
                        <option value="bug-report">General Website / Map Glitch</option>
                        <option value="other">General Question / Feedback</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontWeight: 'bold', fontSize: '13px', color: '#555' }}>Explain the Issue (Include Store Name & Zip Code):</label>
                      <textarea 
                        name="message" 
                        rows="5" 
                        required 
                        value={formData.message}
                        onChange={handleInputChange}
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px', resize: 'vertical' }}
                        placeholder="Amc at the corner of Main St and Oak Ave is still an Amc!!"
                      ></textarea>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                      <button type="submit" style={{ 
                        backgroundColor: '#1d6331', color: 'white', padding: '12px 30px', cursor: 'pointer', borderRadius: '25px', border: 'none', fontWeight: 'bold', fontSize: '14px'
                      }}>
                        Submit Inquiry
                      </button>
                      
                      <button type="button" onClick={handleReset} style={{ 
                        backgroundColor: '#eee', border: '1px solid #ccc', padding: '8px 20px', cursor: 'pointer', borderRadius: '25px', fontSize: '13px', color: '#666'
                      }}>
                        Clear Fields
                      </button>
                    </div>

                    {formStatus && (
                      <div style={{ 
                        marginTop: '10px', 
                        padding: '12px', 
                        borderRadius: '6px', 
                        backgroundColor: formStatus.includes('Success') ? '#e6f4ea' : '#fce8e6', 
                        color: formStatus.includes('Success') ? '#137333' : '#c5221f',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}>
                        {formStatus}
                      </div>
                    )}

                  </form>
                </div>
              )}
              
              <div style={{ height: '60px' }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddEdit;