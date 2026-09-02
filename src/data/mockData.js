// Mock Data for Portal for Academia - Industry Collaboration (SIH26044)

// 1. Skill Taxonomy (40 skills across categories)
export const SKILL_TAXONOMY = [
  // AYUSH & Domain Specific
  { id: 'sk-1', name: 'Ayurvedic Pharmacology', category: 'Domain' },
  { id: 'sk-2', name: 'Herbal Formulation', category: 'Domain' },
  { id: 'sk-3', name: 'Panchakarma Therapy', category: 'Domain' },
  { id: 'sk-4', name: 'Yoga Instruction & Therapy', category: 'Domain' },
  { id: 'sk-5', name: 'Botanical Identification', category: 'Domain' },
  { id: 'sk-6', name: 'Drug Standardization', category: 'Domain' },
  { id: 'sk-7', name: 'Naturopathic Diagnostics', category: 'Domain' },
  { id: 'sk-8', name: 'Clinical Trials Coordination', category: 'Domain' },
  { id: 'sk-9', name: 'Clinical Documentation', category: 'Domain' },
  { id: 'sk-10', name: 'Hospital Administration', category: 'Domain' },
  { id: 'sk-11', name: 'Dietetics & Nutrition', category: 'Domain' },
  { id: 'sk-12', name: 'Pharmacognosy', category: 'Domain' },
  { id: 'sk-13', name: 'Phytochemistry', category: 'Domain' },
  { id: 'sk-14', name: 'Ayush Informatics', category: 'Domain' },

  // Technical Skills
  { id: 'sk-15', name: 'Data Analysis', category: 'Technical' },
  { id: 'sk-16', name: 'React & Frontend Dev', category: 'Technical' },
  { id: 'sk-17', name: 'Python Programming', category: 'Technical' },
  { id: 'sk-18', name: 'SQL & Database Management', category: 'Technical' },
  { id: 'sk-19', name: 'Machine Learning', category: 'Technical' },
  { id: 'sk-20', name: 'Cloud Computing (AWS/GCP)', category: 'Technical' },
  { id: 'sk-21', name: 'Bioinformatics Tools', category: 'Technical' },
  { id: 'sk-22', name: 'Statistical Analysis (SPSS/R)', category: 'Technical' },
  { id: 'sk-23', name: 'LIMS (Lab Information Systems)', category: 'Technical' },
  { id: 'sk-24', name: 'API Development', category: 'Technical' },

  // Professional & Soft Skills
  { id: 'sk-25', name: 'Scientific Writing & Communication', category: 'Professional' },
  { id: 'sk-26', name: 'Project Management', category: 'Professional' },
  { id: 'sk-27', name: 'Research Methodology', category: 'Professional' },
  { id: 'sk-28', name: 'Team Leadership', category: 'Professional' },
  { id: 'sk-29', name: 'Problem Solving', category: 'Professional' },
  { id: 'sk-30', name: 'Presentation Skills', category: 'Professional' },
  { id: 'sk-31', name: 'Regulatory Compliance', category: 'Professional' },
  { id: 'sk-32', name: 'Quality Assurance', category: 'Professional' },
  { id: 'sk-33', name: 'IPR & Patent Filing', category: 'Professional' },
  { id: 'sk-34', name: 'Interpersonal Skills', category: 'Professional' },

  // Additional Health/IT crossover
  { id: 'sk-35', name: 'Telemedicine Systems', category: 'Technical' },
  { id: 'sk-36', name: 'Medical Devices QA', category: 'Technical' },
  { id: 'sk-37', name: 'Healthcare Analytics', category: 'Technical' },
  { id: 'sk-38', name: 'Public Health Research', category: 'Domain' },
  { id: 'sk-39', name: 'Digital Marketing (Wellness)', category: 'Professional' },
  { id: 'sk-40', name: 'Community Outreach', category: 'Professional' },
];

// Helper to get skill object by name
export const getSkillByName = (name) => SKILL_TAXONOMY.find(s => s.name === name);

// 2. Mock Academic Institutions
export const MOCK_INSTITUTIONS = [
  {
    id: 'inst-1',
    name: 'National Institute of Ayurveda (NIA)',
    location: 'Jaipur, Rajasthan',
    code: 'NIAJ-302002',
    partneredCompanies: 18,
    studentCount: 450,
    placementRate: 88,
    avgStipend: 18500,
    contactEmail: 'placement@nia.nic.in',
    logoColor: 'from-amber-600 to-yellow-500',
  },
  {
    id: 'inst-2',
    name: 'All India Institute of Ayurveda (AIIA)',
    location: 'New Delhi, Delhi',
    code: 'AIIAD-110076',
    partneredCompanies: 24,
    studentCount: 380,
    placementRate: 92,
    avgStipend: 22000,
    contactEmail: 'collaboration@aiia.gov.in',
    logoColor: 'from-teal-600 to-emerald-500',
  },
  {
    id: 'inst-3',
    name: 'National Institute of Homoeopathy (NIH)',
    location: 'Kolkata, West Bengal',
    code: 'NIHK-700091',
    partneredCompanies: 12,
    studentCount: 310,
    placementRate: 82,
    avgStipend: 15000,
    contactEmail: 'placement@nih.nic.in',
    logoColor: 'from-blue-600 to-indigo-500',
  },
  {
    id: 'inst-4',
    name: 'National Institute of Sowa Rigpa (NISR)',
    location: 'Leh, Ladakh',
    code: 'NISRL-194101',
    partneredCompanies: 8,
    studentCount: 120,
    placementRate: 75,
    avgStipend: 14000,
    contactEmail: 'admin@nisr.gov.in',
    logoColor: 'from-purple-600 to-pink-500',
  }
];

// 3. Mock Students
export const MOCK_STUDENTS = [
  {
    id: 'std-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@nia.nic.in',
    phone: '+91 98765 43210',
    institutionId: 'inst-1',
    avatar: 'AS',
    targetRole: 'Ayurvedic Formulator & Clinical Researcher',
    skills: [
      'Ayurvedic Pharmacology',
      'Herbal Formulation',
      'Clinical Documentation',
      'Research Methodology',
      'Scientific Writing & Communication',
      'Presentation Skills',
      'Data Analysis'
    ],
    education: {
      degree: 'BAMS (Bachelor of Ayurvedic Medicine and Surgery)',
      year: 'Final Year (4th Year)',
      cgpa: '8.4/10.0',
    },
    certifications: [
      { id: 'cert-1', name: 'Advanced Herbology', issuer: 'National Botanical Research Institute', date: '2025-06', status: 'Verified' },
      { id: 'cert-2', name: 'GCP (Good Clinical Practice) Training', issuer: 'NIDA Clinical Trials Network', date: '2025-11', status: 'Verified' },
      { id: 'cert-3', name: 'Standardization of Ayurvedic Formulations', issuer: 'Ministry of Ayush', date: '2026-02', status: 'Pending' }
    ],
    projects: [
      { title: 'Standardization of Ashwagandha Effervescent Tablets', desc: 'Developed a novel delivery mechanism for Ashwagandha extract and validated its shelf life using stability testing protocols.' },
      { title: 'Clinical Audit on Panchakarma in OA', desc: 'Conducted a retrospective audit of 50 osteoarthritis patients treated with Janu Basti and compiled efficacy charts.' }
    ],
    achievements: [
      '1st Place in Ministry of Ayush Innovation Hackathon 2025',
      'Published research paper in AYU Journal on Standardization'
    ],
    resumeName: 'Aarav_Sharma_BAMS_Resume.pdf',
    assessmentScores: {
      'Domain Knowledge': 85,
      'Scientific/Clinical Skills': 80,
      'Technical/Data Skills': 65,
      'Communication': 90,
      'Regulatory/Compliance': 75
    }
  },
  {
    id: 'std-2',
    name: 'Priyanka Patel',
    email: 'priyanka.patel@aiia.gov.in',
    phone: '+91 91234 56789',
    institutionId: 'inst-2',
    avatar: 'PP',
    targetRole: 'Clinical Trial Coordinator',
    skills: [
      'Clinical Trials Coordination',
      'Clinical Documentation',
      'Regulatory Compliance',
      'Scientific Writing & Communication',
      'Statistical Analysis (SPSS/R)',
      'Data Analysis',
      'Team Leadership'
    ],
    education: {
      degree: 'MD in Ayurveda (Dravyaguna)',
      year: '2nd Year Postgraduate',
      cgpa: '9.1/10.0',
    },
    certifications: [
      { id: 'cert-4', name: 'Clinical Trials Regulation in India', issuer: 'CDSCO', date: '2025-08', status: 'Verified' },
      { id: 'cert-5', name: 'Ayush Informatics Certification', issuer: 'AIIA', date: '2026-01', status: 'Verified' }
    ],
    projects: [
      { title: 'Efficacy Trial of Guduchi Ghan Vati', desc: 'Coordinated a randomized controlled trial assessing Guduchi Ghan Vati in improving immunologic markers.' }
    ],
    achievements: [
      'Recipient of AYUSH Junior Research Fellowship (JRF) 2025'
    ],
    resumeName: 'Priyanka_Patel_MD_Dravyaguna.pdf',
    assessmentScores: {
      'Domain Knowledge': 92,
      'Scientific/Clinical Skills': 88,
      'Technical/Data Skills': 78,
      'Communication': 85,
      'Regulatory/Compliance': 90
    }
  },
  {
    id: 'std-3',
    name: 'Karthik Nair',
    email: 'karthik.nair@aiia.gov.in',
    phone: '+91 94477 12345',
    institutionId: 'inst-2',
    avatar: 'KN',
    targetRole: 'Ayurvedic Wellness Consultant',
    skills: [
      'Yoga Instruction & Therapy',
      'Panchakarma Therapy',
      'Dietetics & Nutrition',
      'Communication',
      'Telemedicine Systems',
      'Presentation Skills'
    ],
    education: {
      degree: 'BAMS',
      year: '3rd Year',
      cgpa: '7.8/10.0',
    },
    certifications: [
      { id: 'cert-6', name: 'Certified Yoga Professional (Level 2)', issuer: 'Yoga Certification Board (YCB)', date: '2025-05', status: 'Verified' },
      { id: 'cert-7', name: 'Panchakarma Assistant Training', issuer: 'Aravinda Hospital', date: '2025-10', status: 'Pending' }
    ],
    projects: [
      { title: 'Integrating Hatha Yoga in Diabetes Management', desc: 'Designed a 12-week yoga protocol and tracked fasting blood sugar levels across 20 participants.' }
    ],
    achievements: [
      'Best Yoga Practitioner Award - Delhi State level 2025'
    ],
    resumeName: 'Karthik_Nair_Wellness_BAMS.pdf',
    assessmentScores: {
      'Domain Knowledge': 75,
      'Scientific/Clinical Skills': 70,
      'Technical/Data Skills': 55,
      'Communication': 88,
      'Regulatory/Compliance': 60
    }
  },
  {
    id: 'std-4',
    name: 'Anjali Das',
    email: 'anjali.das@nih.nic.in',
    phone: '+91 88877 66554',
    institutionId: 'inst-3',
    avatar: 'AD',
    targetRole: 'Homeopathic Pharmacologist',
    skills: [
      'Drug Standardization',
      'Clinical Documentation',
      'Pharmacognosy',
      'Research Methodology',
      'Scientific Writing & Communication',
      'SQL & Database Management'
    ],
    education: {
      degree: 'BHMS (Bachelor of Homoeopathic Medicine and Surgery)',
      year: 'Final Year',
      cgpa: '8.2/10.0',
    },
    certifications: [
      { id: 'cert-8', name: 'Homoeopathic Pharmacopoeia Standards', issuer: 'HPL Ghaziabad', date: '2025-09', status: 'Verified' }
    ],
    projects: [
      { title: 'Efficacy of Ultra-diluted Arnica on Wound Healing', desc: 'Conducted an in-vitro assay examining fibroblasts migration in wound models treated with Arnica 30C.' }
    ],
    achievements: [
      'Awarded NIH Scholarship for Academic Excellence 2024, 2025'
    ],
    resumeName: 'Anjali_Das_BHMS_Resume.pdf',
    assessmentScores: {
      'Domain Knowledge': 80,
      'Scientific/Clinical Skills': 85,
      'Technical/Data Skills': 60,
      'Communication': 78,
      'Regulatory/Compliance': 80
    }
  },
  {
    id: 'std-5',
    name: 'Tenzin Gyatso',
    email: 'tenzin.g@nisr.gov.in',
    phone: '+91 70011 22334',
    institutionId: 'inst-4',
    avatar: 'TG',
    targetRole: 'Sowa Rigpa Research Officer',
    skills: [
      'Botanical Identification',
      'Herbal Formulation',
      'Dietetics & Nutrition',
      'Community Outreach',
      'Scientific Writing & Communication',
      'Research Methodology'
    ],
    education: {
      degree: 'BSRMS (Bachelor of Sowa Rigpa Medicine and Surgery)',
      year: 'Final Year',
      cgpa: '8.5/10.0',
    },
    certifications: [
      { id: 'cert-9', name: 'Himalayan Medicinal Herbs Identification', issuer: 'National Research Institute for Sowa Rigpa', date: '2025-07', status: 'Verified' }
    ],
    projects: [
      { title: 'Taxonomic Mapping of Altitude-specific Rhodiola', desc: 'Mapped the distribution of Rhodiola species across the Leh district and documented local traditional formulations.' }
    ],
    achievements: [
      'Authored field guide for Sowa Rigpa Medicinal Plants of Ladakh'
    ],
    resumeName: 'Tenzin_Gyatso_SowaRigpa.pdf',
    assessmentScores: {
      'Domain Knowledge': 90,
      'Scientific/Clinical Skills': 80,
      'Technical/Data Skills': 50,
      'Communication': 82,
      'Regulatory/Compliance': 70
    }
  },
  {
    id: 'std-6',
    name: 'Rohit Verma',
    email: 'rohit.verma@nia.nic.in',
    phone: '+91 99887 76655',
    institutionId: 'inst-1',
    avatar: 'RV',
    targetRole: 'Ayush Health Informatician',
    skills: [
      'Ayush Informatics',
      'React & Frontend Dev',
      'Data Analysis',
      'SQL & Database Management',
      'Scientific Writing & Communication',
      'Telemedicine Systems',
      'Healthcare Analytics'
    ],
    education: {
      degree: 'BAMS + PG Diploma in Medical Informatics',
      year: 'Postgraduate Student',
      cgpa: '8.9/10.0',
    },
    certifications: [
      { id: 'cert-10', name: 'HL7 Standards & FHIR Basics', issuer: 'HL7 India', date: '2025-12', status: 'Verified' },
      { id: 'cert-11', name: 'Advanced SQL Certification', issuer: 'LeetCode Certified', date: '2025-04', status: 'Pending' }
    ],
    projects: [
      { title: 'Ayurvedic Prakriti Assessment App', desc: 'Developed a React Native application with a rule engine to calculate human constitution (Prakriti) based on classical texts.' }
    ],
    achievements: [
      'Implemented Electronic Medical Record system for the college outpatient unit'
    ],
    resumeName: 'Rohit_Verma_AyushInformatics.pdf',
    assessmentScores: {
      'Domain Knowledge': 75,
      'Scientific/Clinical Skills': 68,
      'Technical/Data Skills': 92,
      'Communication': 80,
      'Regulatory/Compliance': 85
    }
  },
  {
    id: 'std-7',
    name: 'Siddharth Roy',
    email: 'sid.roy@nih.nic.in',
    phone: '+91 98300 12345',
    institutionId: 'inst-3',
    avatar: 'SR',
    targetRole: 'Homeopathic Clinical Researcher',
    skills: ['Clinical Trials Coordination', 'Research Methodology', 'Data Analysis', 'Statistical Analysis (SPSS/R)', 'Scientific Writing & Communication'],
    education: { degree: 'MD (Homoeopathy)', year: '1st Year PG', cgpa: '8.1/10.0' },
    certifications: [{ id: 'cert-12', name: 'Biostatistics in Clinical Research', issuer: 'ICMR', date: '2025-10', status: 'Verified' }],
    projects: [{ title: 'Statistical Meta-Analysis of Homoeopathy in Atopic Dermatitis', desc: 'Analyzed clinical data from 8 national clinics using SPSS.' }],
    achievements: ['Gold Medalist in BHMS Pathology block'],
    resumeName: 'Siddharth_Roy_MD.pdf',
    assessmentScores: { 'Domain Knowledge': 82, 'Scientific/Clinical Skills': 80, 'Technical/Data Skills': 85, 'Communication': 75, 'Regulatory/Compliance': 78 }
  },
  {
    id: 'std-8',
    name: 'Meera Iyer',
    email: 'meera.iyer@aiia.gov.in',
    phone: '+91 81234 98765',
    institutionId: 'inst-2',
    avatar: 'MI',
    targetRole: 'Quality Assurance Manager',
    skills: ['Quality Assurance', 'Regulatory Compliance', 'Drug Standardization', 'Phytochemistry', 'Pharmacognosy', 'Project Management'],
    education: { degree: 'MD in Ayurveda (Rasa Shastra)', year: '3rd Year PG', cgpa: '9.3/10.0' },
    certifications: [{ id: 'cert-13', name: 'ISO 22716 Cosmetics GMP Certification', issuer: 'SGS India', date: '2025-11', status: 'Verified' }],
    projects: [{ title: 'Heavy Metal Profiling and Standard Operating Procedures for Bhasmas', desc: 'Defined validation frameworks using ICP-MS to prove toxicity levels are within classical bounds.' }],
    achievements: ['Patented a standardized method for rapid incineration testing of Rasa preparations'],
    resumeName: 'Meera_Iyer_RasaShastra_QA.pdf',
    assessmentScores: { 'Domain Knowledge': 95, 'Scientific/Clinical Skills': 92, 'Technical/Data Skills': 70, 'Communication': 88, 'Regulatory/Compliance': 94 }
  },
  {
    id: 'std-9',
    name: 'Aditya Sen',
    email: 'aditya.sen@nih.nic.in',
    phone: '+91 90022 44668',
    institutionId: 'inst-3',
    avatar: 'AS',
    targetRole: 'Homeopathic Pharmacist',
    skills: ['Drug Standardization', 'Pharmacognosy', 'Regulatory Compliance', 'Quality Assurance', 'Botanical Identification'],
    education: { degree: 'BHMS', year: 'Final Year', cgpa: '7.5/10.0' },
    certifications: [{ id: 'cert-14', name: 'Pharmacognostical Techniques', issuer: 'NIH', date: '2025-06', status: 'Verified' }],
    projects: [{ title: 'Botanical Authentication of Calendula Officinalis Raw Stocks', desc: 'Created reference microscopical slices to detect common adulterants.' }],
    achievements: [],
    resumeName: 'Aditya_Sen_BHMS.pdf',
    assessmentScores: { 'Domain Knowledge': 78, 'Scientific/Clinical Skills': 74, 'Technical/Data Skills': 50, 'Communication': 70, 'Regulatory/Compliance': 82 }
  },
  {
    id: 'std-10',
    name: 'Sonam Wangchuk',
    email: 'sonam.w@nisr.gov.in',
    phone: '+91 70066 55443',
    institutionId: 'inst-4',
    avatar: 'SW',
    targetRole: 'Herbal Supply Chain Analyst',
    skills: ['Botanical Identification', 'Herbal Formulation', 'Project Management', 'Data Analysis', 'IPR & Patent Filing'],
    education: { degree: 'BSRMS', year: 'Internship Phase', cgpa: '8.0/10.0' },
    certifications: [{ id: 'cert-15', name: 'IPR in Traditional Medicine', issuer: 'WIPO', date: '2025-10', status: 'Pending' }],
    projects: [{ title: 'Geographical Origin Tracking of Ladakh Seabuckthorn', desc: 'Designed a simple inventory spreadsheet system mapping collection locations for wild seabuckthorn berries.' }],
    achievements: ['Organized the Himalayan Local Healers conference in Leh, 2025'],
    resumeName: 'Sonam_Wangchuk_Sowa_Rigpa.pdf',
    assessmentScores: { 'Domain Knowledge': 85, 'Scientific/Clinical Skills': 75, 'Technical/Data Skills': 65, 'Communication': 80, 'Regulatory/Compliance': 72 }
  },
  {
    id: 'std-11',
    name: 'Vikram Choudhary',
    email: 'vikram.c@nia.nic.in',
    phone: '+91 97711 00223',
    institutionId: 'inst-1',
    avatar: 'VC',
    targetRole: 'Ayurvedic Clinical Consultant',
    skills: ['Ayurvedic Pharmacology', 'Panchakarma Therapy', 'Dietetics & Nutrition', 'Communication', 'Interpersonal Skills'],
    education: { degree: 'BAMS', year: 'Final Year', cgpa: '7.9/10.0' },
    certifications: [],
    projects: [{ title: 'Pathya (Diet) in Chronic Inflammatory Bowel Disease', desc: 'Monitored dietary adjustments and symptomatology in a 30-case study.' }],
    achievements: [],
    resumeName: 'Vikram_C_BAMS_Resume.pdf',
    assessmentScores: { 'Domain Knowledge': 80, 'Scientific/Clinical Skills': 75, 'Technical/Data Skills': 48, 'Communication': 84, 'Regulatory/Compliance': 65 }
  },
  {
    id: 'std-12',
    name: 'Neha Kapur',
    email: 'neha.kapur@aiia.gov.in',
    phone: '+91 94191 11223',
    institutionId: 'inst-2',
    avatar: 'NK',
    targetRole: 'Phytochemist Researcher',
    skills: ['Phytochemistry', 'Drug Standardization', 'Pharmacognosy', 'Research Methodology', 'LIMS (Lab Information Systems)', 'SQL & Database Management'],
    education: { degree: 'M.Sc. in Botany / Ayush Ph.D. Scholar', year: '3rd Year Scholar', cgpa: '9.5/10.0' },
    certifications: [{ id: 'cert-16', name: 'High-Performance Thin-Layer Chromatography (HPTLC)', issuer: 'CAMAG', date: '2025-04', status: 'Verified' }],
    projects: [{ title: 'Fingerprinting of Triphala Churna Extracts', desc: 'Identified Gallic Acid ratios across five commercial brands using HPTLC methods.' }],
    achievements: ['Best Poster Award at World Ayurveda Congress 2025'],
    resumeName: 'Neha_Kapur_Phd_Phytochem.pdf',
    assessmentScores: { 'Domain Knowledge': 96, 'Scientific/Clinical Skills': 94, 'Technical/Data Skills': 75, 'Communication': 85, 'Regulatory/Compliance': 88 }
  },
  {
    id: 'std-13',
    name: 'Rahul Deshmukh',
    email: 'rahul.d@nia.nic.in',
    phone: '+91 93221 44556',
    institutionId: 'inst-1',
    avatar: 'RD',
    targetRole: 'Hospital Administrator',
    skills: ['Hospital Administration', 'Healthcare Analytics', 'Team Leadership', 'Project Management', 'Quality Assurance', 'Regulatory Compliance'],
    education: { degree: 'BAMS + Master of Hospital Administration (MHA)', year: 'Final Year MHA', cgpa: '8.6/10.0' },
    certifications: [{ id: 'cert-17', name: 'NABH Accreditation Standards Course', issuer: 'Quality Council of India', date: '2025-09', status: 'Verified' }],
    projects: [{ title: 'Optimizing Discharge Cycles in Ayush Tertiary Hospital', desc: 'Reduced average discharge processing time from 4.5 hours to 2.1 hours using queueing models.' }],
    achievements: ['Interned with NABH team during official inspection of NIA Hospital'],
    resumeName: 'Rahul_Deshmukh_MHA.pdf',
    assessmentScores: { 'Domain Knowledge': 82, 'Scientific/Clinical Skills': 70, 'Technical/Data Skills': 75, 'Communication': 92, 'Regulatory/Compliance': 90 }
  },
  {
    id: 'std-14',
    name: 'Divya Joshi',
    email: 'divya.j@aiia.gov.in',
    phone: '+91 80900 11223',
    institutionId: 'inst-2',
    avatar: 'DJ',
    targetRole: 'Yoga Clinical Therapist',
    skills: ['Yoga Instruction & Therapy', 'Dietetics & Nutrition', 'Scientific Writing & Communication', 'Community Outreach', 'Research Methodology'],
    education: { degree: 'B.Sc. in Yoga Sciences + PG Diploma in Yoga Therapy', year: 'Final Year PG', cgpa: '8.8/10.0' },
    certifications: [{ id: 'cert-18', name: 'Yoga Therapist Certification', issuer: 'YCB Ministry of Ayush', date: '2025-03', status: 'Verified' }],
    projects: [{ title: 'Yoga for Post-Viral Fatigue Syndrome', desc: 'Supervised clinical protocols combining Pranayama and restorative postures in post-COVID recovery cases.' }],
    achievements: ['Gold Medalist, National Yoga Asana Championship 2024'],
    resumeName: 'Divya_Joshi_YogaTherapy.pdf',
    assessmentScores: { 'Domain Knowledge': 90, 'Scientific/Clinical Skills': 80, 'Technical/Data Skills': 55, 'Communication': 94, 'Regulatory/Compliance': 80 }
  },
  {
    id: 'std-15',
    name: 'Kunzang Choden',
    email: 'kunzang.c@nisr.gov.in',
    phone: '+91 70889 00112',
    institutionId: 'inst-4',
    avatar: 'KC',
    targetRole: 'Traditional Dietetic Consultant',
    skills: ['Dietetics & Nutrition', 'Herbal Formulation', 'Botanical Identification', 'Community Outreach', 'Interpersonal Skills'],
    education: { degree: 'BSRMS', year: '4th Year', cgpa: '8.2/10.0' },
    certifications: [],
    projects: [{ title: 'Nutritional Analysis of Ladakh Barley Powders (Tsampa)', desc: 'Documented health benefits and formulated low-glycemic dietary variants.' }],
    achievements: [],
    resumeName: 'Kunzang_Choden_SowaRigpa.pdf',
    assessmentScores: { 'Domain Knowledge': 84, 'Scientific/Clinical Skills': 74, 'Technical/Data Skills': 45, 'Communication': 82, 'Regulatory/Compliance': 68 }
  },
  {
    id: 'std-16',
    name: 'Ayush Goel',
    email: 'ayush.goel@nia.nic.in',
    phone: '+91 99009 98877',
    institutionId: 'inst-1',
    avatar: 'AG',
    targetRole: 'Bioinformatics Analyst',
    skills: ['Bioinformatics Tools', 'Python Programming', 'Data Analysis', 'Phytochemistry', 'Research Methodology', 'Machine Learning'],
    education: { degree: 'B.Tech Biotechnology (Ayush Research Minor)', year: '4th Year B.Tech', cgpa: '8.7/10.0' },
    certifications: [{ id: 'cert-19', name: 'Molecular Docking and Drug Design', issuer: 'Bioinformatics Institute', date: '2025-08', status: 'Pending' }],
    projects: [{ title: 'In-Silico Screening of Curcumin Analogs against SARS-CoV-2 Protease', desc: 'Conducted ligand preparation, molecular docking, and ADME prediction using Autodock Vina.' }],
    achievements: ['Won Best Innovation Idea at IIT-Delhi Bio-Design Summit 2025'],
    resumeName: 'Ayush_Goel_Bioinformatics_Resume.pdf',
    assessmentScores: { 'Domain Knowledge': 78, 'Scientific/Clinical Skills': 90, 'Technical/Data Skills': 92, 'Communication': 80, 'Regulatory/Compliance': 74 }
  }
];

// 4. Mock Companies / Recruiter Postings
export const MOCK_COMPANIES = [
  {
    id: 'comp-1',
    name: 'Himalaya Wellness Co.',
    sector: 'Ayush / Wellness',
    logoText: 'HW',
    logoBg: 'bg-emerald-700 text-white',
    desc: 'Himalaya is a global pioneer in herbal health and personal care products, integrating classical Ayurveda with modern clinical science.',
    location: 'Bengaluru, Karnataka',
    website: 'himalayawellness.in'
  },
  {
    id: 'comp-2',
    name: 'Patanjali Research Foundation',
    sector: 'R&D / Ayurveda',
    logoText: 'PR',
    logoBg: 'bg-orange-600 text-white',
    desc: 'Dedicated to scientific validation of herbal medicines, mineral preparations, and Yoga, incorporating state-of-the-art analytical equipment.',
    location: 'Haridwar, Uttarakhand',
    website: 'patanjaliresearchfoundation.org'
  },
  {
    id: 'comp-3',
    name: 'Dabur India Ltd.',
    sector: 'FMCG / Health',
    logoText: 'DB',
    logoBg: 'bg-green-700 text-white',
    desc: 'One of India\'s leading FMCG companies with a legacy of 135+ years delivering herbal and natural healthcare products.',
    location: 'Ghaziabad, Uttar Pradesh',
    website: 'dabur.com'
  },
  {
    id: 'comp-4',
    name: 'Aarogyam MedTech & IT Solutions',
    sector: 'Ayush Informatics',
    logoText: 'AM',
    logoBg: 'bg-indigo-600 text-white',
    desc: 'A technology start-up building telemedicine systems, Prakriti-assessment software, and digital clinical registers for Ayush doctors.',
    location: 'Pune, Maharashtra',
    website: 'aarogyamtech.co.in'
  },
  {
    id: 'comp-5',
    name: 'Kottakkal Arya Vaidya Sala',
    sector: 'Clinical / Therapeutics',
    logoText: 'KA',
    logoBg: 'bg-yellow-800 text-white',
    desc: 'A charitable institution offering classical Ayurvedic medicines and authentic Panchakarma treatments to patients all over the world.',
    location: 'Malappuram, Kerala',
    website: 'aryavaidyasala.com'
  },
  {
    id: 'comp-6',
    name: 'SBL Homeopathy',
    sector: 'Homeopathy Manufacturing',
    logoText: 'SB',
    logoBg: 'bg-blue-700 text-white',
    desc: 'SBL is a leading homeopathic medicines manufacturer in India, committed to standardization and highest quality guidelines.',
    location: 'Sahibabad, Uttar Pradesh',
    website: 'sblglobal.in'
  }
];

export const MOCK_OPPORTUNITIES = [
  {
    id: 'job-1',
    companyId: 'comp-1',
    companyName: 'Himalaya Wellness Co.',
    logoText: 'HW',
    logoBg: 'bg-emerald-700 text-white',
    title: 'Herbal Formulation Intern',
    sector: 'Ayush / Wellness',
    location: 'Bengaluru R&D Lab (Onsite)',
    mode: 'Onsite',
    stipend: '₹22,000 / month',
    stipendNum: 22000,
    duration: '6 Months',
    deadline: '2026-09-15',
    description: 'We are seeking a proactive BAMS or MD Postgraduate intern to work in our Dravyaguna Research Department. The intern will assist in preparing stable herbal syrups and tablets, standardizing raw materials, and reviewing safety literature under senior scientists.',
    requiredSkills: [
      'Herbal Formulation',
      'Ayurvedic Pharmacology',
      'Botanical Identification',
      'Quality Assurance',
      'Research Methodology'
    ],
    status: 'Open',
    type: 'Internship'
  },
  {
    id: 'job-2',
    companyId: 'comp-2',
    companyName: 'Patanjali Research Foundation',
    logoText: 'PR',
    logoBg: 'bg-orange-600 text-white',
    title: 'Clinical Trial Coordinator',
    sector: 'R&D / Ayurveda',
    location: 'Haridwar HQ (Hybrid)',
    mode: 'Hybrid',
    stipend: '₹25,000 / month',
    stipendNum: 25000,
    duration: '6 Months',
    deadline: '2026-09-20',
    description: 'Assist in coordinating phase-II trials on proprietary immunomodulators. Duties include creating case report forms (CRFs), monitoring patient vitals, organizing trial logs, and performing basic data analysis. Knowledge of CDSCO regulations and GCP guidelines is mandatory.',
    requiredSkills: [
      'Clinical Trials Coordination',
      'Clinical Documentation',
      'Regulatory Compliance',
      'Scientific Writing & Communication',
      'Data Analysis'
    ],
    status: 'Open',
    type: 'Internship'
  },
  {
    id: 'job-3',
    companyId: 'comp-4',
    companyName: 'Aarogyam MedTech & IT Solutions',
    logoText: 'AM',
    logoBg: 'bg-indigo-600 text-white',
    title: 'Frontend Developer (Ayush Informatics)',
    sector: 'Ayush Informatics',
    location: 'Pune (Remote)',
    mode: 'Remote',
    stipend: '₹30,000 / month',
    stipendNum: 30000,
    duration: '3 Months',
    deadline: '2026-09-10',
    description: 'We are building a React-based clinic dashboard for Ayurvedic physicians. This role requires implementing patient dashboards, EHR charts, and assessment tools. Candidates should have experience in React, responsive CSS, and a basic understanding of health data variables.',
    requiredSkills: [
      'React & Frontend Dev',
      'Data Analysis',
      'SQL & Database Management',
      'Telemedicine Systems',
      'Presentation Skills'
    ],
    status: 'Open',
    type: 'Internship'
  },
  {
    id: 'job-4',
    companyId: 'comp-5',
    companyName: 'Kottakkal Arya Vaidya Sala',
    logoText: 'KA',
    logoBg: 'bg-yellow-800 text-white',
    title: 'Panchakarma Clinical Resident',
    sector: 'Clinical / Therapeutics',
    location: 'Kottakkal Hospital (Onsite)',
    mode: 'Onsite',
    stipend: '₹18,000 / month',
    stipendNum: 18000,
    duration: '6 Months',
    deadline: '2026-09-30',
    description: 'A hands-on clinical residency for final year BAMS graduates. Work directly with patients undergoing classical treatments (Vamana, Virechana, Basti). The resident will document patient histories, prepare therapy charts, and monitor post-treatment recovery indices.',
    requiredSkills: [
      'Panchakarma Therapy',
      'Ayurvedic Pharmacology',
      'Clinical Documentation',
      'Dietetics & Nutrition',
      'Interpersonal Skills'
    ],
    status: 'Open',
    type: 'Placement'
  },
  {
    id: 'job-5',
    companyId: 'comp-3',
    companyName: 'Dabur India Ltd.',
    logoText: 'DB',
    logoBg: 'bg-green-700 text-white',
    title: 'Quality Assurance Executive',
    sector: 'FMCG / Health',
    location: 'Ghaziabad Factory (Onsite)',
    mode: 'Onsite',
    stipend: '₹35,000 / month',
    stipendNum: 35000,
    duration: 'Full-time',
    deadline: '2026-10-05',
    description: 'Perform standard chemical and pharmacognostical testing on incoming herbal raw materials. Create and update Certificate of Analysis (CoA) records, maintain laboratory inventory, and ensure GMP guidelines are observed across raw material sourcing lines.',
    requiredSkills: [
      'Quality Assurance',
      'Drug Standardization',
      'Pharmacognosy',
      'Regulatory Compliance',
      'Project Management'
    ],
    status: 'Open',
    type: 'Placement'
  },
  {
    id: 'job-6',
    companyId: 'comp-6',
    companyName: 'SBL Homeopathy',
    logoText: 'SB',
    logoBg: 'bg-blue-700 text-white',
    title: 'Homeopathic Quality Analyst',
    sector: 'Homeopathy Manufacturing',
    location: 'Sahibabad Lab (Onsite)',
    mode: 'Onsite',
    stipend: '₹20,000 / month',
    stipendNum: 20000,
    duration: '6 Months',
    deadline: '2026-09-12',
    description: 'Work in our analytics lab standardizing homeopthic mother tinctures and dilutions. Perform TLC, UV-Vis spectrophotometry, and organoleptic testing on raw materials. Review compliance against the Homeopathic Pharmacopoeia of India (HPI).',
    requiredSkills: [
      'Drug Standardization',
      'Regulatory Compliance',
      'Pharmacognosy',
      'Quality Assurance',
      'Research Methodology'
    ],
    status: 'Open',
    type: 'Internship'
  },
  {
    id: 'job-7',
    companyId: 'comp-1',
    companyName: 'Himalaya Wellness Co.',
    logoText: 'HW',
    logoBg: 'bg-emerald-700 text-white',
    title: 'Regulatory Affairs Associate',
    sector: 'Ayush / Wellness',
    location: 'Bengaluru HQ (Onsite)',
    mode: 'Onsite',
    stipend: '₹40,000 / month',
    stipendNum: 40000,
    duration: 'Full-time',
    deadline: '2026-09-25',
    description: 'Review product labeling, safety sheets, and manufacturing dossiers for global export registration. Coordinate with laboratory testing teams to compile data required for FDA, CDSCO, and international regulatory filings.',
    requiredSkills: [
      'Regulatory Compliance',
      'Scientific Writing & Communication',
      'Project Management',
      'Quality Assurance',
      'IPR & Patent Filing'
    ],
    status: 'Open',
    type: 'Placement'
  },
  {
    id: 'job-8',
    companyId: 'comp-2',
    companyName: 'Patanjali Research Foundation',
    logoText: 'PR',
    logoBg: 'bg-orange-600 text-white',
    title: 'Phytochemistry Research Intern',
    sector: 'R&D / Ayurveda',
    location: 'Haridwar HQ (Onsite)',
    mode: 'Onsite',
    stipend: '₹24,000 / month',
    stipendNum: 24000,
    duration: '6 Months',
    deadline: '2026-09-18',
    description: 'Extract and profile active secondary metabolites from Himalayan herbs. The intern will operate extraction assemblies, prepare fractions, and perform phytochemical tests. Candidates must have solid laboratory safety awareness and basic organic chemistry background.',
    requiredSkills: [
      'Phytochemistry',
      'Drug Standardization',
      'Research Methodology',
      'Quality Assurance',
      'Data Analysis'
    ],
    status: 'Open',
    type: 'Internship'
  },
  {
    id: 'job-9',
    companyId: 'comp-4',
    companyName: 'Aarogyam MedTech & IT Solutions',
    logoText: 'AM',
    logoBg: 'bg-indigo-600 text-white',
    title: 'Telemedicine Systems Associate',
    sector: 'Ayush Informatics',
    location: 'Pune (Hybrid)',
    mode: 'Hybrid',
    stipend: '₹22,000 / month',
    stipendNum: 22000,
    duration: '6 Months',
    deadline: '2026-09-14',
    description: 'Work with the operations team to deploy telemedicine kiosks in wellness clinics. Gather user requirements, perform system testing, customize software fields for ayurvedic terminology, and train local staff on operating dashboards.',
    requiredSkills: [
      'Telemedicine Systems',
      'Healthcare Analytics',
      'Presentation Skills',
      'Team Leadership',
      'Community Outreach'
    ],
    status: 'Open',
    type: 'Internship'
  },
  {
    id: 'job-10',
    companyId: 'comp-5',
    companyName: 'Kottakkal Arya Vaidya Sala',
    logoText: 'KA',
    logoBg: 'bg-yellow-800 text-white',
    title: 'Diet & Nutritionist Consultant',
    sector: 'Clinical / Therapeutics',
    location: 'Kochi Branch (Onsite)',
    mode: 'Onsite',
    stipend: '₹32,000 / month',
    stipendNum: 32000,
    duration: 'Full-time',
    deadline: '2026-10-01',
    description: 'Evaluate patient lifestyle and dietetic habits to structure personalized diet plans based on classical Ayurvedic concepts (Pathya/Apathya, Ahara) alongside modern caloric metrics. The candidate will run nutritional workshops and consult outpatients.',
    requiredSkills: [
      'Dietetics & Nutrition',
      'Ayurvedic Pharmacology',
      'Communication',
      'Interpersonal Skills',
      'Presentation Skills'
    ],
    status: 'Open',
    type: 'Placement'
  }
];

// 5. Mock Application Records
export const MOCK_APPLICATIONS = [
  {
    id: 'app-1',
    studentId: 'std-1',
    opportunityId: 'job-1',
    status: 'Shortlisted',
    appliedDate: '2026-08-10',
    feedback: 'Excellent resume showing BAMS research minor. Scheduled for technical interview.',
    timeline: [
      { status: 'Applied', date: '2026-08-10', description: 'Application submitted online' },
      { status: 'Shortlisted', date: '2026-08-18', description: 'Resume screening cleared. Shortlisted for round 2.' }
    ]
  },
  {
    id: 'app-2',
    studentId: 'std-1',
    opportunityId: 'job-2',
    status: 'Applied',
    appliedDate: '2026-08-25',
    feedback: 'Awaiting initial profile review.',
    timeline: [
      { status: 'Applied', date: '2026-08-25', description: 'Application submitted online' }
    ]
  },
  {
    id: 'app-3',
    studentId: 'std-2',
    opportunityId: 'job-2',
    status: 'Interview',
    appliedDate: '2026-08-12',
    feedback: 'Interview scheduled for Sep 2nd at 10 AM via MS Teams. Topic: CDSCO clinical regulations.',
    timeline: [
      { status: 'Applied', date: '2026-08-12', description: 'Application submitted online' },
      { status: 'Shortlisted', date: '2026-08-15', description: 'Shortlisted based on research profile' },
      { status: 'Interview', date: '2026-08-20', description: 'Round 1 cleared. Final technical panel interview scheduled.' }
    ]
  },
  {
    id: 'app-4',
    studentId: 'std-3',
    opportunityId: 'job-4',
    status: 'Applied',
    appliedDate: '2026-08-28',
    feedback: 'Awaiting hospital selection process.',
    timeline: [
      { status: 'Applied', date: '2026-08-28', description: 'Application submitted online' }
    ]
  },
  {
    id: 'app-5',
    studentId: 'std-6',
    opportunityId: 'job-3',
    status: 'Selected',
    appliedDate: '2026-08-05',
    feedback: 'Congratulations! Selected as Frontend Intern. Joining letter sent via email.',
    timeline: [
      { status: 'Applied', date: '2026-08-05', description: 'Application submitted online' },
      { status: 'Shortlisted', date: '2026-08-10', description: 'Cleared coding assessment' },
      { status: 'Interview', date: '2026-08-15', description: 'Technical & HR interviews completed' },
      { status: 'Selected', date: '2026-08-22', description: 'Offer extended and accepted' }
    ]
  },
  {
    id: 'app-6',
    studentId: 'std-8',
    opportunityId: 'job-5',
    status: 'Selected',
    appliedDate: '2026-08-01',
    feedback: 'Offer extended for QA Executive position.',
    timeline: [
      { status: 'Applied', date: '2026-08-01', description: 'Application submitted' },
      { status: 'Shortlisted', date: '2026-08-04', description: 'Shortlisted for written round' },
      { status: 'Interview', date: '2026-08-12', description: 'Completed plant visit and interview' },
      { status: 'Selected', date: '2026-08-19', description: 'Selected. Onboarding scheduled for Oct 1st.' }
    ]
  },
  {
    id: 'app-7',
    studentId: 'std-13',
    opportunityId: 'job-9',
    status: 'Interview',
    appliedDate: '2026-08-14',
    feedback: 'Operations round scheduled for Sep 1st.',
    timeline: [
      { status: 'Applied', date: '2026-08-14', description: 'Application submitted' },
      { status: 'Shortlisted', date: '2026-08-18', description: 'Shortlisted for clinical informatics overview' },
      { status: 'Interview', date: '2026-08-24', description: 'Operational discussion scheduled' }
    ]
  }
];

// 6. Mock Industry-Offered Faculty Opportunities & Collaborations
export const MOCK_FACULTY_OPPORTUNITIES = [
  {
    id: 'fop-1',
    companyName: 'Himalaya Wellness Co.',
    title: 'Research Sabbatical: Chromatographic Isolation of Actives',
    location: 'Bengaluru (Onsite)',
    duration: '2 Months (Summer)',
    stipend: '₹60,000 / month',
    description: 'Faculty residency focusing on hands-on deployment of flash chromatography in separating volatile herbal fractions. Ideal for Dravyaguna or Pharmacognosy professors wishing to bridge industrial R&D processes into syllabus guidelines.',
    deadline: '2026-09-30',
    type: 'Research Sabbatical',
    appliedFaculty: [] // Student/faculty emails who expressed interest
  },
  {
    id: 'fop-2',
    companyName: 'Patanjali Research Foundation',
    title: 'FDP: Modern Quality Systems for Ayush Products',
    location: 'Haridwar (Onsite / Online Hybrid)',
    duration: '1 Week',
    stipend: 'Sponsored (TA/DA + Honorarium)',
    description: 'Faculty Development Program focused on WHO GMP certifications, Heavy Metal limits, and HPLC standard operating protocols. Includes lab tours and hands-on validation modules.',
    deadline: '2026-09-15',
    type: 'Faculty Development Program (FDP)',
    appliedFaculty: ['prof.sharma@nia.edu.in']
  },
  {
    id: 'fop-3',
    companyName: 'Aarogyam MedTech',
    title: 'Joint R&D: Clinical Informatics Datasets in Ayurveda',
    location: 'Pune / Remote',
    duration: '12 Months Collaborative',
    stipend: 'Grant funding up to ₹5,00,000',
    description: 'A sponsored research project aiming to digitize classical diagnostic tables. Seeking collaboration with academic teams to review semantic tags and database mappings against Sanskrit textbooks.',
    deadline: '2026-10-15',
    type: 'Research Collaboration',
    appliedFaculty: []
  }
];

// 7. Mock MoUs / Partnered Collaborations
export const MOCK_COLLABORATIONS = [
  {
    id: 'col-1',
    institutionName: 'National Institute of Ayurveda (NIA)',
    companyName: 'Himalaya Wellness Co.',
    dateSigned: '2024-05-12',
    status: 'Active',
    focus: 'Student Internship Placement and Herbal Extraction research',
    mouDocument: 'MoU_NIA_Himalaya_2024.pdf'
  },
  {
    id: 'col-2',
    institutionName: 'All India Institute of Ayurveda (AIIA)',
    companyName: 'Patanjali Research Foundation',
    dateSigned: '2025-01-20',
    status: 'Active',
    focus: 'Clinical trials validation methodologies and PhD student exchanges',
    mouDocument: 'MoU_AIIA_Patanjali_25.pdf'
  },
  {
    id: 'col-3',
    institutionName: 'National Institute of Homoeopathy (NIH)',
    companyName: 'SBL Homeopathy',
    dateSigned: '2023-11-05',
    status: 'Active',
    focus: 'Manufacturing plant visits, raw materials testing labs standardization',
    mouDocument: 'MoU_NIH_SBL_2023.pdf'
  }
];
