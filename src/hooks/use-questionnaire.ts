import { useState, useEffect } from "react";

export interface QuestionnaireResponses {
  // Seção 1
  fullName: string;
  universityType: string;
  courseAreaGeneral: string;
  courseName: string;
  parentsEducation: string;
  basicSchoolType: string;
  childhoodHobbiesTime: string;
  childhoodMainActivities: string;
  // Seção 2
  currentCourseDesired: string;
  currentCourseIdentification: string;
  currentCourseAreaMatch: string;
  currentCourseAreaIdentification: string;
  familyInfluence: string;
  societalContribution: string;
  financialReturn: string;
  financialReturnTime: string;
  courseAvailability: string;
  familyInCourseArea: string;
  quickReturnFields: string;
  futureProfessionalSelf: string;
  stemCareerInterest: string;
  stemCareerEverInterest: string;
  stemCareerDesistanceReason: string;
  // Seção 3
  schoolExactInterestByGender: string;
  preCollegeExactInterestLevel: string;
  familySchoolPerformanceValue: string;
  teacherPerformanceValue: string;
  scienceReference: string;
  admiredExactTeachersGender: string;
  lostInterestExactSciences: string;
  mainReasonLeavingSTEM: string;
  feltSTEMNotForMeEver: string;
  feelingExcludedTech: string;
  feelingExcludedExact: string;
  // Seção 4
  familyStudyIncentive: string;
  activityGenderRestriction: string;
  professionsByGenderOpinion: string;
  professionSuitabilityOpinion: string;

  // Campo para ordem dos motivos do drag-and-drop
  motivesOrder: string[];
}

const initialResponses: QuestionnaireResponses = {
  // Seção 1
  fullName: "",
  universityType: "",
  courseAreaGeneral: "",
  courseName: "",
  parentsEducation: "",
  basicSchoolType: "",
  childhoodHobbiesTime: "",
  childhoodMainActivities: "",
  // Seção 2
  currentCourseDesired: "",
  currentCourseIdentification: "",
  currentCourseAreaMatch: "",
  currentCourseAreaIdentification: "",
  familyInfluence: "",
  societalContribution: "",
  financialReturn: "",
  financialReturnTime: "",
  courseAvailability: "",
  familyInCourseArea: "",
  quickReturnFields: "",
  futureProfessionalSelf: "",
  stemCareerInterest: "",
  stemCareerEverInterest: "",
  stemCareerDesistanceReason: "",
  // Seção 3
  schoolExactInterestByGender: "",
  preCollegeExactInterestLevel: "",
  familySchoolPerformanceValue: "",
  teacherPerformanceValue: "",
  scienceReference: "",
  admiredExactTeachersGender: "",
  lostInterestExactSciences: "",
  mainReasonLeavingSTEM: "",
  feltSTEMNotForMeEver: "",
  feelingExcludedTech: "",
  feelingExcludedExact: "",
  // Seção 4
  familyStudyIncentive: "",
  activityGenderRestriction: "",
  professionsByGenderOpinion: "",
  professionSuitabilityOpinion: "",
  motivesOrder: [
    "(A) Afinidade com a área / interesse pessoal pelos temas do curso",
    "(B) Identificação com o tipo de profissional que atua na área",
    "(C) Influência de familiares (pais, responsáveis, parentes)",
    "(D) Influência de amigos(as) ou conhecidos(as) que também escolheram esse curso",
    "(E) Pressão familiar para escolher determinada área",
    "(F) Expectativa de boa remuneração ou estabilidade financeira",
    "(G) Facilidade de acesso ao curso (proximidade, nota do Enem, bolsa, etc.)",
    "(H) Poucas opções disponíveis no momento da escolha",
    "(I) Indecisão: escolhi por não saber o que queria fazer",
    "(J) Escolhi por já ter experiências anteriores (ex: curso técnico, estágio, trabalho)",
  ],
};

export function useQuestionnaire() {
  const [currentSection, setCurrentSection] = useState(1);
  const [responses, setResponses] =
    useState<QuestionnaireResponses>(initialResponses);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSections = 4;

  const submitToGoogleSheets = async (): Promise<boolean> => {
    try {
      const formData = new FormData();
      // Adiciona todos os campos do formulário
      Object.entries(responses).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // Gerar timestamp atual
      formData.append("timestamp", new Date().toISOString());

      const scriptUrl = import.meta.env.VITE_URL_QUESTIONNAIRE_SCRIPT;

      if (!scriptUrl) {
        console.error("variable is not defined.");
        return false;
      }

      const response = await fetch(scriptUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Erro ao enviar dados:", response.statusText);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Erro na submissão para Google Sheets:", error);
      return false;
    }
  };

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
    setResponses((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateArrayResponse = (
    field: keyof QuestionnaireResponses,
    value: string,
    checked: boolean
  ) => {
    setResponses((prev) => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return {
          ...prev,
          [field]: [...currentArray, value],
        };
      } else {
        return {
          ...prev,
          [field]: currentArray.filter((item) => item !== value),
        };
      }
    });
  };

  const goToNextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSection > 1) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const submitQuestionnaire = async () => {
    const success = await submitToGoogleSheets();

    if (success) {
      // Salvar localmente e atualizar estado
      localStorage.setItem("questionnaireResponses", JSON.stringify(responses));
      localStorage.removeItem("questionnaireProgress");
      setIsSubmitted(true);
    } else {
      // Aqui você pode exibir um alerta para o usuário (ou usar seu toast)
      alert("Erro ao enviar o questionário. Por favor, tente novamente.");
    }
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
