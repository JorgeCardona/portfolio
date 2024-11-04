import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SQL from './components/SQL';
import SPARK from './components/SPARK';
import MongoDB from './components/MongoDB';
import MathOperations, { square, cube, power, factorial, logarithm } from './components/MathOperations';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to the Portfolio of Jorge Cardona</h1>
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
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sql" element={<SQL />} />
            <Route path="/spark" element={<SPARK />} />
            <Route path="/mongodb" element={<MongoDB />} />
            <Route path="/math" element={<MathSection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function MathSection() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [operation, setOperation] = useState('random');
  const [result, setResult] = useState(null);

  const calculateResult = useCallback(() => {
      let res;
      const numA = a === '' ? 0 : Number(a);
      const numB = b === '' ? 0 : Number(b);

      switch (operation) {
        case 'random':
          res = MathOperations.randomInteger(numA);
          break;
        case 'add':
              res = MathOperations.add(numA, numB);
              break;
          case 'subtract':
              res = MathOperations.subtract(numA, numB);
              break;
          case 'multiply':
              res = MathOperations.multiply(numA, numB);
              break;
          case 'divide':
              res = numB !== 0 ? MathOperations.divide(numA, numB) : 'undefined';
              break;
          case 'percentage':
              res = MathOperations.percentage(numA, numB);
              break;
          case 'square':
              res = square(numA);
              break;
          case 'cube':
              res = cube(numA);
              break;
          case 'power':
              res = power(numA, numB);
              break;
          case 'logNatural':
              res = logarithm(numA, 'natural');
              break;
          case 'logBase2':
              res = logarithm(numA, 'base2');
              break;
          case 'logBase10':
              res = logarithm(numA, 'base10');
              break;
          case 'factorial':
              res = numA >= 0 ? factorial(numA) : 'undefined';
              break;
          case 'squareRoot':
              res = MathOperations.squareRoot(numA);
              break;
          case 'cubeRoot':
              res = MathOperations.cubeRoot(numA);
              break;
          case 'nRoot':
              res = numA > 0 ? MathOperations.nRoot(numB, numA) : 'undefined';
              break;
          default:
              res = 'Invalid operation';
      }

      if (typeof res === 'number') {
          setResult(res.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 5 }));
      } else {
          setResult(res);
      }
  }, [a, b, operation]);

  useEffect(() => {
      calculateResult();
  }, [calculateResult]);

  const handleSubmit = (e) => {
      e.preventDefault();
      calculateResult();
  };

  const singleValueOperations = [
      'random',
      'square',
      'cube',
      'factorial',
      'squareRoot',
      'cubeRoot',
      'logNatural',
      'logBase2',
      'logBase10',
  ];

  return (
      <div>
          <h2>Mathematical Operations</h2>
          <form onSubmit={handleSubmit}>
              <label style={{ fontSize: '1.2em', marginRight: '1em' }}>
                  Operation:
                  <select value={operation} onChange={(e) => setOperation(e.target.value)} style={{ fontSize: '1.2em' }}>
                      <option value="random">Random Number</option>
                      <option value="add">Addition</option>
                      <option value="subtract">Subtraction</option>
                      <option value="multiply">Multiplication</option>
                      <option value="divide">Division</option>
                      <option value="percentage">Percentage</option>
                      <option value="square">Square</option>
                      <option value="cube">Cube</option>
                      <option value="power">Power</option>
                      <option value="logNatural">Natural Logarithm (base e)</option>
                      <option value="logBase2">Logarithm Base 2</option>
                      <option value="logBase10">Logarithm Base 10</option>
                      <option value="factorial">Factorial</option>
                      <option value="squareRoot">Square Root</option>
                      <option value="cubeRoot">Cube Root</option>
                      <option value="nRoot">n-th Root</option>
                  </select>
              </label>
              <label style={{ fontSize: '1.2em', marginRight: '1em' }}>
                  Base Value:
                  <input
                      type="number"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      style={{ fontSize: '1.2em' }}
                  />
              </label>
              {!singleValueOperations.includes(operation) && (
                  <label style={{ fontSize: '1.2em', marginRight: '1em' }}>
                      Final Value:
                      <input
                          type="number"
                          value={b}
                          onChange={(e) => setB(e.target.value)}
                          style={{ fontSize: '1.2em' }}
                      />
                  </label>
              )}
              <button type="submit" style={{ fontSize: '1.2em' }}>Calculate</button>
          </form>
          {result !== null && (
              <div>
                  <p style={{ fontSize: '3em', color: 'blue', fontWeight: 'bold' }}>Result : 
                      <span style={{ color: 'purple', fontSize: '3em' }}> {result}</span>
                  </p>
              </div>
          )}
      </div>
  );
}

export default App;