import React, { useState, useEffect, useCallback } from 'react';
import MathOperations, { square, cube, power, logarithm, factorial } from '../domain/models/MathOperations';

function MathServices() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [operation, setOperation] = useState('random');
    const [result, setResult] = useState(null);

    const calculateResult = useCallback(() => {
        let res;
        const numA = a === '' ? 0 : Number(a);
        const numB = b === '' ? 0 : Number(b);

        try {
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
                    res = MathOperations.divide(numA, numB);
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
                    res = factorial(numA);
                    break;
                case 'squareRoot':
                    res = MathOperations.squareRoot(numA);
                    break;
                case 'cubeRoot':
                    res = MathOperations.cubeRoot(numA);
                    break;
                case 'nRoot':
                    res = MathOperations.nRoot(numA, numB);
                    break;
                default:
                    res = 'Invalid operation';
            }

            setResult(typeof res === 'number' ? res.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 5 }) : res);
        } catch (error) {
            setResult(error.message);
        }
    }, [a, b, operation]);

    useEffect(() => {
        calculateResult();
    }, [calculateResult]);

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateResult();
    };

    return (
        <div>
            <h2>Mathematical Operations</h2>
            <form onSubmit={handleSubmit}>
                <label style={{ fontSize: '1em', marginRight: '1em' }}>
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
                        style={{ fontSize: '1.2em', marginLeft: '0.5em' }}
                    />
                </label>
                {['add', 'subtract', 'multiply', 'divide', 'percentage', 'power', 'nRoot'].includes(operation) && (
                    <label style={{ fontSize: '1.2em', marginRight: '1em' }}>
                        Second Value:
                        <input
                            type="number"
                            value={b}
                            onChange={(e) => setB(e.target.value)}
                            style={{ fontSize: '1.2em', marginLeft: '0.5em' }}
                        />
                    </label>
                )}
                <button type="submit" style={{ fontSize: '1.2em' }}>Calculate</button>
            </form>
            {result !== null && (
                <div>
                    <h3>Result: {result}</h3>
                </div>
            )}
        </div>
    );
}

export default MathServices;
