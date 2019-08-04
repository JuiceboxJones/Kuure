import React from 'react';
import './App.css';
import Collabs from './Components/Collabs'
import Header from './Components/Header';
import Sales from './Components/Sales';

function App() {
  return (
    <div className="App-ctr">
      <header className='app'>
      <Header/>
      </header>
      <main className='mn-ctr'>
      <Sales/>
      <Collabs/>
      </main>
    </div>
  );
}

export default App;
