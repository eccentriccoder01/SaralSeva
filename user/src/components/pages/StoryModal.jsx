import React, { useEffect } from 'react';
import { X, User, MapPin, Tag, Calendar, Quote } from 'lucide-react';

const StoryModal = ({ story, isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Avatar */}
        <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 p-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {story.avatar}
              </span>
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">{story.name}</h2>
              <p className="text-white/90 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {story.location}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Scheme Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-lg">
            <Tag className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="font-semibold text-orange-800 dark:text-orange-300">
              {story.scheme}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Benefited: {story.dateOfBenefit}</span>
          </div>

          {/* Full Story */}
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The Journey
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {story.fullStory}
            </p>
          </div>

          {/* Quote Section */}
          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <div className="flex gap-4">
              <Quote className="w-8 h-8 text-orange-500 flex-shrink-0" />
              <div>
                <p className="text-gray-800 dark:text-gray-200 text-lg italic font-medium">
                  "{story.quote}"
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  — {story.name}
                </p>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Impact Summary
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              {story.shortDescription}
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Inspired by this story? Check if you're eligible for similar schemes!
            </p>
            <button
              onClick={() => {
                onClose();
                window.location.href = '/schemes';
              }}
              className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Explore Schemes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
