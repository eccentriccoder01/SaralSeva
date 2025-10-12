import React, { useState, useMemo } from 'react';

export default function Newsletter() {
  const [lang, setLang] = useState('en');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState(null);

  const strings = useMemo(() => ({
    en: {
      title: 'Newsletter Signup',
      subtitle: 'Get monthly updates about new schemes, guides and community news.',
      name: 'Full name (optional)',
      email: 'Email address',
      consent: 'I agree to receive emails from SaralSeva.',
      submit: 'Subscribe',
      success: 'Thank you — you are subscribed!',
      invalidEmail: 'Please enter a valid email address.',
    },
    hi: {
      title: 'न्यूज़लैटर साइनअप',
      subtitle: 'नए योजनाओं, मार्गदर्शिकाओं और समुदाय समाचारों के मासिक अपडेट पाएं।',
      name: 'पूरा नाम (वैकल्पिक)',
      email: 'ईमेल पता',
      consent: 'मुझे SaralSeva से ईमेल प्राप्त करने की सहमति है।',
      submit: 'सब्सक्राइब करें',
      success: 'शुक्रिया — आप सब्सक्राइब हो गए हैं!',
      invalidEmail: 'कृपया मान्य ईमेल पता दर्ज करें।',
    },
  }), []);

  function validateEmail(e) {
    return /\S+@\S+\.\S+/.test(e);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validateEmail(email)) {
      setStatus({ ok: false, msg: strings[lang].invalidEmail });
      return;
    }
    // simulate submit
    setStatus({ ok: null, msg: 'Sending...' });
    setTimeout(() => {
      setStatus({ ok: true, msg: strings[lang].success });
      setName('');
      setEmail('');
      setConsent(false);
    }, 800);
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{strings[lang].title}</h1>
          <p className="text-gray-600 mt-2">{strings[lang].subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">EN</label>
          <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
          <label className="text-sm">HI</label>
          <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-xl bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-sm mb-1">{strings[lang].name}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder={strings[lang].name} />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">{strings[lang].email}</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder={strings[lang].email} required />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} id="consent" />
          <label htmlFor="consent" className="text-sm">{strings[lang].consent}</label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded-md">{strings[lang].submit}</button>
          {status && (
            <div className={`text-sm ${status.ok ? 'text-green-500' : 'text-red-500'}`}>{status.msg}</div>
          )}
        </div>
      </form>
    </div>
  );
}
