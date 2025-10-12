import React, { useState, useMemo } from 'react';
import { FaFacebook, FaWhatsapp, FaYoutube, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import qrcode from '../../assets/QRcode.jpg';

const CHANNELS = [
  { id: 'c1', name: 'Facebook', url: 'https://facebook.com', icon: <FaFacebook /> },
  { id: 'c2', name: 'WhatsApp', url: 'https://wa.me/', icon: <FaWhatsapp /> },
  { id: 'c3', name: 'YouTube', url: 'https://youtube.com', icon: <FaYoutube /> },
  { id: 'c4', name: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram /> },
  { id: 'c5', name: 'X (Twitter)', url: 'https://twitter.com', icon: <FaXTwitter /> },
];

export default function Social() {
  const [lang, setLang] = useState('en');
  const [isQROpen, setIsQROpen] = useState(false);

  const strings = useMemo(() => ({
    en: {
      title: 'Social Media',
      subtitle: 'Follow SaralSeva on our social channels and join the community.',
      share: 'Share',
      copy: 'Copy link',
      openQR: 'Open QR',
    },
    hi: {
      title: 'सोशल मीडिया',
      subtitle: 'SaralSeva को हमारे सोशल चैनलों पर फॉलो करें और समुदाय से जुड़ें।',
      share: 'शेयर करें',
      copy: 'लिंक कॉपी करें',
      openQR: 'QR खोलें',
    },
  }), []);

  function copyToClipboard(url) {
    navigator.clipboard?.writeText(url).then(() => {
      // small feedback
      alert('Link copied to clipboard');
    });
  }

  function shareChannel(url) {
    if (navigator.share) {
      navigator.share({ title: 'SaralSeva', url }).catch(() => {});
    } else {
      window.open(url, '_blank');
    }
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

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="font-semibold mb-3">{lang === 'hi' ? 'हमारे चैनल' : 'Our channels'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHANNELS.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 border rounded-md bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-amber-500">{c.icon}</div>
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.url}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => shareChannel(c.url)} className="px-3 py-1 border rounded-md text-sm">{strings[lang].share}</button>
                    <button onClick={() => copyToClipboard(c.url)} className="px-3 py-1 border rounded-md text-sm">{strings[lang].copy}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{lang === 'hi' ? 'कम्युनिटी हब QR' : 'Community hub QR'}</h3>
            <div className="flex items-center gap-4">
              <img src={qrcode} alt="Social QR" className="w-28 h-28 rounded-md border p-1 cursor-pointer" onClick={() => setIsQROpen(true)} />
              <div>
                <p className="text-sm text-gray-700">{lang === 'hi' ? 'हमारे सोशल हब को QR स्कैन करके खोलें' : 'Scan QR to open our social hub'}</p>
                <div className="mt-3 flex gap-2">
                  <a href="/social" className="px-3 py-2 bg-amber-500 text-white rounded-md">{lang === 'hi' ? 'हब खोलें' : 'Open hub'}</a>
                  <button onClick={() => setIsQROpen(true)} className="px-3 py-2 border rounded-md">{strings[lang].openQR}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{lang === 'hi' ? 'फॉलो करें' : 'Follow us'}</h3>
            <div className="flex items-center gap-3 text-2xl">
              {CHANNELS.map((c) => (
                <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-500">{c.icon}</a>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-sm">
            <h4 className="font-semibold mb-2">{lang === 'hi' ? 'साझा करें' : 'Share SaralSeva'}</h4>
            <p className="text-gray-700 mb-3">{lang === 'hi' ? 'अपने मित्रों के साथ लिंक साझा करें और समुदाय बढ़ाएँ।' : 'Share the link with friends to grow the community.'}</p>
            <div className="flex gap-2">
              <button onClick={() => copyToClipboard(window.location.href)} className="px-3 py-2 border rounded-md">{strings[lang].copy}</button>
            </div>
          </div>
        </aside>
      </section>

      {/* QR Modal */}
      {isQROpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-60" onClick={() => setIsQROpen(false)} />
          <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <button className="absolute -top-3 -right-3 bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setIsQROpen(false)}>✕</button>
            <img src={qrcode} alt="Social QR large" className="w-80 h-80 object-cover rounded-md" />
            <p className="text-sm text-gray-600 mt-3 text-center">{lang === 'hi' ? 'QR स्कैन करें' : 'Scan this QR'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
