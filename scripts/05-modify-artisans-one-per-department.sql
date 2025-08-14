-- Modification pour avoir un seul couvreur par département
-- Supprimer la contrainte commune_id et ajuster la structure

-- Supprimer la colonne commune_id car un artisan couvre tout le département
ALTER TABLE artisans DROP COLUMN IF EXISTS commune_id;

-- Ajouter une contrainte unique pour s'assurer qu'il n'y a qu'un artisan approuvé par département
CREATE UNIQUE INDEX IF NOT EXISTS idx_one_approved_artisan_per_department 
ON artisans (department_id) 
WHERE status = 'approved';

-- Nettoyer les doublons existants - garder seulement le mieux noté par département
WITH ranked_artisans AS (
  SELECT id, department_id,
         ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY rating DESC, featured DESC, created_at ASC) as rn
  FROM artisans 
  WHERE status = 'approved'
)
UPDATE artisans 
SET status = 'rejected'
WHERE id IN (
  SELECT id FROM ranked_artisans WHERE rn > 1
);

-- Mettre à jour la description pour indiquer la couverture départementale
UPDATE artisans 
SET description = COALESCE(description, '') || ' Intervention dans tout le département.'
WHERE status = 'approved';
