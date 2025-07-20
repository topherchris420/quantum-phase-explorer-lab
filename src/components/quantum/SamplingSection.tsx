import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Zap } from 'lucide-react';
import { BlochSphere } from './BlochSphere';

interface SamplingSectionProps {
  epsilon: number;
  nsample: number;
  isRunning: boolean;
  currentStep: number;
  results: string[];
}

export const SamplingSection: React.FC<SamplingSectionProps> = ({
  epsilon,
  nsample,
  isRunning,
  currentStep,
  results
}) => {
  const [samplingProgress, setSamplingProgress] = useState(0);
  const [localResults, setLocalResults] = useState<string[]>([]);

  useEffect(() => {
    if (isRunning && currentStep === 1) {
      // Simulate sampling process
      const interval = setInterval(() => {
        setSamplingProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            // Generate mock sampling results
            const newResults = Array.from({ length: Math.min(20, nsample) }, () => 
              Math.random() > 0.5 ? '1' : '0'
            );
            setLocalResults(newResults);
            return 100;
          }
          return newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isRunning, currentStep, nsample]);

  const displayResults = results.length > 0 ? results : localResults;

  return (
    <Card className="h-full bg-card border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Direct Sampling Approach
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Classical approach requiring ~1/ε² samples</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Qubit Register Visualization */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">ÛLGT Target Qubit</h3>
          <div className="flex items-center justify-center p-4 bg-quantum-grid rounded-lg border border-quantum-wire">
            <BlochSphere 
              isAnimating={isRunning}
              phase={0.3}
              amplitude={0.8}
              className="scale-110"
            />
          </div>
        </div>

        {/* Sampling Parameters */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Required Samples:</span>
            <Badge variant="outline">Nsample ~ {nsample.toLocaleString()}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Accuracy Parameter:</span>
            <Badge variant="outline">ε = {epsilon}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Scaling:</span>
            <Badge variant="destructive">O(1/ε²)</Badge>
          </div>
        </div>

        {/* Sampling Process */}
        {isRunning && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Sampling Progress</span>
              <span className="text-sm text-muted-foreground">{samplingProgress}%</span>
            </div>
            <Progress value={samplingProgress} className="h-2" />
          </div>
        )}

        {/* Sample Results Display */}
        {displayResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Sample Results</h4>
            <div className="bg-muted/20 rounded-lg p-3 max-h-32 overflow-y-auto">
              <div className="grid grid-cols-10 gap-1 font-mono text-xs">
                {displayResults.slice(0, 50).map((result, i) => (
                  <span 
                    key={i} 
                    className={`text-center p-1 rounded ${
                      result === '1' ? 'bg-primary/20 text-primary' : 'bg-muted/40'
                    }`}
                  >
                    {result}
                  </span>
                ))}
              </div>
              {displayResults.length > 50 && (
                <p className="text-xs text-muted-foreground mt-2">
                  ... and {displayResults.length - 50} more samples
                </p>
              )}
            </div>
          </div>
        )}

        {/* Classical Limitation Warning */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-xs text-destructive-foreground/80">
            ⚠️ Classical sampling requires exponentially many measurements for accurate phase estimation
          </p>
        </div>
      </CardContent>
    </Card>
  );
};