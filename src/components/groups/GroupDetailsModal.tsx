
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { StudyGroup, ChatMessage, User } from '@/types';
import { Users, MapPin, Calendar, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface GroupDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: StudyGroup;
}

const GroupDetailsModal: React.FC<GroupDetailsModalProps> = ({ open, onOpenChange, group }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      groupId: group.id,
      userId: 'student1',
      userName: 'María García',
      message: '¡Hola a todos! ¿Cómo les va con el vocabulario de esta semana?',
      timestamp: new Date('2024-01-15T10:30:00'),
    },
    {
      id: '2',
      groupId: group.id,
      userId: 'student2',
      userName: 'Carlos López',
      message: 'Hola María! Me está costando un poco los phrasal verbs, ¿alguien tiene algún truco?',
      timestamp: new Date('2024-01-15T11:15:00'),
    },
    {
      id: '3',
      groupId: group.id,
      userId: 'student3',
      userName: 'Ana Martínez',
      message: 'Yo uso flashcards para memorizar los phrasal verbs. ¡Funciona muy bien!',
      timestamp: new Date('2024-01-15T12:00:00'),
    },
  ]);

  // Mock data for group members
  const groupMembers: User[] = [
    { id: 'student1', name: 'María García', email: 'maria@example.com', role: 'student' },
    { id: 'student2', name: 'Carlos López', email: 'carlos@example.com', role: 'student' },
    { id: 'student3', name: 'Ana Martínez', email: 'ana@example.com', role: 'student' },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      groupId: group.id,
      userId: 'current-user',
      userName: 'Tu',
      message: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    toast({
      title: "Mensaje enviado",
      description: "Tu mensaje ha sido enviado al grupo",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {group.name}
          </DialogTitle>
          <DialogDescription>{group.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Group Info and Members */}
          <div className="space-y-4">
            {/* Group Members */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Miembros ({groupMembers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {groupMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Meeting Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información de Reunión</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="font-medium text-sm">Lugar</p>
                      <p className="text-sm text-gray-600">
                        {group.meetingInfo?.location || 'Biblioteca Central - Sala 204'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="font-medium text-sm">Horario</p>
                      <p className="text-sm text-gray-600">
                        {group.meetingInfo?.schedule || 'Miércoles 4:00 PM - 6:00 PM'}
                      </p>
                    </div>
                  </div>
                  {group.meetingInfo?.description && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">{group.meetingInfo.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Chat */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Chat del Grupo</CardTitle>
                <CardDescription>Conversa con los miembros del grupo</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-[400px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-blue-600">
                          {message.userName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{message.userName}</span>
                          <span className="text-xs text-gray-500">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Escribe tu mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 min-h-[60px] resize-none"
                  />
                  <Button onClick={handleSendMessage} className="self-end">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupDetailsModal;
