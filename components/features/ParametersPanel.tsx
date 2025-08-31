"use client";

import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, RotateCcw } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { parameterPresets } from '@/lib/mock-data';

export function ParametersPanel() {
  const { state, dispatch } = useChat();
  const { parameters } = state;

  const handleParameterChange = (key: keyof typeof parameters, value: number[]) => {
    dispatch({
      type: 'UPDATE_PARAMETERS',
      payload: { [key]: value[0] }
    });
  };

  const applyPreset = (preset: keyof typeof parameterPresets) => {
    dispatch({
      type: 'UPDATE_PARAMETERS',
      payload: parameterPresets[preset]
    });
  };

  const resetToDefaults = () => {
    dispatch({
      type: 'UPDATE_PARAMETERS',
      payload: {
        temperature: 0.7,
        maxTokens: 2048,
        topP: 0.9,
        frequencyPenalty: 0.0
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Parameters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetToDefaults}
          className="h-7 px-2"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset
        </Button>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground">Presets</Label>
        <div className="flex gap-1">
          {Object.entries(parameterPresets).map(([key, preset]) => (
            <Button
              key={key}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(key as keyof typeof parameterPresets)}
              className="flex-1 h-7 text-xs capitalize bg-background/50 border-border/50 hover:border-primary/50"
            >
              {key}
            </Button>
          ))}
        </div>
      </div>

      {/* Temperature */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label htmlFor="temperature" className="text-sm font-medium">
            Temperature
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Controls randomness in responses. Lower = more focused, Higher = more creative</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="ml-auto text-sm text-muted-foreground">
            {parameters.temperature.toFixed(1)}
          </span>
        </div>
        <Slider
          id="temperature"
          min={0}
          max={2}
          step={0.1}
          value={[parameters.temperature]}
          onValueChange={(value) => handleParameterChange('temperature', value)}
          className="w-full"
        />
      </div>

      {/* Max Tokens */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label htmlFor="maxTokens" className="text-sm font-medium">
            Max Tokens
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Maximum number of tokens in the response</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="ml-auto text-sm text-muted-foreground">
            {parameters.maxTokens}
          </span>
        </div>
        <Slider
          id="maxTokens"
          min={64}
          max={4096}
          step={64}
          value={[parameters.maxTokens]}
          onValueChange={(value) => handleParameterChange('maxTokens', value)}
          className="w-full"
        />
      </div>

      {/* Top P */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label htmlFor="topP" className="text-sm font-medium">
            Top P
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Controls diversity of responses via nucleus sampling</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="ml-auto text-sm text-muted-foreground">
            {parameters.topP.toFixed(2)}
          </span>
        </div>
        <Slider
          id="topP"
          min={0.1}
          max={1}
          step={0.05}
          value={[parameters.topP]}
          onValueChange={(value) => handleParameterChange('topP', value)}
          className="w-full"
        />
      </div>

      {/* Frequency Penalty */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label htmlFor="frequencyPenalty" className="text-sm font-medium">
            Frequency Penalty
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reduces repetition by penalizing frequent tokens</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="ml-auto text-sm text-muted-foreground">
            {parameters.frequencyPenalty.toFixed(1)}
          </span>
        </div>
        <Slider
          id="frequencyPenalty"
          min={-2}
          max={2}
          step={0.1}
          value={[parameters.frequencyPenalty]}
          onValueChange={(value) => handleParameterChange('frequencyPenalty', value)}
          className="w-full"
        />
      </div>
    </div>
  );
}