import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, HelpCircle, Lightbulb, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // ✅ Add i18next hook
import MessageBubble, { TypingIndicator } from './MessageBubble';
import { extractEntities, generateEntitySummary } from '../../../utils/nlpProcessor';
import { recommendSchemes, generateRecommendationExplanation } from '../../../utils/schemeRecommender';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const tooltipStyle = {
  backgroundColor: '#FF9933',
  color: '#1F2937',
  padding: '8px 12px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  maxWidth: '220px',
  whiteSpace: 'pre-line',
  zIndex: 9999,
};

/**
 * AskSaralSeva Component
 * AI-powered chat interface for scheme recommendations
 */
const AskSaralSeva = () => {
  const { t } = useTranslation(); // ✅ Add translation hook

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('aiRecommender.greeting') + '\n\n' + t('aiRecommender.tellAbout'),
      isUser: false,
      suggestions: [
        t('aiRecommender.suggestion1'),
        t('aiRecommender.suggestion2'),
        t('aiRecommender.suggestion3'),
        t('aiRecommender.suggestion4')
      ],
      onSuggestionClick: handleSuggestionClick
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /**
   * Handle suggestion click
   */
  function handleSuggestionClick(suggestion) {
    setInputText(suggestion);
    inputRef.current?.focus();
  }

  /**
   * Process user query and generate recommendations
   */
  const processQuery = async (query) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: query,
      isUser: true
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Extract entities from query
    const entities = extractEntities(query);
    console.log('Extracted entities:', entities);

    // Get recommendations
    const recommendations = recommendSchemes(entities, 5);
    console.log('Recommendations:', recommendations);

    // Generate response
    let responseText = '';
    let schemes = [];

    if (recommendations.length > 0) {
      // Add entity summary
      const entitySummary = generateEntitySummary(entities);
      if (entitySummary && entitySummary !== "I'm analyzing your query...") {
        responseText = `${entitySummary}\n\n`;
      }

      responseText += `${t('common.success')}! I found ${recommendations.length} scheme${recommendations.length > 1 ? 's' : ''} that match your profile:`;

      // Add explanation to each scheme
      schemes = recommendations.map(scheme => ({
        ...scheme,
        explanation: generateRecommendationExplanation(scheme, entities)
      }));
    } else {
      responseText = `${t('common.error')} - couldn't find any matching schemes.\n\n` +
        "• " + t('common.noData') + "\n" +
        "• " + t('messages.requiredField') + "\n\n" +
        "Try rephrasing your query with more specific information.";
    }

    // Add bot response
    const botMessage = {
      id: Date.now() + 1,
      text: responseText,
      isUser: false,
      schemes: schemes,
      suggestions: recommendations.length > 0
        ? ["Tell me more schemes", "About eligibility", "How to apply?"]
        : ["Farmer looking for subsidies", "Education scholarships", "Business loans"]
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isTyping) {
      processQuery(inputText.trim());
    }
  };

  /**
   * Handle reset conversation
   */
  const handleReset = () => {
    setMessages([
      {
        id: 1,
        text: t('aiRecommender.greeting') + '\n\n' + t('aiRecommender.tellAbout'),
        isUser: false,
        suggestions: [
          t('aiRecommender.suggestion1'),
          t('aiRecommender.suggestion2'),
          t('aiRecommender.suggestion3'),
          t('aiRecommender.suggestion4')
        ],
        onSuggestionClick: handleSuggestionClick
      }
    ]);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-orange-50/30 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border-2 border-orange-200 dark:border-orange-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center shadow-lg"
                data-tooltip-id="ai-icon-tooltip"
                data-tooltip-content="AI-Powered Assistant">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <Tooltip id="ai-icon-tooltip" style={tooltipStyle} />
              <div>
                <h1 className="text-2xl font-bold text-orange-900 dark:text-orange-400 jost flex items-center gap-2">
                  {t('aiRecommender.title')}
                  <span className="text-sm font-normal px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">
                    AI Beta
                  </span>
                </h1>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {t('aiRecommender.subtitle')}
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
              title={t('aiRecommender.reset')}
              data-tooltip-id="reset-tooltip"
              data-tooltip-content={t('aiRecommender.reset')}>
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">{t('common.ok')}</span>
            </button>
            <Tooltip id="reset-tooltip" style={tooltipStyle} />
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-800 dark:text-orange-300">
              <p className="font-semibold mb-1">💡 Pro Tips for Better Recommendations:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Mention your age, occupation, and location</li>
                <li>Specify what type of help you need (education, business, housing, etc.)</li>
                <li>Include income details if relevant</li>
                <li>Be specific about your situation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-orange-200 dark:border-orange-400 overflow-hidden">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 scroll-smooth">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isUser={message.isUser}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-2 border-orange-200 dark:border-orange-400 p-4 bg-orange-50/50 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('aiRecommender.typePlaceholder')}
                className="flex-1 px-4 py-3 border-2 border-orange-300 dark:border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-lg hover:from-orange-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
                data-tooltip-id="send-tooltip"
                data-tooltip-content={t('aiRecommender.send')}>
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{t('aiRecommender.send')}</span>
              </button>
              <Tooltip id="send-tooltip" style={tooltipStyle} />
            </form>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              This AI assistant uses local NLP processing. No data is sent to external servers.
            </p>
          </div>
        </div>

        {/* Examples Section */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-2 border-orange-200 dark:border-orange-400">
          <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-400 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-orange-600" />
            Example Queries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "I'm a 45-year-old farmer from Maharashtra looking for irrigation subsidy",
              "Need scholarship for my daughter who is in college",
              "I'm a woman entrepreneur wanting to start a small business",
              "Looking for pension schemes for senior citizens above 60",
              "I'm unemployed and want skill development training",
              "Need health insurance for my family with low income"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(example)}
                className="text-left text-xs p-2 bg-orange-50 dark:bg-orange-900/20 text-stone-700 dark:text-stone-300 rounded hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors border border-orange-200 dark:border-orange-600"
                data-tooltip-id={`example-${index}-tooltip`}
                data-tooltip-content="Click to try this example">
                "{example}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AskSaralSeva;
