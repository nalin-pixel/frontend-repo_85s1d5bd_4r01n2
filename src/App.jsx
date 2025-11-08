import React, { useMemo, useState } from 'react';
import QuestionFlow from './components/QuestionFlow';
import InvestorList from './components/InvestorList';
import InvestorModal from './components/InvestorModal';

// Sample investor dataset for demo. In a full app, this would come from the backend.
const INVESTORS = [
  {
    id: '1',
    name: 'Alice Nguyen',
    firm: 'Catalyst Angels',
    type: 'Angel',
    minCheck: 25000,
    maxCheck: 150000,
    industries: ['SaaS', 'AI', 'Developer Tools'],
    stages: ['MVP', 'Revenue'],
    portfolio: ['Linear', 'Vercel', 'Supabase'],
    thesis: 'Backs technical founders building B2B software with clear distribution advantages.',
    geographies: ['US', 'Canada', 'Remote'],
  },
  {
    id: '2',
    name: 'Beacon Seed Fund',
    firm: 'Beacon Ventures',
    type: 'Seed VC',
    minCheck: 250000,
    maxCheck: 1500000,
    industries: ['Fintech', 'Insurtech', 'Payments'],
    stages: ['MVP', 'Revenue', 'Growth'],
    portfolio: ['Brex', 'Stripe ecosystem'],
    thesis: 'Fintech infrastructure and embedded finance across emerging markets.',
    geographies: ['US', 'Europe', 'LATAM'],
  },
  {
    id: '3',
    name: 'GreenWave Capital',
    firm: 'GreenWave Capital',
    type: 'Seed VC',
    minCheck: 100000,
    maxCheck: 500000,
    industries: ['Climate', 'Energy', 'Mobility'],
    stages: ['Idea', 'MVP', 'Revenue'],
    portfolio: ['Arcadia', 'ChargePoint'],
    thesis: 'Decarbonization tech with measurable impact and strong unit economics.',
    geographies: ['US', 'Europe'],
  },
  {
    id: '4',
    name: 'Nova Strategic',
    firm: 'Nova Corp',
    type: 'Strategic Investor',
    minCheck: 300000,
    maxCheck: 2000000,
    industries: ['Healthtech', 'Bio', 'AI'],
    stages: ['Revenue', 'Growth'],
    portfolio: ['BioRx', 'Carely'],
    thesis: 'Invests where commercial partnerships can accelerate distribution.',
    geographies: ['US', 'APAC'],
  },
];

function normalize(str) {
  return String(str || '').toLowerCase();
}

export default function App() {
  const [answers, setAnswers] = useState(null);
  const [selected, setSelected] = useState(null);

  const matches = useMemo(() => {
    if (!answers) return [];

    const amount = Number(answers.amount || 0);
    const ind = normalize(answers.industry);
    const stage = answers.stage;
    const geography = normalize(answers.geography);
    const type = answers.investorType;

    return INVESTORS.filter((inv) => {
      const amountOk = amount >= inv.minCheck && amount <= inv.maxCheck;
      const industryOk = inv.industries.map(normalize).some((i) => ind ? i.includes(ind) || ind.includes(i) : true);
      const stageOk = inv.stages.includes(stage);
      const typeOk = !type || inv.type === type;
      const geoOk = !geography || inv.geographies.map(normalize).some((g) => g.includes(geography) || geography.includes(g));
      return amountOk && industryOk && stageOk && typeOk && geoOk;
    });
  }, [answers]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Funding Match Assistant</h1>
          <p className="mt-2 text-slate-600">Find investors aligned with your industry, stage, and raise.</p>
        </header>

        {!answers ? (
          <QuestionFlow onComplete={setAnswers} />
        ) : (
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur rounded-xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
                <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200">Stage: {answers.stage}</span>
                <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200">Industry: {answers.industry}</span>
                <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200">Raise: ${Number(answers.amount).toLocaleString()} for {answers.equity}%</span>
                {answers.geography && (
                  <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200">Geo: {answers.geography}</span>
                )}
                <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200">Investor: {answers.investorType}</span>
                <button
                  className="ml-auto px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700"
                  onClick={() => setAnswers(null)}
                >
                  Start Over
                </button>
              </div>
            </div>

            <InvestorList investors={matches} onSelect={setSelected} />
          </div>
        )}
      </div>

      <InvestorModal investor={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
