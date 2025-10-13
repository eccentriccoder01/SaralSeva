import React, { useState, useMemo } from 'react';
import banner from './../../assets/header-banner2.jpg';

const SAMPLE_POSTS = [
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

export default function Blog() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState({});

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SAMPLE_POSTS;
    return SAMPLE_POSTS.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q)
    );
  }, [query]);

  function toggleExpand(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="bg-orange-50/30 dark:bg-gray-900/50 transition-colors duration-300">
      <div
        className="relative flex items-center justify-center h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-5xl font-extrabold text-white jost tracking-wider">Blog</h1>
      </div>

      <div className="container mx-auto p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-gray-700">Read the latest posts, tips and how-tos about using SaralSeva.</p>
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="sr-only">Search posts</label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 py-2 border rounded-md w-56 text-sm"
              placeholder="Search posts, tags..."
              aria-label="Search blog posts"
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
                    {expanded[post.id] ? 'Show less' : 'Read more'}
                  </button>
                </div>
              </header>

              <section className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {expanded[post.id] ? post.content : post.excerpt}
              </section>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No posts found. Try a different search.</div>
          )}
        </div>
      </div>
    </div>
  );
}
