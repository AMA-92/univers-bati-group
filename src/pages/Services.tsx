
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const serviceCategories = [
    {
      title: "Gros Œuvre",
      description: "Construction de la structure principale de votre bâtiment",
      services: [
        "Terrassement et fondations",
        "Maçonnerie traditionnelle et moderne",
        "Structure béton armé",
        "Charpente bois et métallique",
        "Couverture et étanchéité"
      ],
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Second Œuvre",
      description: "Aménagement et équipement de votre construction",
      services: [
        "Installation électrique complète",
        "Plomberie et chauffage",
        "Isolation thermique et phonique",
        "Cloisons et doublages",
        "Menuiseries intérieures et extérieures"
      ],
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Travaux de Finition",
      description: "Finitions et décoration pour un rendu parfait",
      services: [
        "Peinture intérieure et extérieure",
        "Revêtements de sols (carrelage, parquet)",
        "Revêtements muraux",
        "Aménagement de cuisines et salles de bains",
        "Décoration et agencement"
      ],
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Travaux Publics",
      description: "Aménagement urbain et infrastructure",
      services: [
        "Voirie et réseaux divers",
        "Assainissement et évacuation",
        "Terrassement de grande envergure",
        "Aménagement paysager",
        "Équipements urbains"
      ],
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Géomatique",
      description: "Technologies de mesure et cartographie",
      services: [
        "Relevés topographiques",
        "Modélisation 3D",
        "Cartographie numérique",
        "Géoréférencement",
        "Études d'impact territorial"
      ],
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ubg-orange-500 to-ubg-orange-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services</h1>
            <p className="text-xl opacity-90">
              Une expertise complète pour tous vos projets de construction, 
              du gros œuvre aux finitions les plus délicates.
            </p>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {serviceCategories.map((category, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-ubg-orange-500 mb-2">
                        {category.title}
                      </CardTitle>
                      <p className="text-ubg-gray-600 text-lg">
                        {category.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.services.map((service, serviceIndex) => (
                          <li key={serviceIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-ubg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-ubg-gray-700">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section avantages */}
      <section className="py-16 bg-ubg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ubg-gray-900 mb-4">Pourquoi Nous Choisir ?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-ubg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">15+</span>
                </div>
                <h3 className="text-xl font-bold text-ubg-gray-900 mb-2">Années d'Expérience</h3>
                <p className="text-ubg-gray-600">Une expertise reconnue dans le domaine du BTP</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-ubg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">100%</span>
                </div>
                <h3 className="text-xl font-bold text-ubg-gray-900 mb-2">Satisfaction Client</h3>
                <p className="text-ubg-gray-600">Des projets livrés dans les délais et le budget</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-ubg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">24/7</span>
                </div>
                <h3 className="text-xl font-bold text-ubg-gray-900 mb-2">Support Réactif</h3>
                <p className="text-ubg-gray-600">Une équipe disponible pour vos urgences</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
