
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  LogOut, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Image,
  Save,
  FolderOpen,
  Plus,
  Edit,
  Trash
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  details: string[];
}

const AdminDashboard = () => {
  const { isAdminLoggedIn, siteSettings, logout, updateSiteSettings } = useAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(siteSettings);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Construction Résidence Les Jardins",
      category: "gros-oeuvre",
      location: "Paris 15ème",
      year: "2023",
      description: "Construction complète d'une résidence de 24 logements avec parkings souterrains.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details: ["Surface: 2,400 m²", "24 logements", "Parking 30 places", "Espaces verts"]
    },
    {
      id: 2,
      title: "Rénovation Hôtel Particulier",
      category: "second-oeuvre",
      location: "Neuilly-sur-Seine",
      year: "2023",
      description: "Rénovation complète d'un hôtel particulier du 19ème siècle.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details: ["Surface: 450 m²", "5 chambres", "Système domotique", "Matériaux nobles"]
    },
    {
      id: 3,
      title: "Aménagement Bureau Design",
      category: "finition",
      location: "La Défense",
      year: "2024",
      description: "Aménagement moderne d'espaces de bureaux avec finitions haut de gamme.",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details: ["Surface: 1,200 m²", "200 postes de travail", "Salles de réunion", "Espace détente"]
    },
    {
      id: 4,
      title: "Relevé Topographique Zone Industrielle",
      category: "geomatique",
      location: "Roissy",
      year: "2024",
      description: "Relevé précis et modélisation 3D d'une zone industrielle de 50 hectares.",
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details: ["50 hectares", "Précision centimétrique", "Modèle 3D", "Cartographie numérique"]
    }
  ]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    category: 'gros-oeuvre',
    location: '',
    year: '',
    description: '',
    image: '',
    details: []
  });

  if (!isAdminLoggedIn) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate('/');
  };

  const handleSave = () => {
    updateSiteSettings(formData);
    toast({
      title: "Paramètres sauvegardés",
      description: "Les modifications ont été appliquées avec succès",
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProject = () => {
    const id = Math.max(...projects.map(p => p.id)) + 1;
    setProjects(prev => [...prev, { ...newProject, id }]);
    setNewProject({
      title: '',
      category: 'gros-oeuvre',
      location: '',
      year: '',
      description: '',
      image: '',
      details: []
    });
    setIsAddingProject(false);
    toast({
      title: "Projet ajouté",
      description: "Le nouveau projet a été ajouté avec succès",
    });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleUpdateProject = () => {
    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? editingProject : p));
      setEditingProject(null);
      toast({
        title: "Projet modifié",
        description: "Le projet a été modifié avec succès",
      });
    }
  };

  const handleDeleteProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Projet supprimé",
      description: "Le projet a été supprimé avec succès",
    });
  };

  const categories = [
    { id: 'gros-oeuvre', label: 'Gros Œuvre' },
    { id: 'second-oeuvre', label: 'Second Œuvre' },
    { id: 'finition', label: 'Travaux de Finition' },
    { id: 'geomatique', label: 'Géomatique' }
  ];

  const getProjectsByCategory = (category: string) => {
    return projects.filter(project => project.category === category);
  };

  return (
    <div className="min-h-screen bg-ubg-gray-50">
      {/* Header Admin */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-ubg-orange-500 rounded-full flex items-center justify-center">
                <Settings size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-ubg-gray-900">Administration</h1>
                <p className="text-sm text-ubg-gray-600">Gérez votre site web</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                Voir le site
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Informations de l'entreprise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building size={20} />
                <span>Informations de l'entreprise</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Nom de l'entreprise</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone size={20} />
                <span>Informations de contact</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">Lien WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    className="mt-1"
                    placeholder="https://wa.me/33123456789"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adresse */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin size={20} />
                <span>Adresse</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Code postal</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image size={20} />
                <span>Logo de l'entreprise</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="logo">URL du logo</Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                  className="mt-1"
                />
              </div>
              {formData.logo && (
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-ubg-gray-600 mb-2">Aperçu du logo:</p>
                  <img 
                    src={formData.logo} 
                    alt="Logo" 
                    className="h-16 w-auto"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gestion des Catalogues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FolderOpen size={20} />
                <span>Gestion des Catalogues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="gros-oeuvre" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {categories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{category.label}</h3>
                      <Button 
                        onClick={() => {
                          setNewProject(prev => ({ ...prev, category: category.id }));
                          setIsAddingProject(true);
                        }}
                        className="bg-ubg-orange-500 hover:bg-ubg-orange-600"
                      >
                        <Plus size={16} className="mr-2" />
                        Ajouter un projet
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Titre</TableHead>
                          <TableHead>Localisation</TableHead>
                          <TableHead>Année</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getProjectsByCategory(category.id).map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell>{project.location}</TableCell>
                            <TableCell>{project.year}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleEditProject(project)}
                                >
                                  <Edit size={14} />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleDeleteProject(project.id)}
                                >
                                  <Trash size={14} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Formulaire d'ajout de projet */}
          {isAddingProject && (
            <Card>
              <CardHeader>
                <CardTitle>Ajouter un nouveau projet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newTitle">Titre</Label>
                    <Input
                      id="newTitle"
                      value={newProject.title}
                      onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newLocation">Localisation</Label>
                    <Input
                      id="newLocation"
                      value={newProject.location}
                      onChange={(e) => setNewProject(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newYear">Année</Label>
                    <Input
                      id="newYear"
                      value={newProject.year}
                      onChange={(e) => setNewProject(prev => ({ ...prev, year: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newImage">URL de l'image</Label>
                    <Input
                      id="newImage"
                      value={newProject.image}
                      onChange={(e) => setNewProject(prev => ({ ...prev, image: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="newDescription">Description</Label>
                  <Textarea
                    id="newDescription"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleAddProject} className="bg-ubg-orange-500 hover:bg-ubg-orange-600">
                    Ajouter
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingProject(false)}>
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Formulaire d'édition de projet */}
          {editingProject && (
            <Card>
              <CardHeader>
                <CardTitle>Modifier le projet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editTitle">Titre</Label>
                    <Input
                      id="editTitle"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject(prev => prev ? { ...prev, title: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editLocation">Localisation</Label>
                    <Input
                      id="editLocation"
                      value={editingProject.location}
                      onChange={(e) => setEditingProject(prev => prev ? { ...prev, location: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editYear">Année</Label>
                    <Input
                      id="editYear"
                      value={editingProject.year}
                      onChange={(e) => setEditingProject(prev => prev ? { ...prev, year: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editImage">URL de l'image</Label>
                    <Input
                      id="editImage"
                      value={editingProject.image}
                      onChange={(e) => setEditingProject(prev => prev ? { ...prev, image: e.target.value } : null)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea
                    id="editDescription"
                    value={editingProject.description}
                    onChange={(e) => setEditingProject(prev => prev ? { ...prev, description: e.target.value } : null)}
                  />
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleUpdateProject} className="bg-ubg-orange-500 hover:bg-ubg-orange-600">
                    Modifier
                  </Button>
                  <Button variant="outline" onClick={() => setEditingProject(null)}>
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bouton de sauvegarde général */}
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleSave}
              className="bg-ubg-orange-500 hover:bg-ubg-orange-600 px-8 py-3"
            >
              <Save size={20} className="mr-2" />
              Sauvegarder les modifications
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
