# Socratic AI – Hiring Assessment Tool MVP

A web-based hiring assessment tool that evaluates how candidates think *with* AI. Users interact with a chat interface powered by OpenAI GPT-4, and the system sometimes injects deliberately incorrect (trap) answers. All interactions are logged for later review.

---

## Stack
- **Frontend:** Next.js (App Router) + TailwindCSS
- **Backend:** Next.js API routes
- **Database:** Supabase (PostgreSQL)
- **LLM:** OpenAI GPT-4 API

---

## Features
- **/chat:** Chat interface for users to interact with GPT-4
  - 20% of AI responses are deliberately incorrect (trap answers)
  - Trap answers are labeled in the UI (for debugging/MVP)
  - Each user gets a unique session ID (stored in localStorage)
- **/api/chat:** API route
  - Receives user messages and context
  - Calls GPT-4 for a response
  - Randomly injects a trap answer 20% of the time
  - Logs every interaction to Supabase: session ID, user message, AI message, trap status, timestamp
- **/logs:** Admin page
  - Displays all chat logs in a table (timestamp, session, user/AI message, trap status)

---

## Setup & Installation

1. **Clone the repo and install dependencies:**
   ```bash
   npm install
   # or yarn install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root with:
   ```env
   OPENAI_API_KEY=sk-...
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Set up Supabase:**
   - Create a project at [supabase.com](https://supabase.com/)
   - Create a `messages` table with this SQL:
     ```sql
     create table public.messages (
       id uuid primary key default gen_random_uuid(),
       session_id text not null,
       user_message text not null,
       ai_message text not null,
       is_trap boolean not null,
       timestamp timestamptz not null default now()
     );
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or yarn dev
   ```
   Open [http://localhost:3000/chat](http://localhost:3000/chat) to use the chat interface.
   Open [http://localhost:3000/logs](http://localhost:3000/logs) to view chat logs.

---

## Next Steps / Improvements
- Add authentication for admin log access
- Improve trap answer generation
- Add user scoring/feedback
- Polish UI/UX

---

## License
MIT
