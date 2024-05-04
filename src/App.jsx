// App.jsx
import React from 'react';
import Header from './components/Header'; 
import Body from './components/Body';
import FeaturedWaifus from './components/FeaturedWaifus';

function App() {
  return (
    <div className="app">
      <Header title="Rent a Waifu" />
      <Body />
      <FeaturedWaifus />
    </div>
  );
}

export default App;
