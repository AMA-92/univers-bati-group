
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Menu, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { siteSettings } = useAdmin();

  const handleWhatsApp = () => {
    window.open(siteSettings.whatsapp, '_blank');
  };

  const handlePhone = () => {
    window.open(`tel:${siteSettings.phone}`, '_blank');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-ubg-orange-500 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <button onClick={handlePhone} className="flex items-center space-x-1 hover:text-ubg-orange-100 transition-colors">
              <Phone size={14} />
              <span>{siteSettings.phone}</span>
            </button>
            <button onClick={handleWhatsApp} className="flex items-center space-x-1 hover:text-ubg-orange-100 transition-colors">
              <Mail size={14} />
              <span>WhatsApp</span>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>Bâtiment • Travaux Publics • Géomatique</span>
            <Link to="/admin/login">
              <Button variant="ghost" size="sm" className="text-white hover:text-ubg-orange-100 hover:bg-ubg-orange-600 p-1">
                <Settings size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={siteSettings.logo}
              alt={siteSettings.companyName}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-ubg-gray-700 hover:text-ubg-orange-500 font-medium transition-colors">
              Accueil
            </Link>
            <Link to="/services" className="text-ubg-gray-700 hover:text-ubg-orange-500 font-medium transition-colors">
              Services
            </Link>
            <Link to="/catalogue" className="text-ubg-gray-700 hover:text-ubg-orange-500 font-medium transition-colors">
              Nos Projets
            </Link>
            <Link to="/contact" className="text-ubg-gray-700 hover:text-ubg-orange-500 font-medium transition-colors">
              Contact
            </Link>
            <Link to="/devis">
              <Button className="bg-ubg-orange-500 hover:bg-ubg-orange-600 text-white px-6 py-2">
                Demander un Devis
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-ubg-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Link to="/" className="text-ubg-gray-700 hover:text-ubg-orange-500 font-medium">
                Accueil
              </Link>
              <Link to="/services" className="text-ubg-gray-700 hover:text-ubg-orange-500 font-medium">
                Services
              </Link>
              <Link to="/catalogue" className="text-ubg-gray-700 hover:text-ubg-orange-500 font-medium">
                Nos Projets
              </Link>
              <Link to="/contact" className="text-ubg-gray-700 hover:text-ubg-orange-500 font-medium">
                Contact
              </Link>
              <Link to="/devis">
                <Button className="bg-ubg-orange-500 hover:bg-ubg-orange-600 text-white w-full">
                  Demander un Devis
                </Button>
              </Link>
              <Link to="/admin/login" className="text-ubg-gray-700 hover:text-ubg-orange-500 font-medium flex items-center">
                <Settings size={16} className="mr-2" />
                Administration
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
