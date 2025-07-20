import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BarChart3, TrendingUp, Target, Info, Zap } from 'lucide-react';

interface ResultsDisplayProps {
  samplingResults: string[];
  phaseResults: string[];
  accuracy: number;
  circuitDepth: number;
  epsilon: number;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  samplingResults,
  phaseResults,
  accuracy,
  circuitDepth,
  epsilon
}) => {
  // Calculate phase estimation histogram
  const phaseHistogram = phaseResults.reduce((acc, result) => {
    acc[result] = (acc[result] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate sampling statistics
  const samplingOnes = samplingResults.filter(r => r === '1').length;
  const samplingZeros = samplingResults.filter(r => r === '0').length;
  const samplingRatio = samplingResults.length > 0 ? samplingOnes / samplingResults.length : 0;

  // Theoretical vs actual comparison
  const theoreticalSamples = Math.ceil(1 / (epsilon ** 2));
  const quantumAdvantage = theoreticalSamples / circuitDepth;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-accent" />
          Results Analysis
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Accuracy Comparison */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-4 w-4" />
              Accuracy Analysis
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phase Estimation Accuracy</span>
                  <Badge variant="default">{(accuracy * 100).toFixed(1)}%</Badge>
                </div>
                <Progress value={accuracy * 100} className="h-3" />
              </div>

              <div className="bg-muted/20 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Target accuracy:</span>
                  <span className="font-mono">{((1 - epsilon) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Achieved accuracy:</span>
                  <span className="font-mono">{(accuracy * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Error rate:</span>
                  <span className="font-mono">{((1 - accuracy) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase Results Histogram */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Phase Measurement Histogram</h3>
            
            <div className="space-y-2">
              {Object.entries(phaseHistogram)
                .sort(([a], [b]) => parseInt(a, 2) - parseInt(b, 2))
                .slice(0, 8)
                .map(([phase, count]) => {
                  const percentage = (count / phaseResults.length) * 100;
                  const decimal = parseInt(phase, 2) / Math.pow(2, phase.length);
                  
                  return (
                    <div key={phase} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-mono">|{phase}⟩</span>
                        <span className="text-muted-foreground">
                          φ={decimal.toFixed(3)}
                        </span>
                        <span>{count}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Quantum Advantage */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Quantum Advantage
            </h3>
            
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-primary">Speedup Factor</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {quantumAdvantage.toFixed(1)}×
                </div>
                <p className="text-xs text-primary/80">
                  Quantum phase estimation vs classical sampling
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Classical complexity:</span>
                  <Badge variant="destructive">O(1/ε²)</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Quantum complexity:</span>
                  <Badge variant="secondary">O(1/ε)</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resource reduction:</span>
                  <Badge variant="default">{((1 - circuitDepth/theoreticalSamples) * 100).toFixed(1)}%</Badge>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Classical samples needed:</span>
                  <span className="font-mono">{theoreticalSamples.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Quantum circuit depth:</span>
                  <span className="font-mono">{circuitDepth}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Efficiency gain:</span>
                  <span className="font-mono text-primary">{quantumAdvantage.toFixed(0)}× faster</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sampling vs Phase Estimation Comparison */}
        {samplingResults.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Method Comparison</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <h4 className="font-semibold text-destructive mb-2">Classical Sampling</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Samples collected:</span>
                    <span>{samplingResults.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>|1⟩ probability:</span>
                    <span>{(samplingRatio * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required samples:</span>
                    <span className="text-destructive">{theoreticalSamples.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Quantum Phase Estimation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Circuit depth:</span>
                    <span>{circuitDepth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phase accuracy:</span>
                    <span>{(accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Measurements:</span>
                    <span className="text-primary">{phaseResults.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};