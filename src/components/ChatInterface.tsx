import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreVertical, Globe } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { LanguageSelector } from './LanguageSelector';

import { Message, Language, LanguageConfig } from '../types';

export const languages: LanguageConfig[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your AI technical support assistant. I can help you with questions about our system, troubleshoot issues, and provide documentation. How can I assist you today?',
    sender: 'bot',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'read'
  }
];

const mockResponses: Record<Language, string[]> = {
  en: [
    "I can help you with that. Let me search through our documentation and knowledge base for the most relevant information.",
    "Based on the technical documentation, here's what I found that should resolve your issue:",
    "This is a common question. According to our FAQ and system documentation:",
    "I've found several relevant articles in our knowledge base that address this topic:",
    "Let me provide you with a step-by-step solution based on our technical guides:"
  ],
  es: [
    "Puedo ayudarte con eso. Déjame buscar en nuestra documentación y base de conocimientos la información más relevante.",
    "Basándome en la documentación técnica, esto es lo que encontré que debería resolver tu problema:",
    "Esta es una pregunta común. Según nuestras FAQ y documentación del sistema:",
    "He encontrado varios artículos relevantes en nuestra base de conocimientos que abordan este tema:",
    "Permíteme proporcionarte una solución paso a paso basada en nuestras guías técnicas:"
  ],
  pt: [
    "Posso ajudá-lo com isso. Deixe-me pesquisar em nossa documentação e base de conhecimento as informações mais relevantes.",
    "Com base na documentação técnica, aqui está o que encontrei que deve resolver seu problema:",
    "Esta é uma pergunta comum. De acordo com nossas FAQ e documentação do sistema:",
    "Encontrei vários artigos relevantes em nossa base de conhecimento que abordam este tópico:",
    "Deixe-me fornecer uma solução passo a passo baseada em nossos guias técnicos:"
  ],
  fr: [
    "Je peux vous aider avec cela. Laissez-moi rechercher dans notre documentation et base de connaissances les informations les plus pertinentes.",
    "Basé sur la documentation technique, voici ce que j'ai trouvé qui devrait résoudre votre problème:",
    "C'est une question courante. Selon notre FAQ et documentation système:",
    "J'ai trouvé plusieurs articles pertinents dans notre base de connaissances qui traitent de ce sujet:",
    "Permettez-moi de vous fournir une solution étape par étape basée sur nos guides techniques:"
  ],
  de: [
    "Ich kann Ihnen dabei helfen. Lassen Sie mich in unserer Dokumentation und Wissensdatenbank nach den relevantesten Informationen suchen.",
    "Basierend auf der technischen Dokumentation habe ich folgendes gefunden, was Ihr Problem lösen sollte:",
    "Das ist eine häufige Frage. Laut unserer FAQ und Systemdokumentation:",
    "Ich habe mehrere relevante Artikel in unserer Wissensdatenbank gefunden, die dieses Thema behandeln:",
    "Lassen Sie mich Ihnen eine Schritt-für-Schritt-Lösung basierend auf unseren technischen Leitfäden bereitstellen:"
  ],
  it: [
    "Posso aiutarti con questo. Lasciami cercare nella nostra documentazione e base di conoscenza le informazioni più rilevanti.",
    "Basandomi sulla documentazione tecnica, ecco quello che ho trovato che dovrebbe risolvere il tuo problema:",
    "Questa è una domanda comune. Secondo le nostre FAQ e documentazione di sistema:",
    "Ho trovato diversi articoli rilevanti nella nostra base di conoscenza che affrontano questo argomento:",
    "Lasciami fornire una soluzione passo dopo passo basata sulle nostre guide tecniche:"
  ],
  zh: [
    "我可以帮助您解决这个问题。让我在我们的文档和知识库中搜索最相关的信息。",
    "根据技术文档，我找到了应该能解决您问题的内容：",
    "这是一个常见问题。根据我们的FAQ和系统文档：",
    "我在知识库中找到了几篇涉及此主题的相关文章：",
    "让我根据我们的技术指南为您提供分步解决方案："
  ],
  ja: [
    "それについてお手伝いできます。最も関連性の高い情報について、ドキュメントとナレッジベースを検索させてください。",
    "技術文書に基づいて、問題を解決するために見つけた内容は次のとおりです：",
    "これはよくある質問です。FAQとシステムドキュメントによると：",
    "このトピックに関する関連記事をナレッジベースでいくつか見つけました：",
    "技術ガイドに基づいて、段階的な解決策を提供させてください："
  ]
};

const followUpText: Record<Language, string> = {
  en: `Here's some specific information that might help:

• Check the system logs for any error messages
• Verify your configuration settings match the documentation
• Try restarting the service if the issue persists
• Contact our technical team if you need further assistance

Is there anything specific about this solution you'd like me to explain further?`,
  es: `Aquí tienes información específica que podría ayudar:

• Revisa los registros del sistema en busca de mensajes de error
• Verifica que tu configuración coincida con la documentación
• Intenta reiniciar el servicio si el problema persiste
• Contacta a nuestro equipo técnico si necesitas más ayuda

¿Hay algo específico sobre esta solución que te gustaría que explique más detalladamente?`,
  pt: `Aqui estão algumas informações específicas que podem ajudar:

• Verifique os logs do sistema para mensagens de erro
• Confirme se suas configurações correspondem à documentação
• Tente reiniciar o serviço se o problema persistir
• Entre em contato com nossa equipe técnica se precisar de mais assistência

Há algo específico sobre esta solução que você gostaria que eu explicasse melhor?`,
  fr: `Voici des informations spécifiques qui pourraient aider :

• Vérifiez les journaux système pour tout message d'erreur
• Vérifiez que vos paramètres de configuration correspondent à la documentation
• Essayez de redémarrer le service si le problème persiste
• Contactez notre équipe technique si vous avez besoin d'aide supplémentaire

Y a-t-il quelque chose de spécifique sur cette solution que vous aimeriez que j'explique davantage ?`,
  de: `Hier sind spezifische Informationen, die helfen könnten:

• Überprüfen Sie die Systemprotokolle auf Fehlermeldungen
• Stellen Sie sicher, dass Ihre Konfigurationseinstellungen der Dokumentation entsprechen
• Versuchen Sie, den Service neu zu starten, wenn das Problem weiterhin besteht
• Kontaktieren Sie unser technisches Team, wenn Sie weitere Hilfe benötigen

Gibt es etwas Spezifisches an dieser Lösung, das ich näher erklären soll?`,
  it: `Ecco alcune informazioni specifiche che potrebbero aiutare:

• Controlla i log di sistema per eventuali messaggi di errore
• Verifica che le tue impostazioni di configurazione corrispondano alla documentazione
• Prova a riavviare il servizio se il problema persiste
• Contatta il nostro team tecnico se hai bisogno di ulteriore assistenza

C'è qualcosa di specifico su questa soluzione che vorresti che spiegassi meglio?`,
  zh: `以下是一些可能有帮助的具体信息：

• 检查系统日志中的错误消息
• 验证您的配置设置是否与文档匹配
• 如果问题仍然存在，请尝试重启服务
• 如果需要进一步帮助，请联系我们的技术团队

关于这个解决方案，您希望我进一步解释什么特定内容吗？`,
  ja: `役立つ可能性のある具体的な情報は次のとおりです：

• エラーメッセージについてシステムログを確認してください
• 設定がドキュメントと一致していることを確認してください
• 問題が続く場合は、サービスを再起動してみてください
• さらなる支援が必要な場合は、技術チームにお問い合わせください

この解決策について、さらに詳しく説明してほしい特定の点はありますか？`
};

const relatedDocsText: Record<Language, string[]> = {
  en: ['Installation Guide', 'Troubleshooting FAQ', 'System Configuration'],
  es: ['Guía de Instalación', 'FAQ de Solución de Problemas', 'Configuración del Sistema'],
  pt: ['Guia de Instalação', 'FAQ de Solução de Problemas', 'Configuração do Sistema'],
  fr: ['Guide d\'Installation', 'FAQ de Dépannage', 'Configuration Système'],
  de: ['Installationsanleitung', 'Fehlerbehebungs-FAQ', 'Systemkonfiguration'],
  it: ['Guida all\'Installazione', 'FAQ Risoluzione Problemi', 'Configurazione Sistema'],
  zh: ['安装指南', '故障排除FAQ', '系统配置'],
  ja: ['インストールガイド', 'トラブルシューティングFAQ', 'システム設定']
};

const placeholderText: Record<Language, string> = {
  en: "Ask me anything about our system...",
  es: "Pregúntame cualquier cosa sobre nuestro sistema...",
  pt: "Pergunte-me qualquer coisa sobre nosso sistema...",
  fr: "Demandez-moi n'importe quoi sur notre système...",
  de: "Fragen Sie mich alles über unser System...",
  it: "Chiedimi qualsiasi cosa sul nostro sistema...",
  zh: "询问我们系统的任何问题...",
  ja: "システムについて何でもお聞きください..."
};

const initialGreeting: Record<Language, string> = {
  en: 'Hello! I\'m your AI technical support assistant. I can help you with questions about our system, troubleshoot issues, and provide documentation. How can I assist you today?',
  es: '¡Hola! Soy tu asistente de soporte técnico con IA. Puedo ayudarte con preguntas sobre nuestro sistema, solucionar problemas y proporcionar documentación. ¿Cómo puedo ayudarte hoy?',
  pt: 'Olá! Sou seu assistente de suporte técnico com IA. Posso ajudá-lo com perguntas sobre nosso sistema, solucionar problemas e fornecer documentação. Como posso ajudá-lo hoje?',
  fr: 'Bonjour ! Je suis votre assistant de support technique IA. Je peux vous aider avec des questions sur notre système, résoudre des problèmes et fournir de la documentation. Comment puis-je vous aider aujourd\'hui ?',
  de: 'Hallo! Ich bin Ihr KI-technischer Support-Assistent. Ich kann Ihnen bei Fragen zu unserem System helfen, Probleme beheben und Dokumentation bereitstellen. Wie kann ich Ihnen heute helfen?',
  it: 'Ciao! Sono il tuo assistente di supporto tecnico AI. Posso aiutarti con domande sul nostro sistema, risolvere problemi e fornire documentazione. Come posso aiutarti oggi?',
  zh: '您好！我是您的AI技术支持助手。我可以帮助您解答系统问题、排除故障并提供文档。今天我能为您做些什么？',
  ja: 'こんにちは！私はあなたのAI技術サポートアシスタントです。システムに関する質問、問題のトラブルシューティング、ドキュメントの提供をお手伝いできます。今日はどのようにお手伝いしましょうか？'
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update initial message when language changes
  useEffect(() => {
    setMessages([{
      id: '1',
      content: initialGreeting[selectedLanguage],
      sender: 'bot',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'read'
    }]);
  }, [selectedLanguage]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponses[selectedLanguage][Math.floor(Math.random() * mockResponses[selectedLanguage].length)] + `${followUpText[selectedLanguage]}`,
        sender: 'bot',
        timestamp: new Date(),
        status: 'read',
        relatedDocs: relatedDocsText[selectedLanguage]
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Technical Support Chat</h1>
            <p className="text-sm text-gray-500">Get instant help with your technical questions</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button 
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === selectedLanguage)?.flag}
                </span>
              </button>
              
              {showLanguageSelector && (
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  onClose={() => setShowLanguageSelector(false)}
                />
              )}
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex items-end space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholderText[selectedLanguage]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}