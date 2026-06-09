import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'MYR'): string {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

// Format date
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('ms-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;
  return `${Math.floor(seconds / 2592000)}mo ago`;
}

// Mask account number
export function maskAccountNumber(accountNumber: string): string {
  const start = accountNumber.slice(0, 4);
  const end = accountNumber.slice(-2);
  const masked = 'X'.repeat(accountNumber.length - 6);
  return `${start}${masked}${end}`;
}

// Validate bank account number (Malaysia)
export function validateBankAccount(accountNumber: string): boolean {
  // Simple validation - 10-16 digits
  return /^\d{10,16}$/.test(accountNumber.replace(/\s/g, ''));
}

// Validate DuitNow ID
export function validateDuitNowId(id: string): boolean {
  // DuitNow ID format: NRIC/Passport/Business ID
  return /^[0-9A-Z]{6,20}$/.test(id);
}

// Get risk level color
export function getRiskColor(score: number): string {
  if (score >= 80) return 'green';
  if (score >= 50) return 'yellow';
  return 'red';
}

// Get risk level label
export function getRiskLabel(score: number): string {
  if (score >= 80) return 'Safe';
  if (score >= 50) return 'Use Caution';
  return 'High Risk';
}

// Truncate text
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}
