import React from 'react';
import InvestorCard from './InvestorCard';

export default function InvestorList({ investors, onSelect }) {
  if (!investors || investors.length === 0) {
    return (
      <div className="text-center border border-dashed border-slate-300 rounded-xl p-8 bg-white/50">
        <p className="text-slate-800 font-medium">No direct matches found.</p>
        <p className="text-slate-600 text-sm mt-1">Consider widening the investor type, exploring accelerators, grants, or strategic partners.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {investors.map((inv) => (
        <InvestorCard key={inv.id} investor={inv} onSelect={onSelect} />)
      )}
    </div>
  );
}
