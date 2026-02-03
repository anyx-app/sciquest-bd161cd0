-- Migration: Initial Schema Setup
-- Schema: proj_df632f3c
-- Description: Sets up profiles, content (topics, experiments, quizzes), and user progress tables.

SET search_path TO proj_df632f3c;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
-- Stores user profile data. ID matches auth.users.id (but no FK constraint to avoid permissions issues).
CREATE TABLE profiles (
    id UUID PRIMARY KEY,
    username TEXT,
    avatar_url TEXT,
    age INTEGER,
    xp_points INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON profiles FOR INSERT 
WITH CHECK (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- 2. Topics Table
-- Broad scientific categories.
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Topics are viewable by everyone" 
ON topics FOR SELECT 
USING (true);

-- 3. Experiments Table
-- Interactive lessons/labs.
CREATE TABLE experiments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    instructions TEXT,
    simulation_type TEXT,
    difficulty TEXT,
    duration_minutes INTEGER,
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experiments are viewable by everyone" 
ON experiments FOR SELECT 
USING (true);

-- 4. Quizzes Table
-- Assessments linked to experiments.
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experiment_id UUID REFERENCES experiments(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    xp_reward INTEGER DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quizzes are viewable by everyone" 
ON quizzes FOR SELECT 
USING (true);

-- 5. Quiz Questions Table
CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- e.g., ["A", "B", "C", "D"]
    correct_option_index INTEGER NOT NULL,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quiz questions are viewable by everyone" 
ON quiz_questions FOR SELECT 
USING (true);

-- 6. User Progress Table
-- Tracks experiment completion status.
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- Logical reference to profiles.id/auth.users.id
    experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, experiment_id)
);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and manage their own progress" 
ON user_progress 
USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- 7. Quiz Attempts Table
-- Tracks history of quiz scores.
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    passed BOOLEAN DEFAULT false,
    attempted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and insert their own attempts" 
ON quiz_attempts 
USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- 8. Journal Entries Table
-- User notes on experiments.
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own journal" 
ON journal_entries 
USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');
