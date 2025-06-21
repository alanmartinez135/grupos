
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Test, TestResult } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TestResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  test: Test;
  results: TestResult[];
}

const TestResultsModal: React.FC<TestResultsModalProps> = ({ 
  open, 
  onOpenChange, 
  test, 
  results 
}) => {
  const averageScore = results.length > 0 
    ? results.reduce((acc, result) => acc + result.score, 0) / results.length 
    : 0;

  const averagePercentage = Math.round((averageScore / test.questions.length) * 100);

  // Mock student names for display
  const studentNames: { [key: string]: string } = {
    'student1': 'Ana García',
    'student2': 'Carlos López',
    'student3': 'María Rodríguez',
  };

  const chartData = results.map((result, index) => ({
    name: studentNames[result.studentId] || `Estudiante ${index + 1}`,
    score: Math.round((result.score / result.totalQuestions) * 100),
  }));

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 70) return 'bg-blue-100 text-blue-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Resultados: {test.title}</DialogTitle>
          <DialogDescription>
            Análisis del rendimiento de los estudiantes en esta evaluación
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Estudiantes Evaluados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(averagePercentage)}`}>
                  {averagePercentage}%
                </div>
                <Progress value={averagePercentage} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Aprobación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((results.filter(r => (r.score / r.totalQuestions) * 100 >= 60).length / results.length) * 100)}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          {results.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Puntuaciones</CardTitle>
                <CardDescription>Rendimiento individual de cada estudiante</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Puntuación']} />
                      <Bar dataKey="score" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Individual Results */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados Individuales</CardTitle>
              <CardDescription>Detalle del rendimiento de cada estudiante</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((result) => {
                  const percentage = Math.round((result.score / result.totalQuestions) * 100);
                  return (
                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {studentNames[result.studentId] || `Estudiante ${result.studentId}`}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Completado el {result.completedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(percentage)}`}>
                            {result.score}/{result.totalQuestions}
                          </div>
                          <div className="text-sm text-gray-500">
                            {percentage}%
                          </div>
                        </div>
                        <Badge className={getScoreBadge(percentage)}>
                          {percentage >= 90 ? 'Excelente' : 
                           percentage >= 70 ? 'Bueno' : 
                           percentage >= 60 ? 'Aprobado' : 'Reprobado'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestResultsModal;
