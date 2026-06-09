'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('account');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-orange-yellow rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-bold text-black">TrustTrack</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="/auth/login" className="btn-outline px-6 py-2 text-sm">
              Login
            </Link>
            <Link href="/auth/signup" className="btn-primary px-6 py-2 text-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">
            Check Before You Send
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            Search thousands of bank accounts reported for scams and fraud
          </p>
          <p className="text-lg text-gray-500">
            Community-driven reputation for financial safety
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Type Tabs */}
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setSearchType('account')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  searchType === 'account'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                🏦 Bank Account
              </button>
              <button
                type="button"
                onClick={() => setSearchType('duitnow')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${
                  searchType === 'duitnow'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                💳 DuitNow ID
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchType === 'account' ? 'Enter 10-16 digit account number' : 'Enter DuitNow ID (NRIC/Passport)'}
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-orange-yellow text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary-500">
            <div className="text-3xl font-bold text-primary-500">2.5M+</div>
            <div className="text-gray-600 font-semibold mt-2">Searches</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-secondary-500">
            <div className="text-3xl font-bold text-secondary-500">15K+</div>
            <div className="text-gray-600 font-semibold mt-2">Reported Accounts</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-success">
            <div className="text-3xl font-bold text-success">45K+</div>
            <div className="text-gray-600 font-semibold mt-2">Verified Reports</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-danger">
            <div className="text-3xl font-bold text-danger">RM 250M+</div>
            <div className="text-gray-600 font-semibold mt-2">Losses Reported</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center text-black mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Search Account',
                description: 'Enter a bank account number or DuitNow ID to check its reputation',
              },
              {
                icon: '⚠️',
                title: 'View Risk Score',
                description: 'Get instant risk assessment based on community reports',
              },
              {
                icon: '📊',
                title: 'Make Informed Decision',
                description: 'Review reports, categories, and decide safely',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-black mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-orange-yellow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Protect Your Community</h3>
          <p className="text-lg mb-8 opacity-90">
            Report scams and help others avoid fraud. Your report could save someone from losing money.
          </p>
          <Link href="/report" className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:shadow-lg transition">
            Report a Scam →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {[
              {
                title: 'Product',
                links: ['Search', 'Report', 'Premium', 'API'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Contact'],
              },
              {
                title: 'Legal',
                links: ['Terms', 'Privacy', 'Disclaimer', 'Appeal Process'],
              },
              {
                title: 'Community',
                links: ['Status', 'Support', 'Guidelines', 'FAQ'],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold text-lg mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-white transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TrustTrack. All rights reserved.</p>
            <p className="mt-2">Protecting Southeast Asian communities from fraud.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
