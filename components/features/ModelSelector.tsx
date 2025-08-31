"use client";

import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChat } from '@/contexts/ChatContext';
import { mockModels } from '@/lib/mock-data';

export function ModelSelector() {
  const { state, dispatch } = useChat();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">AI Model</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-200"
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{state.selectedModel.name}</span>
              <span className="text-xs text-muted-foreground truncate">
                {state.selectedModel.provider} • {state.selectedModel.maxTokens} tokens
              </span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          {mockModels.map((model) => (
            <DropdownMenuItem
              key={model.id}
              onClick={() => dispatch({ type: 'SET_MODEL', payload: model })}
              className="p-3 cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{model.name}</span>
                    {state.selectedModel.id === model.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {model.description}
                  </p>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{model.provider}</span>
                    <span>•</span>
                    <span>{model.maxTokens} tokens</span>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}