"use client";

import { useState } from 'react';
import { FileText, Plus, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockTemplates } from '@/lib/mock-data';
import { PromptTemplate } from '@/types/chat';

interface TemplateSelectorProps {
  onTemplateSelect: (template: PromptTemplate) => void;
}

export function TemplateSelector({ onTemplateSelect }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    content: '',
    category: 'Custom'
  });

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    onTemplateSelect(template);
  };

  const handleSaveTemplate = () => {
    // In a real app, this would save to a backend
    console.log('Saving template:', newTemplate);
    setDialogOpen(false);
    setNewTemplate({ name: '', description: '', content: '', category: 'Custom' });
  };

  const categorizedTemplates = mockTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, PromptTemplate[]>);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Prompt Templates</label>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 justify-between bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="truncate">
                  {selectedTemplate ? selectedTemplate.name : 'Select template...'}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            {Object.entries(categorizedTemplates).map(([category, templates]) => (
              <div key={category}>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  {category}
                </div>
                {templates.map((template) => (
                  <DropdownMenuItem
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="p-3 cursor-pointer"
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{template.name}</span>
                          {selectedTemplate?.id === template.id && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="bg-background/50 border-border/50">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Name</Label>
                  <Input
                    id="template-name"
                    placeholder="Enter template name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template-category">Category</Label>
                  <Input
                    id="template-category"
                    placeholder="Enter category"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="template-description">Description</Label>
                <Input
                  id="template-description"
                  placeholder="Brief description of the template"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="template-content">Template Content</Label>
                <Textarea
                  id="template-content"
                  placeholder="Enter your prompt template content..."
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveTemplate}
                  disabled={!newTemplate.name || !newTemplate.content}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Save Template
                </Button>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {selectedTemplate && (
        <div className="p-3 bg-accent/30 rounded-lg border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">{selectedTemplate.name}</span>
            <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
              {selectedTemplate.category}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {selectedTemplate.description}
          </p>
          <div className="text-xs text-muted-foreground bg-background/50 p-2 rounded border border-border/30 max-h-20 overflow-y-auto">
            {selectedTemplate.content.substring(0, 150)}
            {selectedTemplate.content.length > 150 && '...'}
          </div>
        </div>
      )}
    </div>
  );
}