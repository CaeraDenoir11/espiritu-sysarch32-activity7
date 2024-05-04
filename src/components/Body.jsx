// FeaturedWaifus.jsx
import React, { useState, useEffect } from 'react';
import firestore from '../config/firebase'; // Adjust the path based on your project structure
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Body.css';

const Body = () => {
  const [background, setBody] = useState([]);

  useEffect(() => {
    const fetchBody = async () => {
      try {
        const bgCollection = collection(firestore, 'bg'); // Adjust the collection name here
        const q = query(bgCollection, where('featured', '==', true));
        const snapshot = await getDocs(q);
        const body = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBody(body);
      } catch (error) {
        console.error('Error background:', error);
      }
    };

    fetchBody();
  }, []);

  return (
      <div className="bg-container"> {/* Container for the bg */}
        {background.map(bg => (
          <div key={bg.id}>
            <div>
              <img 
                src={bg.imageUrl} 
                alt={bg.name} 
              />
            </div>
          </div>
        ))}
      </div>
  );
};

export default Body;
