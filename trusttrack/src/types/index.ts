// User Types
export type UserType = 'user' | 'business' | 'admin';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface User {
  id: string;
  email: string;
  phone?: string;
  full_name: string;
  avatar_url?: string;
  user_type: UserType;
  created_at: string;
  verified_at?: string;
}

// Bank Account Types
export type AccountType = 'personal' | 'business';
export type TrustStatus = 'safe' | 'caution' | 'high_risk';

export interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_type: AccountType;
  owner_id?: string;
  risk_score: number;
  trust_status: TrustStatus;
  total_reports: number;
  verified_reports: number;
  last_reported_at?: string;
  created_at: string;
  updated_at: string;
}

// Scam Report Types
export type ReportCategory = 
  | 'investment_scam'
  | 'shopping_scam'
  | 'job_scam'
  | 'love_scam'
  | 'loan_scam'
  | 'rental_scam'
  | 'crypto_scam'
  | 'fake_government'
  | 'fake_bank'
  | 'social_media_scam'
  | 'ticket_scam'
  | 'mlm_scam'
  | 'charity_scam'
  | 'other';

export type ReportStatus = 'pending' | 'verified' | 'rejected' | 'under_investigation';

export interface ScamReport {
  id: string;
  account_id: string;
  reporter_id: string;
  category: ReportCategory;
  description: string;
  loss_amount?: number;
  evidence_urls: string[];
  status: ReportStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

// Appeal Types
export type AppealStatus = 'pending' | 'approved' | 'rejected';

export interface Appeal {
  id: string;
  account_id: string;
  report_id: string;
  owner_id: string;
  status: AppealStatus;
  reason: string;
  documents: string[];
  created_at: string;
  updated_at: string;
}

// Search Result
export interface SearchResult {
  account: BankAccount;
  reports: ScamReport[];
  recent_reports: ScamReport[];
  report_categories: { [key: string]: number };
}

// Community Stats
export interface CommunityStats {
  total_searches: number;
  total_reported_accounts: number;
  verified_scam_reports: number;
  total_claimed_losses: number;
  monthly_searches: number;
  updated_at: string;
}

// Auth
export interface AuthSession {
  user: User | null;
  loading: boolean;
  error?: string;
}
