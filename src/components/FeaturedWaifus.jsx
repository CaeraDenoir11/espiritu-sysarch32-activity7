import React, { useState, useEffect } from 'react';
import firestore from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './FeaturedWaifus.css';
import orderIcon from './order-icon.png';
import infoIcon from './info-icon.png';

const FeaturedWaifus = () => {
  const [waifus, setWaifus] = useState([]);
  const [selectedWaifu, setSelectedWaifu] = useState(null);
  const [sameNameWaifus, setSameNameWaifus] = useState([]);
  const [largeImageBorder, setLargeImageBorder] = useState('5px solid black'); // Default border color

  useEffect(() => {
    const fetchFeaturedWaifus = async () => {
      try {
        const waifusCollection = collection(firestore, 'waifu');
        const q = query(waifusCollection, where('featured', '==', true));
        const snapshot = await getDocs(q);
        const featuredWaifus = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWaifus(featuredWaifus);
      } catch (error) {
        console.error('Error fetching featured waifus:', error);
      }
    };

    fetchFeaturedWaifus();
  }, []);

  useEffect(() => {
    const fetchSameNameWaifus = async () => {
      if (selectedWaifu) {
        try {
          const waifusCollection = collection(firestore, 'waifu');
          const q = query(waifusCollection, where('name', '==', selectedWaifu.name));
          const snapshot = await getDocs(q);
          const sameNameWaifus = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSameNameWaifus(sameNameWaifus);
        } catch (error) {
          console.error('Error fetching same name waifus:', error);
        }
      }
    };

    fetchSameNameWaifus();
  }, [selectedWaifu]);

  const toggleModal = (waifu) => {
    setSelectedWaifu(waifu);
  };

  const changeLargeImage = (waifu) => {
    setSelectedWaifu(waifu);
    setLargeImageBorder(`5px solid ${getRandomColor()}`);
  };

  const getRandomColor = () => {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // Return the random color in RGB format
    return `rgb(${r},${g},${b})`;
  };

  return (
    <section className='body'>
      <h2>Featured Waifus</h2>
      <div className="card-container">
        {waifus.map(waifu => (
          <div key={waifu.id} className="card">
            <div className="card-image">
              <img 
                src={waifu.imgUrl} 
                alt={waifu.name} 
                className="card-img"
              />
              <div className="button-container">
                <button className="order-button">
                  <img src={orderIcon} alt="Place Order" />
                </button>
                <button className="info-button" onClick={() => toggleModal(waifu)}>
                  <img src={infoIcon} alt="More Info" />
                </button>
              </div>
            </div>
            <div className="card-details">
              <h3 className="card-title">{waifu.name}</h3>
              <p className="card-description">{waifu.description}</p>
              <p className="card-price">Rent Price: {waifu.rentprc}</p>
            </div>
            {/* Close button inside the card */}
            {selectedWaifu === waifu && (
              <button className="close-button" onClick={() => setSelectedWaifu(null)}>X</button>
            )}
          </div>
        ))}
      </div>
      {selectedWaifu && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <div className="waifu-card">
                {/* Close button inside the card */}
                <button className="close-button" onClick={() => setSelectedWaifu(null)}>X</button>
                <img src={selectedWaifu.imgUrl} alt={selectedWaifu.name} className="waifu-image-large" style={{ border: largeImageBorder }} />
                <div className="waifu-images">
                  {/* Display other images with the same name as selectedWaifu */}
                  {sameNameWaifus.map(waifu => (
                    <img
                      key={waifu.id}
                      src={waifu.imgUrl}
                      alt={waifu.name}
                      className="waifu-image-small"
                      onClick={() => changeLargeImage(waifu)}
                    />
                  ))}
                </div>
                <div className="waifu-details">
                  <h3>{selectedWaifu.name}</h3>
                  <h4>Element: {selectedWaifu.element}</h4>
                  <h4>Nation: {selectedWaifu.nation}</h4>
                  <h4>Species: {selectedWaifu.species}</h4>
                  <p>Rent Price: {selectedWaifu.rentprc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedWaifus;
