import type { Question as QuestionType } from '../data/questions';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CheckCircle2 } from 'lucide-react';

interface QuestionProps {
  question: QuestionType;
  currentNumber: number;
  totalNumber: number;
  onSelect: (score: number) => void;
}

// 分数映射: A=1, B=2, C=3, D=4
const scoreMap: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
};

export function Question({ question, currentNumber, totalNumber, onSelect }: QuestionProps) {
  const progressPercentage = (currentNumber / totalNumber) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col min-h-[80vh] justify-center">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            灵魂拷问 {currentNumber} / {totalNumber}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex-1 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-snug">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelect(scoreMap[option.value])}
              className={twMerge(
                clsx(
                  "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 group",
                  "border-gray-200 hover:border-red-500 hover:bg-red-50 hover:shadow-sm",
                  "focus:outline-none focus:ring-4 focus:ring-red-500/20 active:scale-[0.99]"
                )
              )}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                {option.value}
              </div>
              <span className="flex-1 text-lg text-gray-700 font-medium pt-0.5 group-hover:text-gray-900">
                {option.text}
              </span>
              <CheckCircle2 className="w-6 h-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
