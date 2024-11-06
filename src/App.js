import logo from './logo.svg';
import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SQL from './components/SQL';
import SPARK from './components/SPARK';
import MongoDB from './components/MongoDB';
import DigitalClock from './components/DigitalClock';
import MathServices from './components/MathServices';
import ChatGPT from './components/ChatGPT';
import HuggingFaceChat from './components/HuggingFaceChat';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to the Portfolio of Jorge Cardona</h1>
          <DigitalClock />
          <div className="social-links">
            <a href="https://www.linkedin.com/in/jorgecardona1" target="_blank" rel="noopener noreferrer">
              <img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" width="80" height="80" alt="LinkedIn" />
            </a>
            <a href="https://www.youtube.com/jorgeCardona1" target="_blank" rel="noopener noreferrer">
              <img src="https://i1.wp.com/www.siempreviajero.com/wp-content/uploads/2017/03/logo-youtube-png.png" width="80" height="80" alt="YouTube" />
            </a>
            <a href="https://www.hackerrank.com/jorgecardona" target="_blank" rel="noopener noreferrer">
              <img src="https://d29fhpw069ctt2.cloudfront.net/icon/image/38712/preview.svg" width="80" height="80" alt="HackerRank" />
            </a>
            <a href="https://hub.docker.com/u/jorgecardona" target="_blank" rel="noopener noreferrer">
              <img src="https://raw.githubusercontent.com/docker-library/docs/c350af05d3fac7b5c3f6327ac82fe4d990d8729c/docker/logo.png" width="80" height="80" alt="Docker Hub" />
            </a>
            <a href="https://pypi.org/user/jorgecardona/" target="_blank" rel="noopener noreferrer">
              <img src="https://raw.githubusercontent.com/JorgeCardona/PipPackageInstaller/main/imagenes/PyPI.png" width="80" height="80" alt="PyPI" />
            </a>
            <a href="https://github.com/JorgeCardona" target="_blank" rel="noopener noreferrer">
              <img src="https://raw.githubusercontent.com/JorgeCardona/PipPackageInstaller/refs/heads/main/imagenes/github.svg" width="80" height="80" alt="GitHub" />
            </a>
          </div>
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
            <li>
              <Link className="nav-link" to="/math">Mathematical Operations</Link>
            </li>
            <li>
              <Link className="nav-link" to="/gpt">Chat GPT</Link>
            </li>
            <li>
              <Link className="nav-link" to="/huggingface">Hugging Face</Link> {/* Add this line */}
            </li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sql" element={<SQL />} />
            <Route path="/spark" element={<SPARK />} />
            <Route path="/mongodb" element={<MongoDB />} />
            <Route path="/math" element={<MathServices />} />
            <Route path="/gpt" element={<ChatGPT />} />
            <Route path="/huggingface" element={<HuggingFaceChat />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
