// Portfolio content is grounded in Akhilesh's current resume.
export const identity = {
  firstName: 'Akhilesh',
  lastName: 'Vattumilli',
  role: 'Software Engineer',
  tagline: 'I build useful software across AI, cloud, and systems — from tools for engineers to on-device intelligence. I study computer science at Texas A&M.',
  email: 'akhileshvattumilli@gmail.com',
  github: 'https://github.com/akhileshvattumilli',
  linkedin: 'https://linkedin.com/in/akhileshvattumilli',
}

export const about = {
  paragraphs: [
    "I'm a computer science student at Texas A&M University, with AI in Business and an expected graduation in May 2028. I'm drawn to software because an idea can become a working system that changes what someone is able to do.",
    "I've built AI-powered engineering tools, cloud research workflows, mobile applications for students, and a simulation engine for a particle accelerator. I enjoy understanding the people behind a problem and making careful technical decisions to solve it.",
    'My projects explore efficient tooling for AI coding agents and private, on-device machine learning. Across my work, I care about dependable systems, performance, and measuring whether an improvement makes a difference.',
  ],
  profileObject: {
    name: 'Akhilesh Vattumilli',
    education: 'Texas A&M University',
    degree: 'B.S. Computer Science, AI in Business',
    graduation: 'May 2028 (expected)',
    interests: ['AI and machine learning', 'Software systems'],
    coursework: 'Data Structures & Algorithms, Computer Systems, Foundations of Software Engineering, Design and Analysis of Algorithms, Computer Organization, OOP, Machine Learning, Parallel Computing',
  },
}

export const experience = [
  {
    company: 'Global Shop Solutions', role: 'Software Engineer Intern', dates: 'June 2026 — August 2026 · The Woodlands, TX',
    bullets: [
      'Deployed a microservice using vision-language models and RAG to diagnose regression-test failures across 150+ test VMs, cutting developer investigation time by over 40%.',
      'Refactored core ERP code from C# to Go, reducing startup time by 80% on a platform serving 50,000 users.',
      'Mined CI logs into 1.1M+ code-to-test links to identify affected tests, cutting QA testing time by 40%.',
      'Architected a CLI that let AI agents execute internal app-management workflows, cutting token use by 90%.',
    ],
  },
  {
    company: 'Amazon', role: 'Software Engineer (Contract)', dates: 'January 2026 — May 2026 · College Station, TX',
    bullets: [
      'Built an AWS ETL pipeline with Lambda, Kinesis, and API Gateway to ingest and process 6,000+ space-sustainability documents, reducing manual research effort by 40% for Amazon Leo engineers.',
      'Developed Bedrock-powered research workflows to identify relevant themes, emerging trends, and high-priority insights, accelerating analysis turnaround by 30%.',
      'Automated Docker deployments to AWS Fargate through GitHub Actions, cutting release cycle time by 25%.',
    ],
  },
  {
    company: 'Texas A&M University College of Medicine', role: 'Full Stack Developer Intern', dates: 'January 2026 — May 2026 · Bryan, TX',
    bullets: [
      'Shipped a React Native pharmacology app on AWS using Lambda, DynamoDB, and S3, adopted by 200+ medical students.',
      'Developed an adaptive AI question-generation pipeline with Python and LLM APIs, reducing manual authoring by 80%.',
    ],
  },
  {
    company: 'AGGIES Lab', role: 'AI Engineer Intern', dates: 'June 2025 — August 2025 · Dallas, TX',
    bullets: [
      'Led development of a mobile mentorship app offering university students personalized academic guidance.',
      'Implemented RAG with Gemini and ChromaDB, embedding 1,000+ academic documents for vector search.',
      'Built automated evaluations and regression tests for 650 benchmark queries, improving AI response accuracy by 23%.',
      'Deployed a FastAPI backend on AWS EC2 with S3 and CloudWatch, serving a React Native app via API Gateway.',
    ],
  },
  {
    company: 'Texas A&M Cyclotron Institute', role: 'Undergraduate Researcher', dates: 'January 2025 — December 2025 · College Station, TX',
    bullets: [
      'Engineered a Python ray-tracing simulation engine for a nuclear particle accelerator, modeling photon trajectories across 100,000+ datasets at 97%+ accuracy and eliminating $70,000 in physical prototyping costs.',
    ],
  },
]

export const featuredProject = {
  name: 'Agentic Terminal',
  problem: 'A Rust-based terminal system for AI coding agents that shapes raw command output into compact, structured payloads, reducing token use by up to 50%. Rewriting its core from Node.js to Rust cut per-command overhead from approximately 50–120 ms to 0.5 ms, roughly a 100× reduction.',
  stack: ['Rust', 'Windows ConPTY', 'MCP'],
}

export const projects = [
  {
    name: 'Ambient — iOS Contextual Intelligence',
    problem: 'An iOS app that uses a Create ML-trained classifier and Core ML to infer user context across five categories in under 10 ms. Inference runs on-device with zero server calls, keeping data private.',
    tags: ['Swift', 'SwiftUI', 'Core ML', 'Create ML'],
    size: 'lg',
  },
]

export const skills = [
  { category: 'Languages', items: ['Python', 'C++', 'C', 'Rust', 'Go', 'Java', 'C#/.NET', 'Swift', 'JavaScript/TypeScript', 'SQL', 'Haskell'] },
  { category: 'AI / ML', items: ['PyTorch', 'Scikit-learn', 'RAG', 'LLM Fine-Tuning', 'Model Context Protocol (MCP)'] },
  { category: 'Frameworks & Backend', items: ['React', 'Next.js', 'Node.js', 'Express.js', 'Django', 'FastAPI', 'REST API Design'] },
  { category: 'Cloud & DevOps', items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Distributed Systems', 'Unix/Linux'] },
  { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { category: 'Apple & Mobile', items: ['SwiftUI', 'SwiftData', 'Core ML', 'Create ML', 'Xcode Instruments', 'UIKit', 'iOS SDK', 'MVVM'] },
]
