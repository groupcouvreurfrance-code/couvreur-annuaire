-- Create contact requests table
CREATE TABLE IF NOT EXISTS contact_requests (
  id SERIAL PRIMARY KEY,
  artisan_id INTEGER REFERENCES artisans(id),
  client_name VARCHAR(100) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20),
  project_type VARCHAR(100),
  project_description TEXT,
  budget_range VARCHAR(50),
  urgency VARCHAR(20), -- immediate, within_week, within_month, no_rush
  preferred_contact VARCHAR(20), -- email, phone, both
  status VARCHAR(20) DEFAULT 'new', -- new, contacted, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_requests_artisan ON contact_requests(artisan_id);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created ON contact_requests(created_at);
