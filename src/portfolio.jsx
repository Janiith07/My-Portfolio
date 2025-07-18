import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, Code, GraduationCap, Mail, Phone, MapPin, Github, Linkedin, ExternalLink , Facebook, Instagram} from 'lucide-react';
import { Download } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';


const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [skillsTab, setSkillsTab] = useState('technical');
  const [experienceTab, setExperienceTab] = useState('education');
  const [toolsTab, setToolsTab] = useState('All')
  
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_g3ubfae',       // Replace with your EmailJS service ID
      'template_6bnrzro',      // Replace with your EmailJS template ID
      formRef.current,
      '98WMH2QnQgiL94Mgj'        // Replace with your EmailJS public key
    )
    .then(
      (result) => {
        toast.success('Message sent successfully!', {
          style: {
            background: '#1e1e1e',
            color: '#fff',
            border: '1px solid #ef4444',
          },
        });
        formRef.current.reset();
      },
      (error) => {
        toast.error('Something went wrong. Please try again.', {
          style: {
            background: '#1e1e1e',
            color: '#fff',
            border: '1px solid #ef4444',
          },
        });
        console.error(error.text);
      }
    );
};


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'tools', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  const useTypedText = (words, speed = 100, pause = 1500) => {
  const [index, setIndex] = useState(0);        // Current word index
  const [subIndex, setSubIndex] = useState(0);  // Character index
  const [forward, setForward] = useState(true); // Typing direction
  const [blinking, setBlinking] = useState(true); // Optional: cursor blinking

  useEffect(() => {
    if (index >= words.length) return;

    if (forward && subIndex === words[index].length + 1) {
      setForward(false);
      return;
    }

    if (!forward && subIndex === 0) {
      setForward(true);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (forward ? 1 : -1));
    }, forward ? speed : speed / 2); // Faster backspacing

    return () => clearTimeout(timeout);
  }, [subIndex, index, forward, words, speed]);

  return words[index].substring(0, subIndex);
};


const roles = ['Frontend Developer', 'Full Stack Developer', 'UI/UX Designer'];
const typedText = useTypedText(roles, 100, 1500);

  const technicalSkills = [
    { name: 'HTML/CSS', level: 40 },
    { name: 'PHP', level: 10 },
    { name: 'JavaScript', level: 10 },
    { name: 'React', level: 5 },
    { name: 'Java', level: 40 },
    { name: 'MySQL', level: 40 },
    { name: 'Python', level: 40 },
    { name: 'Kotlin', level: 5 },
  ];  

  const softSkills = [
    { name: 'Work Under Pressure', level:80 },
    { name: 'Team Collaboration', level: 95 },
    { name: 'Problem Solving', level: 85 },
    { name: 'Communication', level: 88 },
    { name: 'Leadership', level: 82 },
    { name: 'Time Management', level: 90 }
  ];

  const educationData = [
    {
      year: '2024-Present',
      title: 'BSc (Hons) in Information Technology',
      institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
      description: 'Specialized in Software Engineering '
    },
    {
      year: '2024-2025',
      title: 'Diploma in Information Technology',
      institution: 'ESOFT Metro Campus',
      description: 'Completed a comprehensive diploma program covering core IT concepts and practical skills'
    },
    {
      year: '2020-2023',
      title: 'Advance Level in Commerce Stream',
      institution: 'Rahula College Matara',
      description: 'ICT, Accounting, Business Studies, and General English subjects with a focus on analytical and problem-solving skills'
    },
  ];

  const experienceData = [
    
  ];

  
  const projects = [
  {
    title: 'Online Toy Store',
    category: 'Web App',
    description: 'A comprehensive Java-based e-commerce solution for the toy industry. Includes toy management, order and delivery tracking, employee and user administration, payment management — all built to meet specific client requirements.',
    technologies: ['Java', 'Servlets', 'HTML', 'CSS', 'JavaScript', 'Tomcat'],
    image: './Toy.jpg',
    github: 'https://github.com/Janiith07/TOYMART_Web_Site.git',
  },
  
];


const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = projects.filter((project) => {
  if (activeCategory === 'All') return true;
  return project.category === activeCategory;
  })



  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black ">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-black/20 backdrop-blur-md border-white/10">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-500 via-red-700 to-red-900 bg-clip-text">
              Lakindu Janith
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden space-x-8 md:flex">
              {['home', 'about', 'projects', 'tools','contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-red-600 ${
                    activeSection === item 
                      ? 'text-red-600 border-b-2 border-red-600' 
                      : 'text-white/80'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="text-white md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t md:hidden bg-black/40 backdrop-blur-md border-white/10">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects','tools', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full px-3 py-2 text-left capitalize transition-colors text-white/80 hover:text-red-600"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="flex items-center justify-center min-h-screen px-6 pt-20">
          <div className="grid items-center max-w-6xl gap-12 mx-auto md:grid-cols-2">
            <div className="order-2 space-y-6 md:order-1 animate-fade-in">
              <h1 className="text-4xl font-bold text-red-600 md:text-6xl">
                Hi, I'm <span className="text-red-600">Lakindu</span>
              </h1>
              <div className="text-2xl font-semibold text-gray-300 md:text-3xl">
                I'm a <span className="text-red-500">{typedText}</span>
              </div>
              <p className="max-w-lg text-lg leading-relaxed text-gray-400">
                Aspiring developer driven to craft impactful digital experiences with cutting-edge technologies.
                I focus on developing scalable systems that address practical challenges.
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-6">
                <a href="https://github.com/Janiith07" className="text-2xl text-gray-400 transition-colors duration-300 hover:text-red-600">
                  <Github />
                </a>
                <a href="https://www.linkedin.com/in/lakindu-janith-9b16bb318/" className="text-2xl text-gray-400 transition-colors duration-300 hover:text-red-600">
                  <Linkedin />
                </a>
              </div>
              
              <a href="" download className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-red-600 to-pink-800 hover:from-red-700 hover:to-pink-600 hover:scale-105 hover:shadow-red-500/25">
                <Download size={18} />
                Download CV
              </a>

            </div>
            
            <div className="flex justify-center order-1 md:order-2">
              <div className="relative">
                <div className="w-64 h-64 transition-transform duration-500 transform shadow-2xl md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-red-600 to-pink-600 shadow-red-600/25 rotate-3 hover:rotate-0"></div>
                <img 
                  src="./image.jpg" 
                  alt="Profile" 
                  className="absolute top-0 left-0 object-cover w-64 h-64 transition-transform duration-500 transform border-4 border-red-600 md:w-80 md:h-80 rounded-2xl -rotate-3 hover:rotate-0"
                />
              </div>
            </div>
          </div>
        </section>

      {/* About Section */}
      <section id="about" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">
            About Me
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1: Introduction */}
            <div className="p-8 transition-all duration-300 border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-400/50 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <User className="mr-3 text-red-600" size={24} />
                <h3 className="text-2xl font-bold text-white">Introduction</h3>
              </div>
              <p className="leading-relaxed text-white/80">
                I'm a second-year Software Engineering student with a passion for technology and a drive to build innovative solutions. Though early in my academic journey, 
                I’m actively exploring core programming concepts, web development (HTML/CSS/JavaScript), and object-oriented design. Eager to expand my skills in full-stack development and mobile app creation, 
                I’m diving into frameworks like React and Node.js while sharpening my problem-solving abilities. My goal is to blend creativity with technical rigor to develop user-friendly applications that make an impact.
              </p>
              <div className="flex mt-6 space-x-4">
                <a href="https://github.com/Janiith07" target="_blank" rel="noopener noreferrer"
                  className="transition-colors text-white/60 hover:text-red-600">
                <Github size={20} /></a>
                <a href="https://www.linkedin.com/in/lakindu-janith-9b16bb318/" target="_blank" rel="noopener noreferrer"
                  className="transition-colors text-white/60 hover:text-red-600"><Linkedin size={20} /></a>
              </div>
            </div>

            {/* Card 2: Skills */}
            <div className="p-8 transition-all duration-300 border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-600/50 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <Code className="mr-3 text-red-600" size={24} />
                <h3 className="text-2xl font-bold text-white">Skills</h3>
              </div>
              
              {/* Skills Tabs */}
              <div className="flex p-1 mb-6 rounded-lg bg-white/5">
                <button
                  onClick={() => setSkillsTab('technical')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                    skillsTab === 'technical' 
                      ? 'bg-gradient-to-r from-red-600 to-pink-900 hover:from-red-700 hover:to-pink-600 hover:scale-105 hover:shadow-red-500/25 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Technical
                </button>
                <button
                  onClick={() => setSkillsTab('soft')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                    skillsTab === 'soft' 
                      ? 'bg-gradient-to-r from-red-600 to-pink-900 hover:from-red-700 hover:to-pink-600 hover:scale-105 hover:shadow-red-500/25 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Soft Skills
                </button>
              </div>

              {/* Skills Content */}
              <div className="space-y-4">
                {(skillsTab === 'technical' ? technicalSkills : softSkills).map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-white/80">{skill.name}</span>
                      <span className="text-sm text-red-500">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10">
                      <div 
                        className="h-2 transition-all duration-1000 rounded-full bg-gradient-to-r from-red-600 to-pink-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Education & Experience */}
            <div className="p-8 transition-all duration-300 border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-600/50 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <GraduationCap className="mr-3 text-red-600" size={24} />
                <h3 className="text-2xl font-bold text-white">Background</h3>
              </div>
              
              {/* Experience Tabs */}
              <div className="flex p-1 mb-6 rounded-lg bg-white/5">
                <button
                  onClick={() => setExperienceTab('education')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                    experienceTab === 'education' 
                      ? ' bg-gradient-to-r from-red-600 to-pink-900 hover:from-red-700 hover:to-pink-600 hover:scale-105 hover:shadow-red-500/25 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Education
                </button>
                <button
                  onClick={() => setExperienceTab('experience')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                    experienceTab === 'experience' 
                      ? 'bg-gradient-to-r from-red-600 to-pink-900 hover:from-red-700 hover:to-pink-600 hover:scale-105 hover:shadow-red-500/25 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Experience
                </button>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {(experienceTab === 'education' ? educationData : experienceData).map((item, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-red-500/30">
                    <div className="absolute top-0 w-3 h-3 bg-red-500 rounded-full -left-2"></div>
                    <div className="mb-1 text-sm font-semibold text-red-500">{item.year}</div>
                    <h4 className="mb-1 font-semibold text-white">{item.title}</h4>
                    <p className="mb-2 text-sm text-red-500">{item.institution}</p>
                    <p className="text-sm text-white/60">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">
            Featured Projects
          </h2>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {['All', 'Web App', 'Mobile App', 'UI/UX Design'].map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 border border-white/20 ${
                  activeCategory === category
                  ? 'bg-gradient-to-r from-red-600 to-pink-800 hover:from-red-700 text-white'
                  : 'text-white/70 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-800 hover:text-white'
                }`}   
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filtered Projects */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .slice(0, showAll ? filteredProjects.length : 6)
              .map((project, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-600/50 hover:transform hover:scale-105 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
                  <p className="mb-4 leading-relaxed text-white/70">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm text-red-400 border rounded-full bg-red-700/20 border-red-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              <div className="flex gap-4 mt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-red-600 transition-colors hover:text-red-500"
                    >
                      <Github className="mr-1" size={18} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {!showAll && filteredProjects.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 font-semibold text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-red-600 to-pink-800 hover:from-red-700 hover:to-pink-600 hover:scale-105 hover:shadow-red-500/25"
            >
              View More
            </button>
          </div>
        )}

        
    </div>
</section>
{/* Tools & Languages Section */}
      <section id="tools" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">
            Tools & Technics
          </h2>
          
          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex p-2 border rounded-xl bg-white/5 backdrop-blur-md border-white/10">
              {['All','Languages', 'Frameworks', 'Tools', 'Design'].map((category) => (
                <button
                  key={category}
                  onClick={() => setToolsTab(category)}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                    toolsTab === category
                      ? 'bg-gradient-to-r from-red-600 to-pink-800 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {/* Languages */}
            {(toolsTab === 'All' || toolsTab === 'Languages') && [
              { name: 'HTML', color: '#E34F26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
              { name: 'CSS', color: '#1572B6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
              { name: 'JavaScript', color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
              { name: 'Python', color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
              { name: 'Java', color: '#ED8B00', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
              { name: 'PHP', color: '#777BB4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
              { name: 'Kotlin', color: '#7F52FF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
              { name: 'C#', color: '#239120', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' }
            ].map((tool, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 transition-all duration-300 transform border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-400/50 hover:scale-105 hover:shadow-lg group"
              >
                <div 
                  className="flex items-center justify-center w-16 h-16 mb-4 rounded-full"
                  style={{ backgroundColor: `${tool.color}20` }}
                >
                  <img src={tool.icon} alt={tool.name} className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-white transition-colors group-hover:text-red-400">
                  {tool.name}
                </h3>
              </div>
            ))}

            {/* Frameworks */}
            {(toolsTab === 'All' || toolsTab === 'Frameworks') && [
              { name: 'React', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
              { name: 'Node.js', color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
              { name: 'Express', color: '#000000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
              { name: 'Tailwind CSS', color: '#38B2AC', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg'}
            ].map((tool, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 transition-all duration-300 transform border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-400/50 hover:scale-105 hover:shadow-lg group"
              >
                <div 
                  className="flex items-center justify-center w-16 h-16 mb-4 rounded-full"
                  style={{ backgroundColor: `${tool.color}20` }}
                >
                  <img src={tool.icon} alt={tool.name} className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-white transition-colors group-hover:text-red-400">
                  {tool.name}
                </h3>
              </div>
            ))}

            {/* Tools */}
            {(toolsTab === 'All' || toolsTab === 'Tools') && [
              { name: 'VS Code', color: '#007ACC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
              { name: 'Git', color: '#F05032', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
              { name: 'GitHub', color: '#181717', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
              { name: 'MongoDB', color: '#47A248', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
              { name: 'MySQL', color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
              { name: 'Android Studio', color: '#3DDC84', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' }
            ].map((tool, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 transition-all duration-300 transform border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-400/50 hover:scale-105 hover:shadow-lg group"
              >
                <div 
                  className="flex items-center justify-center w-16 h-16 mb-4 rounded-full"
                  style={{ backgroundColor: `${tool.color}20` }}
                >
                  <img src={tool.icon} alt={tool.name} className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-white transition-colors group-hover:text-red-400">
                  {tool.name}
                </h3>
              </div>
            ))}

            {/* Design */}
            {(toolsTab === 'All' || toolsTab === 'Design') && [
              { name: 'Figma', color: '#F24E1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
              { name: 'Photoshop', color: '#31A8FF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
              { name: 'Canva', color: '#00C4CC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' }
            ].map((tool, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 transition-all duration-300 transform border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-400/50 hover:scale-105 hover:shadow-lg group"
              >
                <div 
                  className="flex items-center justify-center w-16 h-16 mb-4 rounded-full"
                  style={{ backgroundColor: `${tool.color}20` }}
                >
                  <img src={tool.icon} alt={tool.name} className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-white transition-colors group-hover:text-red-400">
                  {tool.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Contact Section */}
    <section id="contact" className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">
          Let's Connect
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
        {/* Contact Info Panel */}
{/* Contact Info Panel */}
<div className="flex flex-col h-full p-8 border shadow-lg rounded-2xl bg-white/5 backdrop-blur-md border-white/10">
  <h3 className="mb-6 text-2xl font-bold text-white">Get in Touch</h3>
  <p className="mb-8 text-white/70">
    Feel free to reach out via email, phone, or the contact form.
  </p>

  <div className="mb-8 space-y-6">
    <div className="flex items-center gap-4">
      <Mail className="text-red-600" size={24} />
      <div>
        <h4 className="font-semibold text-white">Email</h4>
        <p className="text-white/60">lakindujanith7@gmail.com</p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <Phone className="text-red-600" size={24} />
      <div>
        <h4 className="font-semibold text-white">Phone</h4>
        <p className="text-white/60">+(94) 72 198 5928</p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <MapPin className="text-red-600" size={24} />
      <div>
        <h4 className="font-semibold text-white">Location</h4>
        <p className="text-white/60">Matara, Sri Lanka</p>
      </div>
    </div>
  </div>

  {/* Social Icons at bottom */}
  <div className="flex mt-auto space-x-6">
    <a
      href="https://github.com/Janiith07"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 transition-colors hover:text-red-600"
      aria-label="GitHub"
    >
      <Github size={24} />
    </a>
    <a
      href="https://www.linkedin.com/in/lakindu-janith-9b16bb318/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 transition-colors hover:text-red-600"
      aria-label="LinkedIn"
    >
      <Linkedin size={24} />
    </a>
    <a
      href=""
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 transition-colors hover:text-red-600"
      aria-label="Facebook"
    >
      <Facebook size={24} />
    </a>
    <a
      href="https://www.instagram.com/_lakindu_07?utm_source=qr&igsh=dDMxYTRsaGdraXJm"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 transition-colors hover:text-red-600"
      aria-label="Instagram"
    >
      <Instagram size={24} />
    </a>
  </div>
</div>



      {/* Contact Form Panel */}
      <div className="p-8 border shadow-lg rounded-2xl bg-white/5 backdrop-blur-md border-white/10">
        <h3 className="mb-6 text-2xl font-bold text-white">Send a Message</h3>
        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-4 text-white border bg-black/30 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-4 text-white border bg-black/30 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full p-4 text-white border bg-black/30 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
          <button
            type="submit"
            className="px-8 py-4 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-red-600 to-pink-800 hover:from-red-700 hover:to-pink-600 hover:scale-105 hover:shadow-red-500/25"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="px-4 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60">
            © 2025 Lakindu Janith. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
