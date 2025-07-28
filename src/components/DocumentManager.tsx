import React, { useState } from 'react';
import { Upload, FileText, Search, Filter, MoreVertical, Download, Trash2, Eye } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'html' | 'txt' | 'md';
  size: string;
  uploadDate: Date;
  status: 'indexed' | 'processing' | 'error';
  category: string;
  vectorCount?: number;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Installation Guide.pdf',
    type: 'pdf',
    size: '2.3 MB',
    uploadDate: new Date('2024-01-15'),
    status: 'indexed',
    category: 'Installation',
    vectorCount: 245
  },
  {
    id: '2',
    name: 'API Documentation.html',
    type: 'html',
    size: '1.8 MB',
    uploadDate: new Date('2024-01-14'),
    status: 'indexed',
    category: 'API',
    vectorCount: 189
  },
  {
    id: '3',
    name: 'Troubleshooting FAQ.md',
    type: 'md',
    size: '456 KB',
    uploadDate: new Date('2024-01-13'),
    status: 'processing',
    category: 'Support'
  },
  {
    id: '4',
    name: 'Configuration Manual.pdf',
    type: 'pdf',
    size: '3.1 MB',
    uploadDate: new Date('2024-01-12'),
    status: 'indexed',
    category: 'Configuration',
    vectorCount: 312
  }
];

export function DocumentManager() {
  const { translations } = useAppContext();
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dragOver, setDragOver] = useState(false);

  const categories = ['all', 'Installation', 'API', 'Support', 'Configuration'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop logic here
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'indexed': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: Document['type']) => {
    return <FileText className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{translations['docs.title']}</h1>
            <p className="text-sm text-gray-500">{translations['docs.subtitle']}</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>{translations['docs.uploadDocument']}</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={translations['docs.searchPlaceholder']}
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

      {/* Upload Area */}
      <div className="p-6">
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">{translations['docs.dropFiles']}</p>
          <p className="text-sm text-gray-500 mb-4">
            {translations['docs.supportedFormats']}
          </p>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            {translations['docs.chooseFiles']}
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">
                {translations['docs.documents']} ({filteredDocuments.length})
              </h3>
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getTypeIcon(doc.type)}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">{doc.size}</span>
                        <span className="text-xs text-gray-500">
                          {doc.uploadDate.toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">{doc.category}</span>
                        {doc.vectorCount && (
                          <span className="text-xs text-gray-500">
                            {doc.vectorCount} vectors
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}