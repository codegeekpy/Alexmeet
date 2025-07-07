export const trendingTalks = [
  {
    title: 'The Future of Generative AI',
    speaker: 'Dr. Evelyn Reed',
    image: 'https://placehold.co/600x400.png',
    tags: ['AI', 'ML', 'Future Tech'],
  },
  {
    title: 'Scaling Vector Databases for Enterprise',
    speaker: 'Johnathan Chen',
    image: 'https://placehold.co/600x400.png',
    tags: ['Databases', 'Scaling', 'Weaviate'],
  },
  {
    title: 'Human-Centered AI Design',
    speaker: 'Priya Sharma',
    image: 'https://placehold.co/600x400.png',
    tags: ['UX', 'Design', 'Ethics'],
  },
  {
    title: 'Building with Groq: Speed & Efficiency',
    speaker: 'Ben Carter',
    image: 'https://placehold.co/600x400.png',
    tags: ['Groq', 'APIs', 'Performance'],
  },
];

export const recommendedForYou = [
  {
    name: 'Alice Johnson',
    title: 'Lead AI Engineer at Innovate Inc.',
    avatar: 'https://placehold.co/100x100.png',
    match: 89,
    reason: 'You share interests in "Generative AI" and "Ethical ML". Alice is also looking for collaborators on a new project.',
  },
  {
    name: 'Carlos Gomez',
    title: 'Founder of ScaleUp Solutions',
    avatar: 'https://placehold.co/100x100.png',
    match: 82,
    reason: 'Both of you are focused on "scaling startups" and have a background in "SaaS development".',
  },
  {
    name: 'Samantha Lee',
    title: 'Product Manager at TechGiant',
    avatar: 'https://placehold.co/100x100.png',
    match: 76,
    reason: 'Shared interest in "product-led growth". Samantha attended the same talk on "Future of UI/UX".',
  },
];

export const eventSessions = [
  {
    title: 'Keynote: The AI Revolution',
    description: 'An overview of the current state and future of Artificial Intelligence.',
    startTime: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    tags: ['AI', 'Keynote', 'Future Tech'],
  },
  {
    title: 'Workshop: Mastering Prompt Engineering',
    description: 'A hands-on workshop to improve your skills in prompt engineering for better LLM results.',
    startTime: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
    tags: ['LLM', 'Workshop', 'Practical'],
  },
  {
    title: 'Panel: AI Ethics and Governance',
    description: 'A discussion with industry leaders on the ethical implications of AI.',
    startTime: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
    tags: ['Ethics', 'Panel', 'AI'],
  },
  {
    title: 'Deep Dive: Vector Embeddings',
    description: 'A technical session on how vector embeddings work and how to use them effectively.',
    startTime: new Date(new Date().setHours(13, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    tags: ['AI', 'ML', 'Technical'],
  },
  {
    title: 'Fireside Chat with Groq CEO',
    description: 'An intimate chat about the future of fast inference and AI hardware.',
    startTime: new Date(new Date().setHours(14, 30, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(),
    tags: ['Groq', 'Hardware', 'Interview'],
  },
];

export const allAttendees = [
  { name: 'David Miller', title: 'Data Scientist at BigData Corp', company: 'BigData Corp', interests: ['AI', 'SaaS', 'Venture Capital'], personalityTraits: ['Analytical', 'Driven'] },
  { name: 'Emily White', title: 'UX Lead at Creative Solutions', company: 'Creative Solutions', interests: ['UX/UI Design', 'Frontend Development', 'Web3'], personalityTraits: ['Creative', 'Collaborative'] },
  { name: 'Frank Green', title: 'ML Researcher at DeepLearn AI', company: 'DeepLearn AI', interests: ['AI', 'ML', 'Data Science'], personalityTraits: ['Analytical', 'Introverted'] },
  { name: 'Grace Hall', title: 'Head of Product at ScaleFast', company: 'ScaleFast', interests: ['Product Management', 'SaaS', 'Growth Hacking'], personalityTraits: ['Extroverted', 'Leader'] },
];

export const peopleMet = [
    {
      name: 'Alice Johnson',
      company: 'Innovate Inc.',
      sharedInterests: 'Generative AI, Ethical ML',
      conversationSummary: 'Discussed potential collaboration on a new open-source project and her recent work with large language models.',
    },
    {
      name: 'Ben Carter',
      company: 'Groq',
      sharedInterests: 'High-performance computing, API design',
      conversationSummary: 'Talked about the impressive speed of the Groq LPU and best practices for integrating the API for real-time applications.',
    },
];

export const organizerStats = {
    engagementRate: 78,
    totalAttendees: 5432,
    sessionsRated: 1245,
    sessionRatings: [
      { name: 'Keynote', rating: 4.8 },
      { name: 'Workshop: Prompts', rating: 4.5 },
      { name: 'Panel: Ethics', rating: 4.2 },
      { name: 'Deep Dive: Vectors', rating: 4.7 },
      { name: 'Fireside: Groq', rating: 4.9 },
      { name: 'Scaling Databases', rating: 4.4 },
    ],
    interestDistribution: [
      { name: 'AI/ML', value: 45, fill: 'var(--color-chart-1)' },
      { name: 'SaaS', value: 25, fill: 'var(--color-chart-2)' },
      { name: 'Venture Capital', value: 15, fill: 'var(--color-chart-3)' },
      { name: 'UX/UI', value: 10, fill: 'var(--color-chart-4)' },
      { name: 'Other', value: 5, fill: 'var(--color-chart-5)' },
    ],
};
