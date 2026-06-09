# TrustTrack Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Installation Steps

1. **Navigate to TrustTrack directory**
   ```bash
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

4. **Update .env.local with your Supabase credentials**
   - Get URL and Key from https://supabase.com
   - Add to NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

5. **Start development server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## 📊 Database Setup

### Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Run SQL migrations (see `supabase/migrations/001_initial_schema.sql`)

## 🎨 Design System

### Colors
- Primary Orange: #f59e0b
- Secondary Orange: #ff8c42
- Success Green: #10b981
- Warning Yellow: #fcd34d
- Danger Red: #ef4444
- White Boxes: #ffffff
- Black Text: #000000

## 📁 Project Structure

```
trusttrack/
├── src/
│   ├── app/          # Pages and routes
│   ├── components/   # React components
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utilities
│   ├── stores/       # Zustand stores
│   ├── types/        # TypeScript types
│   └── styles/       # Global styles
├── public/           # Static files
├── supabase/         # Database migrations
└── package.json
```

## 🔑 Key Features to Implement

- [ ] Homepage with search
- [ ] Search results page
- [ ] Report scam form
- [ ] Account owner portal
- [ ] Admin dashboard
- [ ] Authentication
- [ ] Database integration
- [ ] Premium features
- [ ] API endpoints

## 📝 Next Steps

1. Create Supabase project
2. Run database migrations
3. Setup authentication
4. Build missing pages
5. Implement API routes
6. Deploy to production

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Supabase connection error
- Check environment variables
- Verify Supabase project is active
- Check network connectivity

### TypeScript errors
```bash
npm run type-check
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
