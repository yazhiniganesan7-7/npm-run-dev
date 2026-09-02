import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, X, Award, ShieldCheck, FileText, Calendar } from 'lucide-react';

const AcademiaVerify = () => {
  const { students, verifyStudentCertification } = useApp();

  // Aggregate all certifications across all students
  const allCerts = [];
  students.forEach(student => {
    student.certifications.forEach(cert => {
      allCerts.push({
        studentId: student.id,
        studentName: student.name,
        degree: student.education.degree.split(' ')[0],
        avatar: student.avatar,
        certId: cert.id,
        certName: cert.name,
        issuer: cert.issuer,
        date: cert.date,
        status: cert.status
      });
    });
  });

  // Filter pending vs reviewed
  const pendingCerts = allCerts.filter(c => c.status === 'Pending');
  const reviewedCerts = allCerts.filter(c => c.status !== 'Pending');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Approve & Verify Credentials</h2>
        <p className="text-sm text-slate-500">Sign off on student-submitted skill certifications to validate their digital portfolios for corporate viewing.</p>
      </div>

      {/* Pending Certifications */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
          <span>Awaiting Verification</span>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {pendingCerts.length}
          </span>
        </h3>

        {pendingCerts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs italic shadow-xs">
            No certification requests are currently pending approval.
          </div>
        ) : (
          <div className="space-y-4">
            {pendingCerts.map((cert) => (
              <div 
                key={`${cert.studentId}-${cert.certId}`} 
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 hover:shadow-md"
              >
                {/* Cert and Student Meta info */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-600 mt-0.5">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">{cert.certName}</h4>
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded uppercase">
                        {cert.degree}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">Issued by: <strong>{cert.issuer}</strong> • Added {cert.date}</p>
                    
                    <div className="pt-2 flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-[9px] text-indigo-700">
                        {cert.avatar}
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold">Submitted by {cert.studentName}</span>
                    </div>
                  </div>
                </div>

                {/* Accept / Reject actions */}
                <div className="flex items-center space-x-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 justify-end">
                  <button
                    onClick={() => verifyStudentCertification(cert.studentId, cert.certId, 'Rejected')}
                    className="flex items-center space-x-1 px-3.5 py-2 border border-slate-200 hover:bg-rose-50 hover:border-rose-100 rounded-xl text-xs font-bold text-rose-600 transition-colors shadow-xs"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => verifyStudentCertification(cert.studentId, cert.certId, 'Verified')}
                    className="flex items-center space-x-1 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-xs font-bold text-white transition-colors shadow-md hover:shadow-lg"
                  >
                    <Check className="w-4 h-4" />
                    <span>Verify Skill</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviewed Certifications */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verification History</h3>
        
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Certificate details</th>
                  <th className="px-6 py-4">Authority</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {reviewedCerts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-400 italic">
                      No verification logs in database history.
                    </td>
                  </tr>
                ) : (
                  reviewedCerts.map((cert) => (
                    <tr key={`${cert.studentId}-${cert.certId}`} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 block">{cert.studentName}</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5 uppercase font-semibold">{cert.degree}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800 block">{cert.certName}</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5">{cert.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-600">{cert.issuer}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                          cert.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {cert.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AcademiaVerify;
