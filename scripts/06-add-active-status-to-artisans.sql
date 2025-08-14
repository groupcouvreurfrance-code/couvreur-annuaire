-- Ajouter le statut actif aux artisans pour le référencement SEO
ALTER TABLE artisans 
ADD COLUMN active BOOLEAN DEFAULT false;

-- Créer un index pour les requêtes sur les artisans actifs
CREATE INDEX idx_artisans_active ON artisans(active);

-- Mettre à jour les artisans existants comme actifs
UPDATE artisans SET active = true WHERE id IS NOT NULL;
