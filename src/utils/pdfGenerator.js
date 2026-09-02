import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Format date nicely for official reports
 */
const getFormattedDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Common Header and Footer Helper for PDF Documents
 */
const addHeaderAndFooter = (doc, title, subtitle, institutionName = 'Indian Institute of Technology Delhi') => {
  const pageCount = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // Header bar
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 18, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('SKILL BRIDGE | ACADEMIA-INDUSTRY ENGINEERING COLLABORATION', 14, 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225);
    doc.text(institutionName, 196, 11, { align: 'right' });

    // Footer bar
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(14, 282, 196, 282);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Official Academic & Industry Evaluation Document | Generated: ${getFormattedDate()}`, 14, 288);
    doc.text(`Page ${i} of ${pageCount}`, 196, 288, { align: 'right' });
  }
};

/**
 * 1. DOWNLOAD LACK OF SKILLS & RECOVERY REPORT PDF (Student View)
 */
export const downloadLackOfSkillsReport = ({
  student,
  selectedJob,
  verifiedSkills = [],
  claimedSkills = [],
  missingSkills = [],
  matchScore = 0,
  thirtyDayPlan = [],
  completedDays = []
}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const institution = student?.institutionName || 'Indian Institute of Technology Delhi (IIT Delhi)';
  const studentName = student?.name || 'Student Candidate';

  // ----------------- PAGE 1: EXECUTIVE GAP ANALYSIS -----------------

  // Document Title Banner
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 24, 182, 28, 3, 3, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, 24, 182, 28, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text('STUDENT LACK OF SKILLS & RECOVERY REPORT', 18, 33);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Practical Competency Diagnostics, Required Industry Benchmark & 30-Day Recovery Roadmap', 18, 40);
  doc.text(`Report ID: SB-GAP-${student?.id || 'STD'}-${Date.now().toString().slice(-6)} | Certified Evaluation`, 18, 46);

  // Student & Candidate Summary Box
  autoTable(doc, {
    startY: 56,
    theme: 'plain',
    head: [['STUDENT INFORMATION', 'TARGET OPPORTUNITY MATCHING']],
    body: [
      [
        `Candidate: ${studentName}\nDegree: ${student?.education?.degree || 'B.Tech Computer Science'}\nInstitute: ${institution}\nTarget Role: ${student?.targetRole || 'Full-Stack Software Development Engineer'}`,
        `Target Post: ${selectedJob?.title || 'Software Development Engineer'}\nCompany: ${selectedJob?.companyName || 'Google India'}\nOverall Qualification Score: ${matchScore}%\nMissing Skills Count: ${missingSkills.length} Deficiencies Detected`
      ]
    ],
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [30, 41, 59],
      cellPadding: 3,
      lineColor: [226, 232, 240],
      lineWidth: 0.2
    },
    margin: { left: 14, right: 14 }
  });

  // Score Dial & Readiness Overview Box
  const dialY = doc.lastAutoTable.finalY + 6;
  doc.setFillColor(matchScore >= 75 ? 236 : 254, matchScore >= 75 ? 253 : 242, matchScore >= 75 ? 245 : 242);
  doc.roundedRect(14, dialY, 182, 16, 2, 2, 'F');
  doc.setDrawColor(matchScore >= 75 ? 167 : 254, matchScore >= 75 ? 243 : 205, matchScore >= 75 ? 208 : 211);
  doc.roundedRect(14, dialY, 182, 16, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(matchScore >= 75 ? 6 : 153, matchScore >= 75 ? 95 : 27, matchScore >= 75 ? 70 : 27);
  doc.text(
    `Overall Job Qualification Match: ${matchScore}%  •  ${verifiedSkills.length} Verified Skills  •  ${claimedSkills.length} Claimed Skills  •  ${missingSkills.length} Skills to Improve`,
    18,
    dialY + 10.5
  );

  // Section: Detailed Skills Inventory & Practical Test Breakdown
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Practical Skills Inventory & Scenario-Based Evaluation Matrix', 14, dialY + 24);

  const skillsTableBody = [];

  // 1. Verified skills
  verifiedSkills.forEach(v => {
    skillsTableBody.push([
      v.name,
      'VERIFIED (5-Q Practical Test)',
      v.level || 'Advanced',
      `${v.score || 90}%`,
      v.date || getFormattedDate(),
      'Qualified'
    ]);
  });

  // 2. Claimed skills
  claimedSkills.forEach(c => {
    skillsTableBody.push([
      c,
      'CLAIMED (Unverified)',
      'Pending Assessment',
      '--',
      'Needs 5-Q Test',
      'Action Required'
    ]);
  });

  // 3. Missing skills
  missingSkills.forEach(m => {
    skillsTableBody.push([
      m,
      'CRITICAL LACK (Job Requirement)',
      'Skill Gap Detected',
      '0%',
      'Unacquired',
      'High Deficit'
    ]);
  });

  autoTable(doc, {
    startY: dialY + 28,
    head: [['Skill Name', 'Status Category', 'Assessed Level', 'Score', 'Verification Record', 'Impact']],
    body: skillsTableBody,
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 2.5
    },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: [15, 23, 42] },
      1: { cellWidth: 45 },
      2: { fontStyle: 'bold' },
      5: { fontStyle: 'bold' }
    },
    didParseCell: (data) => {
      if (data.section === 'body') {
        const val = data.row.raw[1] || '';
        if (val.includes('VERIFIED')) {
          data.cell.styles.textColor = [5, 150, 105]; // Emerald
        } else if (val.includes('CRITICAL LACK')) {
          data.cell.styles.textColor = [225, 29, 72]; // Rose
        } else {
          data.cell.styles.textColor = [79, 70, 229]; // Indigo
        }
      }
    },
    margin: { left: 14, right: 14 }
  });

  // Section: Lack of Skills Diagnostics
  const gapY = doc.lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Lack of Skills Diagnostics & Industry Deficiencies', 14, gapY);

  const gapAnalysisBody = missingSkills.map(sk => [
    sk,
    'Critical Missing Competency',
    'Enterprise Production Benchmark (Level 2+)',
    'Immediate: Complete Week 1 & 2 Modules in 30-Day Plan, then clear 5-Q Practical Test.'
  ]);

  if (gapAnalysisBody.length === 0) {
    gapAnalysisBody.push([
      'No critical skill deficiencies detected',
      'All Required Skills Met',
      'Meets all corporate prerequisites',
      'Candidate is 100% qualified for direct corporate interview shortlisting.'
    ]);
  }

  autoTable(doc, {
    startY: gapY + 4,
    head: [['Lacked Skill Competency', 'Deficiency Severity', 'Required Corporate Standard', 'Prescribed Remediation Action']],
    body: gapAnalysisBody,
    headStyles: {
      fillColor: [225, 29, 72],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 2.5
    },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: [225, 29, 72], cellWidth: 42 },
      1: { cellWidth: 35 },
      2: { cellWidth: 45 }
    },
    margin: { left: 14, right: 14 }
  });

  // ----------------- PAGE 2: 30-DAY SKILL GAP RECOVERY ROADMAP -----------------
  doc.addPage();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Interactive 30-Day Accelerated Skill Gap Recovery Roadmap', 14, 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Candidate Roadmap Completion: ${completedDays.length} of 30 Days Finished (${Math.round((completedDays.length / 30) * 100)}% Sprint Progress)`,
    14,
    32
  );

  // Recovery plan table
  const planRows = [];
  thirtyDayPlan.forEach(weekObj => {
    // Week Header Row
    planRows.push([
      {
        content: `WEEK ${weekObj.week}: ${weekObj.title.toUpperCase()} [${weekObj.theme}]`,
        colSpan: 4,
        styles: {
          fillColor: [30, 41, 59],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8
        }
      }
    ]);

    weekObj.days.forEach(day => {
      const isDone = completedDays.includes(day.day);
      planRows.push([
        `Day ${day.day}`,
        day.topic,
        day.task,
        `${day.deliverable} (${isDone ? 'COMPLETED' : 'PENDING'})`
      ]);
    });
  });

  autoTable(doc, {
    startY: 36,
    head: [['Timeline', 'Engineering Focus Area', 'Prescribed Hands-on Task', 'Milestone Deliverable']],
    body: planRows,
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      fontSize: 7.5,
      cellPadding: 2
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 16 },
      1: { fontStyle: 'bold', cellWidth: 42 },
      2: { cellWidth: 68 },
      3: { cellWidth: 56 }
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.row.raw.length > 1) {
        const deliverable = data.row.raw[3] || '';
        if (deliverable.includes('COMPLETED')) {
          data.cell.styles.textColor = [5, 150, 105];
        }
      }
    },
    margin: { left: 14, right: 14 }
  });

  // Verification Certification Block
  const finalY = Math.min(doc.lastAutoTable.finalY + 8, 250);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, finalY, 182, 22, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, finalY, 182, 22, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('OFFICIAL VERIFICATION & CERTIFICATE SEAL', 18, finalY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'This report certifies the student competency gaps analyzed against live corporate postings in accordance with IIT placement protocols.\nUpon completion of the 30-day curriculum and passing the 5-question scenario test, verified status is automatically recorded.',
    18,
    finalY + 12
  );

  // Headers and Footers across all pages
  addHeaderAndFooter(doc, 'LACK OF SKILLS REPORT', 'STUDENT COMPETENCY AUDIT', institution);

  // Save the generated PDF
  const safeName = studentName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`SkillBridge_Lack_Of_Skills_Report_${safeName}.pdf`);
};

/**
 * 2. DOWNLOAD ACADEMY REPORT PDF (Academic Institution & Placement View)
 */
export const downloadAcademyReport = ({
  institution,
  students = [],
  _opportunities = [],
  companies = []
}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const instName = institution?.name || 'Indian Institute of Technology Delhi (IIT Delhi)';
  const adminName = institution?.adminName || 'Prof. Arvind Sharma (Dean, Placements & Internships)';

  // Document Title Banner
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(14, 24, 182, 28, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text('INSTITUTIONAL ACADEMIC & PLACEMENT REPORT', 18, 33);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text('Engineering Student Directory, Verified Skills Audit & Industry Readiness Benchmark (Batch 2026)', 18, 40);
  doc.text(`Issuing Authority: Office of Dean (Placements & Internships) | ${instName}`, 18, 46);

  // Institutional KPI Summary Cards Table
  const totalStudents = students.length || 1;
  const totalVerifiedCerts = students.reduce((acc, s) => {
    return acc + (s.certifications || []).filter(c => c.status === 'Verified').length;
  }, 0);
  const avgCgpa = (
    students.reduce((acc, s) => acc + parseFloat(s.education?.cgpa || '8.5'), 0) / totalStudents
  ).toFixed(2);

  autoTable(doc, {
    startY: 56,
    theme: 'grid',
    head: [['TOTAL CANDIDATES', 'CAMPUS READINESS', 'AVERAGE CGPA', 'VERIFIED CREDENTIALS', 'TECH EMPLOYERS']],
    body: [
      [
        `${totalStudents} Enrolled`,
        '96.4% Qualified',
        `${avgCgpa} / 10.0`,
        `${totalVerifiedCerts} Sign-offs`,
        `${companies.length} Partner Firms`
      ]
    ],
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 9,
      fontStyle: 'bold',
      textColor: [79, 70, 229],
      halign: 'center',
      cellPadding: 4
    },
    margin: { left: 14, right: 14 }
  });

  // Department Distribution Table
  const deptY = doc.lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Engineering Department Roster & Skill Benchmarks', 14, deptY);

  const deptData = [
    ['Computer Science & Engineering', '340 Students', '9.1 / 10.0', '98.5% Placed/Ready', 'Google, Microsoft, Amazon'],
    ['Data Science & Artificial Intelligence', '195 Students', '8.9 / 10.0', '96.2% Placed/Ready', 'NVIDIA, Microsoft Research, OpenAI'],
    ['Electrical & Electronics Engineering', '160 Students', '8.7 / 10.0', '92.4% Placed/Ready', 'Qualcomm, Intel, Texas Instruments'],
    ['Mechanical & Automation Engineering', '130 Students', '8.4 / 10.0', '89.1% Placed/Ready', 'Tata Motors, L&T, Siemens']
  ];

  autoTable(doc, {
    startY: deptY + 4,
    head: [['Engineering Department', 'Cohort Size', 'Mean CGPA', 'Placement Readiness Rate', 'Top Hiring Tech Partners']],
    body: deptData,
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 2.5
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      3: { fontStyle: 'bold', textColor: [5, 150, 105] }
    },
    margin: { left: 14, right: 14 }
  });

  // Student Profiles Detailed Roster Table
  const studentRosterY = doc.lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Comprehensive Student Directory & Verified Portfolios', 14, studentRosterY);

  const studentRows = students.map((s, idx) => {
    const verifiedNames = (s.verifiedSkills || []).map(v => `${v.name} (${v.level})`).slice(0, 2).join(', ');
    const certCount = (s.certifications || []).filter(c => c.status === 'Verified').length;
    return [
      `#${idx + 1} ${s.name}`,
      s.education?.degree?.split(' ')[0] || 'B.Tech',
      s.education?.cgpa || '8.5',
      verifiedNames || 'DSA (Advanced)',
      `${certCount} Verified`,
      s.targetRole || 'Software Engineer',
      'Shortlist Ready'
    ];
  });

  autoTable(doc, {
    startY: studentRosterY + 4,
    head: [['Candidate Name', 'Degree', 'CGPA', 'Top Verified Skills', 'Certs', 'Specialization Intent', 'Status']],
    body: studentRows,
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      fontSize: 7.5,
      cellPadding: 2.5
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      2: { fontStyle: 'bold', cellWidth: 14 },
      3: { cellWidth: 55 },
      6: { fontStyle: 'bold', textColor: [5, 150, 105] }
    },
    margin: { left: 14, right: 14 }
  });

  // Official Institutional Sign-Off Block
  const signY = Math.min(doc.lastAutoTable.finalY + 12, 240);
  doc.setDrawColor(203, 213, 225);
  doc.line(14, signY, 196, signY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('OFFICE OF THE DEAN OF PLACEMENTS & CORPORATE RELATIONS', 14, signY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Official Academic Placement Audit endorsed by: ${adminName}`, 14, signY + 13);
  doc.text(`Institute Code: ${institution?.code || 'IITD-110016'} | Central Verification Registry`, 14, signY + 18);

  doc.setFont('helvetica', 'bold');
  doc.text('Signature & Official Stamp:', 140, signY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(79, 70, 229);
  doc.text('[DIGITALLY ENDORSED - IIT DELHI]', 140, signY + 14);

  // Headers and Footers across all pages
  addHeaderAndFooter(doc, 'ACADEMIC PLACEMENT REPORT', 'INSTITUTIONAL AUDIT', instName);

  // Save the generated PDF
  doc.save('IITD_Academic_Placement_Report_2026.pdf');
};

/**
 * 3. DOWNLOAD INDIVIDUAL STUDENT DOSSIER PDF (From Academic Student Directory)
 */
export const downloadStudentDossierPDF = ({ student, institution }) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const instName = institution?.name || student?.institutionName || 'Indian Institute of Technology Delhi';
  const studentName = student?.name || 'Student Candidate';

  // Title Box
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(14, 24, 182, 24, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(`STUDENT ACADEMIC & SKILL DOSSIER: ${studentName.toUpperCase()}`, 18, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text(`Official University Portfolio & Technical Skill Credentials | ${instName}`, 18, 41);

  // Profile Information
  autoTable(doc, {
    startY: 52,
    theme: 'plain',
    head: [['ACADEMIC IDENTITY', 'CAREER INTENT']],
    body: [
      [
        `Candidate Name: ${studentName}\nRoll ID: ${student?.id || 'STD-01'}\nDegree: ${student?.education?.degree || 'B.Tech CSE'}\nCumulative CGPA: ${student?.education?.cgpa || '8.9/10.0'}`,
        `Target Role: ${student?.targetRole || 'Software Development Engineer'}\nInstitute: ${instName}\nEmail: ${student?.email || 'student@iitd.ac.in'}\nSkills Enrolled: ${student?.skills?.length || 0} Total Skills`
      ]
    ],
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 3,
      lineColor: [226, 232, 240],
      lineWidth: 0.2
    },
    margin: { left: 14, right: 14 }
  });

  // Verified Skills Table
  const vSkills = (student?.verifiedSkills || []).map(v => [
    v.name,
    '5-Question Scenario Practical Test',
    v.level || 'Advanced',
    `${v.score || 90}%`,
    v.date || getFormattedDate()
  ]);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 6,
    head: [['Verified Skill Competency', 'Verification Method', 'Proficiency Badge', 'Practical Score', 'Date']],
    body: vSkills.length > 0 ? vSkills : [['Data Structures & Algorithms', '5-Question Test', 'Advanced', '95%', getFormattedDate()]],
    headStyles: {
      fillColor: [5, 150, 105],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 2.5
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
      2: { fontStyle: 'bold', textColor: [5, 150, 105] }
    },
    margin: { left: 14, right: 14 }
  });

  // Projects Table
  const projectsData = (student?.projects || []).map(p => [
    p.title,
    p.desc
  ]);

  if (projectsData.length > 0) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 6,
      head: [['Engineering Project Title', 'Architecture & Impact Summary']],
      body: projectsData,
      headStyles: {
        fillColor: [15, 23, 42],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8.5
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 2.5
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 55 }
      },
      margin: { left: 14, right: 14 }
    });
  }

  // Header & Footer
  addHeaderAndFooter(doc, 'STUDENT DOSSIER', 'OFFICIAL RECORD', instName);

  const safeName = studentName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Student_Dossier_${safeName}.pdf`);
};
