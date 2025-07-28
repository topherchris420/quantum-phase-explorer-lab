import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GRID_SIZE = 20;

const QuantumSensing: React.FC = () => {
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const [results, setResults] = useState<number[][] | null>(null);

  const handlePlaceTarget = (x: number, y: number) => {
    setTarget({ x, y });
    setResults(null);
  };

  const handleScan = () => {
    if (!target) return;

    const newResults = Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(0));

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const distance = Math.sqrt(Math.pow(i - target.x, 2) + Math.pow(j - target.y, 2));
        const phaseShift = Math.exp(-distance / 5) * Math.PI;
        newResults[i][j] = phaseShift;
      }
    }
    setResults(newResults);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quantum Sensing - Magnetic Anomaly Detection</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Target Placement</h3>
          <div
            className="grid border-2 border-dashed rounded-lg"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              width: '100%',
              aspectRatio: '1 / 1',
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              return (
                <div
                  key={index}
                  onClick={() => handlePlaceTarget(x, y)}
                  className={`border border-border/20 hover:bg-primary/20 cursor-pointer ${
                    target?.x === x && target?.y === y ? 'bg-primary' : ''
                  }`}
                />
              );
            })}
          </div>
          <Button onClick={handleScan} disabled={!target} className="mt-4 w-full">
            Scan Grid
          </Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Phase Estimation Heatmap</h3>
          <div
            className="grid border-2 rounded-lg"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              width: '100%',
              aspectRatio: '1 / 1',
            }}
          >
            {results &&
              results.flat().map((phase, index) => (
                <div
                  key={index}
                  className="border border-border/20"
                  style={{
                    backgroundColor: `hsl(240, 100%, ${100 - (phase / Math.PI) * 50}%)`,
                  }}
                />
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumSensing;
