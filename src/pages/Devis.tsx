
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
import { useAdmin } from '@/contexts/AdminContext';

const Devis = () => {
  const { toast } = useToast();
  const { addQuoteRequest } = useAdmin();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    typeProjet: '',
    surface: '',
    budget: '',
    delai: '',
    description: '',
    accepteConditions: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.accepteConditions) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions générales",
        variant: "destructive"
      });
      return;
    }

    // Sauvegarder la demande de devis
    addQuoteRequest({
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      adresse: formData.adresse,
      ville: formData.ville,
      codePostal: formData.codePostal,
      typeProjet: formData.typeProjet,
      surface: formData.surface,
      budget: formData.budget,
      delai: formData.delai,
      description: formData.description
    });

    toast({
      title: "Demande envoyée",
      description: "Votre demande de devis a été envoyée avec succès. Nous vous recontacterons sous 48h.",
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
      surface: '',
      budget: '',
      delai: '',
      description: '',
      accepteConditions: false
    });
  };

  const typesProjet = [
    'Construction neuve',
    'Rénovation complète',
    'Extension',
    'Aménagement intérieur',
    'Travaux de toiture',
    'Isolation',
    'Plomberie',
    'Électricité',
    'Autres'
  ];

  const budgetRanges = [
    'Moins de 500 000 FCFA',
    '500 000 - 1 250 000 FCFA',
    '1 250 000 - 2 500 000 FCFA',
    '2 500 000 - 5 000 000 FCFA',
    '5 000 000 - 10 000 000 FCFA',
    'Plus de 10 000 000 FCFA'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ubg-orange-500 to-ubg-orange-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Demande de Devis Gratuit</h1>
            <p className="text-xl opacity-90">
              Décrivez-nous votre projet et recevez une estimation personnalisée sous 48h
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire de devis */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardHeader className="bg-ubg-gray-50">
                <CardTitle className="text-3xl text-center text-ubg-gray-900">
                  Votre Projet en Détail
                </CardTitle>
                <p className="text-center text-ubg-gray-600 mt-2">
                  Remplissez ce formulaire pour recevoir un devis personnalisé
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Informations personnelles */}
                  <div>
                    <h3 className="text-xl font-semibold text-ubg-gray-900 mb-4 pb-2 border-b border-ubg-orange-200">
                      Vos Informations
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="prenom">Prénom *</Label>
                        <Input
                          id="prenom"
                          value={formData.prenom}
                          onChange={(e) => handleInputChange('prenom', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nom">Nom *</Label>
                        <Input
                          id="nom"
                          value={formData.nom}
                          onChange={(e) => handleInputChange('nom', e.target.value)}
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
                          onChange={(e) => handleInputChange('email', e.target.value)}
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
                          onChange={(e) => handleInputChange('telephone', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Adresse du projet */}
                  <div>
                    <h3 className="text-xl font-semibold text-ubg-gray-900 mb-4 pb-2 border-b border-ubg-orange-200">
                      Localisation du Projet
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="adresse">Adresse *</Label>
                        <Input
                          id="adresse"
                          value={formData.adresse}
                          onChange={(e) => handleInputChange('adresse', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="codePostal">Code Postal *</Label>
                        <Input
                          id="codePostal"
                          value={formData.codePostal}
                          onChange={(e) => handleInputChange('codePostal', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Label htmlFor="ville">Ville *</Label>
                        <Input
                          id="ville"
                          value={formData.ville}
                          onChange={(e) => handleInputChange('ville', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Détails du projet */}
                  <div>
                    <h3 className="text-xl font-semibold text-ubg-gray-900 mb-4 pb-2 border-b border-ubg-orange-200">
                      Votre Projet
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="typeProjet">Type de projet *</Label>
                        <Select value={formData.typeProjet} onValueChange={(value) => handleInputChange('typeProjet', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionnez le type de projet" />
                          </SelectTrigger>
                          <SelectContent>
                            {typesProjet.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="surface">Surface (m²)</Label>
                        <Input
                          id="surface"
                          type="number"
                          value={formData.surface}
                          onChange={(e) => handleInputChange('surface', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget prévisionnel</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionnez votre budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="delai">Délai souhaité</Label>
                        <Input
                          id="delai"
                          value={formData.delai}
                          onChange={(e) => handleInputChange('delai', e.target.value)}
                          placeholder="Ex: Dans 3 mois"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description détaillée */}
                  <div>
                    <Label htmlFor="description">Description détaillée de votre projet *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={6}
                      required
                      className="mt-1"
                      placeholder="Décrivez votre projet en détail : objectifs, contraintes, préférences..."
                    />
                  </div>

                  {/* Conditions générales */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="conditions"
                      checked={formData.accepteConditions}
                      onCheckedChange={(checked) => handleInputChange('accepteConditions', checked === true)}
                    />
                    <Label htmlFor="conditions" className="text-sm">
                      J'accepte les conditions générales et la politique de confidentialité *
                    </Label>
                  </div>

                  {/* Bouton de soumission */}
                  <div className="text-center pt-6">
                    <Button 
                      type="submit" 
                      className="bg-ubg-orange-500 hover:bg-ubg-orange-600 text-white px-12 py-3 text-lg"
                    >
                      Envoyer ma Demande
                    </Button>
                    <p className="text-sm text-ubg-gray-500 mt-4">
                      * Champs obligatoires. Réponse garantie sous 48h.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Informations complémentaires */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-ubg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">48h</span>
                  </div>
                  <h3 className="font-bold text-ubg-gray-900 mb-2">Réponse Rapide</h3>
                  <p className="text-ubg-gray-600 text-sm">
                    Nous nous engageons à vous répondre sous 48h maximum
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-ubg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">0€</span>
                  </div>
                  <h3 className="font-bold text-ubg-gray-900 mb-2">Devis Gratuit</h3>
                  <p className="text-ubg-gray-600 text-sm">
                    Votre devis est entièrement gratuit et sans engagement
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-ubg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">✓</span>
                  </div>
                  <h3 className="font-bold text-ubg-gray-900 mb-2">Sur Mesure</h3>
                  <p className="text-ubg-gray-600 text-sm">
                    Chaque devis est personnalisé selon vos besoins spécifiques
                  </p>
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
