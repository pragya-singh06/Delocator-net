import React, { useState } from 'react';
import Home from './components/Home';
import Results from './components/Results';
import AddEdit from './components/AddEdit';
import FAQ from './components/FAQ';
import Donate from './components/Donate';
import Contact from './components/Contact';
import About from './components/About';
import star from './assets/images/star.png';
import logo from './assets/images/logo_large.png';


function App() {
  const [view, setView] = useState('home');
  const [searchData, setSearchData] = useState({ zip: '', type: '3' });

  const handleSearch = (zip, type) => {
    setSearchData({ zip, type });
    setView('results');
  };

  const NavItem = ({ name, targetView }) => (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
      onClick={() => {
        if (targetView === 'results' && !searchData.zip) {
          setView('home');
        } else {
          setView(targetView);
        }
      }}
    >
      <img
        src={star}
        alt="star"
        style={{
          height: '15px',
          marginBottom: '5px',
          visibility: view === targetView ? 'visible' : 'hidden'
        }}
      />
      <span style={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13px' }}>
        {name}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen w-full font-sans text-gray-900">
      {/* Universal Nav Bar */}
      {view !== 'home' && (
        <nav style={{
          position: 'absolute', top: 0, width: '100%', zIndex: 100,
          display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px 0', gap: '30px'
        }}>
          <NavItem name="Search" targetView="results" />
          <NavItem name="Add & Edit" targetView="add" />
          <NavItem name="Faq" targetView="faq" />
          <img
            src={logo}
            alt="logo"
            style={{ height: '70px', margin: '0 15px', cursor: 'pointer' }}
            onClick={() => setView('home')}
          />
          <NavItem name="Donate" targetView="donate" />
          <NavItem name="Contact" targetView="contact" />
          <NavItem name="About" targetView="about" />
        </nav>
      )}

      {/* Main View Switcher */}
      {view === 'home' && <Home onSearch={handleSearch} />}

      {view === 'results' && (
        <Results
          zip={searchData.zip}
          type={searchData.type}
          onBack={() => setView('home')}
        />
      )}

      {view === 'add' && <AddEdit onBack={() => setView('home')} />}

      {view === 'faq' && (
        <FAQ
          type={searchData.type}
          zip={searchData.zip}
          onBack={() => setView('home')}
        />
      )}

      {view === 'donate' && (
        <Donate
          type={searchData.type}
          onBack={() => setView('home')}
        />
      )}

      {view === 'about' && (
        <About
          type={searchData.type}
          zip={searchData.zip}
          onBack={() => setView('home')}
        />
      )}

   {view === 'contact' && (
        <Contact onBack={() => setView('home')} />
      )}
    </div>
  );
}

export default App;