import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Home,
  User,
  Award,
  Briefcase,
  FileCheck,
  Building2,
  PlusCircle,
  FolderKanban,
  Users,
  Search,
  BookOpen,
  BarChart3,
  Handshake,
  CheckSquare,
  BookmarkCheck
} from 'lucide-react';

const Sidebar = () => {
  const { currentRole } = useApp();

  if (currentRole === 'none') return null;

  // Student Menu Items
  const studentMenu = [
    { name: 'Dashboard Home', path: '/student', icon: Home },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'Skill Assessment', path: '/student/assessment', icon: Award },
    { name: 'Internship Board', path: '/student/opportunities', icon: Briefcase },
    { name: 'My Applications', path: '/student/applications', icon: FileCheck },
  ];

  // Recruiter Menu Items
  const recruiterMenu = [
    { name: 'Recruiter Home', path: '/industry', icon: Home },
    { name: 'Company Profile', path: '/industry/profile', icon: Building2 },
    { name: 'Post Internship/Job', path: '/industry/post', icon: PlusCircle },
    { name: 'Manage Postings', path: '/industry/manage', icon: FolderKanban },
    { name: 'Applicant Tracker', path: '/industry/applicants', icon: Users },
    { name: 'Candidate Search', path: '/industry/search', icon: Search },
    { name: 'Training Programs', path: '/industry/programs', icon: BookOpen },
  ];

  // Academic Menu Items
  const academicMenu = [
    { name: 'Institution Home', path: '/academia', icon: Home },
    { name: 'Student Directory', path: '/academia/students', icon: Users },
    { name: 'Placement Analytics', path: '/academia/analytics', icon: BarChart3 },
    { name: 'Collaboration Hub', path: '/academia/collabs', icon: Handshake },
    { name: 'Faculty Opportunities', path: '/academia/faculty', icon: BookOpen },
    { name: 'Approve & Verify', path: '/academia/verify', icon: CheckSquare },
  ];

  const getMenu = () => {
    switch (currentRole) {
      case 'student': return studentMenu;
      case 'recruiter': return recruiterMenu;
      case 'academic': return academicMenu;
      default: return [];
    }
  };

  const menu = getMenu();

  return (
    <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 text-slate-300 md:min-h-[calc(100vh-4rem)] flex flex-col transition-all duration-300">
      
      {/* Role Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
          Navigation
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-center text-xs text-slate-500">
        AYUSH Collaboration v1.0.0
      </div>

    </aside>
  );
};

export default Sidebar;
