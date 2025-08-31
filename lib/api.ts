import { Message, Chat } from '@/types/chat';

const TYPING_DELAY = 1000;
const RESPONSE_DELAY = 2000;

const mockResponses = [
  "I'd be happy to help you with that! Let me break this down step by step.",
  "That's an interesting question. Here's what I think about this topic.",
  "Based on your request, I can provide some insights and suggestions.",
  "Let me analyze this and give you a comprehensive response.",
  "Great question! This is a topic that has several important aspects to consider.",
  "I understand what you're looking for. Here's my detailed response.",
  "That's a complex topic, but I'll do my best to explain it clearly.",
  "Thanks for asking! This is something I can definitely help you with."
];

export async function sendMessage(
  content: string, 
  model: string, 
  chatId: string
): Promise<Message> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, TYPING_DELAY));
  
  const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  
  // Simulate longer processing time
  await new Promise(resolve => setTimeout(resolve, RESPONSE_DELAY));
  
  return {
    id: `msg-${Date.now()}-${Math.random()}`,
    content: `${randomResponse}\n\n**Model used:** ${model}\n\n*This is a simulated response. In a real application, this would be connected to the actual AI model API.*`,
    role: 'assistant',
    timestamp: new Date(),
    model
  };
}

export async function createChat(title?: string): Promise<Chat> {
  const newChat: Chat = {
    id: `chat-${Date.now()}`,
    title: title || `New Chat ${new Date().toLocaleDateString()}`,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  return newChat;
}

export async function exportChatAsJSON(chat: Chat): Promise<string> {
  const exportData = {
    chat,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
  
  return JSON.stringify(exportData, null, 2);
}