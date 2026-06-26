import React, { useState, useEffect } from 'react';

import bg1 from '../assets/images/background1.jpg';
import bg2 from '../assets/images/background2.jpg';
import bg3 from '../assets/images/background3.jpg';

const About = ({ onBack, type, zip }) => {
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
        justify: 'center', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px 20px 100px', 
        height: '100%', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          width: '100%', 
          maxWidth: '1200px', 
          borderRadius: '15px', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          height: '80vh', 
          maxHeight: '85vh',
          alignSelf: 'center',
          overflow: 'hidden'
        }}>
          
          <div style={{ padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
            <h2 style={{ color: '#1d6331', margin: 0, fontSize: '32px', fontWeight: 'normal', fontFamily: "'Desyrel', sans-serif", textTransform: 'uppercase' }}>
              About
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span onClick={onBack} style={{ fontSize: '13px', color: '#888', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>
                ←  Go Back to Search
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flex: 1, overflowY: 'auto', padding: '35px 40px' }}>
            
            <div style={{ flex: 2, paddingRight: '40px', borderRight: '1px solid #eee' }}>
              <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.5px' }}>
                Our Story
              </h3>
              
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '15px', marginBottom: '30px' }}>
                <p style={{ marginBottom: '20px' }}>
                  Delocator.net launched in 2005 so users could locate independently owned cafés. The Delocator is the opposite of an online retail store locator, common to corporate store websites. In 2006 book stores and movie theaters were added. Finally, in 2009, users can log in to the site, modify their entries and add more types of independently owned stores. Jim Bursch reprogrammed the site so the zip code function works in all areas. Corporate industries invading American neighborhoods, from coffee to book store and movie theater "chains", pose a threat to the authenticity of our unique neighborhoods. Although there is room on the map for shared territories - both the homogenous corporate enterprise and the independent ventures across the nation, our independent, community-operated businesses deserve your dime.
                </p>

                <p style={{ marginBottom: '20px' }}>
                  In An Analysis of the Potential Economic Impact of Austin Unchained (Nov. 15, 2003), Civic Economics reports: "For every $100 in consumer spending at Borders, the total local economic impact is only $13. The same amount spent with BookPeople (an independently owned bookstore) and Waterloo (an independently owned music store) yields more than three times the local economic impact."
                </p>

                <p style={{ marginBottom: '20px' }}>
                  Many independent store owners talk about knowing the community, creating a friendly and supportive atmosphere, and chatting with clients about their kids, school games, and local news. "People say we're cozy, not corporate," said coffee shop owner Holler. "We can make our own rules and we can empower our staff to do so as well. A Starbucks employee doesn't have the pride in ownership that they do at our store."
                </p>

                <p style={{ marginBottom: '20px' }}>
                  Support the underdog and promote a future that includes the culture of small businesses! Independent bookstores are facing a grave challenge. Cody's Books in Berkeley, California was a bona fide cultural institution on Telegraph Avenue. In his recent announcement (May 10, 2006), owner Andy Ross says, "It is with a heavy heart that I must announce that Cody's will be closing our doors at the Telegraph Avenue store for the last time on July 10." In the past fifteen years, Cody's sales have declined by 66%. Cody's is certainly not the only independent bookstore to close its doors. The American Booksellers Association has seen a decline in membership from 5200 bookstores in 1991 to 1702 stores in 2005.
                </p>

                <p style={{ marginBottom: '20px' }}>
                  With chains on the rise, supporting local institutions (and many independent bookstores are truly thought of as cultural institutions) promotes a future that includes our neighborhood bookstores, movie theaters and coffee shops and denies the type of news that Andy Ross so sadly delivers. Become active on Delocator.net and help promote independent businesses across the country!
                </p>
                
                <p style={{ fontStyle: 'italic', backgroundColor: '#f9f9f9', padding: '20px', borderLeft: '4px solid #1d6331', margin: '25px 0', borderRadius: '0 6px 6px 0', fontSize: '14.5px' }}>
                  "For every $100 in consumer spending at Borders, the total local economic impact is only $13. The same amount spent with an independently owned bookstore yields more than three times the local economic impact."
                </p>

                <p style={{ marginBottom: '35px' }}>
                  Support the underdog and promote a future that includes the culture of small businesses! Independent bookstores are facing grave challenges; the American Booksellers Association saw a decline from 5,200 bookstores in 1991 to 1,702 in 2005. Become active on Delocator.net and help promote independent businesses across the country!
                </p>
              </div>

              <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '0.5px' }}>
                Articles in Print
              </h3>
              <ul style={{ fontSize: '13px', color: '#666', listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>• OC Weekly, "Star-bucker," 02/02/06.</li>
                <li>• Seattle Post-Intelligencer, "Web site steers away from corporate chains," 01/24/06.</li>
                <li>• Boston Globe, "Delocate me," 06/19/05.</li>
                <li>• New York Times, "The Little Coffee Shop Around the Corner," 5/4/05.</li>
              </ul>

              <div style={{ height: '80px' }}></div>
            </div>

            <div style={{ flex: 1, paddingLeft: '40px', display: 'flex', flexDirection: 'column', gap: '35px' }}>
              <div>
                <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                  In The Press
                </h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  Delocator.net has been reported on in traditional newspapers and magazines. If you'd like to report on Delocator, use the Contact form to send questions to xtine.
                </p>
              </div>

              <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', border: '1px solid #eaeaea' }}>
                <h3 style={{ color: '#1d6331', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  The blogs that started it
                </h3>
                <ul style={{ fontSize: '13px', color: '#1d6331', fontWeight: 'bold', listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ cursor: 'pointer', textDecoration: 'underline' }}>StayFreeMagazine.org</li>
                  <li style={{ cursor: 'pointer', textDecoration: 'underline' }}>BoingBoing.net</li>
                  <li style={{ cursor: 'pointer', textDecoration: 'underline' }}>LifeHacker.com</li>
                </ul>
              </div>

              <div>
                <h3 style={{ color: '#1d6331', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                  Add a Store
                </h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  <span style={{ color: '#1d6331', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>Click here</span> to add independently owned stores to the database and delocate corporate retail!
                </p>
              </div>

              <div style={{ height: '60px' }}></div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default About;