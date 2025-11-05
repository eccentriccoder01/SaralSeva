import React, { useState, useMemo } from 'react';
import { FaFacebook, FaWhatsapp, FaYoutube, FaInstagram, FaXTwitter, FaHeart, FaComment } from 'react-icons/fa6';
import qrcode from '../../assets/QRcode.jpg';
import banner from '../../assets/header-banner2.jpg';

const CHANNELS = [
  { id: 'c1', name: 'Facebook', url: 'https://facebook.com', icon: <FaFacebook /> },
  { id: 'c2', name: 'WhatsApp', url: 'https://wa.me/', icon: <FaWhatsapp /> },
  { id: 'c3', name: 'YouTube', url: 'https://youtube.com', icon: <FaYoutube /> },
  { id: 'c4', name: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram /> },
  { id: 'c5', name: 'X (Twitter)', url: 'https://twitter.com', icon: <FaXTwitter /> },
];

const SAMPLE_POSTS = [
  { id: 'p1', author: 'SaralSeva', text: 'We launched a new FAQ page to help you find schemes faster. Check it out!', time: '2h', likes: 12, comments: 3, tags: ['#announcement'] },
  { id: 'p2', author: 'Ramesh', text: 'Successfully submitted my grievance and got a response in 5 days. Thank you team!', time: '1d', likes: 34, comments: 6, tags: ['#grievance', '#success'] },
];

export default function Social() {
  const [lang, setLang] = useState('en');
  const [isQROpen, setIsQROpen] = useState(false);
  const [composer, setComposer] = useState('');
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [filterTag, setFilterTag] = useState('');

  const strings = useMemo(() => ({
    en: {
      title: 'Social Media',
      subtitle: 'Follow SaralSeva, share experiences and connect with the community.',
      placeholder: "What's on your mind?",
      post: 'Post',
      trends: 'Trending tags',
      openQR: 'Open QR',
      copy: 'Copy link',
    },
    hi: {
      title: 'सोशल मीडिया',
      subtitle: 'SaralSeva को फॉलो करें, अनुभव साझा करें और समुदाय से जुड़ें।',
      placeholder: 'आप क्या साझा करना चाहते हैं?',
      post: 'पोस्ट करें',
      trends: 'लोकप्रिय टैग',
      openQR: 'QR खोलें',
      copy: 'लिंक कॉपी करें',
    }
  }), []);

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

  function addPost() {
    if (!composer.trim()) return;
    const newPost = { id: 'p' + Date.now(), author: 'You', text: composer.trim(), time: 'now', likes: 0, comments: 0, tags: [] };
    setPosts(prev => [newPost, ...prev]);
    setComposer('');
  }

  function toggleLike(id) {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  }

  function copyToClipboard(text) {
    navigator.clipboard?.writeText(text).then(() => {
      // small non-blocking feedback
      try { window?.toast?.show?.('Copied'); } catch(e) { /* noop */ }
    }).catch(() => {});
  }

  function shareUrl(url) {
    if (navigator.share) navigator.share({ title: 'SaralSeva', url }).catch(() => window.open(url, '_blank'));
    else window.open(url, '_blank');
  }

  const visiblePosts = filterTag ? posts.filter(p => p.tags.includes(filterTag)) : posts;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07132f] text-gray-900 dark:text-gray-100">
      {/* Banner */}
      <header className="relative h-56 md:h-72 lg:h-96 overflow-hidden rounded-b-lg mb-8">
        <img src={banner} alt="Social banner" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">{strings[lang].title}</h1>
            <p className="mt-2 text-white text-sm md:text-base opacity-90">{strings[lang].subtitle}</p>
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <label className="text-sm text-white" htmlFor="lang-en">EN</label>
            <input id="lang-en" aria-label="English" type="radio" name="social-lang" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-sm text-white" htmlFor="lang-hi">HI</label>
            <input id="lang-hi" aria-label="Hindi" type="radio" name="social-lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Composer + Feed */}
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <label htmlFor="composer" className="sr-only">{strings[lang].placeholder}</label>
            <textarea id="composer" value={composer} onChange={(e) => setComposer(e.target.value)} placeholder={strings[lang].placeholder} className="w-full p-3 border rounded-md bg-transparent text-gray-900 dark:text-gray-100" rows={3} />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => shareUrl(window.location.href)} className="px-3 py-2 border rounded-md text-sm">Share</button>
                <button onClick={() => copyToClipboard(window.location.href)} className="px-3 py-2 border rounded-md text-sm">{strings[lang].copy}</button>
              </div>
              <div>
                <button onClick={addPost} className="px-4 py-2 bg-amber-500 text-white rounded-md font-medium">{strings[lang].post}</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {visiblePosts.map(p => (
              <article key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg" aria-labelledby={`post-${p.id}`}>
                <header className="flex items-start justify-between">
                  <div>
                    <h3 id={`post-${p.id}`} className="font-semibold">{p.author}</h3>
                    <div className="text-xs text-gray-500">{p.time}</div>
                  </div>
                  <div className="text-sm text-gray-500">{p.tags.map(t => <span key={t} className="ml-2">{t}</span>)}</div>
                </header>
                <p className="mt-3 text-gray-700 dark:text-gray-200">{p.text}</p>
                <footer className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleLike(p.id)} aria-label="Like post" className="flex items-center gap-2 text-amber-600">
                      <FaHeart /> <span className="text-sm">{p.likes}</span>
                    </button>
                    <div className="flex items-center gap-2 text-gray-500"><FaComment /> <span className="text-sm">{p.comments}</span></div>
                  </div>
                  <div className="text-sm text-gray-500">Share: {CHANNELS.map(c => (
                    <button key={c.id} onClick={() => shareUrl(c.url)} className="ml-2" aria-label={`Share to ${c.name}`}>{c.icon}</button>
                  ))}</div>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">{strings[lang].trends}</h4>
            <div className="flex flex-wrap gap-2">
              {allTags.length ? allTags.map(tag => (
                <button key={tag} onClick={() => setFilterTag(tag === filterTag ? '' : tag)} className={`px-3 py-1 rounded-full border ${filterTag === tag ? 'bg-amber-500 text-white' : 'bg-transparent text-gray-700 dark:text-gray-200'}`} aria-pressed={filterTag === tag}>{tag}</button>
              )) : <div className="text-sm text-gray-500">No tags yet</div>}
            </div>
            <div className="mt-4">
              <img src={qrcode} alt="Community QR" className="w-32 h-32 rounded-md border p-1 cursor-pointer" onClick={() => setIsQROpen(true)} />
              <div className="mt-2 text-sm text-gray-600">{strings[lang].openQR}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-sm">
            <h4 className="font-semibold mb-2">{lang === 'hi' ? 'हमारे चैनल' : 'Our channels'}</h4>
            <div className="flex items-center gap-3 text-2xl">
              {CHANNELS.map((c) => (
                <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-500" aria-label={`Open ${c.name}`}>{c.icon}</a>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* QR Modal */}
      {isQROpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-60" onClick={() => setIsQROpen(false)} />
          <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <button aria-label="Close" className="absolute -top-3 -right-3 bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setIsQROpen(false)}>✕</button>
            <img src={qrcode} alt="Social QR large" className="w-80 h-80 object-cover rounded-md" />
            <p className="text-sm text-gray-600 mt-3 text-center">{lang === 'hi' ? 'QR स्कैन करें' : 'Scan this QR'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
