import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Tag } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  views: number;
  lastUpdated: Date;
  isPublished: boolean;
}

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your inbox.',
    category: 'Authentication',
    tags: ['password', 'login', 'security'],
    views: 1247,
    lastUpdated: new Date('2024-01-15'),
    isPublished: true
  },
  {
    id: '2',
    question: 'What are the system requirements?',
    answer: 'Our system requires: Windows 10+ or macOS 10.15+, 8GB RAM minimum, 2GB free disk space, and an internet connection.',
    category: 'Technical',
    tags: ['requirements', 'installation', 'system'],
    views: 892,
    lastUpdated: new Date('2024-01-14'),
    isPublished: true
  },
  {
    id: '3',
    question: 'How do I configure SSL certificates?',
    answer: 'SSL certificate configuration involves several steps: 1. Obtain a valid certificate, 2. Upload it to the system, 3. Configure the web server, 4. Test the connection.',
    category: 'Security',
    tags: ['ssl', 'security', 'certificates', 'https'],
    views: 634,
    lastUpdated: new Date('2024-01-13'),
    isPublished: true
  },
  {
    id: '4',
    question: 'Database connection troubleshooting',
    answer: 'If you\'re experiencing database connection issues, check: 1. Connection string, 2. Network connectivity, 3. Database server status, 4. Firewall settings.',
    category: 'Database',
    tags: ['database', 'connection', 'troubleshooting'],
    views: 445,
    lastUpdated: new Date('2024-01-12'),
    isPublished: false
  }
];

export function FAQManager() {
  const { translations } = useAppContext();
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['all', 'Authentication', 'Technical', 'Security', 'Database'];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{translations['faq.title']}</h1>
            <p className="text-sm text-gray-500">{translations['faq.subtitle']}</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{translations['faq.addFaq']}</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={translations['faq.searchPlaceholder']}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? translations['docs.allCategories'] : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* FAQ List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    {!faq.isPublished && (
                      <span className="px-2 py-1 text-xs font-medium text-yellow-600 bg-yellow-50 rounded-full">
                        Draft
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{faq.answer}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Tag className="w-4 h-4" />
                      <span>{faq.category}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{faq.views} views</span>
                    </span>
                    <span>Updated {faq.lastUpdated.toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {faq.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{translations['faq.noFaqsFound']}</h3>
            <p className="text-gray-500">{translations['faq.tryAdjusting']}</p>
          </div>
        )}
      </div>

      {/* Add FAQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{translations['faq.addNewFaq']}</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{translations['faq.question']}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the question..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{translations['faq.answer']}</label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the answer..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{translations['faq.category']}</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Authentication</option>
                    <option>Technical</option>
                    <option>Security</option>
                    <option>Database</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{translations['faq.tags']}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {translations['faq.cancel']}
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {translations['faq.saveFaq']}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}