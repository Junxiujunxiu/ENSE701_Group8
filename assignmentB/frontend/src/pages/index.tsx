import React, { useState } from 'react';  //for use useState function 


export default function Home() {
  return (
    <div className="container"> 
      <img src="/background.png" alt="Background" className="background-image" />
      <div className="front-container">
        <h1>Welcome to SPEED</h1>
        <h3>Explore our database of software practice evidence.</h3>
      </div>
    </div>
  );
}