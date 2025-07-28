import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-blue-600" />
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}