-- NeoLand Database Schema
-- Run this in Supabase SQL Editor or via migrations

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing views first (they depend on the tables)
DROP VIEW IF EXISTS all_plugins;
DROP VIEW IF EXISTS all_tags;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS plugins;
DROP TABLE IF EXISTS categories;

-- Table 1: categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  plugin_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);

-- Table 2: plugins
CREATE TABLE plugins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  full_name TEXT NOT NULL UNIQUE,
  description TEXT,
  link TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_plugins_full_name ON plugins(full_name);
CREATE INDEX idx_plugins_category ON plugins(category);
CREATE INDEX idx_plugins_tags ON plugins USING GIN(tags);

-- View: all_plugins (for compatibility with existing code)
CREATE VIEW all_plugins AS
SELECT
  id,
  name,
  full_name,
  description,
  link,
  tags
FROM plugins;

-- View: all_tags (distinct tags from categories)
CREATE VIEW all_tags AS
SELECT DISTINCT name FROM categories ORDER BY name;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for plugins table
DROP TRIGGER IF EXISTS update_plugins_updated_at ON plugins;
CREATE TRIGGER update_plugins_updated_at
  BEFORE UPDATE ON plugins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for categories table
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (optional, adjust as needed)
ALTER TABLE plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on plugins" ON plugins
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on categories" ON categories
  FOR SELECT USING (true);

-- Grant permissions for anon users (read-only)
GRANT SELECT ON plugins TO anon;
GRANT SELECT ON categories TO anon;
GRANT SELECT ON all_plugins TO anon;
GRANT SELECT ON all_tags TO anon;

-- Grant full permissions for service role (for sync script)
GRANT ALL ON plugins TO service_role;
GRANT ALL ON categories TO service_role;
