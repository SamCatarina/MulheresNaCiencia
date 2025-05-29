export interface Scientist {
  id: number;
  name: string;
  field: string;
  institution: string;
  achievement: string;
  image: string;
  research?: string;
  researchThemes?: string[];
  publications?: number;
  awards?: string[];
}

export const featuredScientists: Scientist[] = [
  {
    id: 1,
    name: "Dr. Maria Rodriguez",
    field: "Biomedical Engineering",
    institution: "MIT",
    achievement: "Pioneer in developing AI-driven prosthetics that respond to neural signals",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    researchThemes: ["Neuroplasticity", "Brain-Computer Interfaces", "Prosthetic Technology", "Neural Engineering"],
    publications: 87,
    awards: ["National Science Foundation Award", "IEEE Young Investigator Award"]
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    field: "Climate Science",
    institution: "Stanford University",
    achievement: "Leading researcher in Arctic ice melting patterns and ocean temperature modeling",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    researchThemes: ["Climate Change", "Ocean Dynamics", "Ice Sheet Modeling", "Global Warming"],
    publications: 124,
    awards: ["NOAA Climate Research Award", "American Geophysical Union Fellowship"]
  },
  {
    id: 3,
    name: "Dr. Amira Hassan",
    field: "Genetic Engineering",
    institution: "Harvard Medical",
    achievement: "Breakthrough research in CRISPR gene therapy for rare genetic disorders",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    researchThemes: ["CRISPR Technology", "Gene Therapy", "Rare Diseases", "Precision Medicine"],
    publications: 156,
    awards: ["Breakthrough Prize in Life Sciences", "MacArthur Fellowship"]
  },
];

export const allScientists: Scientist[] = [
  ...featuredScientists,
  {
    id: 4,
    name: "Dr. Elena Popov",
    field: "Biochemistry",
    institution: "Yale University",
    achievement: "Protein folding mechanisms and therapeutic applications",
    research: "Protein folding mechanisms and therapeutic applications",
    image: "https://images.unsplash.com/photo-1594824694996-e5f6aa64f3aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    researchThemes: ["Protein Structure", "Drug Discovery", "Molecular Biology", "Therapeutic Development"],
    publications: 73,
    awards: ["Protein Society Young Investigator Award"]
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    field: "Astrophysics",
    institution: "Caltech",
    achievement: "Black hole physics and gravitational wave detection",
    research: "Black hole physics and gravitational wave detection",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    researchThemes: ["Black Holes", "Gravitational Waves", "Space Physics", "Cosmology"],
    publications: 92,
    awards: ["Einstein Fellowship", "Hubble Fellowship"]
  },
  {
    id: 6,
    name: "Dr. Lisa Wang",
    field: "Computer Science",
    institution: "Google Research",
    achievement: "Natural language processing and ethical AI development",
    research: "Natural language processing and ethical AI development",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    researchThemes: ["Artificial Intelligence", "Natural Language Processing", "Machine Learning", "Ethics in AI"],
    publications: 68,
    awards: ["Google Research Excellence Award"]
  },
  {
    id: 7,
    name: "Dr. Jessica Torres",
    field: "Marine Biology",
    institution: "Woods Hole",
    achievement: "Coral reef conservation and climate change adaptation",
    research: "Coral reef conservation and climate change adaptation",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    researchThemes: ["Marine Ecosystems", "Coral Conservation", "Climate Adaptation", "Ocean Biodiversity"],
    publications: 45,
    awards: ["Marine Conservation Award"]
  },
  {
    id: 8,
    name: "Dr. Fatima Al-Rashid",
    field: "Quantum Physics",
    institution: "Oxford University",
    achievement: "Quantum computing applications in cryptography",
    research: "Quantum computing applications in cryptography",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    researchThemes: ["Quantum Computing", "Quantum Cryptography", "Information Security", "Quantum Mechanics"],
    publications: 81,
    awards: ["Royal Society Fellowship"]
  },
  {
    id: 9,
    name: "Dr. Anna Kowalski",
    field: "Biomedical Engineering",
    institution: "Johns Hopkins",
    achievement: "Neural interfaces for paralysis recovery",
    research: "Neural interfaces for paralysis recovery",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    researchThemes: ["Neural Interfaces", "Paralysis Recovery", "Rehabilitation Technology", "Biomedical Devices"],
    publications: 59,
    awards: ["Whitaker Foundation Award"]
  },
];

// Export all unique research themes for filtering
export const getAllResearchThemes = (): string[] => {
  const themes = new Set<string>();
  allScientists.forEach(scientist => {
    scientist.researchThemes?.forEach(theme => themes.add(theme));
  });
  return Array.from(themes).sort();
};
