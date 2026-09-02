// Mock Data for Engineering Portal for Academia - Industry Collaboration

// 1. Skill Taxonomy (Engineering & Tech Centric)
export const SKILL_TAXONOMY = [
  // Core Software Engineering & Computer Science
  { id: 'sk-1', name: 'Data Structures & Algorithms', category: 'Technical' },
  { id: 'sk-2', name: 'React & Frontend Dev', category: 'Technical' },
  { id: 'sk-3', name: 'Python Programming', category: 'Technical' },
  { id: 'sk-4', name: 'System Design & Distributed Systems', category: 'Technical' },
  { id: 'sk-5', name: 'SQL & Database Management', category: 'Technical' },
  { id: 'sk-6', name: 'API Development & Microservices', category: 'Technical' },
  { id: 'sk-7', name: 'Cloud Computing (AWS/GCP)', category: 'Technical' },
  { id: 'sk-8', name: 'DevOps & CI/CD Pipelines', category: 'Technical' },
  { id: 'sk-9', name: 'Containerization (Docker & Kubernetes)', category: 'Technical' },
  { id: 'sk-10', name: 'Cybersecurity & Network Protocols', category: 'Technical' },

  // AI, Data Science & Machine Learning
  { id: 'sk-11', name: 'Machine Learning', category: 'Technical' },
  { id: 'sk-12', name: 'Deep Learning (PyTorch/TensorFlow)', category: 'Technical' },
  { id: 'sk-13', name: 'Data Analysis & Visualization', category: 'Technical' },
  { id: 'sk-14', name: 'Large Language Models & GenAI', category: 'Technical' },
  { id: 'sk-15', name: 'Big Data Processing (Kafka/Spark)', category: 'Technical' },
  { id: 'sk-16', name: 'Computer Vision', category: 'Technical' },
  { id: 'sk-17', name: 'Natural Language Processing (NLP)', category: 'Technical' },

  // Core Engineering, Hardware & Embedded
  { id: 'sk-18', name: 'Embedded Systems & RTOS', category: 'Domain' },
  { id: 'sk-19', name: 'IoT & Sensor Networks', category: 'Domain' },
  { id: 'sk-20', name: 'VLSI & Digital System Design', category: 'Domain' },
  { id: 'sk-21', name: 'Robotics & Control Systems', category: 'Domain' },
  { id: 'sk-22', name: 'CAD Modeling & FEA Simulation', category: 'Domain' },
  { id: 'sk-23', name: 'Signal Processing', category: 'Domain' },
  { id: 'sk-24', name: 'Automotive Electronics & CAN Bus', category: 'Domain' },

  // Professional, Soft Skills & Workflow
  { id: 'sk-25', name: 'Problem Solving & Analytical Thinking', category: 'Professional' },
  { id: 'sk-26', name: 'Agile & Scrum Methodologies', category: 'Professional' },
  { id: 'sk-27', name: 'Git & Open Source Workflow', category: 'Professional' },
  { id: 'sk-28', name: 'System Architecture & RFCs', category: 'Professional' },
  { id: 'sk-29', name: 'Unit Testing & Quality Assurance', category: 'Professional' },
  { id: 'sk-30', name: 'Technical Documentation', category: 'Professional' },
  { id: 'sk-31', name: 'Team Leadership', category: 'Professional' },
  { id: 'sk-32', name: 'Presentation & Communication Skills', category: 'Professional' },
  { id: 'sk-33', name: 'Project Management', category: 'Professional' },
  { id: 'sk-34', name: 'Code Review & Clean Code Standards', category: 'Professional' },
];

// Helper to get skill object by name
export const getSkillByName = (name) => SKILL_TAXONOMY.find(s => s.name === name);

// 2. Mock Academic Institutions (Only Engineering Colleges & IITs)
export const MOCK_INSTITUTIONS = [
  {
    id: 'inst-1',
    name: 'Indian Institute of Technology Delhi (IIT Delhi)',
    location: 'Hauz Khas, New Delhi',
    code: 'IITD-110016',
    partneredCompanies: 42,
    studentCount: 3200,
    placementRate: 96,
    avgStipend: 85000,
    contactEmail: 'tnp@admin.iitd.ac.in',
    logoColor: 'from-indigo-600 to-blue-500',
  },
  {
    id: 'inst-2',
    name: 'Indian Institute of Technology Bombay (IIT Bombay)',
    location: 'Powai, Mumbai, Maharashtra',
    code: 'IITB-400076',
    partneredCompanies: 48,
    studentCount: 3500,
    placementRate: 98,
    avgStipend: 95000,
    contactEmail: 'placements@iitb.ac.in',
    logoColor: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'inst-3',
    name: 'Indian Institute of Technology Madras (IIT Madras)',
    location: 'Chennai, Tamil Nadu',
    code: 'IITM-600036',
    partneredCompanies: 45,
    studentCount: 3300,
    placementRate: 97,
    avgStipend: 90000,
    contactEmail: 'placement@iitm.ac.in',
    logoColor: 'from-emerald-600 to-teal-500',
  },
  {
    id: 'inst-4',
    name: 'Indian Institute of Technology Kharagpur (IIT Kharagpur)',
    location: 'Kharagpur, West Bengal',
    code: 'IITKGP-721302',
    partneredCompanies: 38,
    studentCount: 3900,
    placementRate: 94,
    avgStipend: 80000,
    contactEmail: 'tnp@hijli.iitkgp.ac.in',
    logoColor: 'from-amber-600 to-orange-500',
  },
  {
    id: 'inst-5',
    name: 'National Institute of Technology Trichy (NIT Trichy)',
    location: 'Tiruchirappalli, Tamil Nadu',
    code: 'NITT-620015',
    partneredCompanies: 32,
    studentCount: 2800,
    placementRate: 91,
    avgStipend: 65000,
    contactEmail: 'placement@nitt.edu',
    logoColor: 'from-purple-600 to-indigo-500',
  },
  {
    id: 'inst-6',
    name: 'Birla Institute of Technology and Science, Pilani (BITS Pilani)',
    location: 'Pilani, Rajasthan',
    code: 'BITS-333031',
    partneredCompanies: 36,
    studentCount: 2900,
    placementRate: 95,
    avgStipend: 75000,
    contactEmail: 'placement@pilani.bits-pilani.ac.in',
    logoColor: 'from-rose-600 to-pink-500',
  }
];

// 3. Mock Engineering Students
export const MOCK_STUDENTS = [
  {
    id: 'std-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@iitd.ac.in',
    phone: '+91 98765 43210',
    institutionId: 'inst-1',
    institutionName: 'Indian Institute of Technology Delhi (IIT Delhi)',
    avatar: 'AS',
    targetRole: 'Full-Stack Software Development Engineer',
    verifiedSkills: [
      { name: 'Data Structures & Algorithms', level: 'Advanced', score: 95, date: '2026-07-15' },
      { name: 'React & Frontend Dev', level: 'Advanced', score: 90, date: '2026-08-01' },
      { name: 'Python Programming', level: 'Intermediate', score: 78, date: '2026-08-10' },
      { name: 'SQL & Database Management', level: 'Intermediate', score: 74, date: '2026-08-18' }
    ],
    claimedSkills: [
      'System Design & Distributed Systems',
      'Cloud Computing (AWS/GCP)',
      'API Development & Microservices',
      'DevOps & CI/CD Pipelines'
    ],
    skills: [
      'Data Structures & Algorithms',
      'React & Frontend Dev',
      'Python Programming',
      'SQL & Database Management',
      'System Design & Distributed Systems',
      'Cloud Computing (AWS/GCP)',
      'Git & Open Source Workflow',
      'Problem Solving & Analytical Thinking',
      'Unit Testing & Quality Assurance'
    ],
    education: {
      degree: 'B.Tech in Computer Science & Engineering',
      year: 'Final Year (4th Year)',
      cgpa: '8.9/10.0',
    },
    certifications: [
      { id: 'cert-1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2025-06', status: 'Verified' },
      { id: 'cert-2', name: 'Meta Frontend Developer Professional Certificate', issuer: 'Meta', date: '2025-11', status: 'Verified' },
      { id: 'cert-3', name: 'Certified Kubernetes Application Developer (CKAD)', issuer: 'Linux Foundation', date: '2026-02', status: 'Pending' }
    ],
    projects: [
      { title: 'Distributed Key-Value Cache with Raft Consensus', desc: 'Built a resilient, in-memory distributed store in Go using Raft consensus algorithm with partition tolerance.' },
      { title: 'Collaborative Real-Time Code IDE', desc: 'Developed a browser-based pair programming sandbox with WebSockets, syntax highlighting, and Monaco editor.' }
    ],
    achievements: [
      'Knight Rank on LeetCode (2150+ Rating)',
      'Finalist at Smart India Hackathon 2025 (Software Edition)'
    ],
    resumeName: 'Aarav_Sharma_IITDelhi_SWE_Resume.pdf',
    assessmentScores: {
      'Domain Knowledge': 92,
      'System Architecture': 85,
      'Technical/Data Skills': 88,
      'Code Quality & Testing': 80,
      'Problem Solving': 95
    }
  },
  {
    id: 'std-2',
    name: 'Priyanka Patel',
    email: 'priyanka.patel@iitb.ac.in',
    phone: '+91 91234 56789',
    institutionId: 'inst-2',
    institutionName: 'Indian Institute of Technology Bombay (IIT Bombay)',
    avatar: 'PP',
    targetRole: 'Machine Learning & AI Research Engineer',
    verifiedSkills: [
      { name: 'Machine Learning', level: 'Advanced', score: 96, date: '2026-07-20' },
      { name: 'Deep Learning (PyTorch/TensorFlow)', level: 'Advanced', score: 92, date: '2026-08-05' },
      { name: 'Python Programming', level: 'Advanced', score: 94, date: '2026-08-12' },
      { name: 'Data Analysis & Visualization', level: 'Intermediate', score: 78, date: '2026-08-22' }
    ],
    claimedSkills: [
      'Large Language Models & GenAI',
      'System Design & Distributed Systems',
      'Cloud Computing (AWS/GCP)'
    ],
    skills: [
      'Machine Learning',
      'Deep Learning (PyTorch/TensorFlow)',
      'Python Programming',
      'Data Analysis & Visualization',
      'Large Language Models & GenAI',
      'Problem Solving & Analytical Thinking',
      'Technical Documentation'
    ],
    education: {
      degree: 'B.Tech in Data Science & Artificial Intelligence',
      year: 'Final Year (4th Year)',
      cgpa: '9.4/10.0',
    },
    certifications: [
      { id: 'cert-4', name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', date: '2025-08', status: 'Verified' },
      { id: 'cert-5', name: 'TensorFlow Developer Certificate', issuer: 'Google', date: '2026-01', status: 'Verified' }
    ],
    projects: [
      { title: 'Multimodal Vision-Language Reasoning Agent', desc: 'Fine-tuned open-source LLMs using LoRA/QLoRA for automated architectural blueprint defect detection.' }
    ],
    achievements: [
      'Recipient of IIT Bombay Academic Excellence Silver Medal 2025',
      'Co-authored paper accepted at NeurIPS Workshop on Edge AI'
    ],
    resumeName: 'Priyanka_Patel_IITB_ML_Resume.pdf',
    assessmentScores: {
      'Domain Knowledge': 96,
      'System Architecture': 90,
      'Technical/Data Skills': 94,
      'Code Quality & Testing': 88,
      'Problem Solving': 92
    }
  },
  {
    id: 'std-3',
    name: 'Karthik Nair',
    email: 'karthik.nair@iitm.ac.in',
    phone: '+91 94477 12345',
    institutionId: 'inst-3',
    institutionName: 'Indian Institute of Technology Madras (IIT Madras)',
    avatar: 'KN',
    targetRole: 'Embedded Systems & Firmware Engineer',
    verifiedSkills: [
      { name: 'Embedded Systems & RTOS', level: 'Advanced', score: 88, date: '2026-06-15' },
      { name: 'IoT & Sensor Networks', level: 'Intermediate', score: 76, date: '2026-07-10' },
      { name: 'Signal Processing', level: 'Intermediate', score: 72, date: '2026-08-02' }
    ],
    claimedSkills: [
      'Robotics & Control Systems',
      'Python Programming',
      'Data Structures & Algorithms'
    ],
    skills: [
      'Embedded Systems & RTOS',
      'IoT & Sensor Networks',
      'Robotics & Control Systems',
      'Signal Processing',
      'Python Programming',
      'Problem Solving & Analytical Thinking'
    ],
    education: {
      degree: 'B.Tech in Electrical & Electronics Engineering',
      year: '3rd Year',
      cgpa: '8.3/10.0',
    },
    certifications: [
      { id: 'cert-6', name: 'ARM Cortex-M Microcontroller Programming', issuer: 'STMicroelectronics', date: '2025-05', status: 'Verified' },
      { id: 'cert-7', name: 'RTOS Kernel Architecture', issuer: 'FreeRTOS Foundation', date: '2025-10', status: 'Pending' }
    ],
    projects: [
      { title: 'Autonomous Quadcopter Flight Controller', desc: 'Designed custom PCB and implemented PID stabilization in C with IMU sensor fusion running FreeRTOS.' }
    ],
    achievements: [
      '1st Place at IIT Madras Shaastra Robotics Competition 2025'
    ],
    resumeName: 'Karthik_Nair_IITM_Embedded.pdf',
    assessmentScores: {
      'Domain Knowledge': 85,
      'System Architecture': 78,
      'Technical/Data Skills': 80,
      'Code Quality & Testing': 75,
      'Problem Solving': 88
    }
  },
  {
    id: 'std-4',
    name: 'Anjali Das',
    email: 'anjali.das@iitkgp.ac.in',
    phone: '+91 88877 66554',
    institutionId: 'inst-4',
    institutionName: 'Indian Institute of Technology Kharagpur (IIT Kharagpur)',
    avatar: 'AD',
    targetRole: 'Cloud & DevOps Solutions Architect',
    verifiedSkills: [
      { name: 'Cloud Computing (AWS/GCP)', level: 'Advanced', score: 94, date: '2026-07-01' },
      { name: 'DevOps & CI/CD Pipelines', level: 'Advanced', score: 90, date: '2026-07-25' },
      { name: 'Containerization (Docker & Kubernetes)', level: 'Advanced', score: 92, date: '2026-08-14' },
      { name: 'System Design & Distributed Systems', level: 'Intermediate', score: 75, date: '2026-08-20' }
    ],
    claimedSkills: [
      'Python Programming',
      'SQL & Database Management',
      'API Development & Microservices'
    ],
    skills: [
      'Cloud Computing (AWS/GCP)',
      'DevOps & CI/CD Pipelines',
      'Containerization (Docker & Kubernetes)',
      'System Design & Distributed Systems',
      'Python Programming',
      'SQL & Database Management'
    ],
    education: {
      degree: 'M.Tech in Software Engineering & Cloud Systems',
      year: '2nd Year Postgraduate',
      cgpa: '9.0/10.0',
    },
    certifications: [
      { id: 'cert-8', name: 'AWS Certified Solutions Architect - Associate', issuer: 'Amazon Web Services', date: '2025-09', status: 'Verified' }
    ],
    projects: [
      { title: 'Automated Multi-Region Canary Deployment Pipeline', desc: 'Engineered GitOps workflow with ArgoCD, Terraform, and Kubernetes with zero-downtime rollbacks.' }
    ],
    achievements: [
      'Organized DevopsDays IIT Kharagpur 2025'
    ],
    resumeName: 'Anjali_Das_IITKGP_Cloud.pdf',
    assessmentScores: {
      'Domain Knowledge': 90,
      'System Architecture': 92,
      'Technical/Data Skills': 89,
      'Code Quality & Testing': 86,
      'Problem Solving': 88
    }
  },
  {
    id: 'std-5',
    name: 'Tenzin Gyatso',
    email: 'tenzin.g@nitt.edu',
    phone: '+91 70011 22334',
    institutionId: 'inst-5',
    institutionName: 'National Institute of Technology Trichy (NIT Trichy)',
    avatar: 'TG',
    targetRole: 'Robotics & Automation Specialist',
    verifiedSkills: [
      { name: 'Robotics & Control Systems', level: 'Advanced', score: 90, date: '2026-06-28' },
      { name: 'CAD Modeling & FEA Simulation', level: 'Advanced', score: 86, date: '2026-07-12' },
      { name: 'IoT & Sensor Networks', level: 'Intermediate', score: 74, date: '2026-08-04' }
    ],
    claimedSkills: [
      'Python Programming',
      'Embedded Systems & RTOS',
      'Data Structures & Algorithms'
    ],
    skills: [
      'Robotics & Control Systems',
      'CAD Modeling & FEA Simulation',
      'IoT & Sensor Networks',
      'Python Programming',
      'Problem Solving & Analytical Thinking',
      'Team Leadership'
    ],
    education: {
      degree: 'B.Tech in Mechanical & Automation Engineering',
      year: 'Final Year',
      cgpa: '8.6/10.0',
    },
    certifications: [
      { id: 'cert-9', name: 'ROS2 (Robot Operating System) Developer', issuer: 'Open Robotics', date: '2025-07', status: 'Verified' }
    ],
    projects: [
      { title: '6-DOF Collaborative Robotic Arm for Assembly', desc: 'Designed inverse kinematic trajectory planner with obstacle avoidance using stereo vision.' }
    ],
    achievements: [
      'Team Captain, NIT Trichy Rover Society at University Rover Challenge'
    ],
    resumeName: 'Tenzin_Gyatso_NITT_Robotics.pdf',
    assessmentScores: {
      'Domain Knowledge': 88,
      'System Architecture': 84,
      'Technical/Data Skills': 78,
      'Code Quality & Testing': 80,
      'Problem Solving': 86
    }
  },
  {
    id: 'std-6',
    name: 'Rohit Verma',
    email: 'rohit.verma@pilani.bits-pilani.ac.in',
    phone: '+91 99887 76655',
    institutionId: 'inst-6',
    institutionName: 'Birla Institute of Technology and Science, Pilani (BITS Pilani)',
    avatar: 'RV',
    targetRole: 'Backend & High-Throughput Distributed Systems Engineer',
    verifiedSkills: [
      { name: 'Data Structures & Algorithms', level: 'Advanced', score: 92, date: '2026-07-10' },
      { name: 'API Development & Microservices', level: 'Advanced', score: 88, date: '2026-07-28' },
      { name: 'System Design & Distributed Systems', level: 'Intermediate', score: 76, date: '2026-08-15' },
      { name: 'SQL & Database Management', level: 'Intermediate', score: 70, date: '2026-08-24' }
    ],
    claimedSkills: [
      'Cloud Computing (AWS/GCP)',
      'DevOps & CI/CD Pipelines',
      'Containerization (Docker & Kubernetes)'
    ],
    skills: [
      'Data Structures & Algorithms',
      'API Development & Microservices',
      'System Design & Distributed Systems',
      'SQL & Database Management',
      'Big Data Processing (Kafka/Spark)',
      'Cloud Computing (AWS/GCP)',
      'Containerization (Docker & Kubernetes)'
    ],
    education: {
      degree: 'B.Tech in Computer Science & Engineering',
      year: 'Final Year',
      cgpa: '9.2/10.0',
    },
    certifications: [
      { id: 'cert-10', name: 'Confluent Certified Developer for Apache Kafka', issuer: 'Confluent', date: '2025-12', status: 'Verified' },
      { id: 'cert-11', name: 'Distributed Systems Specialization', issuer: 'Coursera', date: '2025-04', status: 'Verified' }
    ],
    projects: [
      { title: 'Ultra-Low Latency Order Matching Engine', desc: 'Architected an asynchronous matching engine in Rust processing 150,000 orders/sec with p99 latency < 2ms.' }
    ],
    achievements: [
      'Winner, BITS Pilani Annual Hackathon 2025',
      'Selected for Google Summer of Code (GSoC) 2025'
    ],
    resumeName: 'Rohit_Verma_BITS_Systems.pdf',
    assessmentScores: {
      'Domain Knowledge': 94,
      'System Architecture': 96,
      'Technical/Data Skills': 95,
      'Code Quality & Testing': 90,
      'Problem Solving': 93
    }
  }
];

// 4. Mock Companies / Tech Recruiters
export const MOCK_COMPANIES = [
  {
    id: 'comp-1',
    name: 'Google India',
    sector: 'Software & Cloud Infrastructure',
    logoText: 'GO',
    logoBg: 'bg-blue-600 text-white',
    desc: 'Google organizes the world\'s information and makes it universally accessible and useful through world-class engineering, distributed cloud systems, and AI platforms.',
    location: 'Bengaluru, Karnataka',
    website: 'careers.google.com'
  },
  {
    id: 'comp-2',
    name: 'Microsoft India',
    sector: 'AI & Enterprise Distributed Systems',
    logoText: 'MS',
    logoBg: 'bg-sky-600 text-white',
    desc: 'Microsoft India Research & Development leads foundational breakthroughs in large language models, cloud native computing (Azure), and modern engineering tooling.',
    location: 'Hyderabad, Telangana',
    website: 'careers.microsoft.com'
  },
  {
    id: 'comp-3',
    name: 'NVIDIA India',
    sector: 'Semiconductor, AI & GPU Acceleration',
    logoText: 'NV',
    logoBg: 'bg-emerald-600 text-white',
    desc: 'NVIDIA pioneered accelerated computing to tackle challenges no one else can solve. Our work in AI, graphics, and robotics is transforming the world\'s largest industries.',
    location: 'Bengaluru, Karnataka',
    website: 'nvidia.com/careers'
  },
  {
    id: 'comp-4',
    name: 'Qualcomm India',
    sector: 'Embedded Systems & Wireless SoC',
    logoText: 'QC',
    logoBg: 'bg-indigo-700 text-white',
    desc: 'Qualcomm is the world\'s leading wireless technology innovator, inventing technologies that transform how the world connects, computes, and communicates.',
    location: 'Hyderabad, Telangana',
    website: 'qualcomm.com/careers'
  },
  {
    id: 'comp-5',
    name: 'TCS Research & Innovations',
    sector: 'Enterprise Architecture & Applied AI',
    logoText: 'TC',
    logoBg: 'bg-slate-800 text-white',
    desc: 'TCS Research invents future-ready technologies, architecting next-generation distributed systems, quantum algorithms, and resilient industrial software.',
    location: 'Pune, Maharashtra',
    website: 'tcs.com/research'
  },
  {
    id: 'comp-6',
    name: 'Infosys Innovation Labs',
    sector: 'Cloud Engineering & Digital Transformation',
    logoText: 'IN',
    logoBg: 'bg-blue-800 text-white',
    desc: 'Infosys is a global leader in next-generation digital services and consulting, empowering engineering talent to build scalable solutions.',
    location: 'Bengaluru, Karnataka',
    website: 'infosys.com'
  }
];

// 5. Mock Opportunities / Engineering Postings
export const MOCK_OPPORTUNITIES = [
  {
    id: 'job-1',
    companyId: 'comp-1',
    companyName: 'Google India',
    logoText: 'GO',
    logoBg: 'bg-blue-600 text-white',
    title: 'Software Development Engineer (SDE) Intern',
    sector: 'Software & Cloud Infrastructure',
    location: 'Bengaluru Engineering Centre (Hybrid)',
    mode: 'Hybrid',
    stipend: '₹1,00,000 / month',
    stipendNum: 100000,
    duration: '6 Months',
    deadline: '2026-09-25',
    description: 'Join Google core infrastructure and product teams. You will design, develop, test, deploy, maintain, and enhance scalable software solutions solving complex distributed computing and system performance challenges.',
    requiredSkills: [
      'Data Structures & Algorithms',
      'Python Programming',
      'System Design & Distributed Systems',
      'Problem Solving & Analytical Thinking',
      'Git & Open Source Workflow'
    ],
    status: 'Open',
    type: 'Internship'
  },
  {
    id: 'job-2',
    companyId: 'comp-2',
    companyName: 'Microsoft India',
    logoText: 'MS',
    logoBg: 'bg-sky-600 text-white',
    title: 'AI & Machine Learning Research Intern',
    sector: 'AI & Enterprise Distributed Systems',
    location: 'Hyderabad Campus (Onsite)',
    mode: 'Onsite',
    stipend: '₹90,000 / month',
    stipendNum: 90000,
    duration: '6 Months',
    deadline: '2026-09-30',
    description: 'Work with Microsoft Research scientists and Azure AI engineers on next-generation Generative AI models, vector search optimization, and fine-tuning reasoning architectures for enterprise workloads.',
    requiredSkills: [
      'Machine Learning',
      'Deep Learning (PyTorch/TensorFlow)',
      'Large Language Models & GenAI',
      'Python Programming',
      'Problem Solving & Analytical Thinking'
    ],
    status: 'Open',
    type: 'Internship'
  },
  {
    id: 'job-3',
    companyId: 'comp-3',
    companyName: 'NVIDIA India',
    logoText: 'NV',
    logoBg: 'bg-emerald-600 text-white',
    title: 'Computer Vision & Deep Learning Engineer',
    sector: 'Semiconductor, AI & GPU Acceleration',
    location: 'Bengaluru Tech Park (Onsite)',
    mode: 'Onsite',
    stipend: '₹95,000 / month',
    stipendNum: 95000,
    duration: 'Full-time',
    deadline: '2026-10-15',
    description: 'Build real-time perception models and CUDA-accelerated vision pipelines for autonomous robotics, synthetic sensor simulation, and neural rendering engines.',
    requiredSkills: [
      'Computer Vision',
      'Deep Learning (PyTorch/TensorFlow)',
      'Python Programming',
      'Signal Processing',
      'Unit Testing & Quality Assurance'
    ],
    status: 'Open',
    type: 'Placement'
  },
  {
    id: 'job-4',
    companyId: 'comp-4',
    companyName: 'Qualcomm India',
    logoText: 'QC',
    logoBg: 'bg-indigo-700 text-white',
    title: 'Embedded Firmware & SoC Intern',
    sector: 'Embedded Systems & Wireless SoC',
    location: 'Hyderabad R&D Lab (Onsite)',
    mode: 'Onsite',
    stipend: '₹75,000 / month',
    stipendNum: 75000,
    duration: '6 Months',
    deadline: '2026-09-20',
    description: 'Develop and validate low-level device drivers, power management firmware, and hardware abstraction layer (HAL) protocols for next-generation Snapdragon processing architectures.',
    requiredSkills: [
      'Embedded Systems & RTOS',
      'VLSI & Digital System Design',
      'IoT & Sensor Networks',
      'Signal Processing',
      'Problem Solving & Analytical Thinking'
    ],
    status: 'Open',
    type: 'Internship'
  },
  {
    id: 'job-5',
    companyId: 'comp-5',
    companyName: 'TCS Research & Innovations',
    logoText: 'TC',
    logoBg: 'bg-slate-800 text-white',
    title: 'Cloud & Distributed Systems Architect',
    sector: 'Enterprise Architecture & Applied AI',
    location: 'Pune Research Park (Hybrid)',
    mode: 'Hybrid',
    stipend: '₹60,000 / month',
    stipendNum: 60000,
    duration: 'Full-time',
    deadline: '2026-10-05',
    description: 'Design zero-trust multi-cloud platforms, event-driven streaming fabrics with Kafka, and automated Kubernetes operators for mission-critical enterprise systems.',
    requiredSkills: [
      'Cloud Computing (AWS/GCP)',
      'Containerization (Docker & Kubernetes)',
      'DevOps & CI/CD Pipelines',
      'System Design & Distributed Systems',
      'SQL & Database Management'
    ],
    status: 'Open',
    type: 'Placement'
  },
  {
    id: 'job-6',
    companyId: 'comp-6',
    companyName: 'Infosys Innovation Labs',
    logoText: 'IN',
    logoBg: 'bg-blue-800 text-white',
    title: 'Full-Stack Cloud Developer Intern',
    sector: 'Cloud Engineering & Digital Transformation',
    location: 'Bengaluru Campus (Remote Available)',
    mode: 'Remote',
    stipend: '₹50,000 / month',
    stipendNum: 50000,
    duration: '6 Months',
    deadline: '2026-09-18',
    description: 'Develop responsive, highly interactive web applications and microservices. Build modern UI workflows with React, implement secure REST/GraphQL APIs, and write robust unit tests.',
    requiredSkills: [
      'React & Frontend Dev',
      'API Development & Microservices',
      'SQL & Database Management',
      'Unit Testing & Quality Assurance',
      'Git & Open Source Workflow'
    ],
    status: 'Open',
    type: 'Internship'
  }
];

// 6. Mock Application Records
export const MOCK_APPLICATIONS = [
  {
    id: 'app-1',
    studentId: 'std-1',
    opportunityId: 'job-1',
    status: 'Shortlisted',
    appliedDate: '2026-08-10',
    feedback: 'Outstanding DSA profile and distributed systems projects. Shortlisted for Technical Interview Round 1.',
    timeline: [
      { status: 'Applied', date: '2026-08-10', description: 'Application submitted online' },
      { status: 'Shortlisted', date: '2026-08-18', description: 'Resume screening cleared. Shortlisted for round 1 algorithmic interview.' }
    ]
  },
  {
    id: 'app-2',
    studentId: 'std-1',
    opportunityId: 'job-6',
    status: 'Applied',
    appliedDate: '2026-08-25',
    feedback: 'Application under review by engineering team.',
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
    feedback: 'Round 1 technical discussion on LLM fine-tuning cleared. Final research panel interview scheduled.',
    timeline: [
      { status: 'Applied', date: '2026-08-12', description: 'Application submitted online' },
      { status: 'Shortlisted', date: '2026-08-15', description: 'Shortlisted based on NeurIPS publication' },
      { status: 'Interview', date: '2026-08-20', description: 'Round 1 cleared. Panel interview scheduled.' }
    ]
  },
  {
    id: 'app-4',
    studentId: 'std-3',
    opportunityId: 'job-4',
    status: 'Applied',
    appliedDate: '2026-08-28',
    feedback: 'Awaiting hardware team review.',
    timeline: [
      { status: 'Applied', date: '2026-08-28', description: 'Application submitted online' }
    ]
  },
  {
    id: 'app-5',
    studentId: 'std-4',
    opportunityId: 'job-5',
    status: 'Selected',
    appliedDate: '2026-08-01',
    feedback: 'Congratulations! Selected as Cloud Solutions Architect. Offer package and onboarding guide sent.',
    timeline: [
      { status: 'Applied', date: '2026-08-01', description: 'Application submitted' },
      { status: 'Shortlisted', date: '2026-08-04', description: 'System design screening passed' },
      { status: 'Interview', date: '2026-08-12', description: 'Completed live cloud architecture exercise' },
      { status: 'Selected', date: '2026-08-19', description: 'Offer accepted. Joining date: Nov 1st.' }
    ]
  },
  {
    id: 'app-6',
    studentId: 'std-6',
    opportunityId: 'job-1',
    status: 'Selected',
    appliedDate: '2026-08-05',
    feedback: 'Exceptional performance in Distributed Systems and concurrency rounds. SDE Intern offer extended.',
    timeline: [
      { status: 'Applied', date: '2026-08-05', description: 'Application submitted online' },
      { status: 'Shortlisted', date: '2026-08-10', description: 'Coding assessment 100% score' },
      { status: 'Interview', date: '2026-08-15', description: 'Technical & System Architecture interviews completed' },
      { status: 'Selected', date: '2026-08-22', description: 'Offer extended and confirmed' }
    ]
  }
];

// Empty legacy exports kept for safety
export const MOCK_FACULTY_OPPORTUNITIES = [];
export const MOCK_COLLABORATIONS = [];
