/*
# Create applications table for Prolific Education study abroad platform

1. New Tables
- `applications`
  - `id` (uuid, primary key)
  - `first_name` (text, not null) — student's first name
  - `last_name` (text, not null) — student's last name
  - `email` (text, not null) — student's email address
  - `phone` (text, not null) — student's phone number
  - `date_of_birth` (date) — student's date of birth
  - `gender` (text) — male / female / other
  - `nationality` (text) — student's nationality
  - `current_address` (text) — current residential address
  - `city` (text) — current city
  - `country` (text) — current country of residence
  - `intended_country` (text) — country the student wants to study in
  - `intended_university` (text) — preferred university
  - `intended_program` (text) — preferred study program
  - `intended_level` (text) — bachelors / masters / phd / diploma
  - `intake` (text) — preferred intake (e.g. Fall 2025, Spring 2026)
  - `current_education` (text) — highest qualification
  - `institution_name` (text) — current/last institution
  - `graduation_year` (text) — year of graduation
  - `gpa` (text) — GPA/score
  - `english_test` (text) — IELTS / TOEFL / PTE / None
  - `english_score` (text) — score on English test
  - `work_experience` (text) — years of work experience
  - `funding_source` (text) — self / parents / scholarship / loan
  - `passport_number` (text) — passport number if available
  - `message` (text) — additional notes from student
  - `status` (text, default 'new') — new / reviewed / contacted / rejected
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `applications`.
- INSERT policy for anon + authenticated (students can submit applications without logging in).
- SELECT, UPDATE, DELETE policies for authenticated only (admins can view and manage applications).
- No user_id column needed — applications are submitted by anonymous students and managed by authenticated admins.
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date_of_birth date,
  gender text,
  nationality text,
  current_address text,
  city text,
  country text,
  intended_country text,
  intended_university text,
  intended_program text,
  intended_level text,
  intake text,
  current_education text,
  institution_name text,
  graduation_year text,
  gpa text,
  english_test text,
  english_score text,
  work_experience text,
  funding_source text,
  passport_number text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone (students) to submit applications
DROP POLICY IF EXISTS "anon_insert_applications" ON applications;
CREATE POLICY "anon_insert_applications"
ON applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated admins can view applications
DROP POLICY IF EXISTS "auth_select_applications" ON applications;
CREATE POLICY "auth_select_applications"
ON applications FOR SELECT
TO authenticated
USING (true);

-- Only authenticated admins can update application status
DROP POLICY IF EXISTS "auth_update_applications" ON applications;
CREATE POLICY "auth_update_applications"
ON applications FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated admins can delete applications
DROP POLICY IF EXISTS "auth_delete_applications" ON applications;
CREATE POLICY "auth_delete_applications"
ON applications FOR DELETE
TO authenticated
USING (true);
