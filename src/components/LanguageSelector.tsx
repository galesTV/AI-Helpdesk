import { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import type { Language, LanguageConfig } from '../types';

interface LanguageSelectorProps {
  onClose: () => void;
}

const languages: LanguageConfig[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export function LanguageSelector({ onClose }: LanguageSelectorProps) {
  const { selectedLanguage, setSelectedLanguage } = useAppContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    onClose();
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2"
    >
      <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
        Select Language
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageSelect(language.code)}
            className={`
              w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 transition-colors
              ${selectedLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
            `}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </div>
            
            {selectedLanguage === language.code && (
              <Check className="w-4 h-4 text-blue-600" />
            )}
          </button>
        ))}
      </div>
      
      <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-100 mt-2">
        AI responses will be in the selected language
      </div>
    </div>
  );
}