import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Globe } from 'lucide-react';

/**
 * LanguageSwitcher Component
 * Provides a dropdown to switch between English and Hindi
 */
const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    };

    const currentLanguage = i18n.language;
    const languageName = currentLanguage === 'en' ? t('common.english') : t('common.hindi');

    return (
        <TooltipProvider>
            <Tooltip>
                <DropdownMenu>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger className="p-2 rounded-full outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-orange-900 dark:focus:ring-offset-gray-900 hover:bg-orange-800/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                            <Globe className="w-6 h-6 text-orange-100 dark:text-orange-200 hover:text-amber-400 dark:hover:text-amber-300 transition-colors duration-200" />
                        </DropdownMenuTrigger>
                    </TooltipTrigger>

                    <DropdownMenuContent className="mt-2 bg-orange-900/95 dark:bg-gray-900/95 backdrop-blur-md text-white border-orange-800 dark:border-gray-700 w-48 transition-colors duration-500">
                        <DropdownMenuLabel className="font-bold text-amber-400 dark:text-amber-300">
                            {t('common.selectLanguage')}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-orange-800 dark:bg-gray-700" />

                        <DropdownMenuItem
                            onClick={() => handleLanguageChange('en')}
                            className={`cursor-pointer focus:bg-orange-800 dark:focus:bg-gray-700 focus:text-amber-400 dark:focus:text-amber-300 ${currentLanguage === 'en' ? 'bg-orange-800 dark:bg-gray-700 text-amber-400 dark:text-amber-300' : ''
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span>🇮🇳</span>
                                {t('common.english')}
                                {currentLanguage === 'en' && <span className="ml-auto">✓</span>}
                            </span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => handleLanguageChange('hi')}
                            className={`cursor-pointer focus:bg-orange-800 dark:focus:bg-gray-700 focus:text-amber-400 dark:focus:text-amber-300 ${currentLanguage === 'hi' ? 'bg-orange-800 dark:bg-gray-700 text-amber-400 dark:text-amber-300' : ''
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span>🇮🇳</span>
                                {t('common.hindi')}
                                {currentLanguage === 'hi' && <span className="ml-auto">✓</span>}
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <TooltipContent className="bg-orange-800 dark:bg-gray-800 text-white border-orange-700 dark:border-gray-700">
                    <p>{t('common.selectLanguage')}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default LanguageSwitcher;
