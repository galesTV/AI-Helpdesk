import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreVertical, Globe } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { sendMessageToChatGPT, ChatGPTMessage } from '../services/openai';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { LanguageSelector } from './LanguageSelector';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'read';
  attachments?: string[];
  relatedDocs?: string[];
}

export type Language = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'it' | 'zh' | 'ja';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
}

export const languages: LanguageConfig[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export function ChatInterface() {
  const { selectedLanguage, translations } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ChatGPTMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update initial message when language changes
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      content: translations['chat.initialGreeting'],
      sender: 'bot',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'read'
    };
    setMessages([initialMessage]);
    setConversationHistory([]);
  }, [selectedLanguage, translations]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Send message to ChatGPT
      const response = await sendMessageToChatGPT(
        inputValue,
        conversationHistory,
        selectedLanguage
      );

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),

        content: response.content,
        sender: 'bot',
        timestamp: new Date(),
        status: 'read',
        relatedDocs: response.relatedDocs
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);

      // Update conversation history
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: inputValue },
        { role: 'assistant', content: response.content }
      ]);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
        status: 'read'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{translations['chat.title']}</h1>
            <p className="text-sm text-gray-500">{translations['chat.subtitle']}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button 
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === selectedLanguage)?.flag}
                </span>
              </button>
              
              {showLanguageSelector && (
                <LanguageSelector
                  onClose={() => setShowLanguageSelector(false)}
                />
              )}
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex items-end space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={translations['chat.placeholder']}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {translations['chat.sendHint']}
        </div>
      </div>
    </div>
  );
}