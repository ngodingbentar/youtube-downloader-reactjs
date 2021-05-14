import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <main className="main-section container-custom">
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
