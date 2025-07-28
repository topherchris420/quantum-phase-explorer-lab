import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Cryptography: React.FC = () => {
  const [numberToFactor, setNumberToFactor] = useState(15);
  const [factors, setFactors] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFactor = () => {
    setError(null);
    setFactors(null);

    if (numberToFactor <= 1 || !Number.isInteger(numberToFactor)) {
      setError('Please enter an integer greater than 1.');
      return;
    }

    // Simplified simulation of Shor's algorithm
    const findFactor = (N: number) => {
      if (N % 2 === 0) return 2;
      for (let i = 3; i * i <= N; i += 2) {
        if (N % i === 0) return i;
      }
      return N; // Prime
    };

    const factor = findFactor(numberToFactor);
    if (factor === numberToFactor) {
      setFactors([factor]);
    } else {
      setFactors([factor, numberToFactor / factor]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post-Quantum Cryptography</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">The Threat to Modern Cryptography</h3>
          <p className="text-muted-foreground">
            Quantum computers pose a significant threat to current encryption methods, such as RSA, which rely on the difficulty of factoring large numbers. Shor's algorithm, which can be run on a sufficiently powerful quantum computer, can factor large numbers exponentially faster than any known classical algorithm.
          </p>
          <Alert>
            <AlertTitle>Quantum Phase Estimation and Shor's Algorithm</AlertTitle>
            <AlertDescription>
              Shor's algorithm uses Quantum Phase Estimation (QPE) at its core. By finding the period of a specific function, a quantum computer can deduce the factors of a large number. This interactive demo simplifies the process to illustrate the concept.
            </AlertDescription>
          </Alert>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Interactive Factoring Demonstration</h3>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={numberToFactor}
              onChange={(e) => setNumberToFactor(parseInt(e.target.value, 10))}
              placeholder="Enter a number to factor"
              className="max-w-xs"
            />
            <Button onClick={handleFactor}>Factor with Simulated QPE</Button>
          </div>
          {error && <p className="text-destructive">{error}</p>}
          {factors && (
            <div className="mt-4">
              <h4 className="font-semibold">Result:</h4>
              <p>
                The factors of {numberToFactor} are{' '}
                <span className="font-bold text-primary">{factors.join(' and ')}</span>.
              </p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">The Importance of Post-Quantum Cryptography</h3>
          <p className="text-muted-foreground">
            To counter the threat of quantum computers, new cryptographic standards, known as Post-Quantum Cryptography (PQC), are being developed. These new methods are based on mathematical problems that are believed to be hard for both classical and quantum computers to solve.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cryptography;
