import React from 'react';
import { 
  BarChart3, 
  MessageCircle, 
  FileText, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface Stat {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
}

const stats: Stat[] = [
  {
    name: 'dashboard.totalConversations',
    value: '2,847',
    change: '+12%',
    changeType: 'increase',
    icon: MessageCircle,
  },
  {
    name: 'dashboard.documentsIndexed',
    value: '156',
    change: '+8%',
    changeType: 'increase',
    icon: FileText,
  },
  {
    name: 'dashboard.resolutionRate',
    value: '94.2%',
    change: '+2.1%',
    changeType: 'increase',
    icon: CheckCircle,
  },
  {
    name: 'dashboard.avgResponseTime',
    value: '2.3s',
    change: '-0.4s',
    changeType: 'increase',
    icon: Clock,
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'conversation',
    message: 'New conversation started: "API Authentication Issues"',
    time: '2 minutes ago',
    status: 'active'
  },
  {
    id: 2,
    type: 'document',
    message: 'Document indexed: "Security Best Practices.pdf"',
    time: '15 minutes ago',
    status: 'completed'
  },
  {
    id: 3,
    type: 'conversation',
    message: 'Conversation resolved: "Database Connection Error"',
    time: '23 minutes ago',
    status: 'completed'
  },
  {
    id: 4,
    type: 'error',
    message: 'Failed to process document: "legacy-manual.docx"',
    time: '1 hour ago',
    status: 'error'
  },
];

export function Dashboard() {
  const { translations } = useAppContext();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{translations['dashboard.title']}</h1>
          <p className="text-sm text-gray-500">{translations['dashboard.subtitle']}</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{translations[stat.name]}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{translations['dashboard.performanceOverview']}</h3>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            
            {/* Simplified chart representation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Conversations</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">85%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Resolution Rate</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">94%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">User Satisfaction</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">92%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{translations['dashboard.recentActivity']}</h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'active' ? 'bg-blue-400' :
                    activity.status === 'completed' ? 'bg-green-400' :
                    'bg-red-400'
                  }`}></div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  
                  {activity.type === 'error' && (
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                  )}
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all activity
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{translations['dashboard.quickActions']}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <FileText className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-medium text-gray-900">{translations['dashboard.uploadDocument']}</h4>
              <p className="text-sm text-gray-500">Add new knowledge base content</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-medium text-gray-900">{translations['dashboard.manageUsers']}</h4>
              <p className="text-sm text-gray-500">Configure access and permissions</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
              <h4 className="font-medium text-gray-900">{translations['dashboard.viewReports']}</h4>
              <p className="text-sm text-gray-500">Detailed analytics and insights</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}