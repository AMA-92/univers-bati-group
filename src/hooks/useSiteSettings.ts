
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  id?: string;
  companyName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  logo: string;
}

export const useSiteSettings = () => {
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSiteSettings();
  }, []);

  const loadSiteSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading site settings:', error);
        return;
      }

      if (data) {
        setSiteSettings({
          id: data.id,
          companyName: data.company_name,
          phone: data.phone || '',
          whatsapp: data.whatsapp || '',
          email: data.email || '',
          address: data.address || '',
          city: data.city || '',
          postalCode: data.postal_code || '',
          logo: data.logo || ''
        });
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSiteSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const updatedSettings = { ...siteSettings, ...newSettings };
      
      const { error } = await supabase
        .from('site_settings')
        .update({
          company_name: updatedSettings.companyName,
          phone: updatedSettings.phone,
          whatsapp: updatedSettings.whatsapp,
          email: updatedSettings.email,
          address: updatedSettings.address,
          city: updatedSettings.city,
          postal_code: updatedSettings.postalCode,
          logo: updatedSettings.logo,
          updated_at: new Date().toISOString()
        })
        .eq('id', siteSettings.id);

      if (error) {
        throw error;
      }

      setSiteSettings(updatedSettings);
    } catch (error) {
      console.error('Error updating site settings:', error);
      throw error;
    }
  };

  return {
    siteSettings,
    updateSiteSettings,
    loading
  };
};
