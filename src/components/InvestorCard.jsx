import React from 'react';
import { User, Building2, DollarSign, Target, BarChart3, CheckCircle2 } from 'lucide-react';

function formatRange(min, max) {
  const fmt = (n) => {
    if (n >= 1_000_000) return `$${(n/1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n/1_000).toFixed(0)}k`;
    return `$${n}`;
  };
  return `${fmt(min)} - ${fmt(max)}`;
}

export default function InvestorCard({ investor, onSelect }) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
            <User className="w-5 h-5" />
            <span>Investor: {investor.name}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-slate-700">
            <Building2 className="w-4 h-4" />
            <span>Firm: {investor.firm}</span>
          </div>
        </div>
        <button
          onClick={() => onSelect(investor)}
          className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm"
        >
          View Profile
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 text-slate-800">
          <DollarSign className="w-4 h-4" />
          <span>Investment Range: {formatRange(investor.minCheck, investor.maxCheck)}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <Target className="w-4 h-4" />
          <span>Focus: {investor.industries.join(', ')}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <BarChart3 className="w-4 h-4" />
          <span>Stage Preference: {investor.stages.join(' / ')}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <CheckCircle2 className="w-4 h-4" />
          <span>Notable: {investor.portfolio.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}
