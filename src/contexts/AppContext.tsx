import { createContext, useContext, useState, ReactNode } from 'react';
import { Language, AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    'nav.chat': 'Chat Support',
    'nav.documents': 'Knowledge Base',
    'nav.faq': 'FAQ Manager',
    'nav.dashboard': 'Dashboard',
    'nav.systemStatus': 'System Status',
    'nav.aiEngineOnline': 'AI Engine Online',
    
    // Chat Interface
    'chat.title': 'Technical Support Chat',
    'chat.subtitle': 'Get instant help with your technical questions',
    'chat.placeholder': 'Ask me anything about our system...',
    'chat.sendHint': 'Press Enter to send, Shift+Enter for new line',
    'chat.initialGreeting': 'Hello! I\'m your AI technical support assistant. I can help you with questions about our system, troubleshoot issues, and provide documentation. How can I assist you today?',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Monitor your AI helpdesk performance and analytics',
    'dashboard.totalConversations': 'Total Conversations',
    'dashboard.documentsIndexed': 'Documents Indexed',
    'dashboard.resolutionRate': 'Resolution Rate',
    'dashboard.avgResponseTime': 'Avg Response Time',
    'dashboard.performanceOverview': 'Performance Overview',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.uploadDocument': 'Upload Document',
    'dashboard.manageUsers': 'Manage Users',
    'dashboard.viewReports': 'View Reports',
    
    // Document Manager
    'docs.title': 'Knowledge Base',
    'docs.subtitle': 'Manage documents for AI training and support',
    'docs.uploadDocument': 'Upload Document',
    'docs.searchPlaceholder': 'Search documents...',
    'docs.allCategories': 'All Categories',
    'docs.dropFiles': 'Drop files here to upload',
    'docs.supportedFormats': 'Support for PDF, HTML, TXT, and Markdown files',
    'docs.chooseFiles': 'Choose Files',
    'docs.documents': 'Documents',
    
    // FAQ Manager
    'faq.title': 'FAQ Manager',
    'faq.subtitle': 'Manage frequently asked questions and answers',
    'faq.addFaq': 'Add FAQ',
    'faq.searchPlaceholder': 'Search FAQs...',
    'faq.noFaqsFound': 'No FAQs found',
    'faq.tryAdjusting': 'Try adjusting your search terms or filters',
    'faq.addNewFaq': 'Add New FAQ',
    'faq.question': 'Question',
    'faq.answer': 'Answer',
    'faq.category': 'Category',
    'faq.tags': 'Tags',
    'faq.cancel': 'Cancel',
    'faq.saveFaq': 'Save FAQ',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
  },
  es: {
    // Navigation
    'nav.chat': 'Chat de Soporte',
    'nav.documents': 'Base de Conocimientos',
    'nav.faq': 'Gestor de FAQ',
    'nav.dashboard': 'Panel de Control',
    'nav.systemStatus': 'Estado del Sistema',
    'nav.aiEngineOnline': 'Motor IA En Línea',
    
    // Chat Interface
    'chat.title': 'Chat de Soporte Técnico',
    'chat.subtitle': 'Obtén ayuda instantánea con tus preguntas técnicas',
    'chat.placeholder': 'Pregúntame cualquier cosa sobre nuestro sistema...',
    'chat.sendHint': 'Presiona Enter para enviar, Shift+Enter para nueva línea',
    'chat.initialGreeting': '¡Hola! Soy tu asistente de soporte técnico con IA. Puedo ayudarte con preguntas sobre nuestro sistema, solucionar problemas y proporcionar documentación. ¿Cómo puedo ayudarte hoy?',
    
    // Dashboard
    'dashboard.title': 'Panel de Control',
    'dashboard.subtitle': 'Monitorea el rendimiento y análisis de tu helpdesk IA',
    'dashboard.totalConversations': 'Conversaciones Totales',
    'dashboard.documentsIndexed': 'Documentos Indexados',
    'dashboard.resolutionRate': 'Tasa de Resolución',
    'dashboard.avgResponseTime': 'Tiempo Promedio de Respuesta',
    'dashboard.performanceOverview': 'Resumen de Rendimiento',
    'dashboard.recentActivity': 'Actividad Reciente',
    'dashboard.quickActions': 'Acciones Rápidas',
    'dashboard.uploadDocument': 'Subir Documento',
    'dashboard.manageUsers': 'Gestionar Usuarios',
    'dashboard.viewReports': 'Ver Reportes',
    
    // Document Manager
    'docs.title': 'Base de Conocimientos',
    'docs.subtitle': 'Gestiona documentos para entrenamiento y soporte IA',
    'docs.uploadDocument': 'Subir Documento',
    'docs.searchPlaceholder': 'Buscar documentos...',
    'docs.allCategories': 'Todas las Categorías',
    'docs.dropFiles': 'Arrastra archivos aquí para subir',
    'docs.supportedFormats': 'Soporte para archivos PDF, HTML, TXT y Markdown',
    'docs.chooseFiles': 'Elegir Archivos',
    'docs.documents': 'Documentos',
    
    // FAQ Manager
    'faq.title': 'Gestor de FAQ',
    'faq.subtitle': 'Gestiona preguntas frecuentes y respuestas',
    'faq.addFaq': 'Agregar FAQ',
    'faq.searchPlaceholder': 'Buscar FAQs...',
    'faq.noFaqsFound': 'No se encontraron FAQs',
    'faq.tryAdjusting': 'Intenta ajustar tus términos de búsqueda o filtros',
    'faq.addNewFaq': 'Agregar Nueva FAQ',
    'faq.question': 'Pregunta',
    'faq.answer': 'Respuesta',
    'faq.category': 'Categoría',
    'faq.tags': 'Etiquetas',
    'faq.cancel': 'Cancelar',
    'faq.saveFaq': 'Guardar FAQ',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.view': 'Ver',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
  },
  pt: {
    // Navigation
    'nav.chat': 'Chat de Suporte',
    'nav.documents': 'Base de Conhecimento',
    'nav.faq': 'Gerenciador de FAQ',
    'nav.dashboard': 'Painel',
    'nav.systemStatus': 'Status do Sistema',
    'nav.aiEngineOnline': 'Motor IA Online',
    
    // Chat Interface
    'chat.title': 'Chat de Suporte Técnico',
    'chat.subtitle': 'Obtenha ajuda instantânea com suas questões técnicas',
    'chat.placeholder': 'Pergunte-me qualquer coisa sobre nosso sistema...',
    'chat.sendHint': 'Pressione Enter para enviar, Shift+Enter para nova linha',
    'chat.initialGreeting': 'Olá! Sou seu assistente de suporte técnico com IA. Posso ajudá-lo com perguntas sobre nosso sistema, solucionar problemas e fornecer documentação. Como posso ajudá-lo hoje?',
    
    // Dashboard
    'dashboard.title': 'Painel',
    'dashboard.subtitle': 'Monitore o desempenho e análises do seu helpdesk IA',
    'dashboard.totalConversations': 'Conversas Totais',
    'dashboard.documentsIndexed': 'Documentos Indexados',
    'dashboard.resolutionRate': 'Taxa de Resolução',
    'dashboard.avgResponseTime': 'Tempo Médio de Resposta',
    'dashboard.performanceOverview': 'Visão Geral do Desempenho',
    'dashboard.recentActivity': 'Atividade Recente',
    'dashboard.quickActions': 'Ações Rápidas',
    'dashboard.uploadDocument': 'Enviar Documento',
    'dashboard.manageUsers': 'Gerenciar Usuários',
    'dashboard.viewReports': 'Ver Relatórios',
    
    // Document Manager
    'docs.title': 'Base de Conhecimento',
    'docs.subtitle': 'Gerencie documentos para treinamento e suporte IA',
    'docs.uploadDocument': 'Enviar Documento',
    'docs.searchPlaceholder': 'Pesquisar documentos...',
    'docs.allCategories': 'Todas as Categorias',
    'docs.dropFiles': 'Solte arquivos aqui para enviar',
    'docs.supportedFormats': 'Suporte para arquivos PDF, HTML, TXT e Markdown',
    'docs.chooseFiles': 'Escolher Arquivos',
    'docs.documents': 'Documentos',
    
    // FAQ Manager
    'faq.title': 'Gerenciador de FAQ',
    'faq.subtitle': 'Gerencie perguntas frequentes e respostas',
    'faq.addFaq': 'Adicionar FAQ',
    'faq.searchPlaceholder': 'Pesquisar FAQs...',
    'faq.noFaqsFound': 'Nenhuma FAQ encontrada',
    'faq.tryAdjusting': 'Tente ajustar seus termos de pesquisa ou filtros',
    'faq.addNewFaq': 'Adicionar Nova FAQ',
    'faq.question': 'Pergunta',
    'faq.answer': 'Resposta',
    'faq.category': 'Categoria',
    'faq.tags': 'Tags',
    'faq.cancel': 'Cancelar',
    'faq.saveFaq': 'Salvar FAQ',
    
    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Excluir',
    'common.edit': 'Editar',
    'common.view': 'Ver',
    'common.search': 'Pesquisar',
    'common.filter': 'Filtrar',
  },
  fr: {
    // Navigation
    'nav.chat': 'Chat Support',
    'nav.documents': 'Base de Connaissances',
    'nav.faq': 'Gestionnaire FAQ',
    'nav.dashboard': 'Tableau de Bord',
    'nav.systemStatus': 'État du Système',
    'nav.aiEngineOnline': 'Moteur IA En Ligne',
    
    // Chat Interface
    'chat.title': 'Chat de Support Technique',
    'chat.subtitle': 'Obtenez une aide instantanée pour vos questions techniques',
    'chat.placeholder': 'Demandez-moi n\'importe quoi sur notre système...',
    'chat.sendHint': 'Appuyez sur Entrée pour envoyer, Shift+Entrée pour nouvelle ligne',
    'chat.initialGreeting': 'Bonjour ! Je suis votre assistant de support technique IA. Je peux vous aider avec des questions sur notre système, résoudre des problèmes et fournir de la documentation. Comment puis-je vous aider aujourd\'hui ?',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord',
    'dashboard.subtitle': 'Surveillez les performances et analyses de votre helpdesk IA',
    'dashboard.totalConversations': 'Conversations Totales',
    'dashboard.documentsIndexed': 'Documents Indexés',
    'dashboard.resolutionRate': 'Taux de Résolution',
    'dashboard.avgResponseTime': 'Temps de Réponse Moyen',
    'dashboard.performanceOverview': 'Aperçu des Performances',
    'dashboard.recentActivity': 'Activité Récente',
    'dashboard.quickActions': 'Actions Rapides',
    'dashboard.uploadDocument': 'Télécharger Document',
    'dashboard.manageUsers': 'Gérer Utilisateurs',
    'dashboard.viewReports': 'Voir Rapports',
    
    // Document Manager
    'docs.title': 'Base de Connaissances',
    'docs.subtitle': 'Gérez les documents pour la formation et le support IA',
    'docs.uploadDocument': 'Télécharger Document',
    'docs.searchPlaceholder': 'Rechercher documents...',
    'docs.allCategories': 'Toutes les Catégories',
    'docs.dropFiles': 'Déposez les fichiers ici pour télécharger',
    'docs.supportedFormats': 'Support pour fichiers PDF, HTML, TXT et Markdown',
    'docs.chooseFiles': 'Choisir Fichiers',
    'docs.documents': 'Documents',
    
    // FAQ Manager
    'faq.title': 'Gestionnaire FAQ',
    'faq.subtitle': 'Gérez les questions fréquemment posées et les réponses',
    'faq.addFaq': 'Ajouter FAQ',
    'faq.searchPlaceholder': 'Rechercher FAQs...',
    'faq.noFaqsFound': 'Aucune FAQ trouvée',
    'faq.tryAdjusting': 'Essayez d\'ajuster vos termes de recherche ou filtres',
    'faq.addNewFaq': 'Ajouter Nouvelle FAQ',
    'faq.question': 'Question',
    'faq.answer': 'Réponse',
    'faq.category': 'Catégorie',
    'faq.tags': 'Tags',
    'faq.cancel': 'Annuler',
    'faq.saveFaq': 'Sauvegarder FAQ',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.view': 'Voir',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
  },
  de: {
    // Navigation
    'nav.chat': 'Chat Support',
    'nav.documents': 'Wissensdatenbank',
    'nav.faq': 'FAQ Manager',
    'nav.dashboard': 'Dashboard',
    'nav.systemStatus': 'Systemstatus',
    'nav.aiEngineOnline': 'KI-Engine Online',
    
    // Chat Interface
    'chat.title': 'Technischer Support Chat',
    'chat.subtitle': 'Erhalten Sie sofortige Hilfe bei Ihren technischen Fragen',
    'chat.placeholder': 'Fragen Sie mich alles über unser System...',
    'chat.sendHint': 'Enter zum Senden, Shift+Enter für neue Zeile',
    'chat.initialGreeting': 'Hallo! Ich bin Ihr KI-technischer Support-Assistent. Ich kann Ihnen bei Fragen zu unserem System helfen, Probleme beheben und Dokumentation bereitstellen. Wie kann ich Ihnen heute helfen?',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Überwachen Sie die Leistung und Analysen Ihres KI-Helpdesks',
    'dashboard.totalConversations': 'Gesamte Gespräche',
    'dashboard.documentsIndexed': 'Indexierte Dokumente',
    'dashboard.resolutionRate': 'Lösungsrate',
    'dashboard.avgResponseTime': 'Durchschnittliche Antwortzeit',
    'dashboard.performanceOverview': 'Leistungsübersicht',
    'dashboard.recentActivity': 'Letzte Aktivität',
    'dashboard.quickActions': 'Schnellaktionen',
    'dashboard.uploadDocument': 'Dokument Hochladen',
    'dashboard.manageUsers': 'Benutzer Verwalten',
    'dashboard.viewReports': 'Berichte Anzeigen',
    
    // Document Manager
    'docs.title': 'Wissensdatenbank',
    'docs.subtitle': 'Verwalten Sie Dokumente für KI-Training und Support',
    'docs.uploadDocument': 'Dokument Hochladen',
    'docs.searchPlaceholder': 'Dokumente suchen...',
    'docs.allCategories': 'Alle Kategorien',
    'docs.dropFiles': 'Dateien hier ablegen zum Hochladen',
    'docs.supportedFormats': 'Unterstützung für PDF, HTML, TXT und Markdown Dateien',
    'docs.chooseFiles': 'Dateien Wählen',
    'docs.documents': 'Dokumente',
    
    // FAQ Manager
    'faq.title': 'FAQ Manager',
    'faq.subtitle': 'Verwalten Sie häufig gestellte Fragen und Antworten',
    'faq.addFaq': 'FAQ Hinzufügen',
    'faq.searchPlaceholder': 'FAQs suchen...',
    'faq.noFaqsFound': 'Keine FAQs gefunden',
    'faq.tryAdjusting': 'Versuchen Sie, Ihre Suchbegriffe oder Filter anzupassen',
    'faq.addNewFaq': 'Neue FAQ Hinzufügen',
    'faq.question': 'Frage',
    'faq.answer': 'Antwort',
    'faq.category': 'Kategorie',
    'faq.tags': 'Tags',
    'faq.cancel': 'Abbrechen',
    'faq.saveFaq': 'FAQ Speichern',
    
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.success': 'Erfolg',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.view': 'Anzeigen',
    'common.search': 'Suchen',
    'common.filter': 'Filtern',
  },
  it: {
    // Navigation
    'nav.chat': 'Chat Supporto',
    'nav.documents': 'Base di Conoscenza',
    'nav.faq': 'Gestore FAQ',
    'nav.dashboard': 'Dashboard',
    'nav.systemStatus': 'Stato Sistema',
    'nav.aiEngineOnline': 'Motore IA Online',
    
    // Chat Interface
    'chat.title': 'Chat Supporto Tecnico',
    'chat.subtitle': 'Ottieni aiuto istantaneo per le tue domande tecniche',
    'chat.placeholder': 'Chiedimi qualsiasi cosa sul nostro sistema...',
    'chat.sendHint': 'Premi Invio per inviare, Shift+Invio per nuova riga',
    'chat.initialGreeting': 'Ciao! Sono il tuo assistente di supporto tecnico AI. Posso aiutarti con domande sul nostro sistema, risolvere problemi e fornire documentazione. Come posso aiutarti oggi?',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Monitora le prestazioni e le analisi del tuo helpdesk AI',
    'dashboard.totalConversations': 'Conversazioni Totali',
    'dashboard.documentsIndexed': 'Documenti Indicizzati',
    'dashboard.resolutionRate': 'Tasso di Risoluzione',
    'dashboard.avgResponseTime': 'Tempo Medio di Risposta',
    'dashboard.performanceOverview': 'Panoramica Prestazioni',
    'dashboard.recentActivity': 'Attività Recente',
    'dashboard.quickActions': 'Azioni Rapide',
    'dashboard.uploadDocument': 'Carica Documento',
    'dashboard.manageUsers': 'Gestisci Utenti',
    'dashboard.viewReports': 'Visualizza Report',
    
    // Document Manager
    'docs.title': 'Base di Conoscenza',
    'docs.subtitle': 'Gestisci documenti per addestramento e supporto AI',
    'docs.uploadDocument': 'Carica Documento',
    'docs.searchPlaceholder': 'Cerca documenti...',
    'docs.allCategories': 'Tutte le Categorie',
    'docs.dropFiles': 'Trascina file qui per caricare',
    'docs.supportedFormats': 'Supporto per file PDF, HTML, TXT e Markdown',
    'docs.chooseFiles': 'Scegli File',
    'docs.documents': 'Documenti',
    
    // FAQ Manager
    'faq.title': 'Gestore FAQ',
    'faq.subtitle': 'Gestisci domande frequenti e risposte',
    'faq.addFaq': 'Aggiungi FAQ',
    'faq.searchPlaceholder': 'Cerca FAQ...',
    'faq.noFaqsFound': 'Nessuna FAQ trovata',
    'faq.tryAdjusting': 'Prova ad aggiustare i tuoi termini di ricerca o filtri',
    'faq.addNewFaq': 'Aggiungi Nuova FAQ',
    'faq.question': 'Domanda',
    'faq.answer': 'Risposta',
    'faq.category': 'Categoria',
    'faq.tags': 'Tag',
    'faq.cancel': 'Annulla',
    'faq.saveFaq': 'Salva FAQ',
    
    // Common
    'common.loading': 'Caricamento...',
    'common.error': 'Errore',
    'common.success': 'Successo',
    'common.save': 'Salva',
    'common.cancel': 'Annulla',
    'common.delete': 'Elimina',
    'common.edit': 'Modifica',
    'common.view': 'Visualizza',
    'common.search': 'Cerca',
    'common.filter': 'Filtra',
  },
  zh: {
    // Navigation
    'nav.chat': '聊天支持',
    'nav.documents': '知识库',
    'nav.faq': 'FAQ管理器',
    'nav.dashboard': '仪表板',
    'nav.systemStatus': '系统状态',
    'nav.aiEngineOnline': 'AI引擎在线',
    
    // Chat Interface
    'chat.title': '技术支持聊天',
    'chat.subtitle': '获得技术问题的即时帮助',
    'chat.placeholder': '询问我们系统的任何问题...',
    'chat.sendHint': '按Enter发送，Shift+Enter换行',
    'chat.initialGreeting': '您好！我是您的AI技术支持助手。我可以帮助您解答系统问题、排除故障并提供文档。今天我能为您做些什么？',
    
    // Dashboard
    'dashboard.title': '仪表板',
    'dashboard.subtitle': '监控您的AI帮助台性能和分析',
    'dashboard.totalConversations': '总对话数',
    'dashboard.documentsIndexed': '已索引文档',
    'dashboard.resolutionRate': '解决率',
    'dashboard.avgResponseTime': '平均响应时间',
    'dashboard.performanceOverview': '性能概览',
    'dashboard.recentActivity': '最近活动',
    'dashboard.quickActions': '快速操作',
    'dashboard.uploadDocument': '上传文档',
    'dashboard.manageUsers': '管理用户',
    'dashboard.viewReports': '查看报告',
    
    // Document Manager
    'docs.title': '知识库',
    'docs.subtitle': '管理AI训练和支持文档',
    'docs.uploadDocument': '上传文档',
    'docs.searchPlaceholder': '搜索文档...',
    'docs.allCategories': '所有类别',
    'docs.dropFiles': '将文件拖放到此处上传',
    'docs.supportedFormats': '支持PDF、HTML、TXT和Markdown文件',
    'docs.chooseFiles': '选择文件',
    'docs.documents': '文档',
    
    // FAQ Manager
    'faq.title': 'FAQ管理器',
    'faq.subtitle': '管理常见问题和答案',
    'faq.addFaq': '添加FAQ',
    'faq.searchPlaceholder': '搜索FAQ...',
    'faq.noFaqsFound': '未找到FAQ',
    'faq.tryAdjusting': '尝试调整您的搜索词或过滤器',
    'faq.addNewFaq': '添加新FAQ',
    'faq.question': '问题',
    'faq.answer': '答案',
    'faq.category': '类别',
    'faq.tags': '标签',
    'faq.cancel': '取消',
    'faq.saveFaq': '保存FAQ',
    
    // Common
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.success': '成功',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.view': '查看',
    'common.search': '搜索',
    'common.filter': '过滤',
  },
  ja: {
    // Navigation
    'nav.chat': 'チャットサポート',
    'nav.documents': 'ナレッジベース',
    'nav.faq': 'FAQマネージャー',
    'nav.dashboard': 'ダッシュボード',
    'nav.systemStatus': 'システム状態',
    'nav.aiEngineOnline': 'AIエンジンオンライン',
    
    // Chat Interface
    'chat.title': 'テクニカルサポートチャット',
    'chat.subtitle': '技術的な質問に対する即座のヘルプを取得',
    'chat.placeholder': 'システムについて何でもお聞きください...',
    'chat.sendHint': 'Enterで送信、Shift+Enterで改行',
    'chat.initialGreeting': 'こんにちは！私はあなたのAI技術サポートアシスタントです。システムに関する質問、問題のトラブルシューティング、ドキュメントの提供をお手伝いできます。今日はどのようにお手伝いしましょうか？',
    
    // Dashboard
    'dashboard.title': 'ダッシュボード',
    'dashboard.subtitle': 'AIヘルプデスクのパフォーマンスと分析を監視',
    'dashboard.totalConversations': '総会話数',
    'dashboard.documentsIndexed': 'インデックス済み文書',
    'dashboard.resolutionRate': '解決率',
    'dashboard.avgResponseTime': '平均応答時間',
    'dashboard.performanceOverview': 'パフォーマンス概要',
    'dashboard.recentActivity': '最近のアクティビティ',
    'dashboard.quickActions': 'クイックアクション',
    'dashboard.uploadDocument': 'ドキュメントアップロード',
    'dashboard.manageUsers': 'ユーザー管理',
    'dashboard.viewReports': 'レポート表示',
    
    // Document Manager
    'docs.title': 'ナレッジベース',
    'docs.subtitle': 'AIトレーニングとサポート用ドキュメントを管理',
    'docs.uploadDocument': 'ドキュメントアップロード',
    'docs.searchPlaceholder': 'ドキュメントを検索...',
    'docs.allCategories': 'すべてのカテゴリ',
    'docs.dropFiles': 'ファイルをここにドロップしてアップロード',
    'docs.supportedFormats': 'PDF、HTML、TXT、Markdownファイルをサポート',
    'docs.chooseFiles': 'ファイルを選択',
    'docs.documents': 'ドキュメント',
    
    // FAQ Manager
    'faq.title': 'FAQマネージャー',
    'faq.subtitle': 'よくある質問と回答を管理',
    'faq.addFaq': 'FAQ追加',
    'faq.searchPlaceholder': 'FAQを検索...',
    'faq.noFaqsFound': 'FAQが見つかりません',
    'faq.tryAdjusting': '検索用語やフィルターを調整してみてください',
    'faq.addNewFaq': '新しいFAQを追加',
    'faq.question': '質問',
    'faq.answer': '回答',
    'faq.category': 'カテゴリ',
    'faq.tags': 'タグ',
    'faq.cancel': 'キャンセル',
    'faq.saveFaq': 'FAQ保存',
    
    // Common
    'common.loading': '読み込み中...',
    'common.error': 'エラー',
    'common.success': '成功',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.delete': '削除',
    'common.edit': '編集',
    'common.view': '表示',
    'common.search': '検索',
    'common.filter': 'フィルター',
  },
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  const currentTranslations = translations[selectedLanguage] || translations.en;

  const value: AppContextType = {
    selectedLanguage,
    setSelectedLanguage,
    translations: currentTranslations,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}