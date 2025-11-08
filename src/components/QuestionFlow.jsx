import React, { useState, useEffect } from 'react';

const stages = ['Idea', 'MVP', 'Revenue', 'Growth'];

export default function QuestionFlow({ onComplete, initialAnswers }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    stage: initialAnswers?.stage || '',
    industry: initialAnswers?.industry || '',
    amount: initialAnswers?.amount || '',
    equity: initialAnswers?.equity || '',
    geography: initialAnswers?.geography || '',
    investorType: initialAnswers?.investorType || '',
  });

  useEffect(() => {
    // Auto-advance if some initial answers are provided
    const ordered = ['stage', 'industry', 'funding', 'geography', 'investorType'];
    let s = 0;
    if (answers.stage) s = 1;
    if (answers.industry) s = 2;
    if (answers.amount && answers.equity) s = 3;
    if (answers.geography) s = 4;
    if (answers.investorType) s = 5;
    setStep(s);
  }, []); // eslint-disable-line

  const next = () => setStep((prev) => Math.min(prev + 1, 5));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    if (step === 5) {
      onComplete(answers);
    }
  }, [step]); // eslint-disable-line

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/60 backdrop-blur rounded-xl border border-slate-200 p-6 shadow-sm">
      {step === 0 && (
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Welcome Founder 👋</h1>
          <p className="mt-2 text-slate-600">Let's match you with the right investors. What stage is your startup in?</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {stages.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setAnswers((a) => ({ ...a, stage: s }));
                  next();
                }}
                className={`px-4 py-2 rounded-lg border text-sm font-medium hover:bg-slate-50 transition ${
                  answers.stage === s ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 text-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="text-slate-800 font-medium">Which industry best describes your startup?</p>
          <input
            type="text"
            placeholder="e.g., Fintech, Healthtech, SaaS, Climate, AI"
            className="mt-3 w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={answers.industry}
            onChange={(e) => setAnswers((a) => ({ ...a, industry: e.target.value }))}
          />
          <div className="mt-4 flex items-center gap-2">
            <button onClick={prev} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700">Back</button>
            <button
              onClick={next}
              disabled={!answers.industry}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-slate-800 font-medium">How much are you raising and what equity are you offering?</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-slate-600">Funding Required (USD)</label>
              <input
                type="number"
                min="0"
                placeholder="e.g., 250000"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={answers.amount}
                onChange={(e) => setAnswers((a) => ({ ...a, amount: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Equity Offered (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 10"
                className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={answers.equity}
                onChange={(e) => setAnswers((a) => ({ ...a, equity: e.target.value }))}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={prev} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700">Back</button>
            <button
              onClick={next}
              disabled={!answers.amount || !answers.equity}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="text-slate-800 font-medium">What's your primary geography? (Optional)</p>
          <input
            type="text"
            placeholder="e.g., US, Europe, India, Remote"
            className="mt-3 w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={answers.geography}
            onChange={(e) => setAnswers((a) => ({ ...a, geography: e.target.value }))}
          />
          <div className="mt-4 flex items-center gap-2">
            <button onClick={prev} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700">Back</button>
            <button onClick={next} className="px-4 py-2 rounded-lg bg-slate-900 text-white">Next</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <p className="text-slate-800 font-medium">Preferred investor type?</p>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['Angel', 'Seed VC', 'Strategic Investor'].map((type) => (
              <button
                key={type}
                onClick={() => setAnswers((a) => ({ ...a, investorType: type }))}
                className={`px-4 py-2 rounded-lg border text-sm font-medium hover:bg-slate-50 transition ${
                  answers.investorType === type ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 text-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={prev} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700">Back</button>
            <button
              onClick={next}
              disabled={!answers.investorType}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white disabled:opacity-50"
            >
              See Matches
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
