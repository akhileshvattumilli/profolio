// ---------------------------------------------------------------------------
// All personal content lives here. Replace every [PLACEHOLDER] value —
// the design never needs to be touched.
// ---------------------------------------------------------------------------

export const identity = {
  firstName: 'Akhilesh',
  lastName: 'Vattumilli',
  role: 'Software Engineer',
  tagline:
    "I build across the stack — from on-device ML on iOS to particle-accelerator simulations — currently a CS student at Texas A&M.",
  email: 'akhileshvattumilli@gmail.com',
  github: 'https://github.com/akhileshvattumilli',
  linkedin: 'https://linkedin.com/in/akhileshvattumilli',
  openTo: '[PLACEHOLDER — fill in later]',
}

export const about = {
  paragraphs: [
    "I'm a Computer Science student at Texas A&M University (Class of 2028, GPA 3.82), pulled toward software by how much leverage a well-built system gives you — from a couple hundred lines to something serving thousands of people.",
    "Lately I've been working across the stack: shipping a React Native app for medical students, fine-tuning an LLM with LoRA and RAG on GCP Vertex AI, and building a Python ray-tracing engine for a nuclear particle accelerator at the Texas A&M Cyclotron Institute.",
    '[PLACEHOLDER — sentence 4. Something human — what you do away from the keyboard.]',
  ],
  profileObject: {
    name: 'Akhilesh Vattumilli',
    location: '[PLACEHOLDER]',
    currentlyBuilding: 'A real-time collaborative document editor with AI-assisted writing workflows',
    interests: ['[PLACEHOLDER]', '[PLACEHOLDER]'],
    coffee: true,
  },
}

export const experience = [
  {
    company: 'Global Shop Solutions',
    role: 'Software Engineering Intern',
    dates: 'May 2026 — August 2026',
    year: '2026',
    bullets: [
      'Incoming SWE intern on the core ERP platform team; contributing to production systems serving manufacturing clients across 25+ countries',
    ],
  },
  {
    company: 'Texas A&M University College of Medicine',
    role: 'Full Stack & Mobile Development Intern',
    dates: 'February 2026 — May 2026',
    year: '2026',
    bullets: [
      'Shipped a React Native pharmacology learning app on AWS (Lambda, DynamoDB, S3) adopted by 200+ medical students, consolidating 3 separate study tools into one adaptive platform',
      'Built an AI question-generation pipeline (Python + LLM APIs) that produces personalized practice sets from performance history, cutting manual content-authoring time by 80%',
    ],
  },
  {
    company: 'Texas A&M University — HOPE Mentorship Platform',
    role: 'Software Engineer Intern',
    dates: 'June 2025 — August 2025',
    year: '2025',
    bullets: [
      'Fine-tuned Gemma 3n E2B on GCP Vertex AI with LoRA and RAG grounding, reducing inference cost by $1,000+/month while improving response relevance for academic and career guidance queries',
      'Architected Node.js/Express REST services containerized with Docker and deployed on GCP Cloud Run, enabling zero-downtime releases and auto-scaling to 500+ concurrent users',
    ],
  },
  {
    company: 'Texas A&M Cyclotron Institute',
    role: 'Software Engineer',
    dates: 'January 2025 — December 2025',
    year: '2025',
    bullets: [
      'Engineered a Python ray-tracing simulation engine for a nuclear particle accelerator, modeling photon trajectories across 100,000+ datasets at 97%+ accuracy, eliminating $70,000 in physical prototyping costs',
      'Built a JavaScript visualization dashboard with REST endpoints and automated data-refresh pipelines, cutting detector design iteration cycles from days to hours for research physicists',
    ],
  },
]

export const featuredProject = {
  name: 'AI-Assisted Collaborative Docs Platform',
  problem:
    'A real-time collaborative document editor with AI-assisted writing workflows, tuned for low backend latency and high uptime under concurrent load.',
  stack: ['Django', 'Next.js', 'PostgreSQL', 'WebSockets'],
  github: 'https://github.com/akhileshvattumilli/DocAi',
  demo: 'https://[PLACEHOLDER].dev',
}

export const projects = [
  {
    name: 'Ambient — iOS Contextual Intelligence',
    problem: 'An iOS app that infers user context on-device with a Core ML classifier at <10ms latency and zero server calls, preserving full data privacy.',
    tags: ['Swift', 'SwiftUI', 'Core ML'],
    size: 'lg',
    href: 'https://github.com/akhileshvattumilli',
  },
  {
    name: 'Hiring Agent — Resume Evaluation',
    problem: 'An AI hiring agent that ingests a PDF resume and returns a structured intelligence report for candidate evaluation.',
    tags: ['AI', 'Next.js'],
    size: 'sm',
    href: 'https://hiring-agent-eval-ui.vercel.app/',
    github: 'https://github.com/akhileshvattumilli/hiring-agent-app',
  },
  {
    name: '[PLACEHOLDER — Project Four]',
    problem: '[PLACEHOLDER — one-line problem statement]',
    tags: ['React', 'WebGL'],
    size: 'sm',
    href: 'https://github.com/[PLACEHOLDER]',
  },
  {
    name: '[PLACEHOLDER — Project Five]',
    problem: '[PLACEHOLDER — one-line problem statement]',
    tags: ['Rust', 'CLI'],
    size: 'sm',
    href: 'https://github.com/[PLACEHOLDER]',
  },
  {
    name: '[PLACEHOLDER — Project Six]',
    problem: '[PLACEHOLDER — one-line problem statement]',
    tags: ['C#', '.NET'],
    size: 'sm',
    href: 'https://github.com/[PLACEHOLDER]',
  },
  {
    name: '[PLACEHOLDER — Project Seven]',
    problem: '[PLACEHOLDER — one-line problem statement]',
    tags: ['TypeScript', 'Next.js'],
    size: 'lg',
    href: 'https://github.com/[PLACEHOLDER]',
  },
]

export const skills = [
  {
    category: 'Languages',
    items: ['Python', 'Swift', 'Java', 'C/C++', 'JavaScript/TypeScript', 'SQL', 'Haskell', 'HTML/CSS'],
  },
  {
    category: 'Frameworks',
    items: ['React', 'Next.js', 'Node.js', 'Express.js', 'Django', 'FastAPI', 'React Native', 'SwiftUI', 'Tailwind CSS', 'PyTorch', 'Scikit-Learn'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (Lambda, DynamoDB, EC2, S3)', 'GCP (Vertex AI, Cloud Run)', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    category: 'Tools',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Core ML', 'Create ML', 'SwiftData', 'Xcode Instruments', 'UIKit', 'iOS SDK', 'REST API Design', 'Microservices', 'RAG', 'LLM Fine-tuning', 'MVVM', 'Distributed Systems', 'Unix/Linux'],
  },
]
