import logo from './logo.svg';
import './App.css';
import React from 'react';
// Import HashRouter (as Router) to handle routing with # in the URL, Routes to group paths, Route to define each path, and Link for in-app navigation.
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SQL from './components/SQL';
import SPARK from './components/SPARK';
import MongoDB from './components/MongoDB';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to the Portfolio of Jorge Cardona</h1>
          <a
            className="App-link"
            href="https://github.com/JorgeCardona?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore My GitHub Portfolio
          </a>
        </header>

        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li>
              <Link className="nav-link" to="/sql">SQL Tutorial</Link>
            </li>
            <li>
              <Link className="nav-link" to="/spark">SPARK Tutorial</Link>
            </li>
            <li>
              <Link className="nav-link" to="/mongodb">MongoDB Tutorial</Link>
            </li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sql" element={<SQL />} />
            <Route path="/spark" element={<SPARK />} />
            <Route path="/mongodb" element={<MongoDB />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;