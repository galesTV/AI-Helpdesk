import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { DocumentManager } from './components/DocumentManager';
import { Dashboard } from './components/Dashboard';
import { FAQManager } from './components/FAQManager';

import { ViewType } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {currentView === 'chat' && <ChatInterface />}
        {currentView === 'documents' && <DocumentManager />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'faq' && <FAQManager />}
      </main>
    </div>
  );
}

export default App;