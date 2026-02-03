# Schema Plan - SciQuest

## Overview
SciQuest requires a schema to manage users (children), educational content (topics, experiments, quizzes), and gamification/progress tracking (journal, scores, XP).

## Tables

### 1. `profiles`
Extends the default Supabase `auth.users` table.
- **id** (uuid, PK): References `auth.users.id`.
- **username** (text): Display name for the child.
- **avatar_url** (text): URL to profile image.
- **age** (integer): Age of the child (target 6-14).
- **xp_points** (integer): Total experience points earned (Gamification).
- **created_at** (timestamptz): Profile creation time.
- **updated_at** (timestamptz): Last update time.

### 2. `topics`
Broad scientific categories (e.g., Biology, Physics, Space).
- **id** (uuid, PK): Unique identifier.
- **name** (text): Display name (e.g., "Space Exploration").
- **slug** (text, unique): URL-friendly identifier.
- **description** (text): Short summary.
- **icon_name** (text): Identifier for the frontend icon.
- **created_at** (timestamptz)

### 3. `experiments`
Interactive virtual labs or lessons.
- **id** (uuid, PK): Unique identifier.
- **topic_id** (uuid, FK): References `topics.id`.
- **title** (text): Name of the experiment.
- **slug** (text, unique): URL-friendly identifier.
- **description** (text): What the user will do.
- **instructions** (text/markdown): Step-by-step guide.
- **simulation_type** (text): Identifier for the 3D/Interactive component type (e.g., "volcano_builder", "solar_system").
- **difficulty** (enum): 'beginner', 'intermediate', 'advanced'.
- **duration_minutes** (integer): Estimated time to complete.
- **thumbnail_url** (text): Preview image.
- **created_at** (timestamptz)

### 4. `quizzes`
Assessments linked to experiments or general topics.
- **id** (uuid, PK): Unique identifier.
- **experiment_id** (uuid, FK, nullable): References `experiments.id`.
- **title** (text): Quiz title.
- **xp_reward** (integer): Points awarded for completion.
- **created_at** (timestamptz)

### 5. `quiz_questions`
Individual questions for a quiz.
- **id** (uuid, PK): Unique identifier.
- **quiz_id** (uuid, FK): References `quizzes.id`.
- **question_text** (text): The question prompt.
- **options** (jsonb): Array of answer strings `["Option A", "Option B", ...]`.
- **correct_option_index** (integer): Index of the correct answer in the options array.
- **explanation** (text): Why the answer is correct (for learning).

### 6. `user_progress`
Tracks status of experiments.
- **id** (uuid, PK): Unique identifier.
- **user_id** (uuid, FK): References `profiles.id`.
- **experiment_id** (uuid, FK): References `experiments.id`.
- **status** (enum): 'not_started', 'in_progress', 'completed'.
- **completed_at** (timestamptz): Null if not complete.
- **updated_at** (timestamptz)

### 7. `quiz_attempts`
History of quiz results.
- **id** (uuid, PK): Unique identifier.
- **user_id** (uuid, FK): References `profiles.id`.
- **quiz_id** (uuid, FK): References `quizzes.id`.
- **score** (integer): Percentage or raw score.
- **passed** (boolean): Did they meet the passing threshold?
- **attempted_at** (timestamptz)

### 8. `journal_entries`
User notes and observations ("Lab Notebook").
- **id** (uuid, PK): Unique identifier.
- **user_id** (uuid, FK): References `profiles.id`.
- **experiment_id** (uuid, FK): References `experiments.id`.
- **content** (text): User's observations or notes.
- **created_at** (timestamptz)

## Relationships
- `topics` has many `experiments`.
- `experiments` has one `quiz` (optional) or `quizzes` can belong to `topics`.
- `users` have many `user_progress` entries.
- `users` have many `quiz_attempts`.
- `users` have many `journal_entries`.

## Security Policies (RLS)
- `profiles`: Users can read all, update own.
- `topics`, `experiments`, `quizzes`, `quiz_questions`: Public read-only.
- `user_progress`, `quiz_attempts`, `journal_entries`: Users can CRUD their own rows only.
