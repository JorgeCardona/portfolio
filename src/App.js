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
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const calculateResult = useCallback(() => {
    let res;
    const numA = a === '' ? 0 : Number(a);
    const numB = b === '' ? 0 : Number(b);

    switch (operation) {
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
  }, [a, b, operation]); // dependencies for useCallback

  useEffect(() => {
    calculateResult();
  }, [calculateResult]);

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateResult();
  };

  const singleValueOperations = [
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
        <label style={{ marginRight: '1em' }}>
          Operation:
          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="add">Addition</option>
            <option value="subtract">Subtraction</option>
            <option value="multiply">Multiplication</option>
            <option value="divide">Division</option>
            <option value="square">Square</option>
            <option value="cube">Cube</option>
            <option value="power">Power</option>
            <option value="logNatural">Logarithm Natural (base e)</option>
            <option value="logBase2">Logarithm Base 2</option>
            <option value="logBase10">Logarithm Base 10</option>
            <option value="factorial">Factorial</option>
            <option value="squareRoot">Square Root</option>
            <option value="cubeRoot">Cube Root</option>
            <option value="nRoot">n-th Root</option>
          </select>
        </label>
        <label style={{ marginRight: '1em' }}>
          Base Value:
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </label>
        {!singleValueOperations.includes(operation) && (
          <label style={{ marginRight: '1em' }}>
            Final Value:
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </label>
        )}
        <button type="submit">Calculate</button>
      </form>
      {result !== null && (
        <div>
          <p style={{ color: 'blue' }}>Result: {result}</p>
        </div>
      )}
    </div>
  );
}

export default App;