import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TopratedPage from './pages/TopratedPage';
import UpcomingPage from './pages/UpcomingPage';
import MoviedetailPage from './pages/MoviedetailPage';
import SearchedmoviePage from './pages/SearchedmoviePage';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
            <Route exact path="/"  element={<HomePage />} />
            <Route exact path="/top-rated" element={<TopratedPage />} />
            <Route exact path="/upcoming" element={<UpcomingPage />} />
            <Route exact path="/movie/:id" element={<MoviedetailPage />} />
            <Route exact path="/search" element={<SearchedmoviePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;