
import { createContext, useContext, useState, ReactNode } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useProjects } from '@/hooks/useProjects';
import { useQuoteRequests } from '@/hooks/useQuoteRequests';

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
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  details: string[];
}

interface QuoteRequest {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  typeProjet: string;
  surface: string;
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
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addQuoteRequest: (request: Omit<QuoteRequest, 'id' | 'dateCreated' | 'status'>) => Promise<void>;
  updateQuoteRequestStatus: (id: string, status: QuoteRequest['status']) => Promise<void>;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('adminLoggedIn') === 'true';
  });

  const { siteSettings, updateSiteSettings, loading: settingsLoading } = useSiteSettings();
  const { projects, addProject, updateProject, deleteProject, loading: projectsLoading } = useProjects();
  const { quoteRequests, addQuoteRequest, updateQuoteRequestStatus, loading: quotesLoading } = useQuoteRequests();

  const loading = settingsLoading || projectsLoading || quotesLoading;

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
      updateQuoteRequestStatus,
      loading
    }}>
      {children}
    </AdminContext.Provider>
  );
};
