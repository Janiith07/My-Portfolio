import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, User, Code, GraduationCap,
  Mail, Phone, MapPin, Github, Linkedin, Instagram,
  Sun, Moon, Award, ExternalLink,
} from 'lucide-react';
import { Download } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

// ─── Theme definitions ────────────────────────────────────────────────────────
const DARK = {
  page:        'bg-gradient-to-br from-black via-zinc-900 to-black',
  nav:         'bg-black/20 border-white/10',
  navMobile:   'bg-black/40 border-white/10',
  card:        'bg-white/5 border-white/10',
  cardHover:   'hover:border-red-400/50',
  inputBg:     'bg-black/30 border-white/10 text-white',
  tabInactive: 'bg-white/5',
  heading:     'text-white',
  subtext:     'text-white/80',
  muted:       'text-white/60',
  mutedAlt:    'text-white/50',
  navLink:     'text-white/80',
  accent:      'text-red-600',
  accentHover: 'hover:text-red-600',
  skillBar:    'bg-white/10',
  timeline:    'border-red-500/30',
  dot:         'bg-red-500',
  footerBorder:'border-white/10',
  toggleBg:    'bg-zinc-800 border-zinc-600',
  certBadge:   'bg-white/5 border-white/10 text-white/70',
  certTag:     'bg-red-500/10 border-red-500/20 text-red-400',
  certFilter:  'text-white/60 hover:bg-white/10',
};

const LIGHT = {
  page:        'bg-gradient-to-br from-amber-50 via-white to-red-50',
  nav:         'bg-white/80 border-red-100',
  navMobile:   'bg-white/95 border-red-100',
  card:        'bg-white border-red-100 shadow-md',
  cardHover:   'hover:border-red-400',
  inputBg:     'bg-white border-gray-200 text-gray-900',
  tabInactive: 'bg-gray-100',
  heading:     'text-gray-900',
  subtext:     'text-gray-700',
  muted:       'text-gray-500',
  mutedAlt:    'text-gray-400',
  navLink:     'text-gray-700',
  accent:      'text-red-600',
  accentHover: 'hover:text-red-600',
  skillBar:    'bg-gray-200',
  timeline:    'border-red-300',
  dot:         'bg-red-500',
  footerBorder:'border-red-100',
  toggleBg:    'bg-white border-gray-300',
  certBadge:   'bg-gray-50 border-gray-200 text-gray-600',
  certTag:     'bg-red-50 border-red-200 text-red-600',
  certFilter:  'text-gray-500 hover:bg-gray-100',
};

// ─── Issuer logos ─────────────────────────────────────────────────────────────
// ─── Issuer logos — place image files in public/logos/ ───────────────────────
// Supported formats: .png, .jpg, .svg
// Create the folder: public/logos/ and drop each file in with the name below
const ISSUER_LOGO = {
  SLIIT:       '/logos/sliit.png',
  Microsoft:   '/logos/microsoft.png',
  HackerRank:  '/logos/hackerrank.png',
  Fortinet:    '/logos/fortinet.png',
  Helsinki:    '/logos/helsinki.png',
  Cisco:       '/logos/cisco.png',
  Sololearn:   '/logos/sololearn.png',
  Moratuwa:    '/logos/moratuwa.png',
  Simplilearn: '/logos/simplilearn.png',
};

// ─── Reusable Tool Card ───────────────────────────────────────────────────────
const ToolCard = ({ tool, t }) => (
  <div className={`flex flex-col items-center p-6 transition-all duration-300 transform border rounded-2xl ${t.card} ${t.cardHover} hover:scale-105 hover:shadow-lg group`}>
    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full" style={{ backgroundColor: `${tool.color}20` }}>
      <img src={tool.icon} alt={tool.name} className="w-10 h-10" />
    </div>
    <h3 className={`font-semibold text-center transition-colors group-hover:text-red-500 ${t.heading}`}>{tool.name}</h3>
  </div>
);

// ─── Typed Text Hook ──────────────────────────────────────────────────────────
const useTypedText = (words, speed = 100) => {
  const [index, setIndex]       = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward]   = useState(true);
  useEffect(() => {
    if (index >= words.length) return;
    if (forward && subIndex === words[index].length + 1) { setForward(false); return; }
    if (!forward && subIndex === 0) { setForward(true); setIndex((p) => (p + 1) % words.length); return; }
    const timer = setTimeout(() => setSubIndex((p) => p + (forward ? 1 : -1)), forward ? speed : speed / 2);
    return () => clearTimeout(timer);
  }, [subIndex, index, forward, words, speed]);
  return words[index].substring(0, subIndex);
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Portfolio = () => {
  const [isDark, setIsDark]                 = useState(true);
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [activeSection, setActiveSection]   = useState('home');
  const [skillsTab, setSkillsTab]           = useState('technical');
  const [experienceTab, setExperienceTab]   = useState('education');
  const [toolsTab, setToolsTab]             = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll]               = useState(false);
  const [certFilter, setCertFilter]         = useState('All');
  const [showAllCerts, setShowAllCerts]     = useState(false);

  const t = isDark ? DARK : LIGHT;
  const formRef = useRef();

  // ── EmailJS ────────────────────────────────────────────────────────────────
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_g3ubfae', 'template_6bnrzro', formRef.current, '98WMH2QnQgiL94Mgj')
      .then(() => {
        toast.success('Message sent successfully!', {
          style: { background: isDark ? '#1e1e1e' : '#fff', color: isDark ? '#fff' : '#111', border: '1px solid #ef4444' },
        });
        formRef.current.reset();
      }, (err) => {
        toast.error('Something went wrong. Please try again.', {
          style: { background: isDark ? '#1e1e1e' : '#fff', color: isDark ? '#fff' : '#111', border: '1px solid #ef4444' },
        });
        console.error(err.text);
      });
  };

  // ── Scroll ─────────────────────────────────────────────────────────────────
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 100;
      for (const s of ['home', 'about', 'projects', 'tools', 'certifications', 'contact']) {
        const el = document.getElementById(s);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(s); break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Typed text ─────────────────────────────────────────────────────────────
  const typedText = useTypedText(['AI & Machine Learning Developer', 'Deep Learning Practitioner', 'Generative AI Developer','Full-Stack AI Developer', 'AI/ML Enthusiast'], 100);

  // ── Skills ─────────────────────────────────────────────────────────────────
  const technicalSkills = [
    { name: 'Python',                  level: 85 },
    { name: 'TensorFlow / Keras',      level: 78 },
    { name: 'PyTorch',                 level: 75 },
    { name: 'Scikit-learn',            level: 78 },
    { name: 'LangChain & RAG Systems', level: 72 },
    { name: 'Flask / FastAPI',         level: 75 },
    { name: 'SQL',                     level: 80 },
    { name: 'MongoDB',                 level: 75 },
    { name: 'React.js',                level: 70 },
    { name: 'Node.js / Express.js',    level: 70 },
    { name: 'Java',                    level: 75 },
    { name: 'JavaScript',              level: 65 },
  ];

  const softSkills = [
    { name: 'Problem Solving',     level: 90 },
    { name: 'Continuous Learning', level: 90 },
    { name: 'Team Collaboration',  level: 90 },
    { name: 'Communication',       level: 85 },
    { name: 'Time Management',     level: 90 },
    { name: 'Critical Thinking',   level: 85 },
    { name: 'Work Under Pressure', level: 80 },
    { name: 'Adaptability',        level: 85 },
  ];

  const educationData = [
    {
      year: '2024 – 2028',
      title: 'BSc (Hons) in Information Technology',
      institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
      description: 'Specializing in Artificial Intelligence Engineering. CGPA: 3.19 / 4.00',
    },
    {
      year: '2020 – 2023',
      title: 'GCE Advanced Level – Commerce Stream',
      institution: 'Rahula College, Matara',
 
    },
    {
      year: '2020',
      title: 'GCE Ordinary Level',
      institution: "St. Thomas' College, Matara",
  
    },
  ];

  // ── Projects ───────────────────────────────────────────────────────────────
  const projects = [
    {
      title: "People's Healthcare – Intelligent Healthcare System",
      category: 'Web App',
      description: "Full-stack medical center management system with six user roles. Integrated five AI services — skin disease classifier, vitamin deficiency predictor (SVM + DNN ensemble), heart disease risk predictor, clinical guidelines RAG service, and a navigation assistant.",
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Python','FastAPI', 'LangChain', 'ChromaDB', 'TensorFlow/Keras', 'PyTorch', 'scikit-learn'],
      image: './Peoples_Health_WebApp.PNG',
      github: 'https://github.com/Janiith07/intelligent-healthcare-system',
    },
    {
      title: "People's Health Care App – Mobile Application",
      category: 'Mobile App',
      description: 'Cross-platform mobile app for iOS and Android extending the Healthcare web platform with six role-specific interfaces covering appointments, prescriptions, lab tests, pharmacy billing, and an integrated navigation assistant.',
      technologies: ['React Native', 'Node.js', 'Express.js','Expo', 'JavaScript', 'MongoDB', 'Axios', 'REST API'],
      image: './Peoples_Health_Mobile_App.jpeg',
      github: 'https://github.com/Janiith07/peoples-health-care-app',
    },
    {
      title: 'PetVision AI – Pet Image Classification',
      category: 'AI / ML',
      description: 'Cat vs. dog classifier using a custom CNN with full pipeline — preprocessing, augmentation, Batch Normalization, Dropout, and callbacks. Flask backend with drag-and-drop UI showing real-time confidence scores.',
      technologies: ['Python', 'TensorFlow/Keras', 'Scikit-learn', 'Pandas', 'Flask', 'NumPy', 'Matplotlib', 'PCA', 'HTML', 'CSS', 'JavaScript'],
      image: './PetVision_AI.PNG',
      github: 'https://github.com/Janiith07/petvision-ai-cats-dogs-classifier.git',
    },
    {
      title: 'NeuroPrice – Laptop Price Predictor',
      category: 'AI / ML',
      description: 'End-to-end ML pipeline predicting laptop prices from specs. Implemented PCA, feature engineering, and trained Random Forest, XGBoost, and ANN models. Packaged for production with joblib & pickle.',
      technologies: ['Python', 'Flask', 'scikit-learn', 'XGBoost', 'TensorFlow/Keras', 'Pandas', 'NumPy'],
      image: './NeuroPrice.PNG',
      github: 'https://github.com/Janiith07/neuroprice-laptop-price-predictor',
    },
    {
      title: 'StuMind – Student Depression Risk Predictor',
      category: 'AI / ML',
      description: 'ML web app for instant student depression risk assessment. Applied SMOTE, PCA, and trained KNN, Logistic Regression, Random Forest, SVM, and ANN models. Deployed via Flask.',
      technologies: ['Python', 'Flask', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      image: './StuMind.PNG',
      github: 'https://github.com/Janiith07/stumind-depression-predictor',
    },
    {
      title: 'VeloSales – Adidas Business Intelligence Dashboard',
      category: 'DS',
      description: 'Interactive Power BI dashboard analysing Adidas US sales data (2020–2021) with DAX measures, KPI cards, bar/treemap/funnel charts and slicers — uncovering regional sales trends and retailer performance.',
      technologies: ['Power BI', 'DAX', 'Data Visualization', 'Business Intelligence'],
      image: './Adidas.jpg',
      github: 'https://github.com/Janiith07/adidas-sales-performance-analysis.git',
    },
    {
      title: 'SaleSphere – Property Rental System',
      category: 'Web App',
      description: 'Full-stack property rental app connecting Tenants, Landlords, and Admins. Role-based dashboards, property listing/approval workflows, booking management, and reviews system.',
      technologies: ['Java EE', 'Servlets', 'JSP', 'SQL Server', 'HTML', 'Tailwind CSS', 'JavaScript'],
      image: './SaleSphere.png',
      github: 'https://github.com/Janiith07/salesphere-property-rental-system',
    },
    {
      title: 'TOYMART – Java Based E-Commerce Toy Store',
      category: 'Web App',
      description: 'E-commerce toy store using Java OOP, Servlets, and JSP with MVC architecture. File-based storage, DSA-based catalog sorting, and inventory management using Linked Lists.',
      technologies: ['Java', 'Servlets', 'JSP', 'Tomcat', 'HTML', 'CSS', 'JavaScript'],
      image: './Toy_Mart.jpg',
      github: 'https://github.com/Janiith07/TOYMART_Web_Site.git',
    },
    {
      title: 'Thermo Glow – Home Automation System',
      category: 'IOT',
      description: 'IoT-based home automation system for smart temperature and lighting control, integrating sensor data with automated responses for energy-efficient home management.',
      technologies: ['Java', 'Servlets', 'JSP', 'Tomcat', 'HTML', 'CSS', 'JavaScript'],
      image: './Thermo_Glow.png',
      github: 'https://github.com/Janiith07/thermo-glow-iot-project.git',
    },
  ];

  const filteredProjects = projects.filter((p) => activeCategory === 'All' || p.category === activeCategory);

  // ── Certifications ─────────────────────────────────────────────────────────
  const certifications = [
    {
      title: 'AI/ML Engineer – Stage 2',
      issuer: 'SLIIT',
      date: 'May 2026',
      category: 'AI / ML',
      logo: ISSUER_LOGO.SLIIT,
      skills: ['Artificial Intelligence', 'Machine Learning', 'Classification', 'Regression Analysis'],
      credentialUrl: 'https://code.sliit.org/certificates/jd368v0a9v', // TODO: replace with real link
    },
    {
      title: 'AI/ML Engineer – Stage 1',
      issuer: 'SLIIT',
      date: 'Jun 2025',
      category: 'AI / ML',
      logo: ISSUER_LOGO.SLIIT,
      skills: ['Artificial Intelligence', 'Machine Learning', 'Supervised Learning', 'Neural Networks'],
      credentialUrl: 'https://code.sliit.org/certificates/ifwgmmlh23', // TODO: replace with real link
    },
    {
      title: 'Introduction to Machine Learning Concepts',
      issuer: 'Microsoft',
      date: 'Nov 2025',
      category: 'AI / ML',
      logo: ISSUER_LOGO.Microsoft,
      skills: ['Machine Learning', 'Classification', 'Regression', 'Clustering', 'Deep Learning'],
      credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/LakinduJanith-5068/AKP3R437?sharingId=8018719668700F4E', // TODO: replace with real link
    },
    {
      title: 'Introduction to Generative AI and Agents',
      issuer: 'Microsoft',
      date: 'Nov 2025',
      category: 'AI / ML',
      logo: ISSUER_LOGO.Microsoft,
      skills: ['LLMs', 'AI Prompting', 'AI Agents', 'Generative AI'],
      credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/LakinduJanith-5068/ZDDRTK82?sharingId=8018719668700F4E', // TODO: replace with real link
    },
    {
      title: 'Introduction to AI Concepts',
      issuer: 'Microsoft',
      date: 'Nov 2025',
      category: 'AI / ML',
      logo: ISSUER_LOGO.Microsoft,
      skills: ['Generative AI', 'Computer Vision', 'NLP', 'Responsible AI'],
      credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/LakinduJanith-5068/FQQHEKEX?sharingId=8018719668700F4E', // TODO: replace with real link
    },
    {
      title: 'Elements of AI',
      issuer: 'University of Helsinki',
      date: 'Nov 2025',
      category: 'AI / ML',
      logo: ISSUER_LOGO.Helsinki,
      skills: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks', 'Supervised & Unsupervised Learning'],
      credentialUrl: 'https://certificates.mooc.fi/validate/bsck5asmi9', // TODO: replace with real link
    },
    {
      title: 'Explore AI for All',
      issuer: 'Microsoft',
      date: 'Dec 2025',
      category: 'AI / ML',
      logo: ISSUER_LOGO.Microsoft,
      skills: ['AI Accessibility', 'AI in Humanitarian Action', 'Artificial Intelligence'],
      credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/LakinduJanith-5068/YP4AXJUR?sharingId=8018719668700F4E', // TODO: replace with real link
    },
    {
      title: 'Get Started Building with Power BI',
      issuer: 'Microsoft',
      date: 'Apr 2026',
      category: 'Data Science',
      logo: ISSUER_LOGO.Microsoft,
      skills: ['Data Science', 'Data Visualization', 'Data Analytics', 'Business Intelligence'],
      credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/LakinduJanith-5068/37CW2MYH?sharingId=8018719668700F4E', // TODO: replace with real link
    },
    {
      title: 'Python Skill Test',
      issuer: 'HackerRank',
      date: 'Jul 2025',
      category: 'Development',
      logo: ISSUER_LOGO.HackerRank,
      skills: ['Python', 'Software Development'],
      credentialUrl: 'https://www.hackerrank.com/certificates/fbeb551b55a6', // TODO: verify link
    },
    {
      title: 'Java Skill Test',
      issuer: 'HackerRank',
      date: 'Nov 2025',
      category: 'Development',
      logo: ISSUER_LOGO.HackerRank,
      skills: ['Java', 'Object-Oriented Programming'],
      credentialUrl: 'https://www.hackerrank.com/certificates/4d988b385bea', // TODO: verify link
    },
    {
      title: 'SQL Skill Test',
      issuer: 'HackerRank',
      date: 'Nov 2025',
      category: 'Development',
      logo: ISSUER_LOGO.HackerRank,
      skills: ['SQL', 'Database Management', 'Data Querying'],
      credentialUrl: 'https://www.hackerrank.com/certificates/f58b7c3d6c11', // TODO: verify link
    },
    {
      title: 'Web Development',
      issuer: 'Sololearn',
      date: 'Jul 2025',
      category: 'Development',
      logo: ISSUER_LOGO.Sololearn,
      skills: ['HTML', 'CSS', 'JavaScript', 'Software Development'],
      credentialUrl: 'https://www.sololearn.com/certificates/CC-GRGBEPAI', // TODO: replace with real link
    },
    {
      title: 'Web Design for Beginners',
      issuer: 'University of Moratuwa',
      date: 'Jul 2025',
      category: 'Development',
      logo: ISSUER_LOGO.Moratuwa,
      skills: ['HTML', 'CSS', 'JavaScript', 'Software Development'],
      credentialUrl: 'https://open.uom.lk/verify', // TODO: add your credential ID to this link
    },
    {
      title: 'Python for Beginners',
      issuer: 'University of Moratuwa',
      date: 'Jun 2025',
      category: 'Development',
      logo: ISSUER_LOGO.Moratuwa,
      skills: ['Python', 'Software Development'],
      credentialUrl: 'https://open.uom.lk/verify', // TODO: add your credential ID to this link
    },
    {
      title: 'Introduction to Cloud Infrastructure',
      issuer: 'Microsoft',
      date: 'Dec 2025',
      category: 'Cloud',
      logo: ISSUER_LOGO.Microsoft,
      skills: ['Cloud Computing', 'Cloud Security & Governance', 'Cloud Reliability Engineering'],
      credentialUrl: 'https://learn.microsoft.com/api/achievements/share/en-us/LakinduJanith-5068/B9UUGEMD?sharingId=8018719668700F4E', // TODO: replace with real link
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Simplilearn',
      date: 'Nov 2025',
      category: 'Cybersecurity',
      logo: ISSUER_LOGO.Simplilearn,
      skills: ['Cybersecurity', 'Network Security', 'Threat Detection', 'Network Vulnerabilities'],
      credentialUrl: 'https://simpli-web.app.link/e/7DXKRaHzLYb', // TODO: replace with real link
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco Networking Academy',
      date: 'Nov 2025',
      category: 'Cybersecurity',
      logo: ISSUER_LOGO.Cisco,
      skills: ['Cybersecurity', 'Network Security', 'Threat Detection', 'Privacy & Data Confidentiality'],
      credentialUrl: 'https://www.credly.com/badges/7e5c5e0b-59e8-4817-91be-65114a1ab175/public_url', // TODO: replace with real link
    },
    {
      title: 'Fortinet Certified Fundamentals in Cybersecurity',
      issuer: 'Fortinet',
      date: 'Nov 2025',
      category: 'Cybersecurity',
      logo: ISSUER_LOGO.Fortinet,
      skills: ['Application Security', 'Cloud Services', 'Cybersecurity', 'Network Security'],
      credentialUrl: 'https://www.credly.com/badges/bcab23b6-63e3-482a-bec1-70134cc6aed2/public_url', // TODO: add your ID
    },
    {
      title: 'Getting Started in Cybersecurity 3.0',
      issuer: 'Fortinet',
      date: 'Nov 2025',
      category: 'Cybersecurity',
      logo: ISSUER_LOGO.Fortinet,
      skills: ['Cloud Services', 'Endpoint Security', 'Network Access Control', 'Sandboxing'],
      credentialUrl: 'https://www.credly.com/badges/c779f52e-496b-4136-af49-f5339f27d4d6/public_url', // TODO: add your ID
    },
    {
      title: 'Introduction to the Threat Landscape 3.0',
      issuer: 'Fortinet',
      date: 'Nov 2025',
      category: 'Cybersecurity',
      logo: ISSUER_LOGO.Fortinet,
      skills: ['Cybersecurity', 'Information Security', 'Social Engineering', 'Cyber Threat Intelligence'],
      credentialUrl: 'https://www.credly.com/badges/86d0c2f4-492e-4bde-9868-87a42447694a/public_url', // TODO: add your ID
    },
  ];

  const certCategories = ['All', 'AI / ML', 'Data Science', 'Development', 'Cloud', 'Cybersecurity'];
  const filteredCerts = certifications.filter((c) => certFilter === 'All' || c.category === certFilter);
  const visibleCerts  = showAllCerts ? filteredCerts : filteredCerts.slice(0, 6);

  // ── Tools ──────────────────────────────────────────────────────────────────
  const languageTools = [
    { name: 'Python',     color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'JavaScript', color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Java',       color: '#ED8B00', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'HTML',       color: '#E34F26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS',        color: '#1572B6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'SQL',        color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  ];
  const aiMlTools = [
    { name: 'TensorFlow',   color: '#FF6F00', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'PyTorch',      color: '#EE4C2C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'Keras',        color: '#D00000', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg' },
    { name: 'scikit-learn', color: '#F7931E', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
    { name: 'NumPy',        color: '#013243', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    { name: 'Pandas',       color: '#150458', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    { name: 'Matplotlib',   color: '#11557C', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg' },
    { name: 'Seaborn',      color: '#4C8CBF', icon: 'https://seaborn.pydata.org/_images/logo-mark-lightbg.svg' },
    { name: 'LangChain',    color: '#1C3C3C', icon: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4' },
    { name: 'Jupyter',      color: '#F37726', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    { name: 'ChromaDB',     color: '#FF6B35', icon: 'https://images.seeklogo.com/logo-png/48/1/chroma-logo-png_seeklogo-482133.png' },
  ];
  const frameworkTools = [
    { name: 'React',        color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'React Native', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js',      color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express',      color: '#888888', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'Flask',        color: '#888888', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
    { name: 'FastAPI',      color: '#009688', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'Tailwind CSS', color: '#38B2AC', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
    { name: 'Bootstrap',    color: '#7952B3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Expo',         color: '#888888', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg' },
  ];
  const devTools = [
    { name: 'VS Code',        color: '#007ACC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'GitHub',         color: '#888888', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'MongoDB',        color: '#47A248', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'MySQL',          color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Oracle',         color: '#F80000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
    { name: 'Vercel',         color: '#888888', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    { name: 'Netlify',        color: '#00C7B7', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
    { name: 'Render',         color: '#46E3B7', icon: 'https://avatars.githubusercontent.com/u/36424661?s=200&v=4' },
    { name: 'Tomcat',         color: '#F8DC75', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tomcat/tomcat-original.svg' },
  ];
  const designTools = [
    { name: 'Figma', color: '#F24E1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  ];

  const toolMap = { Languages: languageTools, 'AI / ML': aiMlTools, Frameworks: frameworkTools, Tools: devTools, Design: designTools };
  const toolsToShow = toolsTab === 'All'
    ? [...aiMlTools, ...languageTools, ...frameworkTools, ...devTools, ...designTools]
    : toolMap[toolsTab] || [];

  const redBtn   = 'bg-gradient-to-r from-red-600 to-pink-800 hover:from-red-700 hover:to-pink-600 text-white hover:scale-105 hover:shadow-red-500/25 shadow-lg';
  const activeTab = 'bg-gradient-to-r from-red-600 to-pink-800 text-white shadow-lg';

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen transition-colors duration-300 ${t.page}`}>
      <Toaster position="top-right" reverseOrder={false} />

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 ${t.nav}`}>
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-500 via-red-700 to-red-900 bg-clip-text">
              W.A. Lakindu Janith
            </div>
            <div className="hidden space-x-6 md:flex">
              {['home', 'about', 'projects', 'tools', 'certifications', 'contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-red-600 text-sm ${activeSection === item ? 'text-red-600 border-b-2 border-red-600' : t.navLink}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsDark(!isDark)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-110 ${t.toggleBg}`}
                aria-label="Toggle theme">
                {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
              </button>
              <button className={`md:hidden ${t.heading}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className={`border-t md:hidden backdrop-blur-md ${t.navMobile}`}>
            <div className="px-4 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects', 'tools', 'certifications', 'contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item)}
                  className={`block w-full px-3 py-2 text-left capitalize transition-colors hover:text-red-600 ${t.navLink}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section id="home" className="flex items-center justify-center min-h-screen px-6 pt-20">
        <div className="grid items-center w-full max-w-6xl gap-12 mx-auto grid-cols-1 md:grid-cols-2">
          <div className="space-y-6 text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl font-bold text-red-600 md:text-6xl">
              Hi, I'm <span className="text-red-600">Lakindu</span>
            </h1>
            <div style={{height:'2.75rem', overflow:'hidden', display:'flex', alignItems:'center'}}>
              <span className={`text-xl font-semibold md:text-3xl flex-shrink-0 ${t.subtext}`}>I'm a&nbsp;</span>
              <span className="text-red-500 text-xl font-semibold md:text-3xl" style={{whiteSpace:'nowrap'}}>{typedText}<span className="animate-pulse">|</span></span>
            </div>
            <p className={`text-base md:text-lg leading-relaxed ${t.muted}`}>
              AI Engineering undergraduate at SLIIT with a strong interest in Machine Learning, Deep Learning, and Generative AI. Passionate about creating intelligent systems and continuously learning new technologies. Currently looking for an AI/ML internship opportunity.
            </p>
            <div className="flex space-x-6 justify-center md:justify-start">
              <a href="https://github.com/Janiith07" target="_blank" rel="noopener noreferrer" className={`text-2xl transition-colors duration-300 ${t.muted} hover:text-red-600`}><Github /></a>
              <a href="https://www.linkedin.com/in/lakindu-janith-9b16bb318/" target="_blank" rel="noopener noreferrer" className={`text-2xl transition-colors duration-300 ${t.muted} hover:text-red-600`}><Linkedin /></a>
            </div>
            <div className="flex justify-center md:justify-start">
              <a href="/Lakindu_Janith_Resume.pdf" download
                className={`inline-flex items-center gap-2 px-8 py-4 font-semibold transition-all duration-300 transform rounded-full ${redBtn}`}>
                <Download size={18} /> Download CV
              </a>
            </div>
          </div>
          <div className="flex justify-center order-1 md:order-2">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600 to-pink-600 shadow-2xl shadow-red-600/25"></div>
              <img src="./image.jpg" alt="Profile"
                className="absolute inset-0 object-cover w-full h-full border-4 border-red-600 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">About Me</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Introduction */}
            <div className={`p-8 transition-all duration-300 border rounded-2xl ${t.card} ${t.cardHover} hover:scale-105`}>
              <div className="flex items-center mb-6">
                <User className="mr-3 text-red-600" size={24} />
                <h3 className={`text-2xl font-bold ${t.heading}`}>Introduction</h3>
              </div>
              <p className={`leading-relaxed ${t.subtext}`}>
                A second-year Artificial Intelligence Engineering undergraduate at SLIIT, passionate about building intelligent solutions using Artificial Intelligence and Machine Learning. I work across the AI/ML domain — from developing deep learning models and machine learning pipelines to integrating AI solutions into real-world applications. I have experience with Python, TensorFlow, PyTorch, scikit-learn, Generative AI, and full-stack development. Passionate about continuous learning and solving real-world problems through technology. Currently seeking an AI/ML internship to apply my skills, gain industry experience, and grow as an AI engineer.
              </p>
              <div className="flex mt-6 space-x-4">
                <a href="https://github.com/Janiith07" target="_blank" rel="noopener noreferrer" className={`transition-colors ${t.muted} hover:text-red-600`}><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/lakindu-janith-9b16bb318/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${t.muted} hover:text-red-600`}><Linkedin size={20} /></a>
              </div>
            </div>
            {/* Skills */}
            <div className={`p-8 transition-all duration-300 border rounded-2xl ${t.card} ${t.cardHover} hover:scale-105`}>
              <div className="flex items-center mb-6">
                <Code className="mr-3 text-red-600" size={24} />
                <h3 className={`text-2xl font-bold ${t.heading}`}>Skills</h3>
              </div>
              <div className={`flex p-1 mb-6 rounded-lg ${t.tabInactive}`}>
                {['technical', 'soft'].map((tab) => (
                  <button key={tab} onClick={() => setSkillsTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${skillsTab === tab ? activeTab : `${t.muted} hover:text-red-600`}`}>
                    {tab === 'technical' ? 'Technical' : 'Soft Skills'}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {(skillsTab === 'technical' ? technicalSkills : softSkills).map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className={`text-sm ${t.subtext}`}>{skill.name}</span>
                      <span className="text-sm text-red-500">{skill.level}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${t.skillBar}`}>
                      <div className="h-2 transition-all duration-1000 rounded-full bg-gradient-to-r from-red-600 to-pink-500" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Background */}
            <div className={`p-8 transition-all duration-300 border rounded-2xl ${t.card} ${t.cardHover} hover:scale-105`}>
              <div className="flex items-center mb-6">
                <GraduationCap className="mr-3 text-red-600" size={24} />
                <h3 className={`text-2xl font-bold ${t.heading}`}>Background</h3>
              </div>
              <div className={`flex p-1 mb-6 rounded-lg ${t.tabInactive}`}>
                {['education', 'experience'].map((tab) => (
                  <button key={tab} onClick={() => setExperienceTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 capitalize ${experienceTab === tab ? activeTab : `${t.muted} hover:text-red-600`}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="space-y-6">
                {(experienceTab === 'education' ? educationData : []).length === 0 ? (
                  <p className={`text-sm ${t.mutedAlt}`}>No experience entries yet.</p>
                ) : (
                  (experienceTab === 'education' ? educationData : []).map((item, i) => (
                    <div key={i} className={`relative pl-6 border-l-2 ${t.timeline}`}>
                      <div className={`absolute top-0 w-3 h-3 rounded-full -left-2 ${t.dot}`}></div>
                      <div className="mb-1 text-sm font-semibold text-red-500">{item.year}</div>
                      <h4 className={`mb-1 font-semibold ${t.heading}`}>{item.title}</h4>
                      <p className="mb-2 text-sm text-red-500">{item.institution}</p>
                      <p className={`text-sm ${t.muted}`}>{item.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <section id="projects" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">Featured Projects</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Web App', 'Mobile App', 'AI / ML', 'IOT'].map((cat) => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 border ${activeCategory === cat ? `${redBtn} border-transparent` : `${t.muted} border-current hover:text-red-600 hover:border-red-400`}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.slice(0, showAll ? filteredProjects.length : 6).map((project, i) => (
              <div key={i} className={`overflow-hidden transition-all duration-300 border rounded-2xl hover:scale-105 group ${t.card} ${t.cardHover}`}>
                <div className="relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold text-white bg-red-600/80 rounded-full">{project.category}</span>
                </div>
                <div className="p-6">
                  <h3 className={`mb-3 text-xl font-bold ${t.heading}`}>{project.title}</h3>
                  <p className={`mb-4 leading-relaxed text-sm ${t.muted}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, ti) => (
                      <span key={ti} className="px-3 py-1 text-xs text-red-500 border rounded-full bg-red-500/10 border-red-500/30">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-red-600 transition-colors hover:text-red-500">
                        <Github className="mr-1" size={16} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!showAll && filteredProjects.length > 6 && (
            <div className="mt-12 text-center">
              <button onClick={() => setShowAll(true)} className={`px-6 py-3 font-semibold transition-all rounded-full ${redBtn}`}>View More</button>
            </div>
          )}
        </div>
      </section>

      {/* ── Tools ────────────────────────────────────────────────────────── */}
      <section id="tools" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">Tools &amp; Technologies</h2>
          <div className="flex justify-center mb-12">
            <div className={`flex flex-wrap justify-center gap-2 p-2 border rounded-xl ${t.card}`}>
              {['All', 'Languages', 'AI / ML', 'Frameworks', 'Tools', 'Design'].map((cat) => (
                <button key={cat} onClick={() => setToolsTab(cat)}
                  className={`px-5 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm ${toolsTab === cat ? activeTab : `${t.muted} hover:text-red-600 hover:bg-red-500/10`}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {toolsToShow.map((tool, i) => <ToolCard key={`${toolsTab}-${i}`} tool={tool} t={t} />)}
          </div>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────────────────── */}
      <section id="certifications" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-4 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">
            Certifications
          </h2>
          

          {/* Category filter pills */}
          <div className="flex justify-center mb-10">
            <div className={`flex flex-wrap justify-center gap-2 p-2 border rounded-xl ${t.card}`}>
              {certCategories.map((cat) => (
                <button key={cat}
                  onClick={() => { setCertFilter(cat); setShowAllCerts(false); }}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${certFilter === cat ? activeTab : `${t.muted} hover:text-red-600 hover:bg-red-500/10`}`}>
                  {cat}
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${certFilter === cat ? 'bg-white/20' : 'bg-red-500/10 text-red-500'}`}>
                    {cat === 'All' ? certifications.length : certifications.filter(c => c.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cert cards grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleCerts.map((cert, i) => (
              <div key={i}
                className={`group relative flex flex-col p-6 transition-all duration-300 border rounded-2xl ${t.card} ${t.cardHover} hover:scale-105 hover:shadow-lg`}>
                {/* Top row: logo + issuer + date */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border p-1.5 ${t.certBadge}`}>
                    <img src={cert.logo} alt={cert.issuer}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-red-500"><svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\'><circle cx=\'12\' cy=\'8\' r=\'6\'/><path d=\'M15.477 12.89L17 22l-5-3-5 3 1.523-9.11\'/></svg></span>'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm leading-tight mb-1 ${t.heading}`}>{cert.title}</h3>
                    <p className="text-red-500 text-xs font-medium">{cert.issuer}</p>
                    <p className={`text-xs mt-0.5 ${t.mutedAlt}`}>Issued {cert.date}</p>
                  </div>
                  {/* Category pill */}
                  <span className={`flex-shrink-0 px-2 py-1 text-xs font-semibold rounded-lg border ${cert.category === 'AI / ML' ? 'bg-violet-500/10 border-violet-500/30 text-violet-400' : cert.category === 'Data Science' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : cert.category === 'Cloud' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : cert.category === 'Cybersecurity' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                    {cert.category}
                  </span>
                </div>

                {/* Divider */}
                <div className={`w-full h-px mb-4 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}></div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 mb-4" style={{ alignContent: 'flex-start' }}>
                  {cert.skills.map((skill, si) => (
                    <span key={si} className={`text-xs border ${t.certTag}`} style={{ padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', height: '22px', lineHeight: '1', whiteSpace: 'nowrap' }}>{skill}</span>
                  ))}
                </div>

                {/* View Credential button */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-auto text-xs font-semibold text-emerald-400 border border-emerald-500/30 rounded-lg px-3 py-1.5 hover:bg-emerald-500/10 transition-all duration-200 w-fit"
                  >
                    <ExternalLink size={12} />
                    View Credential
                  </a>
                )}

                {/* Award icon watermark */}
                <Award className="absolute bottom-4 right-4 opacity-5 text-red-500" size={48} />
              </div>
            ))}
          </div>

          {/* Show more / less */}
          {filteredCerts.length > 6 && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowAllCerts(!showAllCerts)}
                className={`px-6 py-3 font-semibold transition-all rounded-full ${redBtn}`}>
                {showAllCerts ? 'Show Less' : `View All ${filteredCerts.length} Certifications`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section id="contact" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">Let's Connect</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div className={`flex flex-col h-full p-8 border rounded-2xl shadow-lg ${t.card}`}>
              <h3 className={`mb-6 text-2xl font-bold ${t.heading}`}>Get in Touch</h3>
              <p className={`mb-8 ${t.muted}`}>Feel free to reach out via email, phone, or the contact form.</p>
              <div className="mb-8 space-y-6">
                {[
                  { icon: Mail,   label: 'Email',    value: 'lakindujanith24@gmail.com' },
                  { icon: Phone,  label: 'Phone',    value: '+(94) 72 198 5928' },
                  { icon: MapPin, label: 'Location', value: 'Malabe, Sri Lanka' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <Icon className="text-red-600 shrink-0" size={24} />
                    <div>
                      <h4 className={`font-semibold ${t.heading}`}>{label}</h4>
                      <p className={t.muted}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex mt-auto space-x-6">
                {[
                  { href: 'https://github.com/Janiith07', icon: Github, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/lakindu-janith-9b16bb318/', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'https://www.instagram.com/__lakindu___?igsh=dDMxYTRsaGdraXJm', icon: Instagram, label: 'Instagram' },

                ].map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className={`transition-colors ${t.muted} hover:text-red-600`} aria-label={label}>
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
            <div className={`p-8 border rounded-2xl shadow-lg ${t.card}`}>
              <h3 className={`mb-6 text-2xl font-bold ${t.heading}`}>Send a Message</h3>
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                {[
                  { type: 'text',  name: 'user_name',  placeholder: 'Your Name' },
                  { type: 'email', name: 'user_email', placeholder: 'Your Email' },
                ].map(({ type, name, placeholder }) => (
                  <input key={name} type={type} name={name} placeholder={placeholder} required
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${t.inputBg}`} />
                ))}
                <textarea name="message" rows="5" placeholder="Your Message" required
                  className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${t.inputBg}`}></textarea>
                <button type="submit" className={`px-8 py-4 font-semibold transition-all duration-300 transform rounded-full ${redBtn}`}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className={`px-4 py-8 border-t ${t.footerBorder}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={t.muted}>© 2026 W.A. Lakindu Janith. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
