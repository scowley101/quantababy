// pages/index.js
import React from 'react';
import Sleep from '../components/Sleep';
import Feed from '../components/Feed';
import Nappy from '@/components/nappy';


function HomePage() {
  return (
    <div>
      <h1>Quantababy</h1>
      <Feed />
      <Sleep />    
      <Nappy />
    </div>
  );
}

export default HomePage;
