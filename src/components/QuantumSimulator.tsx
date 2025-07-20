import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';
import { SamplingSection } from './quantum/SamplingSection';
import { PhaseEstimationSection } from './quantum/PhaseEstimationSection';
import { ControlPanel } from './quantum/ControlPanel';
import { ResultsDisplay } from './quantum/ResultsDisplay';
import { useToast } from '@/hooks/use-toast';

export interface SimulationState {
  epsilon: number;
  ancillaQubits: number;
  isRunning: boolean;
  currentStep: number;
  results: {
    samplingResults: string[];
    phaseResults: string[];
    accuracy: number;
    circuitDepth: number;
  };
}

const QuantumSimulator: React.FC = () => {
  const { toast } = useToast();
  const [state, setState] = useState<SimulationState>({
    epsilon: 0.1,
    ancillaQubits: 4,
    isRunning: false,
    currentStep: 0,
    results: {
      samplingResults: [],
      phaseResults: [],
      accuracy: 0,
      circuitDepth: 0
    }
  });

  const updateState = useCallback((updates: Partial<SimulationState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleEpsilonChange = useCallback((value: number[]) => {
    const newEpsilon = value[0];
    const newAncillas = Math.max(3, Math.ceil(-Math.log2(newEpsilon)));
    updateState({ 
      epsilon: newEpsilon, 
      ancillaQubits: newAncillas,
      results: { ...state.results, circuitDepth: Math.ceil(1 / newEpsilon) }
    });
  }, [state.results, updateState]);

  const handleRunAlgorithm = useCallback(() => {
    if (state.isRunning) {
      updateState({ isRunning: false });
      toast({ title: "Simulation paused" });
    } else {
      updateState({ isRunning: true, currentStep: 0 });
      toast({ 
        title: "Quantum Phase Estimation Started",
        description: `Running with ε=${state.epsilon}, ${state.ancillaQubits} ancilla qubits`
      });
      
      // Simulate algorithm execution
      setTimeout(() => {
        const mockResults = {
          samplingResults: Array.from({ length: 10 }, () => 
            Math.random() > 0.5 ? '1' : '0'
          ),
          phaseResults: Array.from({ length: 2**state.ancillaQubits }, (_, i) => 
            i.toString(2).padStart(state.ancillaQubits, '0')
          ).slice(0, 8),
          accuracy: Math.max(0.7, 1 - state.epsilon),
          circuitDepth: Math.ceil(1 / state.epsilon)
        };
        
        updateState({ 
          results: mockResults, 
          isRunning: false,
          currentStep: 5 
        });
        
        toast({ 
          title: "Simulation Complete",
          description: `Phase estimation accuracy: ${(mockResults.accuracy * 100).toFixed(1)}%`
        });
      }, 3000);
    }
  }, [state.isRunning, state.epsilon, state.ancillaQubits, updateState, toast]);

  const handleReset = useCallback(() => {
    updateState({
      isRunning: false,
      currentStep: 0,
      results: {
        samplingResults: [],
        phaseResults: [],
        accuracy: 0,
        circuitDepth: 0
      }
    });
    toast({ title: "Simulation reset" });
  }, [updateState, toast]);

  const nsample = Math.ceil(1 / (state.epsilon ** 2));
  const requiredAncillas = Math.ceil(-Math.log2(state.epsilon));

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Quantum Phase Estimation Simulator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive demonstration of quantum phase estimation for single-qubit Pauli operator measurement
          </p>
          
          {/* Key metrics */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="bg-card">
              Nsample ~ {nsample.toLocaleString()}
            </Badge>
            <Badge variant="outline" className="bg-card">
              Ancillas: {state.ancillaQubits}
            </Badge>
            <Badge variant="outline" className="bg-card">
              Depth ~ {Math.ceil(1 / state.epsilon)}
            </Badge>
            <Badge variant="outline" className="bg-card">
              ε = {state.epsilon}
            </Badge>
          </div>
        </div>

        {/* Control Panel */}
        <ControlPanel
          epsilon={state.epsilon}
          ancillaQubits={state.ancillaQubits}
          isRunning={state.isRunning}
          onEpsilonChange={handleEpsilonChange}
          onAncillaChange={(value) => updateState({ ancillaQubits: value })}
          onRun={handleRunAlgorithm}
          onReset={handleReset}
        />

        {/* Main Split View */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sampling Section */}
          <SamplingSection
            epsilon={state.epsilon}
            nsample={nsample}
            isRunning={state.isRunning}
            currentStep={state.currentStep}
            results={state.results.samplingResults}
          />

          {/* Phase Estimation Section */}
          <PhaseEstimationSection
            ancillaQubits={state.ancillaQubits}
            epsilon={state.epsilon}
            isRunning={state.isRunning}
            currentStep={state.currentStep}
            results={state.results.phaseResults}
          />
        </div>

        {/* Results Display */}
        {(state.results.phaseResults.length > 0 || state.results.samplingResults.length > 0) && (
          <ResultsDisplay
            samplingResults={state.results.samplingResults}
            phaseResults={state.results.phaseResults}
            accuracy={state.results.accuracy}
            circuitDepth={state.results.circuitDepth}
            epsilon={state.epsilon}
          />
        )}
      </div>
    </div>
  );
};

export default QuantumSimulator;