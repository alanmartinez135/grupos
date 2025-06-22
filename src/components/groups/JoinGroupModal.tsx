import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Users } from 'lucide-react';
import { StudyGroup } from '@/types';
import { toast } from '@/hooks/use-toast';

interface JoinGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock available groups - only English groups
  const availableGroups: StudyGroup[] = [
    {
      id: '2',
      name: 'Inglés Avanzado',
      description: 'Estudiamos inglés avanzado y conversación',
      createdBy: 'student2',
      members: ['student2', 'student3'],
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Inglés Básico - Principiantes',
      description: 'Grupo para estudiantes que comienzan con inglés',
      createdBy: 'student4',
      members: ['student4', 'student5', 'student6'],
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'Inglés Conversacional',
      description: 'Practicamos speaking y listening en inglés',
      createdBy: 'student7',
      members: ['student7'],
      createdAt: new Date(),
    },
  ];

  const filteredGroups = availableGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = async (group: StudyGroup) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Te has unido al grupo!",
        description: `Ahora eres miembro de "${group.name}"`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo unir al grupo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Unirse a un Grupo</DialogTitle>
          <DialogDescription>
            Encuentra y únete a grupos de estudio existentes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Buscar grupos por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <Card key={group.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {group.description}
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleJoinGroup(group)}
                      disabled={loading}
                    >
                      {loading ? 'Uniéndose...' : 'Unirse'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {group.members.length} miembros
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Creado el {group.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredGroups.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No se encontraron grupos que coincidan con tu búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroupModal;
