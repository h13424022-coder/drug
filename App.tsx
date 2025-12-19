
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ResultCard from './components/ResultCard';
import { analyzeMeal } from './services/analysisService';
import { FinalReport } from './types';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [report, setReport] = useState<FinalReport | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleCheck = useCallback(() => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) {
      setReport(null);
      setHasSearched(false);
      return;
    }

    const result = analyzeMeal(trimmedInput);
    setReport(result);
    setHasSearched(true);
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-[#f0f9ff] rounded-[30px] p-6 md:p-10 shadow-xl border-4 border-white">
        <Header />

        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <input
            type="text"
            className="flex-1 px-6 py-4 rounded-2xl border-2 border-[#b3e5fc] focus:outline-none focus:border-[#4fc3f7] transition-colors text-xl font-nanum shadow-inner"
            placeholder="메뉴를 입력해줘! (예: 마늘 통닭구이, 초콜릿 케이크)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleCheck}
            className="bg-[#4fc3f7] hover:bg-[#29b6f6] text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all active:scale-95 shadow-md whitespace-nowrap"
          >
            상호작용 확인하기 ✨
          </button>
        </div>

        <div className="space-y-6">
          {!hasSearched && (
            <div className="text-center py-10 text-2xl text-gray-500 animate-pulse">
              메뉴를 쉼표(,)로 구분해서 입력해줘! 😊
            </div>
          )}

          {hasSearched && report && Object.keys(report).length > 0 ? (
            Object.entries(report).map(([menu, data]) => (
              <ResultCard key={menu} menu={menu} data={data} />
            ))
          ) : hasSearched && (
            <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-[#81d4fa] text-[#01579b] text-2xl font-bold">
              궁합 위험 요소가 발견되지 않았어요!<br />
              안심하고 드셔도 됩니다! 💖
            </div>
          )}
        </div>
        
        <footer className="mt-12 text-center text-gray-400 text-sm font-nanum">
          * 본 가이드는 보조용 자료이며, 정확한 약 처방 및 복용은 반드시 의사 또는 약사와 상담하세요.
        </footer>
      </div>
    </div>
  );
};

export default App;
