
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface QuoteRequest {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  typeProjet: string;
  surface: string;
  delai: string;
  description: string;
  dateCreated: string;
  status: 'pending' | 'confirmed' | 'responded';
}

export const useQuoteRequests = () => {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuoteRequests();
  }, []);

  const loadQuoteRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading quote requests:', error);
        return;
      }

      if (data) {
        const formattedRequests = data.map(request => ({
          id: request.id,
          nom: request.nom,
          prenom: request.prenom,
          email: request.email,
          telephone: request.telephone,
          adresse: request.adresse,
          ville: request.ville,
          codePostal: request.code_postal,
          typeProjet: request.type_projet,
          surface: request.surface,
          delai: request.delai,
          description: request.description || '',
          dateCreated: request.created_at,
          status: request.status as 'pending' | 'confirmed' | 'responded'
        }));
        setQuoteRequests(formattedRequests);
      }
    } catch (error) {
      console.error('Error loading quote requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const addQuoteRequest = async (newRequest: Omit<QuoteRequest, 'id' | 'dateCreated' | 'status'>) => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .insert({
          nom: newRequest.nom,
          prenom: newRequest.prenom,
          email: newRequest.email,
          telephone: newRequest.telephone,
          adresse: newRequest.adresse,
          ville: newRequest.ville,
          code_postal: newRequest.codePostal,
          type_projet: newRequest.typeProjet,
          surface: newRequest.surface,
          delai: newRequest.delai,
          description: newRequest.description,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const formattedRequest = {
          id: data.id,
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          telephone: data.telephone,
          adresse: data.adresse,
          ville: data.ville,
          codePostal: data.code_postal,
          typeProjet: data.type_projet,
          surface: data.surface,
          delai: data.delai,
          description: data.description || '',
          dateCreated: data.created_at,
          status: data.status as 'pending' | 'confirmed' | 'responded'
        };
        setQuoteRequests(prev => [formattedRequest, ...prev]);
      }
    } catch (error) {
      console.error('Error adding quote request:', error);
      throw error;
    }
  };

  const updateQuoteRequestStatus = async (id: string, status: QuoteRequest['status']) => {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setQuoteRequests(prev => 
        prev.map(q => q.id === id ? { ...q, status } : q)
      );
    } catch (error) {
      console.error('Error updating quote request status:', error);
      throw error;
    }
  };

  return {
    quoteRequests,
    addQuoteRequest,
    updateQuoteRequestStatus,
    loading,
    refresh: loadQuoteRequests
  };
};
