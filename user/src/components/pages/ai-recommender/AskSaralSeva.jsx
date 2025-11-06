import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, HelpCircle, Lightbulb, Bot } from 'lucide-react';
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

const AskSaralSeva = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm SaralSeva AI Assistant. I can help you discover government schemes that match your profile.\n\nTell me about yourself - your age, occupation, location, or what kind of help you're looking for!",
      isUser: false,
      suggestions: [
        "I'm a 45-year-old farmer from Maharashtra",
        "Looking for education scholarships",
        "Need a business loan for my startup",
        "I'm a senior citizen seeking pension"
      ],
      onSuggestionClick: handleSuggestionClick
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSuggestionClick(suggestion) {
    setInputText(suggestion);
    inputRef.current?.focus();
  }

  const processQuery = async (query) => {
    const userMessage = {
      id: Date.now(),
      text: query,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const entities = extractEntities(query);
    const recommendations = recommendSchemes(entities, 5);

    let responseText = '';
    let schemes = [];

    if (recommendations.length > 0) {
      const entitySummary = generateEntitySummary(entities);

      if (entitySummary && entitySummary !== "I'm analyzing your query...") {
        responseText = `${entitySummary}\n\n`;
      }

      responseText += `Great! I found ${recommendations.length} scheme${recommendations.length > 1 ? 's' : ''} that match your profile:`;

      schemes = recommendations.map(scheme => ({
        ...scheme,
        explanation: generateRecommendationExplanation(scheme, entities)
      }));
    } else {
      responseText =
        "I couldn't find any schemes that exactly match your criteria. This could be because:\n\n" +
        "• The information provided doesn't match current scheme eligibility\n" +
        "• You might need to provide more details\n\n" +
        "Try rephrasing your query with more specific information like age, occupation, or location.";
    }

    const botMessage = {
      id: Date.now() + 1,
      text: responseText,
      isUser: false,
      schemes: schemes,
      suggestions: recommendations.length > 0
        ? ["Show me more schemes", "Tell me about eligibility", "How do I apply?"]
        : ["I'm a farmer looking for subsidies", "Education scholarships for students", "Business loans"]
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isTyping) {
      processQuery(inputText.trim());
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        text: "👋 Hello! I'm SaralSeva AI Assistant. I can help you discover government schemes that match your profile.\n\nTell me about yourself - your age, occupation, location, or what kind of help you're looking for!",
        isUser: false,
        suggestions: [
          "I'm a 45-year-old farmer from Maharashtra",
          "Looking for education scholarships",
          "Need a business loan for my startup",
          "I'm a senior citizen seeking pension"
        ],
        onSuggestionClick: handleSuggestionClick
      }
    ]);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-orange-50/30 dark:bg-gray-900 py-8 text-[17px]">

      <div className="container mx-auto px-4 max-w-5xl">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border-2 border-orange-200 dark:border-orange-400">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center shadow-lg"
                data-tooltip-id="ai-icon-tooltip"
                data-tooltip-content="AI-Powered Assistant"
              >
                <Bot className="w-6 h-6 text-white" />
              </div>
              <Tooltip id="ai-icon-tooltip" style={tooltipStyle} />

              <div>
                <h1 className="text-3xl font-bold text-orange-900 dark:text-orange-400 jost flex items-center gap-2">
                  Ask SaralSeva
                  <span className="text-sm font-normal px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">
                    AI Beta
                  </span>
                </h1>
                <p className="text-base text-stone-600 dark:text-stone-400">
                  AI-powered scheme recommendations tailored for you
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors text-base"
              title="Start new conversation"
              data-tooltip-id="reset-tooltip"
              data-tooltip-content="Start a new conversation"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <Tooltip id="reset-tooltip" style={tooltipStyle} />
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="text-base text-orange-800 dark:text-orange-300">
              <p className="font-semibold mb-1 text-lg">💡 Pro Tips for Better Recommendations:</p>
              <ul className="list-disc list-inside space-y-1 text-base">
                <li>Mention your age, occupation, and location</li>
                <li>Specify what type of help you need (education, business, housing, etc.)</li>
                <li>Include income details if relevant</li>
                <li>Be specific about your situation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-orange-200 dark:border-orange-400 overflow-hidden">

          <div className="h-[500px] overflow-y-auto p-6 space-y-4 scroll-smooth text-base">
            {messages.map(message => (
              <MessageBubble
                key={message.id}
                message={message}
                isUser={message.isUser}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t-2 border-orange-200 dark:border-orange-400 p-4 bg-orange-50/50 dark:bg-gray-900">

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your query here... (e.g., I'm a 30-year-old farmer from Punjab)"
                className="flex-1 px-4 py-3 border-2 border-orange-300 dark:border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white text-base placeholder:text-base"
                disabled={isTyping}
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-lg hover:from-orange-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl text-base"
                data-tooltip-id="send-tooltip"
                data-tooltip-content="Send your query"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>

              <Tooltip id="send-tooltip" style={tooltipStyle} />
            </form>

            <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              This AI assistant uses local NLP processing. No data is sent to external servers.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-2 border-orange-200 dark:border-orange-400">

          <h3 className="text-base font-semibold text-orange-900 dark:text-orange-400 mb-3 flex items-center gap-2">
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
                className="text-left text-sm p-2 bg-orange-50 dark:bg-orange-900/20 text-stone-700 dark:text-stone-300 rounded hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors border border-orange-200 dark:border-orange-600"
                data-tooltip-id={`example-${index}-tooltip`}
                data-tooltip-content="Click to try this example"
              >
                "{example}"
              </button>
            ))}

          </div>
        </div>
      </div>

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
