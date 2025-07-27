export type ViewType = 'chat' | 'documents' | 'dashboard' | 'faq';

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

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'html' | 'txt' | 'md';
  size: string;
  uploadDate: Date;
  status: 'indexed' | 'processing' | 'error';
  category: string;
  vectorCount?: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  views: number;
  lastUpdated: Date;
  isPublished: boolean;
}