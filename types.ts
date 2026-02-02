export enum HubType {
  KNOWLEDGE = 'KNOWLEDGE',
  EARNING = 'EARNING',
  BUSINESS = 'BUSINESS',
  IMPACT = 'IMPACT',
  HEALTHCARE = 'HEALTHCARE',
  COMMUNITY = 'COMMUNITY',
  FAMILY = 'FAMILY',
  CAREERS = 'CAREERS',
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE'
}

export enum UserRole {
  OWNER = 'OWNER',
  USER = 'USER'
}

export interface Wallet {
  balance: number;
  currency: string;
  paymentMethods: ('PAYPAL' | 'CREDIT_CARD' | 'WALLET')[];
}

export interface ServiceExchange {
  id: string;
  type: 'REQUEST' | 'OFFER';
  title: string;
  description: string;
  budget: string;
  userName: string;
  category: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'alert' | 'success';
  time: string;
  read: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}