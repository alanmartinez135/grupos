
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ open, onOpenChange }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Grupo creado!",
        description: `El grupo "${name}" ha sido creado exitosamente`,
      });

      setName('');
      setDescription('');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el grupo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Grupo de Estudio</DialogTitle>
          <DialogDescription>
            Crea un nuevo grupo para colaborar con otros estudiantes
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupName">Nombre del grupo</Label>
            <Input
              id="groupName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Grupo de Matemáticas"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="groupDescription">Descripción</Label>
            <Textarea
              id="groupDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el propósito y objetivos del grupo"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Grupo'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
