import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Cpu, Zap } from 'lucide-react';

interface PhaseEstimationSectionProps {
  ancillaQubits: number;
  epsilon: number;
  isRunning: boolean;
  currentStep: number;
  results: string[];
}

export const PhaseEstimationSection: React.FC<PhaseEstimationSectionProps> = ({
  ancillaQubits,
  epsilon,
  isRunning,
  currentStep,
  results
}) => {
  const [qftProgress, setQftProgress] = useState(0);
  const [circuitStep, setCircuitStep] = useState(0);

  useEffect(() => {
    if (isRunning && currentStep >= 2) {
      const interval = setInterval(() => {
        setQftProgress(prev => {
          const newProgress = prev + 15;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
        
        setCircuitStep(prev => (prev + 1) % 4);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isRunning, currentStep]);

  const circuitDepth = Math.ceil(1 / epsilon);

  return (
    <Card className="h-full bg-card border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-accent" />
            Quantum Phase Estimation
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Quantum algorithm with polynomial advantage</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Quantum Circuit Visualization */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quantum Circuit</h3>
          
          {/* Ancilla qubits */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Ancilla Qubits:</span>
              <Badge variant="outline">{ancillaQubits} qubits</Badge>
            </div>
            
            <div className="bg-quantum-grid rounded-lg p-4 space-y-3">
              {Array.from({ length: ancillaQubits }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  {/* Initial state */}
                  <div className="w-8 h-8 rounded border border-quantum-wire bg-background flex items-center justify-center text-xs">
                    |0⟩
                  </div>
                  
                  {/* Hadamard gate */}
                  <div className={`w-8 h-8 rounded border-2 bg-quantum-hadamard/20 border-quantum-hadamard flex items-center justify-center text-xs font-bold ${
                    isRunning && circuitStep === 0 ? 'animate-quantum-glow' : ''
                  }`}>
                    H
                  </div>
                  
                  {/* Wire */}
                  <div className="flex-1 h-0.5 bg-quantum-wire" />
                  
                  {/* Controlled-U gates */}
                  <div className={`w-8 h-8 rounded-full border-2 bg-quantum-control/20 border-quantum-control flex items-center justify-center text-xs ${
                    isRunning && circuitStep === 1 ? 'animate-quantum-pulse' : ''
                  }`}>
                    ●
                  </div>
                  
                  {/* More wire */}
                  <div className="flex-1 h-0.5 bg-quantum-wire" />
                  
                  {/* QFT */}
                  <div className={`w-12 h-8 rounded border-2 bg-quantum-gate/20 border-quantum-gate flex items-center justify-center text-xs font-bold ${
                    isRunning && circuitStep === 2 ? 'animate-quantum-glow' : ''
                  }`}>
                    QFT†
                  </div>
                  
                  {/* Measurement */}
                  <div className={`w-8 h-8 rounded border-2 bg-quantum-measurement/20 border-quantum-measurement flex items-center justify-center text-xs ${
                    isRunning && circuitStep === 3 ? 'animate-quantum-pulse' : ''
                  }`}>
                    📏
                  </div>
                </div>
              ))}
              
              {/* Target qubit */}
              <div className="flex items-center gap-2 border-t border-quantum-wire pt-2">
                <div className="w-8 h-8 rounded border border-quantum-wire bg-background flex items-center justify-center text-xs">
                  |ψ⟩
                </div>
                <div className="flex-1 h-0.5 bg-quantum-wire" />
                <div className={`w-8 h-8 rounded border-2 bg-quantum-gate/20 border-quantum-gate flex items-center justify-center text-xs font-bold ${
                  isRunning && circuitStep === 1 ? 'animate-quantum-glow' : ''
                }`}>
                  Û
                </div>
                <div className="flex-1 h-0.5 bg-quantum-wire" />
                <div className="w-12 h-8" /> {/* Spacer for QFT */}
                <div className="w-8 h-8" /> {/* Spacer for measurement */}
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Parameters */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Required Ancillas:</span>
            <Badge variant="outline">m = ⌈-log₂(ε)⌉ = {ancillaQubits}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Circuit Depth:</span>
            <Badge variant="outline">Depth ~ {circuitDepth}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Complexity:</span>
            <Badge variant="secondary">O(1/ε)</Badge>
          </div>
        </div>

        {/* QFT Progress */}
        {isRunning && currentStep >= 2 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Quantum Fourier Transform</span>
              <span className="text-sm text-muted-foreground">{qftProgress}%</span>
            </div>
            <Progress value={qftProgress} className="h-2" />
          </div>
        )}

        {/* Measurement Results */}
        {results.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Measurement Results</h4>
            <div className="bg-muted/20 rounded-lg p-3 max-h-32 overflow-y-auto">
              <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                {results.slice(0, 16).map((result, i) => (
                  <div key={i} className="bg-accent/20 text-accent text-center p-2 rounded">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quantum Advantage Highlight */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <p className="text-xs text-primary">
              🚀 Exponential speedup: O(1/ε) vs O(1/ε²) scaling!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};