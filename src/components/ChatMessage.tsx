import { Bot, User, CheckCheck, Clock, FileText } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-3xl ${isBot ? 'order-2' : 'order-1'}`}>
        <div className={`
          px-4 py-3 rounded-2xl shadow-sm
          ${isBot 
            ? 'bg-white border border-gray-200 rounded-tl-md' 
            : 'bg-blue-600 text-white rounded-tr-md'
          }
        `}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
          
          {message.relatedDocs && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-600 mb-2">
                {isBot ? 'Related Documentation:' : 'Documentación Relacionada:'}
              </div>
              <div className="space-y-1">
                {message.relatedDocs.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <FileText className="w-3 h-3 text-gray-400" />
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className={`flex items-center mt-1 space-x-2 text-xs text-gray-500 ${isBot ? '' : 'justify-end'}`}>
          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {!isBot && (
            <div className="flex items-center">
              {message.status === 'sending' && <Clock className="w-3 h-3" />}
              {message.status === 'sent' && <CheckCheck className="w-3 h-3" />}
              {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-500" />}
            </div>
          )}
        </div>
      </div>
      
      <div className={`${isBot ? 'order-1 mr-3' : 'order-2 ml-3'} flex-shrink-0`}>
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${isBot ? 'bg-blue-100' : 'bg-gray-200'}
        `}>
          {isBot ? (
            <Bot className="w-4 h-4 text-blue-600" />
          ) : (
            <User className="w-4 h-4 text-gray-600" />
          )}
        </div>
      </div>
    </div>
  );
}