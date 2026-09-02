import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Bell, LogOut, RefreshCw, User, ShieldAlert, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { currentRole, currentUser, logout, resetMockData, applications, opportunities, students } = useApp();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Generate dynamic mock notifications based on active role
  const getNotifications = () => {
    if (currentRole === 'student') {
      const studentApps = applications.filter(a => a.studentId === currentUser?.id);
      const notificationsList = [];
      
      studentApps.forEach(a => {
        const opp = opportunities.find(o => o.id === a.opportunityId);
        if (a.status === 'Shortlisted') {
          notificationsList.push({
            id: `notif-${a.id}-short`,
            title: 'Application Shortlisted!',
            desc: `You have been shortlisted by ${opp?.companyName} for ${opp?.title}. Check timeline for updates.`,
            time: '2 hours ago',
            unread: true
          });
        } else if (a.status === 'Selected') {
          notificationsList.push({
            id: `notif-${a.id}-sel`,
            title: 'Congratulations! 🎉',
            desc: `You have been selected as ${opp?.title} at ${opp?.companyName}!`,
            time: '1 day ago',
            unread: false
          });
        }
      });

      // Default notification
      notificationsList.push({
        id: 'notif-welcome',
        title: 'Welcome to Ayush SkillBridge',
        desc: 'Complete your Skill Assessment to find tailored internship matches.',
        time: '3 days ago',
        unread: false
      });

      return notificationsList;
    }

    if (currentRole === 'recruiter') {
      const companyOpps = opportunities.filter(o => o.companyId === currentUser?.id);
      const companyOppIds = companyOpps.map(o => o.id);
      const incomingApps = applications.filter(a => companyOppIds.includes(a.opportunityId));
      
      const notificationsList = incomingApps.map(a => {
        const student = students.find(s => s.id === a.studentId);
        const opp = opportunities.find(o => o.id === a.opportunityId);
        return {
          id: `notif-${a.id}-incoming`,
          title: 'New Applicant',
          desc: `${student?.name} applied for "${opp?.title}" (Match: ${calculateMatchPercentage(student, opp)}%)`,
          time: 'Just now',
          unread: true
        };
      }).slice(0, 3);

      if (notificationsList.length === 0) {
        notificationsList.push({
          id: 'notif-rec-welcome',
          title: 'Portal Ready',
          desc: 'Create job postings to start receiving matched applications.',
          time: '3 days ago',
          unread: false
        });
      }

      return notificationsList;
    }

    if (currentRole === 'academic') {
      const pendingCertsCount = students.reduce((acc, s) => {
        return acc + s.certifications.filter(c => c.status === 'Pending').length;
      }, 0);

      const notificationsList = [];
      if (pendingCertsCount > 0) {
        notificationsList.push({
          id: 'notif-acad-pending',
          title: 'Action Required: Verify Certifications',
          desc: `You have ${pendingCertsCount} student skill certifications awaiting approval.`,
          time: '1 hour ago',
          unread: true
        });
      }

      notificationsList.push({
        id: 'notif-acad-welcome',
        title: 'Portal Initialized',
        desc: 'Collaboration hub with Patanjali and Himalaya is active.',
        time: '3 days ago',
        unread: false
      });

      return notificationsList;
    }

    return [
      { id: 'notif-pub', title: 'Portal Launch', desc: 'Ministry of Ayush Academia-Industry Skills mapping is active.', time: '1 week ago', unread: false }
    ];
  };

  // Helper matching percentage
  const calculateMatchPercentage = (student, opp) => {
    if (!student || !opp) return 0;
    const reqSkills = opp.requiredSkills || [];
    const studentSkills = student.skills || [];
    if (reqSkills.length === 0) return 100;
    const matches = reqSkills.filter(s => studentSkills.includes(s));
    return Math.round((matches.length / reqSkills.length) * 100);
  };

  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-tr from-amber-500 to-teal-500 p-2 rounded-lg text-slate-900 shadow-sm flex items-center justify-center">
            <Sparkles className="w-5 h-5 font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white">AYUSH SkillBridge</span>
            <span className="text-[10px] text-slate-400 font-medium leading-tight">Academia - Industry Collaboration</span>
          </div>
        </Link>

        {/* Right menu controls */}
        <div className="flex items-center space-x-4">
          
          {/* Mock Role Identifier */}
          {currentRole !== 'none' && (
            <span className={`hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              currentRole === 'student' 
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                : currentRole === 'recruiter' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {currentRole === 'student' ? 'Student' : currentRole === 'recruiter' ? 'Recruiter' : 'Academic Admin'}
            </span>
          )}

          {/* Reset Mock DB Button (For SIH Evaluation) */}
          <button 
            onClick={resetMockData}
            title="Reset Mock Database"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center space-x-1 text-xs border border-slate-800"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden lg:inline">Reset Demo DB</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileDropdown(false);
              }}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border border-slate-900 rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-1 text-slate-800 border border-slate-200 z-50 ring-1 ring-black/5">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-rose-100 text-rose-800 rounded font-semibold">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 ${n.unread ? 'bg-indigo-50/40' : ''}`}>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-xs text-slate-900">{n.title}</h4>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Login Button */}
          {currentRole === 'none' ? (
            <Link 
              to="/role-select" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-all flex items-center space-x-1"
            >
              <User className="w-4 h-4" />
              <span>Mock Login</span>
            </Link>
          ) : (
            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm text-white border border-slate-700">
                  {currentUser?.avatar || (currentRole === 'academic' ? 'AA' : 'U')}
                </div>
                <div className="hidden md:flex flex-col text-xs pr-1">
                  <span className="font-medium text-slate-200 leading-tight">{currentUser?.name || 'Admin'}</span>
                  <span className="text-[10px] text-slate-400">{currentUser?.email || 'admin@nic.in'}</span>
                </div>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 text-slate-800 border border-slate-200 z-50 ring-1 ring-black/5">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <span className="font-semibold text-sm text-slate-900 block truncate">{currentUser?.name || 'Admin'}</span>
                    <span className="text-xs text-slate-500 block truncate">{currentUser?.email || 'admin@nic.in'}</span>
                  </div>
                  <div className="py-1">
                    <button 
                      onClick={() => {
                        setShowProfileDropdown(false);
                        logout();
                        navigate('/role-select');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center space-x-2 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
