import React from 'react';
import SEO from '../components/SEO';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top Travel Destinations for 2024',
      excerpt: 'Discover the most popular travel destinations this year with our comprehensive guide to must-visit places around the world.',
      date: 'January 15, 2024',
      category: 'Travel',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'How to Save Money on Your Next Vacation',
      excerpt: 'Learn practical tips and strategies to make your travel budget go further without sacrificing the quality of your experience.',
      date: 'January 10, 2024',
      category: 'Budget',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'The Ultimate Guide to Booking Services Online',
      excerpt: 'Everything you need to know about making secure and efficient bookings through our platform.',
      date: 'January 5, 2024',
      category: 'Guide',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Safety Tips for Solo Travelers',
      excerpt: 'Essential safety advice for travelers exploring the world alone, with practical tips for staying safe.',
      date: 'December 28, 2023',
      category: 'Safety',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'Sustainable Travel: Making Responsible Choices',
      excerpt: 'How to travel responsibly and reduce your environmental impact while exploring new destinations.',
      date: 'December 20, 2023',
      category: 'Sustainability',
      readTime: '6 min read'
    },
    {
      id: 6,
      title: 'Seasonal Travel: What to Pack for Each Season',
      excerpt: 'A comprehensive packing guide for different seasons and climates to ensure you\'re prepared for any trip.',
      date: 'December 15, 2023',
      category: 'Travel Tips',
      readTime: '5 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO
        title="Blog — City Guides, Safety & Booking Tips | BookEase"
        description="Read city guides, safety tips, and booking advice for escorts and companion services in India."
        canonical="https://bookease.com/blog"
        meta={[{ name: 'keywords', content: 'escort blog, safety tips, booking guides, city guide escorts' }]}
      />
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover travel tips, booking guides, and industry insights to enhance your travel experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-3">{post.category}</span>
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a 
                  href={`/blog/${post.id}`} 
                  className="text-blue-600 hover:underline font-medium inline-flex items-center"
                >
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Load More Articles
          </button>
        </div>
        
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to receive the latest travel tips, exclusive offers, and industry insights directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;