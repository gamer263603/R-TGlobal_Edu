import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type ApplicationStatus = 'new' | 'reviewed' | 'contacted' | 'rejected';

export interface Application {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string | null;
  gender: string;
  nationality: string;
  current_address: string;
  city: string;
  country: string;
  intended_country: string;
  intended_university: string;
  intended_program: string;
  intended_level: string;
  intake: string;
  current_education: string;
  institution_name: string;
  graduation_year: string;
  gpa: string;
  english_test: string;
  english_score: string;
  work_experience: string;
  funding_source: string;
  passport_number: string;
  message: string;
  status: ApplicationStatus;
  created_at: string;
}
