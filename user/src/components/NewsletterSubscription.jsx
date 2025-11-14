import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NewsletterSubscription = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    // Demo mode flag - set to true for testing without backend
    const DEMO_MODE = true;

    // Email validation regex
    const isValidEmail = (emailStr) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailStr);
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();

        // Validate email
        if (!email.trim()) {
            setMessageType('error');
            setMessage(t('footer.newsletter.invalidEmail'));
            return;
        }

        if (!isValidEmail(email)) {
            setMessageType('error');
            setMessage(t('footer.newsletter.invalidEmail'));
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            if (DEMO_MODE) {
                // Demo mode - simulate API response
                await new Promise(resolve => setTimeout(resolve, 1000));
                setMessageType('success');
                setMessage(t('footer.newsletter.successMessage'));
                setEmail('');
                setTimeout(() => setMessage(null), 5000);
            } else {
                // Call the backend API
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/newsletter/subscribe`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: email.trim() }),
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setMessageType('success');
                    setMessage(t('footer.newsletter.successMessage'));
                    setEmail('');
                    // Auto-clear message after 5 seconds
                    setTimeout(() => setMessage(null), 5000);
                } else {
                    if (data.message === 'already_subscribed') {
                        setMessageType('error');
                        setMessage(t('footer.newsletter.alreadySubscribed'));
                    } else {
                        setMessageType('error');
                        setMessage(t('footer.newsletter.errorMessage'));
                    }
                }
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setMessageType('error');
            setMessage(t('footer.newsletter.errorMessage'));
        } finally {
            setLoading(false);
        }
    };

    const handleNoThanks = () => {
        setEmail('');
        setMessage(null);
    };

    return (
        <div className="flex justify-center -mb-2">
            <div className="w-full max-w-md bg-gradient-to-r from-orange-900/20 via-orange-800/20 to-orange-900/20 dark:from-gray-800/20 dark:via-gray-700/20 dark:to-gray-800/20 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-orange-700/30 dark:border-gray-600/30 shadow-md">
                <div className="w-full">
                    {/* Header */}
                    <div className="text-center mb-3 sm:mb-4">
                        <h2 className="text-base sm:text-lg font-extrabold text-orange-100 dark:text-orange-300 jost tracking-wide drop-shadow mb-1">
                            {t('footer.newsletter.title')}
                        </h2>
                        <p className="text-orange-200/80 dark:text-gray-300 text-[13px] sm:text-sm leading-relaxed">
                            {t('footer.newsletter.subtitle')}
                        </p>
                    </div>

                    {/* Newsletter Form */}
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mb-2">
                        <input
                            type="email"
                            placeholder={t('footer.newsletter.emailPlaceholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            className="w-full px-3 h-8 rounded-md border-2 border-orange-600/40 dark:border-gray-500/40 bg-white/80 dark:bg-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 dark:focus:ring-orange-400/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                            aria-label="Email for newsletter"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 h-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-all duration-200 hover:shadow focus:outline-none focus:ring-2 focus:ring-orange-400/30 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap text-sm"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    {t('common.loading')}
                                </span>
                            ) : (
                                t('footer.newsletter.subscribeBtn')
                            )}
                        </button>
                    </form>

                    {/* Message Display */}
                    {message && (
                        <div
                            className={`mb-3 px-3 py-2 rounded-md text-center text-xs sm:text-sm transition-all duration-200 ${messageType === 'success'
                                ? 'bg-green-500/15 text-green-200 border border-green-500/30'
                                : 'bg-red-500/15 text-red-200 border border-red-500/30'
                                }`}
                            role="alert"
                        >
                            {message}
                        </div>
                    )}

                    {/* Terms and Privacy */}
                    <div className="text-center text-xs text-orange-200/70 dark:text-gray-400 leading-relaxed mb-2">
                        <p>
                            {t('footer.newsletter.termsPrefix')}
                            <Link
                                to="/terms"
                                className="text-orange-300 dark:text-orange-400 hover:text-orange-100 dark:hover:text-orange-200 underline hover:underline-offset-1 transition-colors duration-300 mx-1"
                                aria-label="Terms of Service"
                            >
                                {t('footer.newsletter.termsLink')}
                            </Link>
                            {' and '}
                            <Link
                                to="/privacypolicy"
                                className="text-orange-300 dark:text-orange-400 hover:text-orange-100 dark:hover:text-orange-200 underline hover:underline-offset-1 transition-colors duration-300 mx-1"
                                aria-label="Privacy Policy"
                            >
                                {t('footer.newsletter.privacyLink')}
                            </Link>
                        </p>
                    </div>

                    {/* No Thanks Button */}
                    <div className="text-center mt-2">
                        <button
                            onClick={handleNoThanks}
                            className="text-orange-300 dark:text-orange-400 hover:text-orange-100 dark:hover:text-orange-200 text-xs font-medium transition-colors duration-200 focus:outline-none"
                            aria-label="No thanks"
                        >
                            {t('footer.newsletter.noThanksBtn')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSubscription;
