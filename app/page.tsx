"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ControlsPanel } from '@/components/features/ControlsPanel';
import { useChat } from '@/contexts/ChatContext';
import { PromptTemplate } from '@/types/chat';

export default function Home() {
  const { state } = useChat();
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    // In a real app, this would populate the chat input
    console.log('Template selected:', template);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex">
          <ChatInterface />
          
          <div className="hidden lg:block">
            <ControlsPanel onTemplateSelect={handleTemplateSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}