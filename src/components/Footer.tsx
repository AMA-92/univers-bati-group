
import { Phone, Mail } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const Footer = () => {
  const { siteSettings } = useAdmin();

  const handleWhatsApp = () => {
    window.open(siteSettings.whatsapp, '_blank');
  };

  const handlePhone = () => {
    window.open(`tel:${siteSettings.phone}`, '_blank');
  };

  return (
    <footer className="bg-ubg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-2">
            <img 
              src={siteSettings.logo}
              alt={siteSettings.companyName}
              className="h-16 w-auto mb-4 bg-white p-2 rounded"
            />
            <p className="text-ubg-gray-300 mb-4">
              Spécialisés dans le bâtiment, les travaux publics et la géomatique, 
              nous accompagnons vos projets de construction avec expertise et professionnalisme.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={handlePhone}
                className="bg-ubg-orange-500 hover:bg-ubg-orange-600 p-3 rounded-full transition-colors"
              >
                <Phone size={20} />
              </button>
              <button 
                onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 p-3 rounded-full transition-colors"
              >
                <Mail size={20} />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ubg-orange-500">Nos Services</h3>
            <ul className="space-y-2 text-ubg-gray-300">
              <li>Gros Œuvre</li>
              <li>Second Œuvre</li>
              <li>Travaux de Finition</li>
              <li>Travaux Publics</li>
              <li>Géomatique</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ubg-orange-500">Contact</h3>
            <div className="space-y-3 text-ubg-gray-300">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>{siteSettings.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>WhatsApp</span>
              </div>
              <div className="text-sm">
                <p>{siteSettings.address}</p>
                <p>{siteSettings.postalCode} {siteSettings.city}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ubg-gray-700 mt-8 pt-8 text-center text-ubg-gray-400">
          <p>&copy; 2024 {siteSettings.companyName}. Tous droits réservés.</p>
          <p className="mt-2 text-sm">Devis gratuit - 0 FCFA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
