
import { createContext, useContext, useState, ReactNode } from 'react';

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

interface AdminContextType {
  isAdminLoggedIn: boolean;
  siteSettings: SiteSettings;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
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

  const login = (username: string, password: string): boolean => {
    // Identifiants par défaut (à remplacer par une vraie authentification)
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
    setSiteSettings(prev => ({ ...prev, ...newSettings }));
    localStorage.setItem('siteSettings', JSON.stringify({ ...siteSettings, ...newSettings }));
  };

  return (
    <AdminContext.Provider value={{
      isAdminLoggedIn,
      siteSettings,
      login,
      logout,
      updateSiteSettings
    }}>
      {children}
    </AdminContext.Provider>
  );
};
