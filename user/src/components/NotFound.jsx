import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Animated 404 */}
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <h1 className="text-[140px] md:text-[180px] font-bold leading-none tracking-tight animate-pulse" style={{ color: '#783117' }}>
              404
            </h1>
            <div className="absolute inset-0 blur-3xl opacity-30 -z-10" style={{ background: '#783117' }}></div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              It might have been moved, deleted, or the URL might be incorrect.
            </p>
          </div>

          {/* Icon Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgba(120, 49, 23, 0.1), rgba(120, 49, 23, 0.2))' }}>
                <Search className="w-16 h-16" style={{ color: '#783117' }} strokeWidth={1.5} />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-xl font-bold">!</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ background: '#783117' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#5a2511'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#783117'}
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </a>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg border-2 transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ borderColor: '#783117' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#783117';
                e.currentTarget.style.color = '#783117';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#783117';
                e.currentTarget.style.color = '';
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Need help? Try these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/services"
              className="text-sm underline decoration-dotted underline-offset-4 transition-colors"
              style={{ color: '#783117' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#5a2511'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#783117'}
            >
              Services
            </a>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <a
              href="/about"
              className="text-sm underline decoration-dotted underline-offset-4 transition-colors"
              style={{ color: '#783117' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#5a2511'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#783117'}
            >
              About Us
            </a>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <a
              href="/contact"
              className="text-sm underline decoration-dotted underline-offset-4 transition-colors"
              style={{ color: '#783117' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#5a2511'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#783117'}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}