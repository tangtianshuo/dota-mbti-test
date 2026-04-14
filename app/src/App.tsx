import { useState, useMemo } from 'react';
import { Welcome } from './components/Welcome';
import { Question } from './components/Question';
import { Result } from './components/Result';
import { questions } from './data/questions';
import { results } from './data/results';

type AppState = 'welcome' | 'playing' | 'result';

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // 计算总分
  const totalScore = useMemo(() => {
    return answers.reduce((acc, score) => acc + score, 0);
  }, [answers]);

  // 匹配结果
  const currentResult = useMemo(() => {
    if (appState !== 'result') return null;
    return results.find(
      (r) => totalScore >= r.minScore && totalScore <= r.maxScore
    ) || results[results.length - 1]; // 如果没有匹配到，默认返回最后一个
  }, [appState, totalScore]);

  const handleStart = () => {
    setAppState('playing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswerSelect = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setAppState('result');
    }
  };

  const handleRestart = () => {
    setAppState('welcome');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center font-sans text-gray-900 selection:bg-red-200 selection:text-red-900">
      {appState === 'welcome' && <Welcome onStart={handleStart} />}
      
      {appState === 'playing' && (
        <Question
          question={questions[currentQuestionIndex]}
          currentNumber={currentQuestionIndex + 1}
          totalNumber={questions.length}
          onSelect={handleAnswerSelect}
        />
      )}

      {appState === 'result' && currentResult && (
        <Result
          result={currentResult}
          score={totalScore}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}

export default App;
