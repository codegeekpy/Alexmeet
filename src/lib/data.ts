
export const trendingTalks = [
  {
    title: 'The Future of Generative AI',
    speaker: 'Dr. Evelyn Reed',
    image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=600&h=400&fit=crop',
    tags: ['AI', 'ML', 'Future Tech'],
  },
  {
    title: 'Scaling Vector Databases for Enterprise',
    speaker: 'Johnathan Chen',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&h=400&fit=crop',
    tags: ['Databases', 'Scaling', 'Weaviate'],
  },
  {
    title: 'Human-Centered AI Design',
    speaker: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&h=400&fit=crop',
    tags: ['UX', 'Design', 'Ethics'],
  },
  {
    title: 'Building with Groq: Speed & Efficiency',
    speaker: 'Ben Carter',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6e74e3dce9?q=80&w=600&h=400&fit=crop',
    tags: ['Groq', 'APIs', 'Performance'],
  },
];

export const recommendedForYou = [
  {
    name: 'Alice Johnson',
    title: 'Lead AI Engineer at Innovate Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&fit=crop',
    match: 89,
    reason: 'You share interests in "Generative AI" and "Ethical ML". Alice is also looking for collaborators on a new project.',
  },
  {
    name: 'Carlos Gomez',
    title: 'Founder of ScaleUp Solutions',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&fit=crop',
    match: 82,
    reason: 'Both of you are focused on "scaling startups" and have a background in "SaaS development".',
  },
  {
    name: 'Samantha Lee',
    title: 'Product Manager at TechGiant',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&h=300&fit=crop',
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

export const peopleMet = [
    {
      name: 'Alice Johnson',
      company: 'Innovate Inc.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&fit=crop',
      sharedInterests: 'Generative AI, Ethical ML',
      conversationSummary: 'Discussed potential collaboration on a new open-source project and her recent work with large language models.',
    },
    {
      name: 'Ben Carter',
      company: 'Groq',
      avatar: 'https://images.unsplash.com/photo-1591799264318-7e6e74e3dce9?q=80&w=300&h=300&fit=crop',
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
      { name: 'AI/ML', value: 45 },
      { name: 'SaaS', value: 25 },
      { name: 'Venture Capital', value: 15 },
      { name: 'UX/UI', value: 10 },
      { name: 'Other', value: 5 },
    ],
};

export const leaderboardData = [
  { rank: 1, name: 'Grace Hall', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&fit=crop', points: 1250, change: 'up' },
  { rank: 2, name: 'Alex Doe', avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=300&h=300&fit=crop', points: 1180, change: 'down' },
  { rank: 3, name: 'David Miller', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&fit=crop', points: 1120, change: 'same' },
  { rank: 4, name: 'Emily White', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=300&fit=crop', points: 1050, change: 'up' },
  { rank: 5, name: 'Carlos Gomez', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&fit=crop', points: 980, change: 'down' },
  { rank: 6, name: 'Frank Green', title: 'ML Researcher at DeepLearn AI', company: 'DeepLearn AI', interests: ['AI', 'ML', 'Data Science'], personalityTraits: ['Analytical', 'Introverted'], avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&h=300&fit=crop', points: 950, change: 'up' },
];
