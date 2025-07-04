
-- Créer la table pour les paramètres du site
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table pour les projets
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  year TEXT,
  description TEXT NOT NULL,
  image TEXT,
  details JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table pour les demandes de devis
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  adresse TEXT NOT NULL,
  ville TEXT NOT NULL,
  code_postal TEXT NOT NULL,
  type_projet TEXT NOT NULL,
  surface TEXT NOT NULL,
  delai TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insérer les paramètres par défaut du site
INSERT INTO public.site_settings (company_name, phone, whatsapp, email, address, city, postal_code, logo)
VALUES (
  'Univers Bâti Groupe',
  '+33 1 23 45 67 89',
  'https://wa.me/33123456789',
  'contact@universbatigroupe.fr',
  '123 Avenue de la Construction',
  'Paris',
  '75001',
  '/lovable-uploads/aecf2a1e-ca1c-4c7d-82df-341c4b5a917f.png'
);

-- Insérer les projets par défaut
INSERT INTO public.projects (title, category, location, year, description, image, details) VALUES
(
  'Construction Résidence Les Jardins',
  'gros-oeuvre',
  'Paris 15ème',
  '2023',
  'Construction complète d''une résidence de 24 logements avec parkings souterrains.',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '["Surface: 2,400 m²", "24 logements", "Parking 30 places", "Espaces verts"]'::jsonb
),
(
  'Rénovation Hôtel Particulier',
  'second-oeuvre',
  'Neuilly-sur-Seine',
  '2023',
  'Rénovation complète d''un hôtel particulier du 19ème siècle.',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '["Surface: 450 m²", "5 chambres", "Système domotique", "Matériaux nobles"]'::jsonb
),
(
  'Aménagement Bureau Design',
  'finition',
  'La Défense',
  '2024',
  'Aménagement moderne d''espaces de bureaux avec finitions haut de gamme.',
  'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '["Surface: 1,200 m²", "200 postes de travail", "Salles de réunion", "Espace détente"]'::jsonb
),
(
  'Relevé Topographique Zone Industrielle',
  'geomatique',
  'Roissy',
  '2024',
  'Relevé précis et modélisation 3D d''une zone industrielle de 50 hectares.',
  'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '["50 hectares", "Précision centimétrique", "Modèle 3D", "Cartographie numérique"]'::jsonb
);

-- Activer RLS pour toutes les tables (optionnel pour une utilisation administrative)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Créer des politiques permissives pour permettre l'accès à tous (pour l'administration)
CREATE POLICY "Allow all operations on site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on quote_requests" ON public.quote_requests FOR ALL USING (true) WITH CHECK (true);
