
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Devis = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    typeProjet: '',
    services: [],
    description: '',
    budget: '',
    delai: '',
    contactPreferentiel: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de l'envoi du devis
    console.log('Demande de devis:', formData);
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons dans les 24h pour étudier votre projet.",
    });

    // Reset du formulaire
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      ville: '',
      codePostal: '',
      typeProjet: '',
      services: [],
      description: '',
      budget: '',
      delai: '',
      contactPreferentiel: ''
    });
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  const services = [
    'Gros Œuvre',
    'Second Œuvre', 
    'Travaux de Finition',
    'Travaux Publics',
    'Géomatique'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ubg-orange-500 to-ubg-orange-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Demander un Devis</h1>
            <p className="text-xl opacity-90">
              Obtenez une estimation personnalisée pour votre projet en quelques minutes.
              Notre équipe vous recontactera sous 24h.
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire de devis */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-ubg-gray-900">
                  Formulaire de Demande de Devis
                </CardTitle>
                <p className="text-ubg-gray-600">
                  Remplissez ce formulaire pour recevoir votre devis personnalisé gratuit
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Informations personnelles */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-ubg-gray-900 border-b border-ubg-orange-500 pb-2">
                      Vos Informations
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="prenom">Prénom *</Label>
                        <Input
                          id="prenom"
                          value={formData.prenom}
                          onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nom">Nom *</Label>
                        <Input
                          id="nom"
                          value={formData.nom}
                          onChange={(e) => setFormData({...formData, nom: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telephone">Téléphone *</Label>
                        <Input
                          id="telephone"
                          type="tel"
                          value={formData.telephone}
                          onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Adresse du projet */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-ubg-gray-900 border-b border-ubg-orange-500 pb-2">
                      Localisation du Projet
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="adresse">Adresse complète *</Label>
                        <Input
                          id="adresse"
                          value={formData.adresse}
                          onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ville">Ville *</Label>
                          <Input
                            id="ville"
                            value={formData.ville}
                            onChange={(e) => setFormData({...formData, ville: e.target.value})}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="codePostal">Code Postal *</Label>
                          <Input
                            id="codePostal"
                            value={formData.codePostal}
                            onChange={(e) => setFormData({...formData, codePostal: e.target.value})}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Détails du projet */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-ubg-gray-900 border-b border-ubg-orange-500 pb-2">
                      Votre Projet
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="typeProjet">Type de projet *</Label>
                        <Select onValueChange={(value) => setFormData({...formData, typeProjet: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionnez le type de projet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="construction-neuve">Construction neuve</SelectItem>
                            <SelectItem value="renovation">Rénovation</SelectItem>
                            <SelectItem value="extension">Extension</SelectItem>
                            <SelectItem value="amenagement">Aménagement</SelectItem>
                            <SelectItem value="travaux-publics">Travaux publics</SelectItem>
                            <SelectItem value="expertise">Expertise géomatique</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Services demandés *</Label>
                        <div className="grid md:grid-cols-3 gap-4 mt-2">
                          {services.map((service) => (
                            <div key={service} className="flex items-center space-x-2">
                              <Checkbox
                                id={service}
                                onCheckedChange={(checked) => handleServiceChange(service, checked)}
                              />
                              <Label htmlFor={service} className="text-sm">{service}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description détaillée du projet *</Label>
                        <Textarea
                          id="description"
                          rows={5}
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Décrivez votre projet en détail : surface, contraintes, matériaux souhaités, etc."
                          required
                          className="mt-1"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="budget">Budget prévisionnel</Label>
                          <Select onValueChange={(value) => setFormData({...formData, budget: value})}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Sélectionnez votre budget" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10000-25000">10 000 € - 25 000 €</SelectItem>
                              <SelectItem value="25000-50000">25 000 € - 50 000 €</SelectItem>
                              <SelectItem value="50000-100000">50 000 € - 100 000 €</SelectItem>
                              <SelectItem value="100000-250000">100 000 € - 250 000 €</SelectItem>
                              <SelectItem value="250000+">Plus de 250 000 €</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="delai">Délai souhaité</Label>
                          <Select onValueChange={(value) => setFormData({...formData, delai: value})}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Quand souhaitez-vous démarrer ?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgent">Urgent (moins d'1 mois)</SelectItem>
                              <SelectItem value="1-3mois">1 à 3 mois</SelectItem>
                              <SelectItem value="3-6mois">3 à 6 mois</SelectItem>
                              <SelectItem value="6mois+">Plus de 6 mois</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="contactPreferentiel">Mode de contact préféré *</Label>
                        <Select onValueChange={(value) => setFormData({...formData, contactPreferentiel: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Comment préférez-vous être contacté ?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="telephone">Téléphone</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-6">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="bg-ubg-orange-500 hover:bg-ubg-orange-600 px-12 py-3 text-lg"
                    >
                      Envoyer ma Demande de Devis
                    </Button>
                    <p className="text-sm text-ubg-gray-500 mt-4">
                      * Champs obligatoires - Nous vous recontacterons sous 24h
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-ubg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-ubg-gray-900 mb-12">
              Pourquoi Demander un Devis ?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-ubg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">100%</span>
                  </div>
                  <h3 className="text-lg font-bold text-ubg-gray-900 mb-2">Gratuit</h3>
                  <p className="text-ubg-gray-600">Aucun engagement, devis entièrement gratuit</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-ubg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">24h</span>
                  </div>
                  <h3 className="text-lg font-bold text-ubg-gray-900 mb-2">Réponse Rapide</h3>
                  <p className="text-ubg-gray-600">Réponse garantie sous 24h ouvrées</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-ubg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">★</span>
                  </div>
                  <h3 className="text-lg font-bold text-ubg-gray-900 mb-2">Sur Mesure</h3>
                  <p className="text-ubg-gray-600">Devis personnalisé selon vos besoins</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Devis;
