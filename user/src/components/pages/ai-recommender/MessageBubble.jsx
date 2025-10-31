import React from 'react';
import { Bot, User, ExternalLink, CheckCircle2 } from 'lucide-react';

/**
 * MessageBubble Component
 * Displays individual chat messages with different styles for user and bot
 */
const MessageBubble = ({ message, isUser }) => {
  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-fade-in">
        <div className="flex items-start max-w-[80%] gap-2">
          <div className="bg-orange-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    );
  }

  // Bot message
  return (
    <div className="flex justify-start mb-4 animate-fade-in">
      <div className="flex items-start max-w-[85%] gap-2">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md border-2 border-orange-200 dark:border-orange-400">
          {message.text && (
            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed mb-2">
              {message.text}
            </p>
          )}
          
          {message.schemes && message.schemes.length > 0 && (
            <div className="mt-3 space-y-3">
              {message.schemes.map((scheme, index) => (
                <SchemeCard key={scheme.id} scheme={scheme} index={index} />
              ))}
            </div>
          )}

          {message.suggestions && message.suggestions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => message.onSuggestionClick?.(suggestion)}
                  className="text-xs px-3 py-1.5 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * SchemeCard Component
 * Displays recommended scheme details within a message
 */
const SchemeCard = ({ scheme, index }) => {
  const scorePercentage = (scheme.finalScore * 100).toFixed(0);
  
  return (
    <div className="border-2 border-orange-200 dark:border-orange-400 rounded-lg p-3 bg-gradient-to-br from-orange-50/50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-bold">
              {index + 1}
            </span>
            <h4 className="font-semibold text-sm text-orange-900 dark:text-orange-400">
              {scheme.scheme_name}
            </h4>
          </div>
          <span className="inline-block px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full">
            {scheme.category}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {scorePercentage}% Match
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-2 line-clamp-2">
        {scheme.description}
      </p>

      {/* Benefits */}
      <div className="mb-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border-l-2 border-green-500">
        <p className="text-xs text-stone-700 dark:text-stone-300">
          <span className="font-semibold">Benefits:</span> {scheme.benefits}
        </p>
      </div>

      {/* Explanation */}
      {scheme.explanation && (
        <div className="mb-2 text-xs text-stone-600 dark:text-stone-400 space-y-0.5">
          {scheme.explanation.split('\n').map((line, i) => (
            <div key={i} className="flex items-start gap-1">
              <span>{line}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      <a
        href={scheme.application_link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 mt-2"
      >
        Apply Now
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
};

/**
 * TypingIndicator Component
 * Shows animated typing indicator when bot is processing
 */
export const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md border-2 border-orange-200 dark:border-orange-400">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
