// Main class for mathematical operations
export default class MathOperations {
    static add(a, b) {
        return a + b;
    };

    static subtract(a, b) {
        return a - b;
    };

    static multiply(a, b) {
        return a * b;
    };

    static divide(a, b) {
        if (b === 0) {
            throw new Error("Cannot divide by zero.");
        };
        return a / b;
    };

    // New method for percentage calculation
    static percentage(a, b) {
        return (a * b) / 100;
    }

    // New method to generate a random integer between two values
    static randomInteger(max) {
        const absoluteMax = Math.abs(max); // Take the absolute value of max
        if (absoluteMax === 0) {
            return 0;
        }
        return Math.floor(Math.random() * absoluteMax) + 1; // Generate random integer between 1 and absoluteMax
    }

    // New methods for square root, cube root, power, and n-th root
    static squareRoot(a) {
        if (a < 0) {
            throw new Error("Cannot take square root of a negative number.");
        }
        return Math.sqrt(a);
    };

    static cubeRoot(a) {
        return Math.cbrt(a);
    };

    static nPower(a, n) {
        return Math.pow(a, n);
    }

    static nRoot(a, n) {
        if (n === 0) {
            throw new Error("Cannot take the n-th root with n as zero.");
        }
        return Math.pow(n, 1 / a);
    }
};

// Named exports
export function square(a) {
    return a * a;
};

export function cube(a) {
    return a * a * a;
};

export function power(a, b) {
    return Math.pow(a, b);
};

// Modified logarithm function to include natural, base 2, and base 10
export function logarithm(a, base = 'natural') {
    if (a <= 0) {
        throw new Error("Logarithm is not defined for non-positive numbers.");
    }
    switch (base) {
        case 'natural':
            return Math.log(a); // Natural logarithm
        case 'base2':
            return Math.log2(a); // Logarithm base 2
        case 'base10':
            return Math.log10(a); // Logarithm base 10
        default:
            throw new Error("Invalid logarithm base. Use 'natural', 'base2', or 'base10'.");
    }
};

export function factorial(a) {
    if (a < 0) return 'undefined';
    return a === 0 ? 1 : a * factorial(a - 1);
};

// Format number to use dot as thousands separator and comma as decimal separator
export function formatNumber(num) {
    // Check if the input is a valid number
    if (isNaN(num)) return 'Invalid number';

    // Convert to string and separate integer and decimal parts
    const parts = num.toString().split(".");
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? ',' + parts[1] : '';

    // Format the integer part with dots as thousands separators
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formattedInteger + decimalPart;
};