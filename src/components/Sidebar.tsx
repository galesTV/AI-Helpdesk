import { 
  MessageCircle, 
  FileText, 
  BarChart3, 
  HelpCircle, 
  Menu, 
  X,
  Bot
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import type { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navigation = [
  { id: 'chat' as ViewType, name: 'Chat Support', icon: MessageCircle },
  { id: 'documents' as ViewType, name: 'Knowledge Base', icon: FileText },
  { id: 'faq' as ViewType, name: 'FAQ Manager', icon: HelpCircle },
  { id: 'dashboard' as ViewType, name: 'Dashboard', icon: BarChart3 },
];

export function Sidebar({ currentView, setCurrentView, isOpen, setIsOpen }: SidebarProps) {
  const { translations } = useAppContext();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">AI Helpdesk</h2>
              <p className="text-sm text-gray-500">Support Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const navKeys = ['nav.chat', 'nav.documents', 'nav.faq', 'nav.dashboard'];
              const translatedName = translations[navKeys[index]] || item.name;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                      ${isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    {translatedName}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-6 left-3 right-3">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-gray-900 mb-1">{translations['nav.systemStatus']}</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">{translations['nav.aiEngineOnline']}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}