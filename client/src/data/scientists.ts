import scientist01 from "./images/scientist01.png";
import scientist02 from "./images/scientist02.png";
import scientist03 from "./images/scientist03.png";
import scientist04 from "./images/scientist04.png";

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
    achievement:
      "Pioneer in developing AI-driven prosthetics that respond to neural signals",
    image: scientist01,
    researchThemes: [
      "Neuroplasticity",
      "Brain-Computer Interfaces",
      "Prosthetic Technology",
      "Neural Engineering",
    ],
    publications: 87,
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    field: "Climate Science",
    institution: "Stanford University",
    achievement:
      "Leading researcher in Arctic ice melting patterns and ocean temperature modeling",
    image: scientist02,
    researchThemes: [
      "Climate Change",
      "Ocean Dynamics",
      "Ice Sheet Modeling",
      "Global Warming",
    ],
    publications: 124,
  },
  {
    id: 3,
    name: "Dr. Amira Hassan",
    field: "Genetic Engineering",
    institution: "Harvard Medical",
    achievement:
      "Breakthrough research in CRISPR gene therapy for rare genetic disorders",
    image: scientist03,
    researchThemes: [
      "CRISPR Technology",
      "Gene Therapy",
      "Rare Diseases",
      "Precision Medicine",
    ],
    publications: 156,
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
    image: scientist04,
    researchThemes: [
      "Protein Structure",
      "Drug Discovery",
      "Molecular Biology",
      "Therapeutic Development",
    ],
    publications: 73,
    awards: ["Protein Society Young Investigator Award"],
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    field: "Astrophysics",
    institution: "Caltech",
    achievement: "Black hole physics and gravitational wave detection",
    research: "Black hole physics and gravitational wave detection",
    image: scientist01,
    researchThemes: [
      "Black Holes",
      "Gravitational Waves",
      "Space Physics",
      "Cosmology",
    ],
    publications: 92,
    awards: ["Einstein Fellowship", "Hubble Fellowship"],
  },
  {
    id: 6,
    name: "Dr. Lisa Wang",
    field: "Computer Science",
    institution: "Google Research",
    achievement: "Natural language processing and ethical AI development",
    research: "Natural language processing and ethical AI development",
    image: scientist02,
    researchThemes: [
      "Artificial Intelligence",
      "Natural Language Processing",
      "Machine Learning",
      "Ethics in AI",
    ],
    publications: 68,
    awards: ["Google Research Excellence Award"],
  },
  {
    id: 7,
    name: "Dr. Jessica Torres",
    field: "Marine Biology",
    institution: "Woods Hole",
    achievement: "Coral reef conservation and climate change adaptation",
    research: "Coral reef conservation and climate change adaptation",
    image: scientist03,
    researchThemes: [
      "Marine Ecosystems",
      "Coral Conservation",
      "Climate Adaptation",
      "Ocean Biodiversity",
    ],
    publications: 45,
    awards: ["Marine Conservation Award"],
  },
  {
    id: 8,
    name: "Dr. Fatima Al-Rashid",
    field: "Quantum Physics",
    institution: "Oxford University",
    achievement: "Quantum computing applications in cryptography",
    research: "Quantum computing applications in cryptography",
    image: scientist04,
    researchThemes: [
      "Quantum Computing",
      "Quantum Cryptography",
      "Information Security",
      "Quantum Mechanics",
    ],
    publications: 81,
    awards: ["Royal Society Fellowship"],
  },
  {
    id: 9,
    name: "Dr. Anna Kowalski",
    field: "Biomedical Engineering",
    institution: "Johns Hopkins",
    achievement: "Neural interfaces for paralysis recovery",
    research: "Neural interfaces for paralysis recovery",
    image: scientist01,
    researchThemes: [
      "Neural Interfaces",
      "Paralysis Recovery",
      "Rehabilitation Technology",
      "Biomedical Devices",
    ],
    publications: 59,
    awards: ["Whitaker Foundation Award"],
  },
];

// Export all unique research themes for filtering
export const getAllResearchThemes = (): string[] => {
  const themes = new Set<string>();
  allScientists.forEach((scientist) => {
    scientist.researchThemes?.forEach((theme) => themes.add(theme));
  });
  return Array.from(themes).sort();
};
