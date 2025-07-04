
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdmin } from '@/contexts/AdminContext';
import { Save } from 'lucide-react';

const SiteSettingsForm = () => {
  const { siteSettings, updateSiteSettings } = useAdmin();
  const [formData, setFormData] = useState(siteSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      updateSiteSettings(formData);
      setSaveMessage('Paramètres sauvegardés avec succès !');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save size={20} />
          Paramètres du Site
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Informations de l'entreprise */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Informations de l'Entreprise</h3>
              
              <div>
                <Label htmlFor="companyName">Nom de l'Entreprise</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Nom de votre entreprise"
                />
              </div>

              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="contact@exemple.fr"
                />
              </div>

              <div>
                <Label htmlFor="whatsapp">Lien WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  placeholder="https://wa.me/33123456789"
                />
              </div>
            </div>

            {/* Adresse */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Adresse</h3>
              
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Avenue de la Construction"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Paris"
                  />
                </div>

                <div>
                  <Label htmlFor="postalCode">Code Postal</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="75001"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="logo">URL du Logo</Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                  placeholder="URL de votre logo"
                />
              </div>

              {formData.logo && (
                <div>
                  <Label>Aperçu du Logo</Label>
                  <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                    <img
                      src={formData.logo}
                      alt="Logo preview"
                      className="h-16 w-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Messages de statut */}
          {saveMessage && (
            <div className={`p-3 rounded-lg ${
              saveMessage.includes('succès') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {saveMessage}
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder les Paramètres'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData(siteSettings)}
            >
              Annuler les Modifications
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SiteSettingsForm;
