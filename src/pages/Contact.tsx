
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';

const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/33123456789', '_blank');
  };

  const handlePhone = () => {
    window.open('tel:+33123456789', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-ubg-orange-500 to-ubg-orange-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-Nous</h1>
            <p className="text-xl opacity-90">
              Une question ? Un projet ? Notre équipe est à votre écoute pour vous accompagner.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-ubg-gray-900 mb-4">Comment Nous Joindre</h2>
              <p className="text-lg text-ubg-gray-600">
                Choisissez le moyen de contact qui vous convient le mieux
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Téléphone */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-ubg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl text-ubg-gray-900">Appelez-Nous</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-ubg-gray-600 mb-6">
                    Discutez directement avec nos experts pour obtenir des conseils personnalisés.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-ubg-gray-900">Numéro Principal</p>
                      <p className="text-lg text-ubg-orange-500 font-medium">+33 1 23 45 67 89</p>
                    </div>
                    <div>
                      <p className="text-sm text-ubg-gray-500">Lundi - Vendredi: 8h - 18h</p>
                      <p className="text-sm text-ubg-gray-500">Samedi: 9h - 12h</p>
                    </div>
                    <Button 
                      onClick={handlePhone}
                      className="bg-ubg-orange-500 hover:bg-ubg-orange-600 w-full"
                    >
                      <Phone size={20} className="mr-2" />
                      Appeler Maintenant
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl text-ubg-gray-900">WhatsApp</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-ubg-gray-600 mb-6">
                    Échangez avec nous via WhatsApp pour un contact rapide et pratique.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-ubg-gray-900">Numéro WhatsApp</p>
                      <p className="text-lg text-green-500 font-medium">+33 1 23 45 67 89</p>
                    </div>
                    <div>
                      <p className="text-sm text-ubg-gray-500">Réponse rapide garantie</p>
                      <p className="text-sm text-ubg-gray-500">7j/7 - 8h - 20h</p>
                    </div>
                    <Button 
                      onClick={handleWhatsApp}
                      className="bg-green-500 hover:bg-green-600 w-full"
                    >
                      <Mail size={20} className="mr-2" />
                      Ouvrir WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Informations complémentaires */}
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-ubg-gray-900 mb-2">Siège Social</h3>
                  <p className="text-ubg-gray-600">
                    123 Avenue de la Construction<br />
                    75001 Paris<br />
                    France
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-ubg-gray-900 mb-2">Zones d'Intervention</h3>
                  <p className="text-ubg-gray-600">
                    Île-de-France<br />
                    Hauts-de-France<br />
                    Normandie
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-ubg-gray-900 mb-2">Urgences</h3>
                  <p className="text-ubg-gray-600">
                    Service d'urgence 24h/24<br />
                    Intervention rapide<br />
                    Devis gratuit
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-ubg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-ubg-gray-900 mb-12">Questions Fréquentes</h2>
            
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-ubg-gray-900 mb-2">
                    Quel est le délai pour obtenir un devis ?
                  </h3>
                  <p className="text-ubg-gray-600">
                    Nous nous engageons à vous fournir un devis détaillé sous 48h maximum après votre demande.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-ubg-gray-900 mb-2">
                    Intervenez-vous en urgence ?
                  </h3>
                  <p className="text-ubg-gray-600">
                    Oui, nous disposons d'une équipe d'intervention d'urgence disponible 24h/24 pour les situations critiques.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-ubg-gray-900 mb-2">
                    Proposez-vous des garanties sur vos travaux ?
                  </h3>
                  <p className="text-ubg-gray-600">
                    Tous nos travaux sont garantis selon les normes en vigueur : garantie décennale, biennale et parfait achèvement.
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

export default Contact;
