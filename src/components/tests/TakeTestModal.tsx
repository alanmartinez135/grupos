
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Test } from '@/types';
import { toast } from '@/hooks/use-toast';

interface TakeTestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  test: Test;
}

const TakeTestModal: React.FC<TakeTestModalProps> = ({ open, onOpenChange, test }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(test.questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const score = answers.reduce((acc, answer, index) => {
      return answer === test.questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);

    const percentage = Math.round((score / test.questions.length) * 100);

    toast({
      title: "¡Prueba completada!",
      description: `Tu puntuación: ${score}/${test.questions.length} (${percentage}%)`,
    });

    setShowResults(true);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(test.questions.length).fill(-1));
    setShowResults(false);
    onOpenChange(false);
  };

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const score = answers.reduce((acc, answer, index) => {
    return answer === test.questions[index].correctAnswer ? acc + 1 : acc;
  }, 0);
  const percentage = Math.round((score / test.questions.length) * 100);

  if (showResults) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Resultados de la Prueba</DialogTitle>
            <DialogDescription>{test.title}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-blue-600">
                  {percentage}%
                </CardTitle>
                <CardDescription>
                  {score} de {test.questions.length} respuestas correctas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={percentage} className="h-3" />
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-semibold">Revisión de respuestas:</h3>
              {test.questions.map((question, index) => (
                <Card key={question.id} className={answers[index] === question.correctAnswer ? 'border-green-500' : 'border-red-500'}>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <p className="font-medium">{index + 1}. {question.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded text-sm ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-100 text-green-800 border border-green-300'
                                : optionIndex === answers[index] && answers[index] !== question.correctAnswer
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-gray-50'
                            }`}
                          >
                            {option}
                            {optionIndex === question.correctAnswer && ' ✓'}
                            {optionIndex === answers[index] && answers[index] !== question.correctAnswer && ' ✗'}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={resetTest}>
                Finalizar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const currentQ = test.questions[currentQuestion];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{test.title}</DialogTitle>
          <DialogDescription>{test.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Pregunta {currentQuestion + 1} de {test.questions.length}</span>
              <span>{Math.round(progress)}% completado</span>
            </div>
            <Progress value={progress} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {currentQuestion + 1}. {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion]?.toString()}
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              >
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Anterior
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              
              {currentQuestion === test.questions.length - 1 ? (
                <Button onClick={handleSubmit} disabled={answers[currentQuestion] === -1}>
                  Enviar Prueba
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={answers[currentQuestion] === -1}>
                  Siguiente
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TakeTestModal;
