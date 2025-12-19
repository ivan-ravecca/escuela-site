import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatWidgetContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  conversationId: string | null;
  setConversationId: (id: string | null) => void;
}

const ChatWidgetContext = createContext<ChatWidgetContextType | undefined>(undefined);

interface ChatWidgetProviderProps {
  children: ReactNode;
}

export const ChatWidgetProvider: React.FC<ChatWidgetProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  return (
    <ChatWidgetContext.Provider
      value={{
        isOpen,
        setIsOpen,
        conversationId,
        setConversationId,
      }}
    >
      {children}
    </ChatWidgetContext.Provider>
  );
};

export const useChatWidget = (): ChatWidgetContextType => {
  const context = useContext(ChatWidgetContext);
  if (!context) {
    throw new Error('useChatWidget must be used within a ChatWidgetProvider');
  }
  return context;
};
