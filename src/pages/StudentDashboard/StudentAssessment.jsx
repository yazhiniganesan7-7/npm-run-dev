import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import {
  Award,
  CheckCircle,
  AlertTriangle,
  RefreshCcw,
  ArrowRight,
  Calendar,
  CheckSquare,
  Sparkles,
  BookOpen,
  Layers,
  Code,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Flame
} from 'lucide-react';

const StudentAssessment = () => {
  const { currentUser, updateStudentProfile, showToast } = useApp();
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(currentUser?.assessmentScores ? 'results' : 'quiz');
  
  // Quiz states
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '' });
  const [errors, setErrors] = useState({});

  // 30-Day Plan tracking state
  const [selectedPlanSkill, setSelectedPlanSkill] = useState('All');
  const [activeWeek, setActiveWeek] = useState(1);
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const stored = localStorage.getItem(`plan_completed_${currentUser?.id}`);
      return stored ? JSON.parse(stored) : [1, 2, 3];
    } catch {
      return [1, 2, 3];
    }
  });

  useEffect(() => {
    if (currentUser?.id) {
      localStorage.setItem(`plan_completed_${currentUser.id}`, JSON.stringify(completedDays));
    }
  }, [completedDays, currentUser?.id]);

  useEffect(() => {
    if (searchParams.get('tab') === 'plan') {
      setActiveStep('results');
      setTimeout(() => {
        const planEl = document.getElementById('plan-section');
        if (planEl) planEl.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [searchParams]);

  const toggleDayCompletion = (dayNum) => {
    setCompletedDays(prev => {
      const updated = prev.includes(dayNum) ? prev.filter(d => d !== dayNum) : [...prev, dayNum];
      if (!prev.includes(dayNum) && updated.length % 5 === 0) {
        showToast(`🎉 Milestone reached: Day ${dayNum} completed! Keep going!`, 'success');
      }
      return updated;
    });
  };

  // Engineering Competency Questions
  const questions = [
    {
      id: 'q1',
      competency: 'Domain Knowledge (DSA)',
      text: 'What is the worst-case time complexity of searching an element in a Balanced Binary Search Tree (e.g. Red-Black or AVL Tree)?',
      options: [
        { value: 'A', text: 'O(n) linear scan' },
        { value: 'B', text: 'O(log n) logarithmic time' },
        { value: 'C', text: 'O(1) constant time' },
        { value: 'D', text: 'O(n log n) quasilinear' }
      ],
      correct: 'B'
    },
    {
      id: 'q2',
      competency: 'System Architecture',
      text: 'According to the CAP theorem in distributed systems, when a network partition (P) occurs, what must a distributed store choose between?',
      options: [
        { value: 'A', text: 'Latency and Throughput' },
        { value: 'B', text: 'Consistency (C) and Availability (A)' },
        { value: 'C', text: 'Compression and Encryption' },
        { value: 'D', text: 'Horizontal Scalability and Microservices' }
      ],
      correct: 'B'
    },
    {
      id: 'q3',
      competency: 'Technical & Data Skills',
      text: 'Which database indexing structure is most optimal for range queries (e.g. searching records WHERE timestamp BETWEEN dates)?',
      options: [
        { value: 'A', text: 'Hash Index' },
        { value: 'B', text: 'B+ Tree Index' },
        { value: 'C', text: 'Bitmap Vector Index' },
        { value: 'D', text: 'Inverted Index' }
      ],
      correct: 'B'
    },
    {
      id: 'q4',
      competency: 'Code Quality & Testing',
      text: 'In modern CI/CD software pipelines, what is the primary benefit of automated unit test regression suites?',
      options: [
        { value: 'A', text: 'Eliminating the need for code review entirely' },
        { value: 'B', text: 'Catching regressions early and ensuring code behavior contracts hold before merging' },
        { value: 'C', text: 'Minifying JavaScript bundles for production' },
        { value: 'D', text: 'Generating documentation automatically' }
      ],
      correct: 'B'
    },
    {
      id: 'q5',
      competency: 'Problem Solving & Resilience',
      text: 'Which algorithm is best suited for API rate limiting to smoothly handle traffic bursts while maintaining strict average requests/second caps?',
      options: [
        { value: 'A', text: 'Fixed Window Counter' },
        { value: 'B', text: 'Token Bucket / Leaky Bucket Algorithm' },
        { value: 'C', text: 'Round Robin Load Balancing' },
        { value: 'D', text: 'Consistent Hashing' }
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

    const newScores = {
      'Domain Knowledge': answers.q1 === 'B' ? 94 : 65,
      'System Architecture': answers.q2 === 'B' ? 90 : 58,
      'Technical/Data Skills': answers.q3 === 'B' ? 92 : 60,
      'Code Quality & Testing': answers.q4 === 'B' ? 88 : 55,
      'Problem Solving': answers.q5 === 'B' ? 95 : 62
    };

    updateStudentProfile(currentUser.id, { assessmentScores: newScores });
    setActiveStep('results');
  };

  // Convert assessment scores to Recharts data
  const chartData = currentUser?.assessmentScores 
    ? Object.keys(currentUser.assessmentScores).map(key => ({
        subject: key,
        value: currentUser.assessmentScores[key],
        baseline: 75 // Top tech company baseline
      }))
    : [];

  // Skill Gap mapping data
  const targetRoleRequiredSkills = [
    'Data Structures & Algorithms',
    'System Design & Distributed Systems',
    'Cloud Computing (AWS/GCP)',
    'API Development & Microservices',
    'DevOps & CI/CD Pipelines'
  ];

  const skillGaps = targetRoleRequiredSkills.map(skill => {
    const isMatched = currentUser?.skills?.includes(skill);
    return {
      skill,
      isMatched,
      status: isMatched ? 'Matched' : 'Missing',
      recommendation: isMatched 
        ? 'Verified competency in profile.' 
        : 'Action Required: Follow the 30-Day Plan below to build capstone mastery and close this gap.'
    };
  });

  const missingSkills = skillGaps.filter(g => !g.isMatched).map(g => g.skill);

  // 30-Day Curriculum Plan for Missing Skills
  const thirtyDayPlan = [
    {
      week: 1,
      title: 'Week 1: Conceptual Foundations & Core Architecture (Days 1–7)',
      theme: 'Theoretical Mastery & Design Patterns',
      color: 'border-blue-500 bg-blue-50/20',
      days: [
        { day: 1, topic: 'Architectural Paradigms & Core Theory', task: 'Study foundational RFCs, microservice decomposition principles, and CAP theorem trade-offs.', deliverable: 'Create conceptual architecture diagram.' },
        { day: 2, topic: 'Protocol Standards & Inter-Service Comms', task: 'Deep-dive into HTTP/2, gRPC Protobuf serialization vs. REST JSON, and latency profiles.', deliverable: 'Write gRPC service schema definition.' },
        { day: 3, topic: 'Stateless Services & Distributed State', task: 'Analyze state externalization, session stores, and sticky sessions vs. shared token verification.', deliverable: 'Design JWT authentication middleware flow.' },
        { day: 4, topic: 'Consistency & Distributed Transactions', task: 'Study 2-Phase Commit (2PC), Saga orchestration pattern, and eventual consistency guarantees.', deliverable: 'Map out Saga compensating transactions.' },
        { day: 5, topic: 'Database Normalization & Sharding Schemes', task: 'Review horizontal vs. vertical partitioning, range sharding, and consistent hashing algorithms.', deliverable: 'Implement a consistent hash ring in Python.' },
        { day: 6, topic: 'Asynchronous Event-Driven Architectures', task: 'Understand message brokers (Apache Kafka vs. RabbitMQ), consumer groups, and idempotent delivery.', deliverable: 'Document event schema and DLQ strategy.' },
        { day: 7, topic: 'Week 1 Milestone & Self-Assessment', task: 'Complete Week 1 knowledge assessment; organize GitHub learning repository with technical notes.', deliverable: 'Push structured study notes to GitHub.' }
      ]
    },
    {
      week: 2,
      title: 'Week 2: Hands-On Implementation & Guided Labs (Days 8–14)',
      theme: 'Lab Exercises & Core Module Engineering',
      color: 'border-indigo-500 bg-indigo-50/20',
      days: [
        { day: 8, topic: 'Containerized Sandbox & Local Cluster', task: 'Setup multi-container local development environment with Docker Compose and healthchecks.', deliverable: 'Write reproducible docker-compose.yml.' },
        { day: 9, topic: 'High-Throughput API Gateway Layer', task: 'Implement rate limiting (Token Bucket) and reverse proxy routing with custom middleware.', deliverable: 'Unit-tested rate limiter module.' },
        { day: 10, topic: 'Optimized Data Access & Connection Pools', task: 'Configure connection pooling, prepared statements, and B+ tree index tuning on PostgreSQL.', deliverable: 'Run EXPLAIN ANALYZE benchmark queries.' },
        { day: 11, topic: 'Distributed In-Memory Caching', task: 'Implement Cache-Aside pattern with Redis, setting TTLs, cache stampede mitigation, and eviction.', deliverable: 'Redis cache wrapper with fallback.' },
        { day: 12, topic: 'Background Asynchronous Workers', task: 'Build background task processor handling retries, exponential backoff, and dead-letter queues.', deliverable: 'Reliable task processing worker pipeline.' },
        { day: 13, topic: 'Resilience Patterns & Circuit Breakers', task: 'Implement circuit breaker pattern to prevent cascade failure under downstream service latency.', deliverable: 'Fault injection test with simulated latency.' },
        { day: 14, topic: 'Week 2 Milestone: End-to-End Integration', task: 'Wire API gateway, background worker, cache, and database; verify integration test suite passes.', deliverable: 'Automated integration test report (100% pass).' }
      ]
    },
    {
      week: 3,
      title: 'Week 3: Production-Grade Capstone Development (Days 15–21)',
      theme: 'Real-World Scalable System Architecture',
      color: 'border-emerald-500 bg-emerald-50/20',
      days: [
        { day: 15, topic: 'Capstone Design & Architecture RFC', task: 'Draft RFC for a distributed e-commerce / streaming service with high concurrency requirements.', deliverable: 'Complete RFC document with C4 diagrams.' },
        { day: 16, topic: 'Secure Service-to-Service Communication', task: 'Implement mTLS authentication, secret rotation, and environment variable configuration.', deliverable: 'Hardened cryptographic credential manager.' },
        { day: 17, topic: 'Full Observability: OpenTelemetry & Metrics', task: 'Instrument service with OpenTelemetry traces, Prometheus metrics, and structured JSON logs.', deliverable: 'Dashboard visualization of p95/p99 latencies.' },
        { day: 18, topic: 'Load Testing & Performance Profiling', task: 'Execute stress tests using k6 / Locust simulating 10,000 concurrent users; identify bottlenecks.', deliverable: 'k6 load test report showing < 50ms p95.' },
        { day: 19, topic: 'Security Audit & Vulnerability Remediation', task: 'Run static analysis (SAST), audit OWASP Top 10 vulnerabilities, sanitization, and CORS headers.', deliverable: 'Zero critical/high vulnerabilities report.' },
        { day: 20, topic: 'Cloud Sandbox Deployment (AWS/GCP)', task: 'Deploy containerized services to managed Kubernetes (EKS/GKE) or serverless container runtimes.', deliverable: 'Live public endpoint running on cloud.' },
        { day: 21, topic: 'Week 3 Milestone: Live Capstone Demo', task: 'Conduct end-to-end testing on live cloud deployment; verify auto-scaling triggers under load.', deliverable: 'Verified cloud architecture deployment.' }
      ]
    },
    {
      week: 4,
      title: 'Week 4: CI/CD, Certification & Portfolio Integration (Days 22–30)',
      theme: 'Production Hardening & Recruiter Readiness',
      color: 'border-amber-500 bg-amber-50/20',
      days: [
        { day: 22, topic: 'Automated GitHub Actions CI/CD Pipeline', task: 'Create multi-stage pipeline: linting, unit tests, integration tests, Docker build, and cloud deploy.', deliverable: 'Green CI/CD workflow badge on repo.' },
        { day: 23, topic: 'Infrastructure as Code (Terraform / Manifests)', task: 'Codify all cloud infrastructure and ingress rules into reusable, version-controlled manifests.', deliverable: 'Complete Terraform configuration files.' },
        { day: 24, topic: 'Comprehensive Technical Documentation', task: 'Write publication-grade README with architectural blueprints, API documentation (Swagger/OpenAPI).', deliverable: 'Interactive Swagger UI endpoint.' },
        { day: 25, topic: 'System Design Interview Simulation 1', task: 'Practice designing a distributed URL shortener / distributed cache under senior engineering rubric.', deliverable: 'Whiteboard design walkthrough notes.' },
        { day: 26, topic: 'System Design Interview Simulation 2', task: 'Practice designing a real-time messaging pipeline / metric aggregation service under load.', deliverable: 'Back-of-the-envelope capacity estimations.' },
        { day: 27, topic: 'Interactive Video Walkthrough Demo', task: 'Record a concise 3-minute video explaining architectural trade-offs, code structure, and live tests.', deliverable: 'Publish demo link to project repository.' },
        { day: 28, topic: 'Peer Code Review & Technical Defense', task: 'Submit repository for peer/mentor review; address feedback and optimize code readability.', deliverable: 'All review comments resolved.' },
        { day: 29, topic: 'Digital Portfolio & Resume Bullet Sync', task: 'Quantify metrics (e.g. "Scaled microservice to 10k RPS with p99 < 40ms") on portfolio card.', deliverable: 'Updated verified digital portfolio.' },
        { day: 30, topic: 'Graduation Day: Skill Verification & Lock-In', task: 'Officially mark skill gap as acquired! Update skill profile to unlock high-priority recruiter matching.', deliverable: 'Verified skill credential badge awarded.' }
      ]
    }
  ];

  const totalDays = 30;
  const progressPercent = Math.round((completedDays.length / totalDays) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Skill Mapping & Assessment</h2>
        <p className="text-sm text-slate-500">Measure your technical and algorithmic competency profiles against top engineering benchmarks.</p>
      </div>

      {activeStep === 'quiz' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white p-6 flex items-center space-x-3">
            <div className="bg-indigo-500 p-2 rounded text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Engineering Competency Calibration</h3>
              <p className="text-[10px] text-slate-400">Answer core computer science, distributed architecture, and data engineering concepts</p>
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
                  <h3 className="font-bold text-sm text-slate-800">Engineering Competency Profile</h3>
                  <p className="text-[10px] text-slate-400">Comparing your proficiency vs tier-1 tech company baselines (75%)</p>
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
                    <Radar name="Tech Baseline" dataKey="baseline" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.0} strokeDasharray="4 4" />
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-bold text-sm text-slate-800">Skill Gap Analysis: {currentUser.targetRole}</h3>
                <p className="text-[10px] text-slate-400">Comparing your mapped engineering skills against requirements for top recruiters</p>
              </div>
              <span className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 w-fit">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>{missingSkills.length} Skills to Acquire</span>
              </span>
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

                  {!gap.isMatched ? (
                    <button
                      onClick={() => {
                        updateStudentProfile(currentUser.id, { skills: [...currentUser.skills, gap.skill] });
                        showToast(`Acquired skill: ${gap.skill}! Profile updated.`);
                      }}
                      className="mt-2 sm:mt-0 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs flex-shrink-0"
                    >
                      Acquire Skill
                    </button>
                  ) : (
                    <span className="text-[10px] font-semibold text-emerald-700 flex items-center space-x-1 mt-2 sm:mt-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 30-DAY SPRINT PLAN FOR LACK OF SKILLS */}
          <div id="plan-section" className="bg-gradient-to-b from-white to-slate-50 rounded-2xl border-2 border-indigo-500/20 shadow-lg p-6 sm:p-8 space-y-6">
            
            {/* Plan Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>30-Day Skill Gap Recovery Roadmap</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Accelerated 30-Day Engineering Sprint
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  A structured day-by-day and week-by-week curriculum tailored for your target role as a <span className="font-bold text-indigo-700">{currentUser.targetRole}</span>. 
                  Complete the daily milestone tasks below to eliminate your skill deficiencies and earn priority recruiter interview recommendations.
                </p>
              </div>

              {/* Progress Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs min-w-[220px] space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Sprint Progress</span>
                  <span className="text-indigo-600">{completedDays.length} / {totalDays} Days ({progressPercent}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 italic">
                  {completedDays.length >= 30 ? '🎉 Sprint completed! Ready for tier-1 interviews.' : `${30 - completedDays.length} days remaining in roadmap`}
                </p>
              </div>
            </div>

            {/* Skill Focus Filter */}
            {missingSkills.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2 pb-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Plan Focus:</span>
                <button
                  onClick={() => setSelectedPlanSkill('All')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    selectedPlanSkill === 'All'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  All Missing Skills ({missingSkills.length})
                </button>
                {missingSkills.map(sk => (
                  <button
                    key={sk}
                    onClick={() => setSelectedPlanSkill(sk)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      selectedPlanSkill === sk
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {sk}
                  </button>
                ))}
              </div>
            )}

            {/* Week Selection Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {thirtyDayPlan.map(w => (
                <button
                  key={w.week}
                  onClick={() => setActiveWeek(w.week)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
                    activeWeek === w.week
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>Week {w.week}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    activeWeek === w.week ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {w.days.filter(d => completedDays.includes(d.day)).length} / 7
                  </span>
                </button>
              ))}
            </div>

            {/* Active Week Display */}
            {thirtyDayPlan.filter(w => w.week === activeWeek).map(w => (
              <div key={w.week} className="space-y-4">
                
                {/* Week Banner */}
                <div className={`p-4 rounded-xl border-l-4 ${w.color} bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2`}>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{w.title}</h4>
                    <p className="text-xs text-slate-500">{w.theme}</p>
                  </div>
                  <div className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg w-fit">
                    Sprint Goal: High-scale mastery
                  </div>
                </div>

                {/* Days Grid */}
                <div className="space-y-3">
                  {w.days.map(d => {
                    const isDone = completedDays.includes(d.day);
                    return (
                      <div
                        key={d.day}
                        onClick={() => toggleDayCompletion(d.day)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          isDone
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-start space-x-3 flex-1">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => {}} // handled by div click
                            className="w-4 h-4 text-emerald-600 rounded mt-0.5 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                Day {d.day}
                              </span>
                              <h5 className={`text-xs font-bold ${isDone ? 'text-emerald-950 line-through' : 'text-slate-800'}`}>
                                {d.topic}
                              </h5>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">{d.task}</p>
                          </div>
                        </div>

                        <div className="sm:text-right pl-7 sm:pl-0 flex-shrink-0">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Deliverable</span>
                          <span className={`text-xs font-semibold ${isDone ? 'text-emerald-700' : 'text-indigo-700'}`}>
                            {d.deliverable}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}

            {/* Quick Actions Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Tip: Click any day row to toggle completion status. Progress automatically saves.</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const allDays = Array.from({ length: 30 }, (_, i) => i + 1);
                    setCompletedDays(allDays);
                    showToast('🎉 All 30 days marked as completed!');
                  }}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-2 rounded-xl text-xs transition-colors"
                >
                  Mark All 30 Days Complete
                </button>
                <button
                  onClick={() => {
                    setCompletedDays([]);
                    showToast('Plan progress reset to Day 0.', 'info');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-3 py-2 rounded-xl text-xs transition-colors"
                >
                  Reset Progress
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default StudentAssessment;
