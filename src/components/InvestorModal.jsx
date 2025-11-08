import React from 'react';

export default function InvestorModal({ investor, onClose }) {
  if (!investor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 mx-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{investor.name}</h3>
            <p className="text-slate-600">{investor.firm}</p>
          </div>
          <button onClick={onClose} className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700">Close</button>
        </div>

        <div className="mt-4 space-y-3 text-slate-800 text-sm">
          <div>
            <p className="font-medium">Investment Thesis</p>
            <p className="text-slate-700 mt-1">{investor.thesis}</p>
          </div>
          <div>
            <p className="font-medium">Past Investments</p>
            <ul className="list-disc list-inside text-slate-700">
              {investor.portfolio.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">Contact & Intro Steps</p>
            <ol className="list-decimal list-inside text-slate-700 space-y-1">
              <li>Identify a mutual connection for a warm intro.</li>
              <li>Send a concise overview: problem, solution, traction, and ask.</li>
              <li>Attach a one-pager or deck. Include data room link if available.</li>
            </ol>
          </div>
          <div>
            <p className="font-medium">Personalized Intro Message</p>
            <div className="mt-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
              <p>
                Hi {investor.name.split(' ')[0]}, I’m building {investor.exampleStartup || 'a venture'} in {investor.industries[0]}. We’re at the {investor.stages[0]} stage and raising between {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(investor.minCheck)} and {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(investor.maxCheck)}. I admire your thesis on {investor.industries[0]} and your investments in {investor.portfolio.slice(0,2).join(', ')}. Would love to share traction and explore fit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
