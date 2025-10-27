/*
  # Create gallery images table

  1. New Tables
    - `gallery_images`
      - `id` (uuid, primary key)
      - `url` (text, image URL)
      - `order_index` (integer, for sorting images)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `gallery_images` table
    - Add policy for public read access (gallery is public)
    - Add policy for authenticated insert (for add image functionality)
*/

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
  ON gallery_images
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery_images
  FOR DELETE
  TO authenticated
  USING (true);