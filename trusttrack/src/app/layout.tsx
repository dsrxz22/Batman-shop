import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TrustTrack - Bank Account Reputation Platform',
  description: 'Search and report suspicious bank accounts. Community-driven fraud detection for Southeast Asia.',
  keywords: 'bank fraud, scam reporting, account reputation, Malaysia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
