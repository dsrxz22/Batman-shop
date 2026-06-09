'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatRelativeTime, maskAccountNumber, getRiskColor, getRiskLabel } from '@/lib/utils';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const searchType = searchParams.get('type') || 'account';
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (query) {
      // Simulate API call
      setTimeout(() => {
        setResults({
          account: {
            bank_name: 'Maybank',
            account_number: '5123' + '0'.repeat(8) + '42',
            account_type: 'personal',
            risk_score: 25,
            trust_status: 'high_risk',
            total_reports: 17,
            verified_reports: 11,
            last_reported_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
          reports: [
            {
              id: '1',
              category: 'investment_scam',
              description: 'Promised 20% returns on investment',
              loss_amount: 50000,
              status: 'verified',
              created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: '2',
              category: 'job_scam',
              description: 'Fake job offer with upfront payment',
              loss_amount: 2000,
              status: 'verified',
              created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: '3',
              category: 'shopping_scam',
              description: 'Never received purchased items',
              loss_amount: 500,
              status: 'verified',
              created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
          report_categories: {
            investment_scam: 8,
            job_scam: 5,
            shopping_scam: 4,
          },
        });
        setLoading(false);
      }, 800);
    }
  }, [query]);

  if (!query) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">No search query provided</h1>
          <Link href="/" className="btn-primary px-6 py-2">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-orange-yellow rounded-lg mx-auto mb-4 animate-pulse"></div>
          <p className="text-gray-600 font-semibold">Searching database...</p>
        </div>
      </div>
    );
  }

  const account = results.account;
  const reports = results.reports;
  const categories = results.report_categories;

  const riskColor = getRiskColor(account.risk_score);
  const riskLabel = getRiskLabel(account.risk_score);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-orange-yellow rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-bold text-black">TrustTrack</h1>
          </Link>
          <Link href="/report" className="btn-primary px-6 py-2 text-sm">
            Report Scam
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Account Header */}
        <div className="card-highlight p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">{account.bank_name}</h2>
              <p className="text-gray-600 font-mono text-lg">Account: {maskAccountNumber(account.account_number)}</p>
              <p className="text-gray-500 text-sm mt-2 capitalize">Type: {account.account_type}</p>
            </div>
            <div className={`text-right`}>
              <div className={`text-5xl font-bold mb-2 ${
                riskColor === 'green' ? 'text-green-600' : riskColor === 'yellow' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {account.risk_score}
              </div>
              <div className="text-sm text-gray-600 font-semibold">Risk Score</div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`inline-block px-4 py-2 rounded-full font-bold text-white mb-4 ${
            riskColor === 'green' ? 'bg-green-600' : riskColor === 'yellow' ? 'bg-yellow-600' : 'bg-red-600'
          }`}>
            {riskColor === 'green' ? '✓ Safe' : riskColor === 'yellow' ? '⚠ Use Caution' : '🚫 High Risk'}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-300">
            <div>
              <div className="text-3xl font-bold text-black">{account.total_reports}</div>
              <div className="text-gray-600 text-sm">Total Reports</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{account.verified_reports}</div>
              <div className="text-gray-600 text-sm">Verified Reports</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500">{account.total_reports - account.verified_reports}</div>
              <div className="text-gray-600 text-sm">Under Review</div>
            </div>
            <div>
              <div className="text-lg font-bold text-black">{formatRelativeTime(account.last_reported_at)}</div>
              <div className="text-gray-600 text-sm">Last Reported</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-black mb-4">📊 Report Categories</h3>
            <div className="space-y-3">
              {Object.entries(categories).map(([category, count]: [string, any]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-gray-700 capitalize">{category.replace(/_/g, ' ')}</span>
                  <span className="bg-primary-100 text-primary-700 font-bold px-3 py-1 rounded-full text-sm">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-black mb-4">⚡ Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary">
                ✓ This is Safe
              </button>
              <button className="w-full btn-secondary">
                🚫 Report This Account
              </button>
              <button className="w-full btn-outline">
                🏢 I Own This Account
              </button>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-black mb-6">📜 Recent Reports</h3>
          <div className="space-y-4">
            {reports.map((report: any, i: number) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-black capitalize">
                      {report.category.replace(/_/g, ' ')}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">{report.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    report.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {report.status === 'verified' ? '✓ Verified' : '⏳ Under Review'}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-semibold">Loss: RM {report.loss_amount.toLocaleString()}</span>
                  <span>{formatRelativeTime(report.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            ⚠️ Disclaimer: This information is based on community reports. Always verify independently.
          </p>
          <p className="text-gray-500 text-sm mt-2">© 2024 TrustTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
