import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Play, Pause, RotateCcw, Settings, Info } from 'lucide-react';

interface ControlPanelProps {
  epsilon: number;
  ancillaQubits: number;
  isRunning: boolean;
  noiseLevel: number;
  onEpsilonChange: (value: number[]) => void;
  onAncillaChange: (value: number) => void;
  onNoiseChange: (value: number[]) => void;
  onRun: () => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  epsilon,
  ancillaQubits,
  isRunning,
  noiseLevel,
  onEpsilonChange,
  onAncillaChange,
  onNoiseChange,
  onRun,
  onReset,
}) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-secondary" />
          Simulation Controls
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Epsilon Control */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Accuracy Parameter (ε)</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Lower ε means higher accuracy but more resources</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="space-y-2">
              <Slider
                value={[epsilon]}
                onValueChange={onEpsilonChange}
                min={0.01}
                max={0.5}
                step={0.01}
                className="w-full"
                disabled={isRunning}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.01</span>
                <Badge variant="outline" className="text-xs">
                  ε = {epsilon}
                </Badge>
                <span>0.5</span>
              </div>
            </div>

            {/* Impact Display */}
            <div className="bg-muted/20 rounded p-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Classical samples:</span>
                <span className="font-mono">{Math.ceil(1 / (epsilon ** 2)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Quantum depth:</span>
                <span className="font-mono">{Math.ceil(1 / epsilon)}</span>
              </div>
            </div>
          </div>

          {/* Ancilla Control */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Ancilla Qubits</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of ancilla qubits: m = ⌈-log₂(ε)⌉</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="space-y-2">
              <Slider
                value={[ancillaQubits]}
                onValueChange={(value) => onAncillaChange(value[0])}
                min={3}
                max={8}
                step={1}
                className="w-full"
                disabled={isRunning}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>3</span>
                <Badge variant="outline" className="text-xs">
                  {ancillaQubits} qubits
                </Badge>
                <span>8</span>
              </div>
            </div>

            {/* Resolution Display */}
            <div className="bg-muted/20 rounded p-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Phase resolution:</span>
                <span className="font-mono">2^{-ancillaQubits} = {(1/Math.pow(2, ancillaQubits)).toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Basis states:</span>
                <span className="font-mono">2^{ancillaQubits} = {Math.pow(2, ancillaQubits)}</span>
              </div>
            </div>
          </div>

          {/* Noise Control */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Noise Level</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Simulates depolarizing noise on qubits</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="space-y-2">
              <Slider
                value={[noiseLevel]}
                onValueChange={onNoiseChange}
                min={0}
                max={0.2}
                step={0.01}
                className="w-full"
                disabled={isRunning}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <Badge variant="outline" className="text-xs">
                  {(noiseLevel * 100).toFixed(0)}%
                </Badge>
                <span>20%</span>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Button
                onClick={onRun}
                size="lg"
                className="w-full"
                variant={isRunning ? "secondary" : "default"}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Simulation
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Algorithm
                  </>
                )}
              </Button>
              
              <Button
                onClick={onReset}
                size="lg"
                variant="outline"
                className="w-full"
                disabled={isRunning}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Algorithm Steps */}
            <div className="bg-muted/20 rounded p-3 space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground">Algorithm Steps:</h4>
              <ol className="text-xs space-y-1 text-muted-foreground">
                <li>1. Initialize ancilla qubits</li>
                <li>2. Apply Hadamard gates</li>
                <li>3. Controlled-U operations</li>
                <li>4. Inverse QFT</li>
                <li>5. Measure ancillas</li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};