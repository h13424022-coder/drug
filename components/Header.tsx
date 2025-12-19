
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="bg-[#b3e5fc] p-8 rounded-[20px] text-center text-[#01579b] border-4 border-dashed border-[#81d4fa] mb-8 shadow-sm">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">💊 급식-진통제 상호작용 가이드</h1>
      <p className="text-xl md:text-2xl opacity-90">오늘 먹은 급식, 내 약과 잘 맞을까? 확인해봐!</p>
    </div>
  );
};

export default Header;
