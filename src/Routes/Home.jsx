import React from 'react';
import { Link } from 'react-router-dom';
import './styling.css';

const Home = () => {
  return (
    <div id="container">
      <h1 id="title">Study Independent Kampus Merdeka</h1>
      <p id="subtitle">By RUANGGURU</p>
      <h2 id="section">Home</h2>
      <Link to="/student" id="btn" data-testid="student-btn">
        <button>ALL STUDENT</button>
      </Link>
    </div>
  );
};

export default Home;
