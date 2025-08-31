"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModelSelector } from './ModelSelector';
import { ParametersPanel } from './ParametersPanel';
import { TemplateSelector } from './TemplateSelector';
import { ExportOptions } from './ExportOptions';
import { cn } from '@/lib/utils';
import { PromptTemplate } from '@/types/chat';

interface ControlsPanelProps {
  onTemplateSelect: (template: PromptTemplate) => void;
}

export function ControlsPanel({ onTemplateSelect }: ControlsPanelProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-full bg-card/30 backdrop-blur-xl border-l border-border/50 transition-all duration-300 ease-in-out relative",
        collapsed ? "w-12" : "w-80"
      )}
    >
      {/* Collapse toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-4 top-4 h-8 w-8 bg-background border border-border/50 hover:border-primary/50 z-10 transition-all duration-200"
      >
        {collapsed ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {!collapsed && (
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Controls</h2>
              
              <ModelSelector />
              
              <div className="border-t border-border/50 pt-4">
                <TemplateSelector onTemplateSelect={onTemplateSelect} />
              </div>
              
              <div className="border-t border-border/50 pt-4">
                <ParametersPanel />
              </div>
              
              <div className="border-t border-border/50 pt-4">
                <ExportOptions />
              </div>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}