"use client";

import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChat } from '@/contexts/ChatContext';

export function ChatInterface() {
  const { state } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.activeChat?.messages]);

  if (!state.activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-2xl text-white font-bold">AI</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Welcome to AI Chat Interface</h3>
            <p className="text-muted-foreground max-w-md">
              Start a new conversation or select an existing chat from the sidebar to begin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="max-w-4xl mx-auto">
          {state.activeChat.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="max-w-4xl mx-auto w-full">
        <ChatInput />
      </div>
    </div>
  );
}