import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, Building2, CheckCircle2, Star, Sparkles, Network } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen -m-4 sm:-m-6 lg:-m-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 px-6 sm:px-12 lg:px-24">
        {/* Decorative background grid and blurs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>National Engineering Portal • Smart Industry Bridge</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-amber-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Bridging the Gap Between <br className="hidden sm:inline" /> Engineering Education & Industry
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
            A unified skill mapping, internship, and placement coordination portal connecting students from premier IITs and engineering colleges with top technology recruiters under a single collaborative ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/role-select"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-600 hover:to-teal-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center justify-center space-x-2 text-base group"
            >
              <span>Enter Collaborator Portal</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 px-8 py-3.5 rounded-xl transition-all duration-300 font-medium text-base text-center block"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-white border-y border-slate-200 py-10 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-1">
            <span className="text-4xl font-extrabold text-indigo-900 block">1,200+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Students Onboarded</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-4xl font-extrabold text-teal-600 block">45+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Industry Partners</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-4xl font-extrabold text-amber-600 block">88%</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Placement Rate</span>
          </div>
          <div className="text-center space-y-1">
            <span className="text-4xl font-extrabold text-slate-900 block">340+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ongoing Internships</span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How the Platform Works</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A three-way collaboration framework designed to synchronize curricula, assess student talent, 
            and streamline recruitment pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Student Path */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6 hover:shadow-lg transition-all duration-300">
            <div className="bg-amber-50 border border-amber-100 p-3.5 rounded-xl w-fit text-amber-600">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Students</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span><strong>Take Assessments:</strong> Evaluate domain and analytical skills with immediate radar profiling.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span><strong>Identify Gaps:</strong> Visual mapping shows exactly which skills you need to develop for target industry roles.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span><strong>One-Click Apply:</strong> Browse matched opportunities and auto-generate a shareable portfolio card.</span>
              </li>
            </ul>
          </div>

          {/* Recruiter Path */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6 hover:shadow-lg transition-all duration-300">
            <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl w-fit text-emerald-600">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Industry / Recruiters</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Post Postings:</strong> Define internship or placements highlighting required skill taxonomy profiles.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Skill-Match Search:</strong> Instantly filter candidate pools based on true overlap percentage.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Track Recruitment:</strong> Manage candidates dynamically using a unified Kanban recruitment board.</span>
              </li>
            </ul>
          </div>

          {/* Academician Path */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6 hover:shadow-lg transition-all duration-300">
            <div className="bg-indigo-50 border border-indigo-100 p-3.5 rounded-xl w-fit text-indigo-600">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Academicians / Admins</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <span><strong>Directory Audits:</strong> View comprehensive dashboard lists of students and their placement readiness.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <span><strong>Verify Credentials:</strong> Review and verify student certifications to ensure portfolio reliability.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <span><strong>Curriculum Alignment:</strong> Synchronize industry tech stacks and bridge skill deficiencies with automated 30-day action roadmaps.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-100/50 py-20 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Feedback from our Stakeholders</h2>
            <p className="text-slate-500 text-sm">See how educational leaders and recruiters are aligning their goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-600 text-xs italic">
                "Finding interns with verified distributed systems and DSA problem-solving skills used to take weeks. Skill Bridge lets us filter prepared IIT candidates instantly."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                  DK
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-800">Dr. Kiran Kumar</h4>
                  <p className="text-[10px] text-slate-400">Head of University Relations, Google India</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-600 text-xs italic">
                "Our engineering students are brilliant at theory, but sometimes lack specific cloud native deployment tooling. With this platform's 30-day skill plans, students close these gaps before campus interviews."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                  AS
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-800">Prof. Arvind Sharma</h4>
                  <p className="text-[10px] text-slate-400">Dean, Placements & Training, IIT Delhi</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-600 text-xs italic">
                "The competency assessment immediately identified my system design gap and gave me an actionable 30-day roadmap. I completed the labs and got shortlisted for an SDE Intern role at Google India!"
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                  AS
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-800">Aarav Sharma</h4>
                  <p className="text-[10px] text-slate-400">B.Tech Computer Science, IIT Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 sm:px-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="bg-amber-500 text-slate-950 p-1.5 rounded font-bold text-sm">
              SB
            </div>
            <span className="font-bold text-white text-sm">Skill Bridge Portal</span>
          </div>
          <p className="text-xs text-center md:text-right">
            © {new Date().getFullYear()} National Engineering Academia-Industry Collaboration. All rights reserved. <br />
            <span className="text-[10px] text-slate-500">Engineering Internship & Placement Platform</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
