# 🛡️ TrustTrack - Bank Account Reputation Platform

A modern fintech web application for community-driven bank account reputation and fraud reporting.

## 🌟 Features

### Core Features
- 🔍 **Account Search** - Search by bank account number or DuitNow ID
- ⚠️ **Risk Assessment** - AI-powered risk scoring (0-100)
- 📊 **Trust Status** - Real-time account reputation
- 📝 **Scam Reporting** - Community fraud reporting with evidence
- 🏢 **Business Verification** - SSM registration verification
- 👤 **Account Owner Portal** - Claim accounts, submit appeals
- 👨‍💼 **Admin Dashboard** - Moderation and analytics
- 📱 **Premium Features** - Real-time alerts, extensions, APIs

### Fraud Detection
- Multiple report pattern detection
- Scam pattern analysis
- Repeat offender identification
- Suspicious activity spike alerts

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ShadCN UI** - Component library
- **Zustand** - State management
- **React Hot Toast** - Notifications

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Edge Functions** - Serverless functions

### Security
- **Email OTP** - Authentication
- **Google OAuth** - Social login
- **PDPA & GDPR** - Compliance
- **Rate Limiting** - API protection
- **Audit Logs** - Activity tracking

## 📋 Database Schema

### Users
- user_id (UUID)
- email (String)
- phone (String)
- full_name (String)
- avatar_url (String)
- user_type (user/business/admin)
- created_at (Timestamp)
- verified_at (Timestamp)

### Bank Accounts
- account_id (UUID)
- bank_name (String)
- account_number (String)
- account_type (personal/business)
- owner_id (UUID - Foreign Key)
- risk_score (Integer 0-100)
- trust_status (safe/caution/high_risk)
- total_reports (Integer)
- verified_reports (Integer)
- last_reported_at (Timestamp)
- created_at (Timestamp)

### Scam Reports
- report_id (UUID)
- account_id (UUID - Foreign Key)
- reporter_id (UUID - Foreign Key)
- category (String)
- description (Text)
- loss_amount (Decimal)
- evidence_urls (Array)
- status (pending/verified/rejected)
- admin_notes (Text)
- created_at (Timestamp)

### Appeals
- appeal_id (UUID)
- account_id (UUID - Foreign Key)
- report_id (UUID - Foreign Key)
- owner_id (UUID - Foreign Key)
- status (pending/approved/rejected)
- reason (Text)
- documents (Array)
- created_at (Timestamp)

### Community Statistics
- total_searches (Integer)
- total_reported_accounts (Integer)
- verified_scam_reports (Integer)
- total_claimed_losses (Decimal)
- monthly_searches (Integer)
- updated_at (Timestamp)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/dsrxz22/trusttrack.git
   cd trusttrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials

4. **Setup Supabase**
   - Create new Supabase project
   - Run database migrations (see `supabase/migrations`)
   - Enable Email Auth with OTP
   - Enable Google OAuth

5. **Start development server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## 📁 Project Structure

```
trusttrack/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Homepage
│   │   ├── search/         # Search results
│   │   ├── report/         # Report scam
│   │   ├── portal/         # Account owner portal
│   │   ├── admin/          # Admin dashboard
│   │   ├── auth/           # Authentication pages
│   │   └── api/            # API routes
│   ├── components/          # Reusable components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── stores/             # Zustand stores
│   ├── types/              # TypeScript types
│   └── styles/             # Global styles
├── public/                 # Static assets
├── supabase/              # Database migrations
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## 🎨 Design System

### Colors
- **Primary (Orange/Yellow)**: #f59e0b, #fbbf24
- **Secondary (Deep Orange)**: #ff8c42, #ff7a2a
- **Success (Green)**: #10b981
- **Warning (Yellow)**: #fcd34d
- **Danger (Red)**: #ef4444
- **White Boxes**: #ffffff
- **Text**: #000000

### Typography
- **Display**: Bold, 2-3rem
- **Heading**: Bold, 1.5-2rem
- **Body**: Regular, 1rem
- **Caption**: Regular, 0.875rem

## 📊 Risk Score Calculation

```
100 = No reports (Safe)
80  = 1 report
60  = 3 reports
40  = 5 verified reports
20  = 10 verified reports
0   = 20+ verified reports (Critical)
```

## 🔒 Legal & Compliance

### Terms of Service
- User responsibilities
- Report guidelines
- Prohibited content
- Liability limitations

### Privacy Policy
- Data collection
- PDPA compliance (Malaysia)
- GDPR compliance (EU)
- Data retention
- User rights

### Disclaimer
- Not providing financial advice
- Information accuracy
- User accountability
- Third-party content

### Report Categories

Users can report:
1. Investment Scam
2. Online Shopping Scam
3. Job Scam
4. Love Scam
5. Loan Scam
6. Rental Scam
7. Cryptocurrency Scam
8. Fake Government Officer
9. Fake Bank Officer
10. Social Media Scam
11. Ticket Scam
12. MLM/Ponzi Scam
13. Charity Scam
14. Other

## 🔐 Security

- Rate limiting on API endpoints
- Input validation and sanitization
- CSRF protection
- XSS prevention
- SQL injection protection
- Secure file uploads
- Encryption for sensitive data
- Audit logs for all actions

## 📱 Premium Features

- Real-time scam alerts
- Browser extension
- Mobile app
- API access for banks
- API access for e-commerce
- API access for payment gateways
- Priority support
- Advanced analytics

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - See LICENSE file

## 📞 Support

- Email: support@trusttrack.my
- Website: www.trusttrack.my
- Twitter: @trusttrack
- Discord: [Join Community]

## 🗺️ Roadmap

- ✅ MVP (Malaysia)
- 🔄 Singapore expansion
- 🔄 Thailand expansion
- 🔄 Indonesia expansion
- 🔄 Philippines expansion
- 🔄 Vietnam expansion
- 🔄 Mobile apps (iOS & Android)
- 🔄 Browser extensions
- 🔄 API ecosystem

---

**Made with ❤️ for community trust and financial safety**
