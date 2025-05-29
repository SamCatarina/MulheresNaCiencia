import { useState, useEffect } from "react";

export interface QuestionnaireResponses {
  careerStage: string;
  scienceField: string;
  inspiration: string;
  challenges: string[];
  environmentSupport: string;
  hasRoleModels: string;
  inspirations: string;
  mentorshipImportance: string;
  careerGoals: string;
  representationNeeds: string[];
  workLifeBalance: string;
  supportSystems: string[];
  advice: string;
  desiredChanges: string;
  additionalThoughts: string;
  // Novas perguntas Likert
  confidenceInAbilities: string;
  feelingBelonging: string;
  workplaceInclusion: string;
  accessToOpportunities: string;
  stressLevel: string;
  careerSatisfaction: string;
  // Novas perguntas de múltipla escolha
  discriminationExperiences: string[];
  motivationFactors: string[];
  futureWorries: string[];
}

const initialResponses: QuestionnaireResponses = {
  careerStage: "",
  scienceField: "",
  inspiration: "",
  challenges: [],
  environmentSupport: "",
  hasRoleModels: "",
  inspirations: "",
  mentorshipImportance: "",
  careerGoals: "",
  representationNeeds: [],
  workLifeBalance: "",
  supportSystems: [],
  advice: "",
  desiredChanges: "",
  additionalThoughts: "",
  // Novas perguntas Likert
  confidenceInAbilities: "",
  feelingBelonging: "",
  workplaceInclusion: "",
  accessToOpportunities: "",
  stressLevel: "",
  careerSatisfaction: "",
  // Novas perguntas de múltipla escolha
  discriminationExperiences: [],
  motivationFactors: [],
  futureWorries: [],
};

export function useQuestionnaire() {
  const [currentSection, setCurrentSection] = useState(1);
  const [responses, setResponses] = useState<QuestionnaireResponses>(initialResponses);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSections = 8;

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("questionnaireProgress");
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setCurrentSection(progress.currentSection || 1);
        setResponses({ ...initialResponses, ...progress.responses });
      } catch (error) {
        console.error("Error loading saved progress:", error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = () => {
    const progress = {
      currentSection,
      responses,
    };
    localStorage.setItem("questionnaireProgress", JSON.stringify(progress));
  };

  const updateResponse = (field: keyof QuestionnaireResponses, value: any) => {
    setResponses(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateArrayResponse = (field: keyof QuestionnaireResponses, value: string, checked: boolean) => {
    setResponses(prev => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return {
          ...prev,
          [field]: [...currentArray, value],
        };
      } else {
        return {
          ...prev,
          [field]: currentArray.filter(item => item !== value),
        };
      }
    });
  };

  const goToNextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSection > 1) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const submitQuestionnaire = () => {
    // Save final responses
    localStorage.setItem("questionnaireResponses", JSON.stringify(responses));
    // Clear progress
    localStorage.removeItem("questionnaireProgress");
    setIsSubmitted(true);
  };

  const startNewSurvey = () => {
    setCurrentSection(1);
    setResponses(initialResponses);
    setIsSubmitted(false);
    localStorage.removeItem("questionnaireProgress");
    localStorage.removeItem("questionnaireResponses");
  };

  const progressPercentage = (currentSection / totalSections) * 100;

  return {
    currentSection,
    totalSections,
    responses,
    isSubmitted,
    progressPercentage,
    updateResponse,
    updateArrayResponse,
    goToNextSection,
    goToPreviousSection,
    saveProgress,
    submitQuestionnaire,
    startNewSurvey,
  };
}
