import React, { useState, useMemo } from 'react';
import banner from '../../assets/header-banner2.jpg';

const SAMPLE_POSTS_EN = [
  {
    id: 1,
    slug: 'how-to-apply-for-scheme',
    title: 'How to apply for a SaralSeva scheme',
    date: 'October 10, 2025',
    tags: ['Guides', 'Schemes'],
    excerpt:
      'A short guide that walks you through the steps required to apply for a scheme on SaralSeva. Learn what documents you need and common pitfalls to avoid.',
    content:
      `Step-by-step details:\n\n1. Register or login to your account.\n2. Navigate to the Schemes page.\n3. Fill in the application form and upload necessary documents.\n4. Submit and track your application from your dashboard.\n\nIf you face issues, contact support or check our Help Center for frequently asked questions.`,
  },
  {
    id: 2,
    slug: 'making-most-of-saralseva',
    title: 'Making the most of SaralSeva: tips & tricks',
    date: 'September 3, 2025',
    tags: ['Tips', 'Platform'],
    excerpt:
      'Shortcuts and best practices to get the most value from SaralSeva — from notifications to profile settings and quick search tricks.',
    content:
      `We recommend keeping your profile up-to-date and enabling notifications for updates to schemes you care about. Use filters on the Schemes page to find the best matches and save drafts before submitting long applications.`,
  },
  {
    id: 3,
    slug: 'faq-highlights',
    title: 'FAQ highlights for first-time applicants',
    date: 'August 20, 2025',
    tags: ['FAQ', 'Help'],
    excerpt:
      'A curated list of frequently asked questions that first-time applicants often have — helps reduce common mistakes and speed up applications.',
    content:
      `Common questions include eligibility criteria, document formats, and how to correct mistakes on a submitted form. Refer to each scheme details page for scheme-specific rules.`,
  },
];

const SAMPLE_POSTS_HI = [
  {
    id: 1,
    slug: 'how-to-apply-for-scheme',
    title: 'SaralSeva योजना के लिए कैसे आवेदन करें',
    date: '10 अक्टूबर, 2025',
    tags: ['मार्गदर्शिका', 'योजनाएँ'],
    excerpt:
      'यह छोटा मार्गदर्शक आपको SaralSeva पर योजना के लिए आवेदन करने के चरणों से परिचित कराता है — किन दस्तावेज़ों की आवश्यकता है और सामान्य गलतियाँ।',
    content:
      `चरण-दर-चरण विवरण:\n\n1. अपना खाता पंजीकृत या लॉगिन करें।\n2. योजनाएँ पृष्ठ पर जाएँ।\n3. आवेदन फॉर्म भरें और आवश्यक दस्तावेज़ अपलोड करें।\n4. सबमिट करें और अपने डैशबोर्ड से आवेदन ट्रैक करें।\n\nसमस्याओं के मामले में, सहायता से संपर्क करें या हमारी सहायता केंद्र (Help Center) देखें।`,
  },
  {
    id: 2,
    slug: 'making-most-of-saralseva',
    title: 'SaralSeva का बेहतर उपयोग: टिप्स और ट्रिक्स',
    date: '3 सितंबर, 2025',
    tags: ['टिप्स', 'प्लेटफ़ॉर्म'],
    excerpt:
      'नोटिफिकेशन से लेकर प्रोफ़ाइल सेटिंग्स तक छोटे-छोटे सुझाव ताकि आप SaralSeva का अधिकतम लाभ उठा सकें।',
    content:
      `हम सुझाव देते हैं कि अपनी प्रोफ़ाइल अपडेट रखें और उन योजनाओं के लिए नोटिफिकेशन सक्षम करें जिनमें आपकी रुचि है। लंबी फॉर्म्स जमा करने से पहले ड्राफ्ट सहेजें।`,
  },
  {
    id: 3,
    slug: 'faq-highlights',
    title: 'पहली बार आवेदन करने वालों के लिए मुख्य प्रश्न',
    date: '20 अगस्त, 2025',
    tags: ['सामान्य प्रश्न', 'सहायता'],
    excerpt:
      'नई आवेदकों के अक्सर पूछे जाने वाले प्रश्नों की एक सूची — सामान्य गलतियों को कम करने और आवेदन तेज़ करने में मदद करती है।',
    content:
      `सामान्य प्रश्नों में पात्रता मानदंड, दस्तावेज़ प्रारूप और जमा किए गए फॉर्म में त्रुटियाँ कैसे सुधारे जाएँ शामिल हैं। प्रत्येक योजना के पृष्ठ पर योजना-विशिष्ट नियम देखें।`,
  },
];

export default function Blog() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState({});
  const [lang, setLang] = useState('en');

  const source = lang === 'hi' ? SAMPLE_POSTS_HI : SAMPLE_POSTS_EN;

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return source;
    return source.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q)
    );
  }, [query, source]);

  function toggleExpand(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07132f] text-gray-900 dark:text-gray-100">
      <header className="relative h-56 md:h-72 lg:h-96 overflow-hidden rounded-b-lg mb-8">
        <img src={banner} alt="Blog banner" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">{lang === 'hi' ? 'ब्लॉग' : 'Blog'}</h1>
            <p className="mt-2 text-sm md:text-base opacity-90">{lang === 'hi' ? 'SaralSeva पर नवीनतम पोस्ट, सुझाव और मार्गदर्शिकाएँ।' : 'Read the latest posts, tips and how-tos about using SaralSeva.'}</p>
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <label className="text-sm text-white">EN</label>
            <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-sm text-white">HI</label>
            <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-gray-700 dark:text-gray-300">{lang === 'hi' ? 'ब्लॉग पोस्ट, सुझाव और मार्गदर्शिकाएँ पढ़ें।' : 'Read the latest posts, tips and how-tos about using SaralSeva.'}</p>
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="sr-only">Search posts</label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 py-2 border rounded-md w-56 text-sm"
              placeholder={lang === 'hi' ? 'पोस्ट, टैग खोजें...' : 'Search posts, tags...'}
              aria-label={lang === 'hi' ? 'ब्लॉग पोस्ट खोजें' : 'Search blog posts'}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <article key={post.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
              <header className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
                  <div className="text-xs text-gray-500 mb-2">
                    <time dateTime={post.date}>{post.date}</time> • {post.tags.join(', ')}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="text-sm text-amber-500 hover:underline"
                    aria-expanded={!!expanded[post.id]}
                  >
                    {expanded[post.id] ? (lang === 'hi' ? 'कम दिखाएँ' : 'Show less') : (lang === 'hi' ? 'और पढ़ें' : 'Read more')}
                  </button>
                </div>
              </header>

              <section className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {expanded[post.id] ? post.content : post.excerpt}
              </section>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full text-center text-gray-500">{lang === 'hi' ? 'कोई पोस्ट नहीं मिली। अलग खोज आज़माएँ।' : 'No posts found. Try a different search.'}</div>
          )}
        </div>
      </main>
    </div>
  );
}
