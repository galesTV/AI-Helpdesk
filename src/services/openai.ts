import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,  // Changed to Vite's format
  dangerouslyAllowBrowser: true
});

export interface ChatGPTMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatGPTResponse {
  content: string;
  relatedDocs?: string[];
}

// System prompts for different languages
const systemPrompts = {
  en: `You are a helpful AI technical support assistant. You provide clear, accurate, and helpful responses to technical questions. Always be professional and concise. If you reference documentation, mention specific document names that might be helpful.`,
  es: `Eres un asistente de soporte técnico IA útil. Proporcionas respuestas claras, precisas y útiles a preguntas técnicas. Siempre sé profesional y conciso. Si haces referencia a documentación, menciona nombres específicos de documentos que podrían ser útiles.`,
  pt: `Você é um assistente de suporte técnico IA útil. Você fornece respostas claras, precisas e úteis para perguntas técnicas. Sempre seja profissional e conciso. Se você referenciar documentação, mencione nomes específicos de documentos que podem ser úteis.`,
  fr: `Vous êtes un assistant de support technique IA utile. Vous fournissez des réponses claires, précises et utiles aux questions techniques. Soyez toujours professionnel et concis. Si vous référencez de la documentation, mentionnez des noms de documents spécifiques qui pourraient être utiles.`,
  de: `Sie sind ein hilfreicher KI-technischer Support-Assistent. Sie geben klare, genaue und hilfreiche Antworten auf technische Fragen. Seien Sie immer professionell und prägnant. Wenn Sie auf Dokumentation verweisen, erwähnen Sie spezifische Dokumentnamen, die hilfreich sein könnten.`,
  it: `Sei un assistente di supporto tecnico AI utile. Fornisci risposte chiare, accurate e utili alle domande tecniche. Sii sempre professionale e conciso. Se fai riferimento alla documentazione, menziona nomi specifici di documenti che potrebbero essere utili.`,
  zh: `您是一个有用的AI技术支持助手。您为技术问题提供清晰、准确和有用的回答。始终保持专业和简洁。如果您引用文档，请提及可能有用的具体文档名称。`,
  ja: `あなたは役立つAI技術サポートアシスタントです。技術的な質問に対して明確で正確で役立つ回答を提供します。常にプロフェッショナルで簡潔にしてください。ドキュメントを参照する場合は、役立つ可能性のある具体的なドキュメント名を言及してください。`
};

// Mock knowledge base for demonstration
const mockKnowledgeBase = {
  en: [
    'Installation Guide.pdf',
    'API Documentation.html',
    'Troubleshooting FAQ.md',
    'Configuration Manual.pdf',
    'Security Best Practices.pdf'
  ],
  es: [
    'Guía de Instalación.pdf',
    'Documentación de API.html',
    'FAQ de Solución de Problemas.md',
    'Manual de Configuración.pdf',
    'Mejores Prácticas de Seguridad.pdf'
  ],
  pt: [
    'Guia de Instalação.pdf',
    'Documentação da API.html',
    'FAQ de Solução de Problemas.md',
    'Manual de Configuração.pdf',
    'Melhores Práticas de Segurança.pdf'
  ],
  fr: [
    'Guide d\'Installation.pdf',
    'Documentation API.html',
    'FAQ de Dépannage.md',
    'Manuel de Configuration.pdf',
    'Meilleures Pratiques de Sécurité.pdf'
  ],
  de: [
    'Installationsanleitung.pdf',
    'API-Dokumentation.html',
    'Fehlerbehebungs-FAQ.md',
    'Konfigurationshandbuch.pdf',
    'Sicherheits-Best-Practices.pdf'
  ],
  it: [
    'Guida all\'Installazione.pdf',
    'Documentazione API.html',
    'FAQ Risoluzione Problemi.md',
    'Manuale di Configurazione.pdf',
    'Migliori Pratiche di Sicurezza.pdf'
  ],
  zh: [
    '安装指南.pdf',
    'API文档.html',
    '故障排除FAQ.md',
    '配置手册.pdf',
    '安全最佳实践.pdf'
  ],
  ja: [
    'インストールガイド.pdf',
    'APIドキュメント.html',
    'トラブルシューティングFAQ.md',
    '設定マニュアル.pdf',
    'セキュリティベストプラクティス.pdf'
  ]
};

export async function sendMessageToChatGPT(
  message: string,
  conversationHistory: ChatGPTMessage[],
  language: string = 'en'
): Promise<ChatGPTResponse> {
  try {
    // Check if API key is available
    if (!process.env.REACT_APP_OPENAI_API_KEY) {
      // Fallback to mock response if no API key
      return getMockResponse(message, language);
    }

    const systemPrompt = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en;
    
    const messages: ChatGPTMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response at this time.';
    
    // Simulate related documents based on content keywords
    const relatedDocs = getRelatedDocuments(message, language);

    return {
      content,
      relatedDocs: relatedDocs.length > 0 ? relatedDocs : undefined
    };

  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    
    // Fallback to mock response on error
    return getMockResponse(message, language);
  }
}

function getMockResponse(message: string, language: string): ChatGPTResponse {
  const mockResponses = {
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

  const responses = mockResponses[language as keyof typeof mockResponses] || mockResponses.en;
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  const followUpText = getFollowUpText(language);
  const relatedDocs = getRelatedDocuments(message, language);

  return {
    content: `${randomResponse}\n\n${followUpText}`,
    relatedDocs: relatedDocs.length > 0 ? relatedDocs : undefined
  };
}

function getFollowUpText(language: string): string {
  const followUpTexts = {
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

  return followUpTexts[language as keyof typeof followUpTexts] || followUpTexts.en;
}

function getRelatedDocuments(message: string, language: string): string[] {
  const docs = mockKnowledgeBase[language as keyof typeof mockKnowledgeBase] || mockKnowledgeBase.en;
  
  // Simple keyword matching for demo purposes
  const keywords = message.toLowerCase();
  const relatedDocs: string[] = [];

  if (keywords.includes('install') || keywords.includes('setup')) {
    relatedDocs.push(docs[0]); // Installation Guide
  }
  if (keywords.includes('api') || keywords.includes('integration')) {
    relatedDocs.push(docs[1]); // API Documentation
  }
  if (keywords.includes('error') || keywords.includes('problem') || keywords.includes('issue')) {
    relatedDocs.push(docs[2]); // Troubleshooting FAQ
  }
  if (keywords.includes('config') || keywords.includes('setting')) {
    relatedDocs.push(docs[3]); // Configuration Manual
  }
  if (keywords.includes('security') || keywords.includes('ssl') || keywords.includes('auth')) {
    relatedDocs.push(docs[4]); // Security Best Practices
  }

  // Return up to 3 related documents
  return relatedDocs.slice(0, 3);
}