import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SiteSettings {
  companyName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  logo: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  details: string[];
}

interface QuoteRequest {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  typeProjet: string;
  surface: string;
  budget: string;
  delai: string;
  description: string;
  dateCreated: string;
  status: 'pending' | 'confirmed' | 'responded';
}

interface AdminContextType {
  isAdminLoggedIn: boolean;
  siteSettings: SiteSettings;
  projects: Project[];
  quoteRequests: QuoteRequest[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  addQuoteRequest: (request: Omit<QuoteRequest, 'id' | 'dateCreated' | 'status'>) => void;
  updateQuoteRequestStatus: (id: number, status: QuoteRequest['status']) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Construction Résidence Les Jardins",
    category: "gros-oeuvre",
    location: "Paris 15ème",
    year: "2023",
    description: "Construction complète d'une résidence de 24 logements avec parkings souterrains.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: ["Surface: 2,400 m²", "24 logements", "Parking 30 places", "Espaces verts"]
  },
  {
    id: 2,
    title: "Rénovation Hôtel Particulier",
    category: "second-oeuvre",
    location: "Neuilly-sur-Seine",
    year: "2023",
    description: "Rénovation complète d'un hôtel particulier du 19ème siècle.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: ["Surface: 450 m²", "5 chambres", "Système domotique", "Matériaux nobles"]
  },
  {
    id: 3,
    title: "Aménagement Bureau Design",
    category: "finition",
    location: "La Défense",
    year: "2024",
    description: "Aménagement moderne d'espaces de bureaux avec finitions haut de gamme.",
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: ["Surface: 1,200 m²", "200 postes de travail", "Salles de réunion", "Espace détente"]
  },
  {
    id: 4,
    title: "Relevé Topographique Zone Industrielle",
    category: "geomatique",
    location: "Roissy",
    year: "2024",
    description: "Relevé précis et modélisation 3D d'une zone industrielle de 50 hectares.",
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: ["50 hectares", "Précision centimétrique", "Modèle 3D", "Cartographie numérique"]
  }
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    companyName: 'Univers Bâti Groupe',
    phone: '+33 1 23 45 67 89',
    whatsapp: 'https://wa.me/33123456789',
    email: 'contact@universbatigroupe.fr',
    address: '123 Avenue de la Construction',
    city: 'Paris',
    postalCode: '75001',
    logo: '/lovable-uploads/aecf2a1e-ca1c-4c7d-82df-341c4b5a917f.png'
  });
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);

  // Charger les données sauvegardées au démarrage
  useEffect(() => {
    const savedSettings = localStorage.getItem('siteSettings');
    const savedProjects = localStorage.getItem('projects');
    const savedQuoteRequests = localStorage.getItem('quoteRequests');
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');

    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    }

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    if (savedQuoteRequests) {
      setQuoteRequests(JSON.parse(savedQuoteRequests));
    }

    if (adminLoggedIn === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    const updatedSettings = { ...siteSettings, ...newSettings };
    setSiteSettings(updatedSettings);
    localStorage.setItem('siteSettings', JSON.stringify(updatedSettings));
  };

  const addProject = (newProject: Omit<Project, 'id'>) => {
    const id = Math.max(...projects.map(p => p.id), 0) + 1;
    const projectWithId = { ...newProject, id };
    const updatedProjects = [...projects, projectWithId];
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const updateProject = (updatedProject: Project) => {
    const updatedProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const deleteProject = (id: number) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const addQuoteRequest = (newRequest: Omit<QuoteRequest, 'id' | 'dateCreated' | 'status'>) => {
    const id = Math.max(...quoteRequests.map(q => q.id), 0) + 1;
    const requestWithId: QuoteRequest = { 
      ...newRequest, 
      id, 
      dateCreated: new Date().toISOString(),
      status: 'pending'
    };
    const updatedRequests = [...quoteRequests, requestWithId];
    setQuoteRequests(updatedRequests);
    localStorage.setItem('quoteRequests', JSON.stringify(updatedRequests));
  };

  const updateQuoteRequestStatus = (id: number, status: QuoteRequest['status']) => {
    const updatedRequests = quoteRequests.map(q => q.id === id ? { ...q, status } : q);
    setQuoteRequests(updatedRequests);
    localStorage.setItem('quoteRequests', JSON.stringify(updatedRequests));
  };

  return (
    <AdminContext.Provider value={{
      isAdminLoggedIn,
      siteSettings,
      projects,
      quoteRequests,
      login,
      logout,
      updateSiteSettings,
      addProject,
      updateProject,
      deleteProject,
      addQuoteRequest,
      updateQuoteRequestStatus
    }}>
      {children}
    </AdminContext.Provider>
  );
};
