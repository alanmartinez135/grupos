
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, Trophy, Plus } from 'lucide-react';
import TakeTestModal from '@/components/tests/TakeTestModal';
import CreateGroupModal from '@/components/groups/CreateGroupModal';
import JoinGroupModal from '@/components/groups/JoinGroupModal';
import { Test, StudyGroup } from '@/types';

const StudentDashboard: React.FC = () => {
  const [showTakeTest, setShowTakeTest] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  // Mock data - only English tests
  const availableTests: Test[] = [
    {
      id: '1',
      title: 'Inglés Básico 1',
      description: 'Fundamentos del idioma inglés - Nivel principiante',
      questions: [
        {
          id: '1',
          question: 'What is the correct translation of "Hola" in English?',
          options: ['Goodbye', 'Hello', 'Thank you', 'Please'],
          correctAnswer: 1
        },
        {
          id: '2',
          question: 'How do you say "¿Cómo estás?" in English?',
          options: ['What is your name?', 'How are you?', 'Where are you from?', 'How old are you?'],
          correctAnswer: 1
        }
      ],
      createdBy: 'teacher1',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Inglés Básico 2',
      description: 'Inglés elemental - Vocabulario y gramática básica',
      questions: [
        {
          id: '3',
          question: 'What is the plural form of "book"?',
          options: ['book', 'books', 'bookes', 'bookies'],
          correctAnswer: 1
        },
        {
          id: '4',
          question: 'Choose the correct sentence:',
          options: ['I am have a car', 'I have a car', 'I has a car', 'I am has a car'],
          correctAnswer: 1
        }
      ],
      createdBy: 'teacher1',
      createdAt: new Date(),
    },
  ];

  const myGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'Grupo de Inglés',
      description: 'Estudiamos vocabulario y gramática inglesa',
      createdBy: 'student1',
      members: ['student1', 'student2', 'student3'],
      createdAt: new Date(),
    },
  ];

  const averageScore = 87.5;
  const testsCompleted = 5;
  const totalGroups = myGroups.length;

  const handleTakeTest = (test: Test) => {
    setSelectedTest(test);
    setShowTakeTest(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panel de Estudiante</h2>
          <p className="text-gray-600">Realiza pruebas y participa en grupos de estudio</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={() => setShowCreateGroup(true)} variant="outline" className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            Crear Grupo
          </Button>
          <Button onClick={() => setShowJoinGroup(true)} className="flex-1 sm:flex-none">
            <Users className="h-4 w-4 mr-2" />
            Unirse a Grupo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <Progress value={averageScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pruebas Completadas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testsCompleted}</div>
            <p className="text-xs text-muted-foreground">+2 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupos de Estudio</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGroups}</div>
            <p className="text-xs text-muted-foreground">Miembro activo</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Pruebas Disponibles</CardTitle>
            <CardDescription>Realiza las evaluaciones asignadas por tus profesores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableTests.map((test) => (
                <div key={test.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{test.title}</h3>
                    <p className="text-gray-600 text-sm">{test.description}</p>
                    <Badge variant="outline" className="mt-2">
                      {test.questions.length} preguntas
                    </Badge>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => handleTakeTest(test)}
                    className="w-full sm:w-auto"
                  >
                    Realizar Prueba
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Study Groups */}
        <Card>
          <CardHeader>
            <CardTitle>Mis Grupos de Estudio</CardTitle>
            <CardDescription>Colabora con otros estudiantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myGroups.map((group) => (
                <div key={group.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-gray-600 text-sm">{group.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary">
                      {group.members.length} miembros
                    </Badge>
                    <Button variant="outline" size="sm">
                      Ver Grupo
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedTest && (
        <TakeTestModal
          open={showTakeTest}
          onOpenChange={setShowTakeTest}
          test={selectedTest}
        />
      )}

      <CreateGroupModal
        open={showCreateGroup}
        onOpenChange={setShowCreateGroup}
      />

      <JoinGroupModal
        open={showJoinGroup}
        onOpenChange={setShowJoinGroup}
      />
    </div>
  );
};

export default StudentDashboard;
