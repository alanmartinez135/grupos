import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, FileText, Users, BarChart, Settings } from 'lucide-react';
import CreateTestModal from '@/components/tests/CreateTestModal';
import TestResultsModal from '@/components/tests/TestResultsModal';
import ManageGroupsModal from '@/components/groups/ManageGroupsModal';
import { Test, TestResult } from '@/types';
import { toast } from '@/hooks/use-toast';

const TeacherDashboard: React.FC = () => {
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showManageGroups, setShowManageGroups] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  // Mock data - only English tests
  const [tests, setTests] = useState<Test[]>([
    {
      id: '1',
      title: 'Inglés Básico 1',
      description: 'Fundamentos del idioma inglés - Nivel principiante',
      questions: [],
      createdBy: 'teacher1',
      createdAt: new Date(),
      isEnabled: true,
    },
    {
      id: '2',
      title: 'Inglés Básico 2',
      description: 'Inglés elemental - Vocabulario y gramática básica',
      questions: [],
      createdBy: 'teacher1',
      createdAt: new Date(),
      isEnabled: true,
    },
  ]);

  const mockResults: TestResult[] = [
    { id: '1', testId: '1', studentId: 'student1', score: 85, totalQuestions: 10, answers: [], completedAt: new Date() },
    { id: '2', testId: '1', studentId: 'student2', score: 92, totalQuestions: 10, answers: [], completedAt: new Date() },
  ];

  const handleViewResults = (test: Test) => {
    setSelectedTest(test);
    setShowResults(true);
  };

  const handleToggleTest = (testId: string, enabled: boolean) => {
    setTests(prevTests => 
      prevTests.map(test => 
        test.id === testId ? { ...test, isEnabled: enabled } : test
      )
    );
    
    const test = tests.find(t => t.id === testId);
    toast({
      title: enabled ? "Prueba habilitada" : "Prueba deshabilitada",
      description: `La prueba "${test?.title}" ha sido ${enabled ? 'habilitada' : 'deshabilitada'}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panel de Profesor</h2>
          <p className="text-gray-600">Gestiona tus pruebas y revisa el progreso de tus estudiantes</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={() => setShowCreateTest(true)} className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            Crear Nueva Prueba
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowManageGroups(true)}
            className="flex-1 sm:flex-none"
          >
            <Settings className="h-4 w-4 mr-2" />
            Gestionar Grupos
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pruebas Creadas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.length}</div>
            <p className="text-xs text-muted-foreground">+2 este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupos Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Tests List */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Pruebas</CardTitle>
          <CardDescription>Gestiona y revisa el rendimiento de tus evaluaciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tests.map((test) => (
              <div key={test.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{test.title}</h3>
                    <Badge variant={test.isEnabled ? "default" : "secondary"}>
                      {test.isEnabled ? "Habilitada" : "Deshabilitada"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{test.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">
                      {mockResults.filter(r => r.testId === test.id).length} completadas
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Creada el {test.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-start sm:items-center">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={test.isEnabled}
                      onCheckedChange={(checked) => handleToggleTest(test.id, checked)}
                    />
                    <span className="text-sm text-gray-600">
                      {test.isEnabled ? "Habilitada" : "Deshabilitada"}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewResults(test)}
                    className="flex-1 sm:flex-none"
                  >
                    Ver Resultados
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateTestModal 
        open={showCreateTest} 
        onOpenChange={setShowCreateTest}
      />

      {selectedTest && (
        <TestResultsModal
          open={showResults}
          onOpenChange={setShowResults}
          test={selectedTest}
          results={mockResults.filter(r => r.testId === selectedTest.id)}
        />
      )}

      <ManageGroupsModal
        open={showManageGroups}
        onOpenChange={setShowManageGroups}
      />
    </div>
  );
};

export default TeacherDashboard;
