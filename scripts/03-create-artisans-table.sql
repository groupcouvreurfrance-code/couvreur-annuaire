-- Create artisans table
CREATE TABLE IF NOT EXISTS artisans (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL,
  contact_name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  postal_code VARCHAR(5),
  city VARCHAR(100),
  department_id INTEGER REFERENCES departments(id),
  commune_id INTEGER REFERENCES communes(id),
  website VARCHAR(255),
  description TEXT,
  services TEXT[], -- Array of services offered
  years_experience INTEGER,
  certifications TEXT[],
  insurance_valid BOOLEAN DEFAULT false,
  siret VARCHAR(14),
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  featured BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_artisans_department ON artisans(department_id);
CREATE INDEX IF NOT EXISTS idx_artisans_commune ON artisans(commune_id);
CREATE INDEX IF NOT EXISTS idx_artisans_status ON artisans(status);
CREATE INDEX IF NOT EXISTS idx_artisans_featured ON artisans(featured);
