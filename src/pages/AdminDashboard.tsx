import React, { useEffect, useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { isAdminLoggedIn, logout, quoteRequests, updateQuoteRequestStatus } = useAdmin();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (!isAdminLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-96">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Accès Refusé</h2>
            <p className="text-center text-gray-600">
              Vous devez être connecté en tant qu'administrateur pour accéder à cette page.
            </p>
            <div className="mt-6 flex justify-center">
              <Link to="/admin">
                <Button variant="outline">Se Connecter</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-700">Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tableau de Bord Admin</h1>
        <Button variant="destructive" onClick={logout}>Déconnexion</Button>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Demandes de Devis Récentes</h2>
        {quoteRequests.length === 0 ? (
          <p>Aucune demande de devis pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {quoteRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {request.prenom} {request.nom}
                      </h3>
                      <p className="text-sm text-gray-600">{request.email}</p>
                      <p className="text-sm text-gray-600">{request.telephone}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        request.status === 'pending' ? 'destructive' :
                        request.status === 'confirmed' ? 'default' : 'secondary'
                      }>
                        {request.status === 'pending' ? 'En attente' :
                         request.status === 'confirmed' ? 'Confirmé' : 'Répondu'}
                      </Badge>
                      <Select
                        value={request.status}
                        onValueChange={(value) => updateQuoteRequestStatus(request.id, value as QuoteRequest['status'])}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="confirmed">Confirmé</SelectItem>
                          <SelectItem value="responded">Répondu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Adresse:</strong> {request.adresse}</p>
                      <p><strong>Ville:</strong> {request.ville} {request.codePostal}</p>
                      <p><strong>Type de projet:</strong> {request.typeProjet}</p>
                    </div>
                    <div>
                      <p><strong>Surface:</strong> {request.surface}</p>
                      <p><strong>Délai:</strong> {request.delai}</p>
                      <p><strong>Date:</strong> {new Date(request.dateCreated).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {request.description && (
                    <div className="mt-4">
                      <p><strong>Description:</strong></p>
                      <p className="text-sm text-gray-700">{request.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Gestion des Paramètres du Site</h2>
        <p>Ici, vous pourrez modifier les informations générales du site (en cours de développement).</p>
      </section>
    </div>
  );
};

export default AdminDashboard;
