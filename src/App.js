import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from './screens/home';
import ShowDetailsScreen from './screens/detailpage';
import Navbar from './components/navbar';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/details/:showId" element={<ShowDetailsScreen />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;