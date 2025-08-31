"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Chat, Message, ChatParameters, AIModel } from '@/types/chat';
import { mockChats, mockModels, defaultParameters } from '@/lib/mock-data';

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  selectedModel: AIModel;
  parameters: ChatParameters;
  isLoading: boolean;
  sidebarOpen: boolean;
}

type ChatAction =
  | { type: 'SET_ACTIVE_CHAT'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'CREATE_CHAT'; payload: Chat }
  | { type: 'DELETE_CHAT'; payload: string }
  | { type: 'SET_MODEL'; payload: AIModel }
  | { type: 'UPDATE_PARAMETERS'; payload: Partial<ChatParameters> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean };

const initialState: ChatState = {
  chats: mockChats,
  activeChat: mockChats[0] || null,
  selectedModel: mockModels[0],
  parameters: defaultParameters,
  isLoading: false,
  sidebarOpen: false
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_ACTIVE_CHAT':
      return {
        ...state,
        activeChat: action.payload 
          ? state.chats.find(chat => chat.id === action.payload) || null 
          : null
      };

    case 'ADD_MESSAGE':
      const updatedChats = state.chats.map(chat =>
        chat.id === action.payload.chatId
          ? {
              ...chat,
              messages: [...chat.messages, action.payload.message],
              updatedAt: new Date()
            }
          : chat
      );
      
      return {
        ...state,
        chats: updatedChats,
        activeChat: state.activeChat?.id === action.payload.chatId
          ? updatedChats.find(chat => chat.id === action.payload.chatId) || null
          : state.activeChat
      };

    case 'CREATE_CHAT':
      return {
        ...state,
        chats: [action.payload, ...state.chats],
        activeChat: action.payload
      };

    case 'DELETE_CHAT':
      const filteredChats = state.chats.filter(chat => chat.id !== action.payload);
      return {
        ...state,
        chats: filteredChats,
        activeChat: state.activeChat?.id === action.payload 
          ? filteredChats[0] || null 
          : state.activeChat
      };

    case 'SET_MODEL':
      return {
        ...state,
        selectedModel: action.payload
      };

    case 'UPDATE_PARAMETERS':
      return {
        ...state,
        parameters: { ...state.parameters, ...action.payload }
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };

    case 'SET_SIDEBAR_OPEN':
      return {
        ...state,
        sidebarOpen: action.payload
      };

    default:
      return state;
  }
}

const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}