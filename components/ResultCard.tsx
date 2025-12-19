
import React from 'react';
import { AnalysisResult, Warning } from '../types';

interface ResultCardProps {
  menu: string;
  data: AnalysisResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ menu, data }) => {
  // Remove duplicate warnings for the same drug in the same menu item
  const uniqueWarnings: Warning[] = [];
  const seenDrugs = new Set<string>();
  
  data.warnings.forEach(w => {
    if (!seenDrugs.has(w.name)) {
      uniqueWarnings.push(w);
      seenDrugs.add(w.name);
    }
  });

  return (
    <div className="bg-white rounded-[15px] p-6 mb-6 border-2 border-[#e1f5fe] shadow-[5px_5px_0px_#b3e5fc] transition-transform hover:scale-[1.01]">
      <h3 className="text-[#0277bd] text-2xl font-bold mb-2 flex items-center">
        <span className="mr-2">🍽️</span> 메뉴: {menu}
      </h3>
      <p className="text-lg text-gray-600 mb-4 font-nanum">
        찾은 재료: <span className="font-bold text-[#01579b]">{data.detected.join(', ')}</span>
      </p>

      {uniqueWarnings.length > 0 && (
        <div className="space-y-3 mb-4">
          {uniqueWarnings.map((w, idx) => (
            <div key={idx} className="bg-[#fff5f5] rounded-xl p-4 border border-[#ffcdd2] font-nanum">
              <div className="flex items-start">
                <span className="text-red-600 font-bold mr-2">📍 {w.name} 주의!</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">약 이름: {w.brand}</div>
              <div className="mt-2 text-[#c62828] font-medium">💡 {w.reason}</div>
            </div>
          ))}
        </div>
      )}

      {data.safe.length > 0 ? (
        <div className="bg-[#e8f5e9] p-4 rounded-xl text-[#2e7d32] font-bold border border-[#c8e6c9] text-center text-lg">
          ✅ 추천 성분: {data.safe.map((s, idx) => (
            <span key={idx} className="inline-block mx-1">
               {s}{idx < data.safe.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      ) : (
        <div className="bg-[#ffebee] p-4 rounded-xl text-[#c62828] font-bold border border-[#ffcdd2] text-center text-lg">
          🚨 주의: 다른 진통제가 필요해 <br /> 전문가와의 상담을 추천해!
        </div>
      )}
    </div>
  );
};

export default ResultCard;
