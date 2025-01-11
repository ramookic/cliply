# Cliply

**Cliply** is a URL shortening service that allows users to shorten, track, and manage their URLs easily. With real-time analytics, it helps users track how their links are performing across different devices and locations.

## Technologies

- Next.js
- TypeScript
- Supabase
- Tailwind CSS
- Jest

## How to Get Started

To get started with **Cliply**, follow these steps:

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/ramookic/cliply.git
cd cliply
npm install
```

### 2. Set up Supabase database

In Supabase SQL Editor paste this code and run it.

```sql
-- Create the "links" table
CREATE TABLE public.links (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID NOT NULL,
    original_url TEXT NOT NULL,
    short_code VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expiration_date TIMESTAMP
);

-- Add foreign key constraint for the "user_id" column in links
ALTER TABLE public.links
    ADD CONSTRAINT links_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);

-- Enable Row-Level Security (RLS) for the "links" table
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Policy for public access to read short_code and creation details
CREATE POLICY public_read_links
    ON public.links
    FOR SELECT
    USING (true);

-- Policy for authenticated users to insert links
CREATE POLICY owner_insert_links
    ON public.links
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policy for authenticated users to update their own links
CREATE POLICY owner_update_links
    ON public.links
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy for authenticated users to delete their own links
CREATE POLICY owner_delete_links
    ON public.links
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create the "clicks" table
CREATE TABLE public.clicks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    clicked_at TIMESTAMPTZ DEFAULT NOW(),
    link_id BIGINT NOT NULL,
    device_type TEXT,
    browser TEXT,
    country TEXT,
    CONSTRAINT fk_link FOREIGN KEY (link_id) REFERENCES public.links(id) ON DELETE CASCADE
);

-- Enable Row-Level Security (RLS) for the "clicks" table
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;

-- Policy for public insertion of clicks
CREATE POLICY public_insert_clicks
    ON public.clicks
    FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (SELECT 1 FROM public.links WHERE id = link_id));

-- Policy for authenticated users to read clicks
CREATE POLICY public_read_clicks
    ON public.clicks
    FOR SELECT
    TO authenticated
    USING (true);

```

### 3. Set up environment variables

Rename **example.env** to **.env.local** 

```bash
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

### 4. Run the development server
```bash
npm run dev
```
