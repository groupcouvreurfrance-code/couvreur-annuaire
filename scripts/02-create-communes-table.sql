-- Create communes table
CREATE TABLE IF NOT EXISTS communes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  postal_code VARCHAR(5) NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  population INTEGER DEFAULT 0,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slug, department_id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_communes_department ON communes(department_id);
CREATE INDEX IF NOT EXISTS idx_communes_slug ON communes(slug);
