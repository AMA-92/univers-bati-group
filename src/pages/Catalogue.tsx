import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';

const Catalogue = () => {
  const { projects } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('tous');

  const categories = [
    { id: 'tous', label: 'Tous les Projets' },
    { id: 'gros-oeuvre', label: 'Gros Œuvre' },
    { id: 'second-oeuvre', label: 'Second Œuvre' },
    { id: 'finition', label: 'Finition' },
    { id: 'travaux-publics', label: 'Travaux Publics' },
    { id: 'geomatique', label: 'Géomatique' }
  ];

  const filteredProjects = selectedCategory === 'tous' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ubg-orange-500 to-ubg-orange-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Réalisations</h1>
            <p className="text-xl opacity-90">
              Découvrez quelques-uns de nos projets les plus représentatifs, 
              témoins de notre savoir-faire et de notre engagement qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 bg-ubg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-ubg-orange-500 hover:bg-ubg-orange-600" 
                  : "border-ubg-orange-500 text-ubg-orange-500 hover:bg-ubg-orange-50"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille des projets */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-ubg-orange-500 px-3 py-1 rounded-full text-sm font-medium">
                      {project.year}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-ubg-gray-900 mb-2">{project.title}</h3>
                  <p className="text-ubg-orange-500 font-medium mb-2">{project.location}</p>
                  <p className="text-ubg-gray-600 mb-4">{project.description}</p>
                  <div className="space-y-1">
                    {project.details.map((detail, index) => (
                      <div key={index} className="flex items-center text-sm text-ubg-gray-500">
                        <div className="w-2 h-2 bg-ubg-orange-500 rounded-full mr-2"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ubg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Votre Projet Sera-t-il le Prochain ?</h2>
          <p className="text-xl text-ubg-gray-300 mb-8">
            Confiez-nous votre projet et rejoignez nos clients satisfaits.
          </p>
          <Button size="lg" className="bg-ubg-orange-500 hover:bg-ubg-orange-600 px-8 py-3">
            Demander un Devis Gratuit
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Catalogue;
