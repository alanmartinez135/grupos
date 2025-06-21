
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Users, BarChart } from 'lucide-react';
import CreateTestModal from '@/components/tests/CreateTestModal';
import TestResultsModal from '@/components/tests/TestResultsModal';
import { Test, TestResult } from '@/types';

const TeacherDashboard: React.FC = () => {
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  // Mock data - only English tests
  const tests: Test[] = [
    {
      id: '1',
      title: 'Inglés Básico 1',
      description: 'Fundamentos del idioma inglés - Nivel principiante',
      questions: [],
      createdBy: 'teacher1',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Inglés Básico 2',
      description: 'Inglés elemental - Vocabulario y gramática básica',
      questions: [],
      createdBy: 'teacher1',
      createdAt: new Date(),
    },
  ];

  const mockResults: TestResult[] = [
    { id: '1', testId: '1', studentId: 'student1', score: 85, totalQuestions: 10, answers: [], completedAt: new Date() },
    { id: '2', testId: '1', studentId: 'student2', score: 92, totalQuestions: 10, answers: [], completedAt: new Date() },
  ];

  const handleViewResults = (test: Test) => {
    setSelectedTest(test);
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panel de Profesor</h2>
          <p className="text-gray-600">Gestiona tus pruebas y revisa el progreso de tus estudiantes</p>
        </div>
        <Button onClick={() => setShowCreateTest(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Crear Nueva Prueba
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <h3 className="font-semibold text-lg">{test.title}</h3>
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
                <div className="flex gap-2 w-full sm:w-auto">
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
    </div>
  );
};

export default TeacherDashboard;
