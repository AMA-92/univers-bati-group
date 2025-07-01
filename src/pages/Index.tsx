
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const Index = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/33123456789', '_blank');
  };

  const handlePhone = () => {
    window.open('tel:+33123456789', '_blank');
  };

  const services = [
    {
      title: "Gros Œuvre",
      description: "Fondations, maçonnerie, structure béton armé, charpente traditionnelle et industrielle.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Second Œuvre",
      description: "Plomberie, électricité, isolation, cloisons, menuiseries intérieures et extérieures.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Travaux de Finition",
      description: "Peinture, revêtements de sols et murs, carrelage, parquet, décoration intérieure.",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Travaux Publics",
      description: "Voirie, réseaux, assainissement, terrassement, aménagement urbain.",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Géomatique",
      description: "Topographie, relevés de terrain, modélisation 3D, cartographie numérique.",
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ubg-orange-500 to-ubg-orange-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Univers Bâti Groupe
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Votre partenaire de confiance pour tous vos projets de construction
            </p>
            <p className="text-lg mb-10 opacity-80">
              Bâtiment • Travaux Publics • Géomatique
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/devis">
                <Button size="lg" className="bg-white text-ubg-orange-500 hover:bg-ubg-gray-100 px-8 py-3 text-lg font-semibold">
                  Demander un Devis Gratuit
                </Button>
              </Link>
              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-ubg-orange-500 px-6"
                  onClick={handlePhone}
                >
                  <Phone size={20} className="mr-2" />
                  Appeler
                </Button>
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white px-6"
                  onClick={handleWhatsApp}
                >
                  <Mail size={20} className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-ubg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-ubg-gray-900 mb-4">Nos Expertises</h2>
            <p className="text-xl text-ubg-gray-600 max-w-3xl mx-auto">
              De la conception à la réalisation, nous maîtrisons tous les aspects de vos projets de construction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-ubg-gray-900 mb-3">{service.title}</h3>
                  <p className="text-ubg-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ubg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Démarrer Votre Projet ?
          </h2>
          <p className="text-xl mb-8 text-ubg-gray-300 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/devis">
              <Button size="lg" className="bg-ubg-orange-500 hover:bg-ubg-orange-600 px-8 py-3 text-lg">
                Obtenir un Devis
              </Button>
            </Link>
            <Link to="/catalogue">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ubg-gray-900 px-8 py-3 text-lg">
                Voir Nos Réalisations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
