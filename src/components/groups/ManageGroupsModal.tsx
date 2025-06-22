
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StudyGroup } from '@/types';
import { toast } from '@/hooks/use-toast';
import { Edit, Users } from 'lucide-react';

interface ManageGroupsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ManageGroupsModal: React.FC<ManageGroupsModalProps> = ({ open, onOpenChange }) => {
  const [groups, setGroups] = useState<StudyGroup[]>([
    {
      id: '1',
      name: 'English Conversation Practice',
      description: 'Grupo para practicar conversación en inglés',
      createdBy: 'student1',
      members: ['student1', 'student2', 'student3'],
      createdAt: new Date('2024-01-15'),
      isEnabled: true,
    },
    {
      id: '2',
      name: 'English Grammar Study',
      description: 'Estudio de gramática inglesa avanzada',
      createdBy: 'student2',
      members: ['student2', 'student4'],
      createdAt: new Date('2024-01-20'),
      isEnabled: true,
    },
    {
      id: '3',
      name: 'English Vocabulary Building',
      description: 'Construcción de vocabulario en inglés',
      createdBy: 'student3',
      members: ['student3', 'student5', 'student6'],
      createdAt: new Date('2024-01-25'),
      isEnabled: false,
    },
  ]);

  const [editingGroup, setEditingGroup] = useState<StudyGroup | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleToggleGroup = (groupId: string, enabled: boolean) => {
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId ? { ...group, isEnabled: enabled } : group
      )
    );
    
    const group = groups.find(g => g.id === groupId);
    toast({
      title: enabled ? "Grupo habilitado" : "Grupo deshabilitado",
      description: `El grupo "${group?.name}" ha sido ${enabled ? 'habilitado' : 'deshabilitado'}`,
    });
  };

  const handleEditGroup = (group: StudyGroup) => {
    setEditingGroup(group);
    setEditName(group.name);
    setEditDescription(group.description);
  };

  const handleSaveEdit = () => {
    if (!editingGroup) return;

    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === editingGroup.id 
          ? { ...group, name: editName, description: editDescription }
          : group
      )
    );

    toast({
      title: "Grupo actualizado",
      description: `El grupo "${editName}" ha sido actualizado exitosamente`,
    });

    setEditingGroup(null);
    setEditName('');
    setEditDescription('');
  };

  const handleCancelEdit = () => {
    setEditingGroup(null);
    setEditName('');
    setEditDescription('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestionar Grupos de Estudiantes</DialogTitle>
          <DialogDescription>
            Ve y gestiona todos los grupos de estudio creados por los estudiantes
          </DialogDescription>
        </DialogHeader>

        {editingGroup ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Editando grupo</h3>
            <div className="space-y-2">
              <Label htmlFor="editName">Nombre del grupo</Label>
              <Input
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDescription">Descripción</Label>
              <Textarea
                id="editDescription"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveEdit}>Guardar cambios</Button>
              <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {groups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <Badge variant={group.isEnabled ? "default" : "secondary"}>
                          {group.isEnabled ? "Habilitado" : "Deshabilitado"}
                        </Badge>
                      </div>
                      <CardDescription>{group.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditGroup(group)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{group.members.length} miembros</span>
                      </div>
                      <span>Creado el {group.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={group.isEnabled}
                        onCheckedChange={(checked) => handleToggleGroup(group.id, checked)}
                      />
                      <span className="text-sm text-gray-600">
                        {group.isEnabled ? "Habilitado" : "Deshabilitado"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {groups.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No hay grupos creados por estudiantes
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManageGroupsModal;
