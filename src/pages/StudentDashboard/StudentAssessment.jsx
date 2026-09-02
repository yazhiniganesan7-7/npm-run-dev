import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { HelpCircle, Award, CheckCircle, AlertTriangle, RefreshCcw, ArrowRight } from 'lucide-react';

const StudentAssessment = () => {
  const { currentUser, updateStudentProfile } = useApp();
  const [activeStep, setActiveStep] = useState(currentUser?.assessmentScores ? 'results' : 'quiz');
  
  // Quiz states
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '' });
  const [errors, setErrors] = useState({});

  const questions = [
    {
      id: 'q1',
      competency: 'Domain Knowledge',
      text: 'Which classical Ayush formulation method is primarily used to isolate active volatile herbal fractions?',
      options: [
        { value: 'A', text: 'Kashaya Kalpana (Decoction)' },
        { value: 'B', text: 'Arka Kalpana (Distillation)' },
        { value: 'C', text: 'Svarasa Kalpana (Fresh Juice)' },
        { value: 'D', text: 'Sneha Kalpana (Medicated Oil/Ghee)' }
      ],
      correct: 'B'
    },
    {
      id: 'q2',
      competency: 'Scientific/Clinical Skills',
      text: 'Before starting a Phase-II trial on a standardized Ayush drug, what documentation is required by the CDSCO?',
      options: [
        { value: 'A', text: 'Manufacturing license only' },
        { value: 'B', text: 'Investigational New Drug (IND) clearance and Clinical Trials Registry (CTRI) registration' },
        { value: 'C', text: 'ISO 9001 standard certification' },
        { value: 'D', text: 'Raw material agricultural source report' }
      ],
      correct: 'B'
    },
    {
      id: 'q3',
      competency: 'Technical/Data Skills',
      text: 'In standard medical databases, which data standard is used to exchange EHR data fields between clinics?',
      options: [
        { value: 'A', text: 'HTML / CSS standard formats' },
        { value: 'B', text: 'HL7 FHIR (Fast Healthcare Interoperability Resources)' },
        { value: 'C', text: 'MySQL baseline relational schemas' },
        { value: 'D', text: 'REST API standard response bodies' }
      ],
      correct: 'B'
    },
    {
      id: 'q4',
      competency: 'Communication',
      text: 'How should clinical efficacy results of an Ayurvedic drug be reported to a global research audience?',
      options: [
        { value: 'A', text: 'Include local vernacular terms without translation' },
        { value: 'B', text: 'Correlate classical outcomes with quantified biochemical markers and standard clinical indices' },
        { value: 'C', text: 'Publish case notes without statistical distribution models' },
        { value: 'D', text: 'Provide proprietary formulations without revealing active constituents' }
      ],
      correct: 'B'
    },
    {
      id: 'q5',
      competency: 'Regulatory/Compliance',
      text: 'What is the heavy metal limit guideline set by the Ayurvedic Pharmacopoeia of India (API) for Lead (Pb) in herbal products?',
      options: [
        { value: 'A', text: 'Not specified' },
        { value: 'B', text: 'Max 10 ppm (parts per million)' },
        { value: 'C', text: 'Max 100 ppm' },
        { value: 'D', text: 'Max 1 ppm' }
      ],
      correct: 'B'
    }
  ];

  const handleOptionChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
    if (errors[qId]) {
      setErrors({ ...errors, [qId]: null });
    }
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const newErrors = {};
    questions.forEach(q => {
      if (!answers[q.id]) {
        newErrors[q.id] = 'Please select an option';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate mock competency scores
    // Correct answer gives higher base, but we add some random realistic values
    const newScores = {
      'Domain Knowledge': answers.q1 === 'B' ? 88 : 62,
      'Scientific/Clinical Skills': answers.q2 === 'B' ? 90 : 55,
      'Technical/Data Skills': answers.q3 === 'B' ? 85 : 45,
      'Communication': answers.q4 === 'B' ? 92 : 68,
      'Regulatory/Compliance': answers.q5 === 'B' ? 86 : 50
    };

    updateStudentProfile(currentUser.id, { assessmentScores: newScores });
    setActiveStep('results');
  };

  // Convert assessment scores to Recharts data
  const chartData = currentUser?.assessmentScores 
    ? Object.keys(currentUser.assessmentScores).map(key => ({
        subject: key,
        value: currentUser.assessmentScores[key],
        baseline: 75 // Mock industry baseline
      }))
    : [];

  // Skill Gap mapping data
  // We check which required skills are missing
  const targetRoleRequiredSkills = [
    'Herbal Formulation',
    'Ayurvedic Pharmacology',
    'Clinical Documentation',
    'Regulatory Compliance',
    'Scientific Writing & Communication'
  ];

  const skillGaps = targetRoleRequiredSkills.map(skill => {
    const isMatched = currentUser?.skills?.includes(skill);
    return {
      skill,
      isMatched,
      status: isMatched ? 'Matched' : 'Missing',
      recommendation: isMatched 
        ? 'Expertise verified in profile.' 
        : 'Action Required: Complete relevant course or register for the Patanjali Quality Systems Program.'
    };
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Skill Mapping & Assessment</h2>
        <p className="text-sm text-slate-500">Measure your technical and domain skill profiles against industry standard benchmarks.</p>
      </div>

      {activeStep === 'quiz' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white p-6 flex items-center space-x-3">
            <div className="bg-amber-500 p-2 rounded text-slate-950">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Competency Mapping Assessment</h3>
              <p className="text-[10px] text-slate-400">Answer these CDSCO and Ayush informatics concepts to calibrate your profile</p>
            </div>
          </div>

          <form onSubmit={handleQuizSubmit} className="p-6 sm:p-8 space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="space-y-3 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div className="flex items-start space-x-2">
                  <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-2 py-0.5 rounded-md mt-0.5">
                    Q{idx + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{q.competency}</span>
                    <h4 className="font-semibold text-sm text-slate-800 leading-snug">{q.text}</h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-8">
                  {q.options.map(opt => (
                    <label
                      key={opt.value}
                      className={`border-2 rounded-xl p-3 text-xs font-medium cursor-pointer transition-all flex items-center space-x-3 ${
                        answers[q.id] === opt.value
                          ? 'border-indigo-600 bg-indigo-50/40 text-indigo-900'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.value}
                        checked={answers[q.id] === opt.value}
                        onChange={() => handleOptionChange(q.id, opt.value)}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                      />
                      <span>{opt.text}</span>
                    </label>
                  ))}
                </div>
                {errors[q.id] && (
                  <p className="text-xs text-rose-600 pl-8 flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{errors[q.id]}</span>
                  </p>
                )}
              </div>
            ))}

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors text-xs flex items-center space-x-1"
              >
                <span>Submit Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Skill Profile Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Visual Radar Proficiency (Col span 2) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Skill Competency Profile</h3>
                  <p className="text-[10px] text-slate-400">Comparing your proficiency vs industry baselines (75%)</p>
                </div>
                <button
                  onClick={() => setActiveStep('quiz')}
                  className="inline-flex items-center space-x-1 text-[10px] font-bold text-slate-500 border border-slate-200 bg-white px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <RefreshCcw className="w-3 h-3" />
                  <span>Retake Assessment</span>
                </button>
              </div>

              {/* Radar Chart Wrapper */}
              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                    <Radar name="My Score" dataKey="value" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.25} />
                    <Radar name="Industry Baseline" dataKey="baseline" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.0} strokeDasharray="4 4" />
                    <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Proficiency Breakdown (Col span 1) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-800">Score Breakdown</h3>
              <div className="space-y-4">
                {chartData.map((data) => (
                  <div key={data.subject} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                      <span>{data.subject}</span>
                      <span className={data.value >= data.baseline ? 'text-emerald-600' : 'text-amber-600'}>
                        {data.value} / 100
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${data.value >= data.baseline ? 'bg-indigo-600' : 'bg-amber-500'}`}
                        style={{ width: `${data.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Skill Gap Analysis Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="font-bold text-sm text-slate-800">Skill Gap Analysis: {currentUser.targetRole}</h3>
              <p className="text-[10px] text-slate-400">Comparing your mapped skill tags against skills required by target companies</p>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/20">
              {skillGaps.map((gap, index) => (
                <div key={index} className="p-4 sm:flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-xs text-slate-800">{gap.skill}</h4>
                      <span className={`inline-flex items-center space-x-0.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        gap.isMatched ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {gap.isMatched ? <CheckCircle className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
                        <span>{gap.status}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{gap.recommendation}</p>
                  </div>

                  {!gap.isMatched && (
                    <button
                      onClick={() => updateStudentProfile(currentUser.id, { skills: [...currentUser.skills, gap.skill] })}
                      className="mt-2 sm:mt-0 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs flex-shrink-0"
                    >
                      Acquire Skill
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default StudentAssessment;
