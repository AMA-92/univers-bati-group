
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  details: string[];
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading projects:', error);
        return;
      }

      if (data) {
        const formattedProjects = data.map(project => ({
          id: project.id,
          title: project.title,
          category: project.category,
          location: project.location || '',
          year: project.year || '',
          description: project.description,
          image: project.image || '',
          details: Array.isArray(project.details) ? project.details : []
        }));
        setProjects(formattedProjects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (newProject: Omit<Project, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: newProject.title,
          category: newProject.category,
          location: newProject.location,
          year: newProject.year,
          description: newProject.description,
          image: newProject.image,
          details: newProject.details
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const formattedProject = {
          id: data.id,
          title: data.title,
          category: data.category,
          location: data.location || '',
          year: data.year || '',
          description: data.description,
          image: data.image || '',
          details: Array.isArray(data.details) ? data.details : []
        };
        setProjects(prev => [formattedProject, ...prev]);
      }
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };

  const updateProject = async (updatedProject: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: updatedProject.title,
          category: updatedProject.category,
          location: updatedProject.location,
          year: updatedProject.year,
          description: updatedProject.description,
          image: updatedProject.image,
          details: updatedProject.details,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedProject.id);

      if (error) {
        throw error;
      }

      setProjects(prev => 
        prev.map(p => p.id === updatedProject.id ? updatedProject : p)
      );
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    loading,
    refresh: loadProjects
  };
};
