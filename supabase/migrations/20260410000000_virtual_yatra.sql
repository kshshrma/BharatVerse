-- Migration for BharatVerse Virtual Yatra
-- Creates yatra_destinations, yatra_scenes, and saved_destinations tables with RLS

-- 1. Yatra Destinations Table
CREATE TABLE IF NOT EXISTS public.yatra_destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_slug TEXT NOT NULL,
  state_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  cultural_significance TEXT NOT NULL,
  history_summary TEXT,
  hero_image_url TEXT NOT NULL,
  panorama_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('heritage', 'spiritual', 'art_craft', 'nature', 'historical', 'food_trail')),
  region TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb,
  attractions JSONB DEFAULT '[]'::jsonb,
  traditions JSONB DEFAULT '[]'::jsonb,
  local_crafts JSONB DEFAULT '[]'::jsonb,
  famous_food JSONB DEFAULT '[]'::jsonb,
  best_time_to_visit TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Yatra Tour Scenes Table
CREATE TABLE IF NOT EXISTS public.yatra_scenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID REFERENCES public.yatra_destinations(id) ON DELETE CASCADE,
  destination_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cultural_significance TEXT,
  interesting_fact TEXT,
  image_url TEXT NOT NULL,
  is_panorama BOOLEAN DEFAULT false,
  scene_order INTEGER NOT NULL DEFAULT 1,
  audio_ambient_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Saved Destinations (My Yatra)
CREATE TABLE IF NOT EXISTS public.saved_destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  destination_slug TEXT NOT NULL,
  destination_id UUID REFERENCES public.yatra_destinations(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, destination_slug)
);

-- Enable RLS
ALTER TABLE public.yatra_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yatra_scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_destinations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public read published yatra destinations" ON public.yatra_destinations;
DROP POLICY IF EXISTS "Admins manage yatra destinations" ON public.yatra_destinations;
DROP POLICY IF EXISTS "Public read yatra scenes" ON public.yatra_scenes;
DROP POLICY IF EXISTS "Admins manage yatra scenes" ON public.yatra_scenes;
DROP POLICY IF EXISTS "Users read own saved destinations" ON public.saved_destinations;
DROP POLICY IF EXISTS "Users insert own saved destinations" ON public.saved_destinations;
DROP POLICY IF EXISTS "Users delete own saved destinations" ON public.saved_destinations;

-- Public read for published destinations & scenes
CREATE POLICY "Public read published yatra destinations"
  ON public.yatra_destinations FOR SELECT
  USING (is_published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Public read yatra scenes"
  ON public.yatra_scenes FOR SELECT
  USING (true);

-- Admin CRUD for destinations & scenes
CREATE POLICY "Admins manage yatra destinations"
  ON public.yatra_destinations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage yatra scenes"
  ON public.yatra_scenes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Users manage their own saved destinations
CREATE POLICY "Users read own saved destinations"
  ON public.saved_destinations FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own saved destinations"
  ON public.saved_destinations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own saved destinations"
  ON public.saved_destinations FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
