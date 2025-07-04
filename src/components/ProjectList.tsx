
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/contexts/AdminContext';
import { Edit, Trash2, Eye } from 'lucide-react';

const ProjectList = () => {
  const { projects, deleteProject } = useAdmin();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const getCategoryLabel = (category: string) => {
    const categories: { [key: string]: string } = {
      'gros-oeuvre': 'Gros Œuvre',
      'second-oeuvre': 'Second Œuvre',
      'finition': 'Finition',
      'travaux-publics': 'Travaux Publics',
      'geomatique': 'Géomatique'
    };
    return categories[category] || category;
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      deleteProject(id);
    }
  };

  const toggleExpanded = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Aucun projet pour le moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">
                    {getCategoryLabel(project.category)}
                  </Badge>
                  <Badge variant="secondary">
                    {project.year}
                  </Badge>
                  {project.location && (
                    <Badge variant="outline">
                      {project.location}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleExpanded(project.id)}
                >
                  <Eye size={16} className="mr-1" />
                  {expandedProject === project.id ? 'Masquer' : 'Voir'}
                </Button>
                <Button variant="outline" size="sm">
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {expandedProject === project.id && (
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <h4 className="font-semibold mb-2">Détails</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {project.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
                
                {project.image && (
                  <div>
                    <h4 className="font-semibold mb-2">Image</h4>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;
