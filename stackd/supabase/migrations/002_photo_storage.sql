-- 002_photo_storage.sql
-- Add photo proof to logs + Supabase Storage bucket

-- Add photo_hash column for duplicate detection
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS photo_hash TEXT;

-- Unique index: same user can't reuse same photo in same challenge
CREATE UNIQUE INDEX IF NOT EXISTS logs_no_dup_photo
  ON public.logs (challenge_id, user_id, photo_hash)
  WHERE photo_hash IS NOT NULL;

-- Create log-photos storage bucket (private, 5MB limit, images only)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'log-photos',
  'log-photos',
  false,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
) ON CONFLICT (id) DO NOTHING;

-- Storage RLS: users can upload to their own folder only
CREATE POLICY "Users upload own log photos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'log-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Storage RLS: authenticated users can view all log photos (members see proof)
CREATE POLICY "Authenticated can view log photos"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'log-photos');

-- Storage RLS: users can delete their own photos
CREATE POLICY "Users delete own log photos"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'log-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
