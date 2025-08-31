"use client";

import { useState } from 'react';
import { Plus, MessageSquare, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/contexts/ChatContext';
import { createChat } from '@/lib/api';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { state, dispatch } = useChat();
  const [creatingChat, setCreatingChat] = useState(false);

  const handleNewChat = async () => {
    setCreatingChat(true);
    try {
      const newChat = await createChat();
      dispatch({ type: 'CREATE_CHAT', payload: newChat });
    } catch (error) {
      console.error('Failed to create new chat:', error);
    } finally {
      setCreatingChat(false);
    }
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_CHAT', payload: chatId });
  };

  return (
    <>
      {/* Mobile overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => dispatch({ type: 'SET_SIDEBAR_OPEN', payload: false })}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card/50 backdrop-blur-xl border-r border-border/50 z-50 transform transition-transform duration-300 ease-in-out md:relative md:top-0 md:h-full md:translate-x-0 md:z-0",
          state.sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex justify-between items-center p-4 md:hidden">
            <h2 className="font-semibold">Chat History</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch({ type: 'SET_SIDEBAR_OPEN', payload: false })}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* New chat button */}
          <div className="p-4 border-b border-border/50">
            <Button
              onClick={handleNewChat}
              disabled={creatingChat}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {creatingChat ? 'Creating...' : 'New Chat'}
            </Button>
          </div>

          {/* Chat history */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {state.chats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/50",
                    state.activeChat?.id === chat.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/30"
                  )}
                  onClick={() => dispatch({ type: 'SET_ACTIVE_CHAT', payload: chat.id })}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{chat.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {chat.messages.length} messages
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}