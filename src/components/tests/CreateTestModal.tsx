
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Question } from '@/types';
import { toast } from '@/hooks/use-toast';

interface CreateTestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ open, onOpenChange }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || questions.length === 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Prueba creada!",
      description: `La prueba "${title}" ha sido creada exitosamente`,
    });

    setTitle('');
    setDescription('');
    setQuestions([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Prueba</DialogTitle>
          <DialogDescription>
            Crea una evaluación de opción múltiple para tus estudiantes
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título de la prueba</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Matemáticas Básicas"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe brevemente el contenido de la prueba"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Preguntas</h3>
              <Button type="button" onClick={addQuestion} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Pregunta
              </Button>
            </div>

            {questions.map((question, questionIndex) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Pregunta {questionIndex + 1}</CardTitle>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeQuestion(questionIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Pregunta</Label>
                    <Textarea
                      value={question.question}
                      onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                      placeholder="Escribe tu pregunta aquí"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Opciones de respuesta</Label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`correct-${questionIndex}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                          className="text-blue-600"
                        />
                        <Input
                          value={option}
                          onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                          placeholder={`Opción ${optionIndex + 1}`}
                          required
                        />
                      </div>
                    ))}
                    <p className="text-xs text-gray-500">
                      Selecciona el radio button de la respuesta correcta
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Prueba
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestModal;
