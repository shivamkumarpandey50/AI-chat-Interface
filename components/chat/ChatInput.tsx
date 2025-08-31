"use client";

import { useState, useRef, KeyboardEvent } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@/contexts/ChatContext';
import { sendMessage, createChat } from '@/lib/api';

export function ChatInput() {
  const { state, dispatch } = useChat();
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!input.trim() || state.isLoading) return;

    const messageContent = input.trim();
    setInput('');

    // Create new chat if none exists
    let targetChat = state.activeChat;
    if (!targetChat) {
      targetChat = await createChat();
      dispatch({ type: 'CREATE_CHAT', payload: targetChat });
    }

    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}-user`,
      content: messageContent,
      role: 'user' as const,
      timestamp: new Date()
    };

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { chatId: targetChat.id, message: userMessage }
    });

    // Set loading state
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Send to API and get response
      const response = await sendMessage(
        messageContent,
        state.selectedModel.name,
        targetChat.id
      );

      dispatch({
        type: 'ADD_MESSAGE',
        payload: { chatId: targetChat.id, message: response }
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      // Add error message
      const errorMessage = {
        id: `msg-${Date.now()}-error`,
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        role: 'assistant' as const,
        timestamp: new Date()
      };
      
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { chatId: targetChat.id, message: errorMessage }
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
              className="min-h-[44px] max-h-[120px] resize-none pr-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
              disabled={state.isLoading}
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              disabled
            >
              <Paperclip className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || state.isLoading}
            className="h-11 w-11 p-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>
            {state.selectedModel.name} • {state.parameters.maxTokens} max tokens
          </span>
          {state.isLoading && (
            <div className="flex items-center gap-2">
              <div className="animate-pulse flex space-x-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>Thinking...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}