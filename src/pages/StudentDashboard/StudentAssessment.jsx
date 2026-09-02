import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getQuestionsForSkill } from '../../data/skillTests';
import {
  Award,
  CheckCircle,
  AlertTriangle,
  RefreshCcw,
  ArrowRight,
  Calendar,
  CheckSquare,
  CheckCircle2,
  Flame,
  ShieldCheck,
  HelpCircle,
  Play,
  Briefcase,
  X,
  Plus
} from 'lucide-react';

const StudentAssessment = () => {
  const {
    currentUser,
    opportunities,
    skillsTaxonomy,
    verifySkillWithTest,
    claimSkill,
    applyForOpportunity,
    applications,
    showToast
  } = useApp();

  const [searchParams] = useSearchParams();

  // Test session state
  const [testingSkill, setTestingSkill] = useState(null);
  const [testQuestions, setTestQuestions] = useState([]);
  const [testAnswers, setTestAnswers] = useState({});
  const [testErrors, setTestErrors] = useState({});
  const [testResult, setTestResult] = useState(null); // { score, level, correctCount, explanations }

  // Job Matching state
  const [selectedJobId, setSelectedJobId] = useState(() => opportunities[0]?.id || '');

  // Add custom claimed skill state
  const [newClaimSkillName, setNewClaimSkillName] = useState('');

  // 30-Day Plan tracking state
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
      setTimeout(() => {
        const planEl = document.getElementById('plan-section');
        if (planEl) planEl.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [searchParams]);

  // Derived Skill lists
  const verifiedSkills = currentUser?.verifiedSkills || [];
  const claimedSkills = (currentUser?.claimedSkills || []).filter(
    s => !verifiedSkills.some(v => v.name === s)
  );

  // Start 5-Question Scenario-Based Test for a specific skill
  const handleStartTest = (skillName) => {
    const questions = getQuestionsForSkill(skillName);
    setTestingSkill(skillName);
    setTestQuestions(questions);
    setTestAnswers({});
    setTestErrors({});
    setTestResult(null);

    setTimeout(() => {
      const testEl = document.getElementById('test-arena');
      if (testEl) testEl.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTestAnswerChange = (qId, value) => {
    setTestAnswers(prev => ({ ...prev, [qId]: value }));
    if (testErrors[qId]) {
      setTestErrors(prev => ({ ...prev, [qId]: null }));
    }
  };

  const handleTestSubmit = (e) => {
    e.preventDefault();

    // Validate that all 5 questions are answered
    const errors = {};
    testQuestions.forEach(q => {
      if (!testAnswers[q.id]) {
        errors[q.id] = 'Please select a solution option';
      }
    });

    if (Object.keys(errors).length > 0) {
      setTestErrors(errors);
      showToast('Please answer all 5 scenario questions before submitting', 'warning');
      return;
    }

    // Evaluate answers
    let correctCount = 0;
    testQuestions.forEach(q => {
      if (testAnswers[q.id] === q.correct) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / testQuestions.length) * 100);
    let level = 'Beginner';
    if (score >= 80) {
      level = 'Advanced';
    } else if (score >= 60) {
      level = 'Intermediate';
    } else {
      level = 'Beginner';
    }

    setTestResult({
      score,
      level,
      correctCount,
      total: testQuestions.length
    });

    // Award verification in context
    verifySkillWithTest(currentUser.id, testingSkill, score, level);
  };

  const handleClaimNewSkill = (e) => {
    e.preventDefault();
    if (!newClaimSkillName.trim()) return;

    if (
      claimedSkills.includes(newClaimSkillName) ||
      verifiedSkills.some(v => v.name === newClaimSkillName)
    ) {
      showToast(`"${newClaimSkillName}" is already in your skills profile`, 'info');
      return;
    }

    claimSkill(currentUser.id, newClaimSkillName);
    setNewClaimSkillName('');
  };

  // Job Matching Calculations
  const selectedJob = opportunities.find(o => o.id === selectedJobId) || opportunities[0];
  const requiredSkills = selectedJob?.requiredSkills || [];

  const verifiedMatches = requiredSkills.filter(req =>
    verifiedSkills.some(v => v.name.toLowerCase() === req.toLowerCase())
  );

  const claimedMatches = requiredSkills.filter(req =>
    !verifiedMatches.includes(req) &&
    (claimedSkills.some(c => c.toLowerCase() === req.toLowerCase()) ||
     currentUser?.skills?.some(s => s.toLowerCase() === req.toLowerCase()))
  );

  const missingSkills = requiredSkills.filter(req =>
    !verifiedMatches.includes(req) && !claimedMatches.includes(req)
  );

  // Calculate weighted job match score: Verified = 100%, Claimed = 50%
  const matchScore = requiredSkills.length > 0
    ? Math.round(((verifiedMatches.length * 1.0 + claimedMatches.length * 0.5) / requiredSkills.length) * 100)
    : 0;

  // Has applied for selected job
  const hasAppliedForSelectedJob = applications.some(
    a => a.studentId === currentUser?.id && a.opportunityId === selectedJob?.id
  );

  // 30-Day Plan toggle
  const toggleDayCompletion = (dayNum) => {
    setCompletedDays(prev => {
      const updated = prev.includes(dayNum) ? prev.filter(d => d !== dayNum) : [...prev, dayNum];
      if (!prev.includes(dayNum) && updated.length % 5 === 0) {
        showToast(`🎉 Milestone reached: Day ${dayNum} completed!`, 'success');
      }
      return updated;
    });
  };

  // 30-Day Plan Definition
  const thirtyDayPlan = [
    {
      week: 1,
      title: 'Week 1: Conceptual Foundations & System Models (Days 1–7)',
      theme: 'Theoretical Mastery & Core RFCs',
      color: 'border-blue-500 bg-blue-50/20',
      days: [
        { day: 1, topic: 'Architectural Paradigms & Core Theory', task: 'Study foundational RFCs, microservice decomposition principles, and CAP theorem trade-offs.', deliverable: 'Conceptual architecture diagram.' },
        { day: 2, topic: 'Protocol Standards & Inter-Service Comms', task: 'Deep-dive into HTTP/2, gRPC Protobuf serialization vs REST JSON, and latency profiles.', deliverable: 'gRPC service schema definition.' },
        { day: 3, topic: 'Stateless Services & Distributed State', task: 'Analyze state externalization, session stores, and sticky sessions vs token verification.', deliverable: 'JWT authentication middleware flow.' },
        { day: 4, topic: 'Consistency & Distributed Transactions', task: 'Study 2-Phase Commit (2PC), Saga orchestration pattern, and eventual consistency.', deliverable: 'Saga compensating transactions map.' },
        { day: 5, topic: 'Database Normalization & Sharding Schemes', task: 'Review horizontal vs vertical partitioning, range sharding, and consistent hashing.', deliverable: 'Consistent hash ring implementation.' },
        { day: 6, topic: 'Asynchronous Event-Driven Architectures', task: 'Understand message brokers (Apache Kafka vs RabbitMQ), consumer groups, and DLQ.', deliverable: 'Event schema and DLQ specification.' },
        { day: 7, topic: 'Week 1 Milestone & Self-Assessment', task: 'Complete Week 1 knowledge assessment; organize GitHub learning repository with technical notes.', deliverable: 'Structured study notes committed to GitHub.' }
      ]
    },
    {
      week: 2,
      title: 'Week 2: Hands-On Implementation & Guided Labs (Days 8–14)',
      theme: 'Lab Exercises & Core Module Engineering',
      color: 'border-indigo-500 bg-indigo-50/20',
      days: [
        { day: 8, topic: 'Containerized Sandbox & Local Cluster', task: 'Setup multi-container local development environment with Docker Compose and healthchecks.', deliverable: 'Reproducible docker-compose.yml.' },
        { day: 9, topic: 'High-Throughput API Gateway Layer', task: 'Implement rate limiting (Token Bucket) and reverse proxy routing with custom middleware.', deliverable: 'Unit-tested rate limiter module.' },
        { day: 10, topic: 'Optimized Data Access & Connection Pools', task: 'Configure connection pooling, prepared statements, and B+ tree index tuning on PostgreSQL.', deliverable: 'EXPLAIN ANALYZE benchmark queries.' },
        { day: 11, topic: 'Distributed In-Memory Caching', task: 'Implement Cache-Aside pattern with Redis, setting TTLs and cache stampede mitigation.', deliverable: 'Redis cache wrapper with fallback.' },
        { day: 12, topic: 'Background Asynchronous Workers', task: 'Build background task processor handling retries, exponential backoff, and dead-letter queues.', deliverable: 'Reliable task processing pipeline.' },
        { day: 13, topic: 'Resilience Patterns & Circuit Breakers', task: 'Implement circuit breaker pattern to prevent cascade failure under downstream latency.', deliverable: 'Fault injection test with simulated latency.' },
        { day: 14, topic: 'Week 2 Milestone: End-to-End Integration', task: 'Wire API gateway, background worker, cache, and database; verify integration tests pass.', deliverable: 'Automated integration test report (100% pass).' }
      ]
    },
    {
      week: 3,
      title: 'Week 3: Production-Grade Capstone Development (Days 15–21)',
      theme: 'Real-World Scalable System Architecture',
      color: 'border-emerald-500 bg-emerald-50/20',
      days: [
        { day: 15, topic: 'Capstone Design & Architecture RFC', task: 'Draft RFC for a distributed service with high concurrency requirements.', deliverable: 'RFC document with C4 diagrams.' },
        { day: 16, topic: 'Secure Service-to-Service Communication', task: 'Implement mTLS authentication, secret rotation, and environment variable configuration.', deliverable: 'Hardened credential manager.' },
        { day: 17, topic: 'Full Observability: OpenTelemetry & Metrics', task: 'Instrument service with OpenTelemetry traces, Prometheus metrics, and structured logs.', deliverable: 'Dashboard visualization of p95/p99 latencies.' },
        { day: 18, topic: 'Load Testing & Performance Profiling', task: 'Execute stress tests using k6 / Locust simulating 10,000 concurrent users; find bottlenecks.', deliverable: 'k6 load test report (< 50ms p95).' },
        { day: 19, topic: 'Security Audit & Vulnerability Remediation', task: 'Run static analysis (SAST), audit OWASP Top 10 vulnerabilities, and sanitize headers.', deliverable: 'Zero critical/high vulnerabilities report.' },
        { day: 20, topic: 'Cloud Sandbox Deployment (AWS/GCP)', task: 'Deploy containerized services to managed Kubernetes (EKS/GKE) or serverless runtime.', deliverable: 'Live public endpoint running on cloud.' },
        { day: 21, topic: 'Week 3 Milestone: Live Capstone Demo', task: 'Conduct end-to-end testing on live cloud deployment; verify auto-scaling triggers under load.', deliverable: 'Verified cloud architecture deployment.' }
      ]
    },
    {
      week: 4,
      title: 'Week 4: CI/CD, Certification & Portfolio Integration (Days 22–30)',
      theme: 'Production Hardening & Recruiter Readiness',
      color: 'border-amber-500 bg-amber-50/20',
      days: [
        { day: 22, topic: 'Automated GitHub Actions CI/CD Pipeline', task: 'Create multi-stage pipeline: linting, unit tests, integration tests, Docker build, and cloud deploy.', deliverable: 'Green CI/CD workflow badge.' },
        { day: 23, topic: 'Infrastructure as Code (Terraform / Manifests)', task: 'Codify all cloud infrastructure and ingress rules into reusable manifests.', deliverable: 'Complete Terraform configuration files.' },
        { day: 24, topic: 'Comprehensive Technical Documentation', task: 'Write publication-grade README with architectural blueprints and Swagger/OpenAPI docs.', deliverable: 'Interactive Swagger UI endpoint.' },
        { day: 25, topic: 'System Design Interview Simulation 1', task: 'Practice designing a distributed URL shortener / distributed cache under senior rubric.', deliverable: 'Whiteboard design walkthrough notes.' },
        { day: 26, topic: 'System Design Interview Simulation 2', task: 'Practice designing a real-time messaging pipeline / metric aggregation service.', deliverable: 'Back-of-the-envelope estimations.' },
        { day: 27, topic: 'Interactive Video Walkthrough Demo', task: 'Record a concise 3-minute video explaining architectural trade-offs and code structure.', deliverable: 'Publish demo link to project repo.' },
        { day: 28, topic: 'Peer Code Review & Technical Defense', task: 'Submit repository for peer/mentor review; address feedback and optimize code readability.', deliverable: 'All review comments resolved.' },
        { day: 29, topic: 'Digital Portfolio & Resume Bullet Sync', task: 'Quantify metrics (e.g. "Scaled microservice to 10k RPS with p99 < 40ms") on portfolio.', deliverable: 'Updated verified digital portfolio.' },
        { day: 30, topic: 'Graduation Day: Skill Verification & Lock-In', task: 'Officially verify skill gap via practical test! Unlock priority recruiter recommendations.', deliverable: 'Verified skill credential badge awarded.' }
      ]
    }
  ];

  const totalDays = 30;
  const progressPercent = Math.round((completedDays.length / totalDays) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Verification & Assessment System
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Skill Assessment & Job Matching
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Verify your claimed skills with 5-question scenario-based tests, assess job qualification gaps, and accelerate interview readiness.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              {currentUser?.education?.degree?.split(' in ')[1] || 'Computer Science'}
            </span>
          </div>
        </div>
      </div>

      {/* 1. SKILL ASSESSMENT: CLAIMED VS VERIFIED SKILLS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Skill Inventory: Verified vs Claimed</span>
            </h3>
            <p className="text-xs text-slate-500">
              Take a 5-question practical scenario test for each skill to earn Beginner, Intermediate, or Advanced certification.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 text-xs font-bold">
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              {verifiedSkills.length} Verified
            </span>
            <span className="text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              {claimedSkills.length} Claimed
            </span>
          </div>
        </div>

        {/* Two-Column Grid: Verified Skills vs Claimed Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* VERIFIED SKILLS PANEL */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Verified Practical Skills</h4>
                  <p className="text-[10px] text-slate-400">Validated via 5-question scenario assessments</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">{verifiedSkills.length} Verified</span>
            </div>

            {verifiedSkills.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-xl">
                No skills verified yet. Take a 5-question scenario test on your claimed skills below!
              </div>
            ) : (
              <div className="space-y-3">
                {verifiedSkills.map((sk) => {
                  const isAdvanced = sk.level === 'Advanced';
                  const isIntermediate = sk.level === 'Intermediate';
                  return (
                    <div
                      key={sk.name}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-bold text-xs text-slate-900">{sk.name}</h5>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide ${
                              isAdvanced
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : isIntermediate
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {sk.level}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Score: <strong className="text-slate-800">{sk.score}%</strong> • Verified on {sk.date || 'Recent'}
                        </p>
                      </div>

                      <button
                        onClick={() => handleStartTest(sk.name)}
                        className="text-[10px] font-bold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 hover:border-indigo-300 px-2.5 py-1.5 rounded-lg transition-colors flex items-center space-x-1 shadow-2xs flex-shrink-0"
                        title="Retake test to upgrade level"
                      >
                        <RefreshCcw className="w-3 h-3" />
                        <span>Retake</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* CLAIMED SKILLS PANEL (NEEDS ASSESSMENT) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Claimed Skills (Pending Practical Test)</h4>
                  <p className="text-[10px] text-slate-400">Take test to prove competency & obtain recruiter badge</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-600">{claimedSkills.length} Pending</span>
            </div>

            {claimedSkills.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-xl">
                All claimed skills have been tested and verified! Claim new skills below to test.
              </div>
            ) : (
              <div className="space-y-3">
                {claimedSkills.map((skillName) => (
                  <div
                    key={skillName}
                    className="p-3.5 rounded-xl border border-amber-200/60 bg-amber-50/30 hover:bg-amber-50/60 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <h5 className="font-bold text-xs text-slate-900">{skillName}</h5>
                      <span className="inline-block text-[10px] font-semibold text-amber-700">
                        Pending practical assessment
                      </span>
                    </div>

                    <button
                      onClick={() => handleStartTest(skillName)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 shadow-xs flex-shrink-0"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Take 5-Q Test</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Claim New Skill Input */}
            <form onSubmit={handleClaimNewSkill} className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <select
                value={newClaimSkillName}
                onChange={(e) => setNewClaimSkillName(e.target.value)}
                className="flex-1 text-xs border border-slate-300 rounded-xl p-2 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">-- Claim and test an additional engineering skill --</option>
                {skillsTaxonomy
                  ?.flatMap(cat => cat.skills)
                  .filter(sk => !claimedSkills.includes(sk) && !verifiedSkills.some(v => v.name === sk))
                  .map(sk => (
                    <option key={sk} value={sk}>{sk}</option>
                  ))
                }
              </select>
              <button
                type="submit"
                disabled={!newClaimSkillName}
                className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center space-x-1 flex-shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add & Test</span>
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 2. FIVE-QUESTION SCENARIO-BASED TEST ARENA (WHEN ACTIVE) */}
      {testingSkill && (
        <div id="test-arena" className="bg-white rounded-2xl border-2 border-indigo-600 shadow-xl overflow-hidden animate-fade-in">
          
          {/* Test Header */}
          <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                  5-Question Scenario Assessment
                </span>
                <span className="text-xs text-indigo-300 font-semibold">Practical Knowledge Evaluation</span>
              </div>
              <h3 className="text-xl font-black">{testingSkill}</h3>
              <p className="text-xs text-slate-300">
                Answer the 5 real-world engineering scenarios below. Score 80%+ for <span className="text-emerald-400 font-bold">Advanced</span>, 60–79% for <span className="text-indigo-300 font-bold">Intermediate</span>, or under 60% for <span className="text-amber-300 font-bold">Beginner</span>.
              </p>
            </div>

            <button
              onClick={() => {
                setTestingSkill(null);
                setTestResult(null);
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors self-start sm:self-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Test Form or Test Results */}
          {!testResult ? (
            <form onSubmit={handleTestSubmit} className="p-6 sm:p-8 space-y-6">
              {testQuestions.map((q, idx) => (
                <div key={q.id} className="space-y-3 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                  <div className="flex items-start space-x-3">
                    <span className="bg-indigo-50 text-indigo-700 font-extrabold text-xs px-2.5 py-1 rounded-lg mt-0.5">
                      Q{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                        Scenario: {q.scenario}
                      </span>
                      <h4 className="font-semibold text-sm text-slate-900 leading-relaxed">{q.question}</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-9">
                    {q.options.map(opt => (
                      <label
                        key={opt.value}
                        className={`border-2 rounded-xl p-3.5 text-xs font-medium cursor-pointer transition-all flex items-center space-x-3 ${
                          testAnswers[q.id] === opt.value
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.value}
                          checked={testAnswers[q.id] === opt.value}
                          onChange={() => handleTestAnswerChange(q.id, opt.value)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        />
                        <span>{opt.text}</span>
                      </label>
                    ))}
                  </div>

                  {testErrors[q.id] && (
                    <p className="text-xs text-rose-600 pl-9 flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{testErrors[q.id]}</span>
                    </p>
                  )}
                </div>
              ))}

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  {Object.keys(testAnswers).length} of 5 questions answered
                </span>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors text-xs flex items-center space-x-1.5"
                >
                  <span>Submit Practical Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Test Completed Results View */
            <div className="p-6 sm:p-8 space-y-6 animate-scale-up">
              <div className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 border border-indigo-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-indigo-600 text-white shadow-md">
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                    Assessment Evaluation Complete
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {testResult.score}% Practical Score
                  </h3>
                  <p className="text-xs text-slate-600">
                    You answered <strong>{testResult.correctCount}</strong> of <strong>{testResult.total}</strong> real-world engineering scenarios correctly.
                  </p>
                </div>

                {/* Level Award Badge */}
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-extrabold border shadow-xs">
                  <span className="text-slate-500">Awarded Proficiency Level:</span>
                  <span
                    className={`px-3 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider ${
                      testResult.level === 'Advanced'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : testResult.level === 'Intermediate'
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {testResult.level}
                  </span>
                </div>
              </div>

              {/* Explanations Accordion */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Scenario Analysis & Answers</h4>
                <div className="space-y-3 divide-y divide-slate-100">
                  {testQuestions.map((q, idx) => {
                    const isCorrect = testAnswers[q.id] === q.correct;
                    return (
                      <div key={q.id} className="pt-3 first:pt-0 space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          {isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          )}
                          <span className="font-bold text-slate-800">Q{idx + 1}: {q.scenario}</span>
                          <span className={isCorrect ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                            {isCorrect ? '(Correct)' : '(Needs Review)'}
                          </span>
                        </div>
                        <p className="text-slate-600 pl-6 leading-relaxed">{q.explanation}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => {
                    setTestingSkill(null);
                    setTestResult(null);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Done & Return to Skill Inventory
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 3. SKILL GAP & JOB MATCHING SECTION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Recruiter Job Match Calibration
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Skill Gap & Job Matching
            </h3>
            <p className="text-xs text-slate-500">
              Select an open job or internship to check how your verified skills match recruiter requirements and pinpoint skills to improve.
            </p>
          </div>

          {/* Job Selector Dropdown */}
          <div className="min-w-[280px]">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Select Target Job / Internship:
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full text-xs font-bold border border-slate-300 rounded-xl p-2.5 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-2xs"
            >
              {opportunities.map(opp => (
                <option key={opp.id} value={opp.id}>
                  {opp.companyName} — {opp.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Job Header & Match Card */}
        {selectedJob && (
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-amber-400">{selectedJob.companyName}</span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-300">{selectedJob.location}</span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-emerald-400 font-semibold">{selectedJob.stipend}</span>
              </div>
              <h4 className="text-xl font-black tracking-tight">{selectedJob.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {selectedJob.description}
              </p>
            </div>

            {/* Match Percentage Visual Dial */}
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-4 text-center min-w-[180px] space-y-1">
              <span className="text-[10px] uppercase font-extrabold text-slate-300 tracking-wider block">
                Job Match Score
              </span>
              <div className="text-3xl font-black text-amber-400">
                {matchScore}%
              </div>
              <p className="text-[10px] text-slate-300 font-medium">
                {verifiedMatches.length} of {requiredSkills.length} Verified
              </p>
            </div>
          </div>
        )}

        {/* Skill-Wise Breakdown for this Job */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Verified Required Skills */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Matches ({verifiedMatches.length})</span>
              </span>
            </div>
            {verifiedMatches.length === 0 ? (
              <p className="text-[11px] text-slate-500 italic">None verified yet.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {verifiedMatches.map(req => {
                  const vObj = verifiedSkills.find(v => v.name.toLowerCase() === req.toLowerCase());
                  return (
                    <span
                      key={req}
                      className="bg-white border border-emerald-300 text-emerald-900 px-2 py-1 rounded-md text-xs font-bold flex items-center space-x-1 shadow-2xs"
                    >
                      <span>{req}</span>
                      {vObj && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-extrabold">
                          {vObj.level}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Claimed (Needs Test) */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Claimed (Unverified) ({claimedMatches.length})</span>
              </span>
            </div>
            {claimedMatches.length === 0 ? (
              <p className="text-[11px] text-slate-500 italic">No pending claimed skills for this role.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {claimedMatches.map(req => (
                  <button
                    key={req}
                    onClick={() => handleStartTest(req)}
                    className="bg-white hover:bg-indigo-50 border border-indigo-300 text-indigo-900 px-2 py-1 rounded-md text-xs font-bold flex items-center space-x-1 transition-colors shadow-2xs group"
                    title="Click to take 5-question test now"
                  >
                    <span>{req}</span>
                    <Play className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600 group-hover:scale-110 transition-transform" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Missing Skills */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-900 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Missing Skills ({missingSkills.length})</span>
              </span>
            </div>
            {missingSkills.length === 0 ? (
              <p className="text-[11px] text-emerald-700 font-bold">🎉 No missing skills! You are fully qualified.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.map(req => (
                  <button
                    key={req}
                    onClick={() => handleStartTest(req)}
                    className="bg-white hover:bg-rose-50 border border-rose-300 text-rose-900 px-2 py-1 rounded-md text-xs font-bold flex items-center space-x-1 transition-colors shadow-2xs"
                    title="Click to test & acquire skill"
                  >
                    <span>{req}</span>
                    <span className="text-[9px] text-rose-600 font-extrabold">+ Test</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Skills You Need to Improve Callout */}
        {(claimedMatches.length > 0 || missingSkills.length > 0) && (
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-amber-600" />
              <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wider">
                Skills You Need to Improve for {selectedJob?.title}
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Top recruiters prioritize applicants with verified practical proficiency. To reach a <strong>90%+ match</strong> score, test your claimed competencies or complete our guided 30-day curriculum:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {[...claimedMatches, ...missingSkills].map(sk => (
                <button
                  key={sk}
                  onClick={() => handleStartTest(sk)}
                  className="bg-white hover:bg-amber-100 border border-amber-300 text-slate-800 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-2xs transition-colors"
                >
                  <Play className="w-3 h-3 text-indigo-600 fill-indigo-600" />
                  <span>Take 5-Q Test for "{sk}"</span>
                </button>
              ))}
              <a
                href="#plan-section"
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline ml-2"
              >
                View 30-Day Recovery Sprint ↓
              </a>
            </div>
          </div>
        )}

        {/* Quick Action: Apply for Job */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500">
            Current Match Level: <strong className="text-indigo-600">{matchScore}%</strong> • Recruiter will receive your verified skill scores.
          </span>

          <div className="flex items-center space-x-3">
            {hasAppliedForSelectedJob ? (
              <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Application Already Submitted</span>
              </span>
            ) : (
              <button
                onClick={() => applyForOpportunity(currentUser.id, selectedJob.id)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
              >
                <Briefcase className="w-4 h-4" />
                <span>Apply for {selectedJob.title}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. ACCELERATED 30-DAY SPRINT PLAN FOR LACK OF SKILLS */}
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
              Targeted curriculum to eliminate your missing competencies for <span className="font-bold text-indigo-700">{selectedJob?.title || currentUser.targetRole}</span>. Complete the daily milestones below to boost your verified match ranking with Google, Microsoft, and NVIDIA.
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
                Sprint Focus: High-scale mastery
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
  );
};

export default StudentAssessment;
