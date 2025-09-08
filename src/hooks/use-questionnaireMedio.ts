import { useState, useEffect } from "react";

export interface QuestionnaireResponses {
  gender: string;
  currentSchoolYear: string;
  schoolType: string;
  parentsEducation: string;
  childhoodHobbiesTime: string;

  interestScienceMath: string;
  gradesScienceMath: string;
  interestChangeScienceMath: string;
  scienceReference: string;

  familyRecognitionScienceMath: string;
  teachersRecognitionScienceMath: string;
  familyEncouragementStudyOverWork: string;
  admiredTeachersGender: string;

  bestGradesByGender: string;
  moreInterestByGender: string;
  moreInterestInTechnology: string;
  moreSkillWithTechnology: string;
  feelingExcludedTechOrExact: string;
  leftActivityDueGender: string;
  futureCareerArea: string;
  motivesOrder: string[];
  futureProfessionalSelf: string;
  stemCareerInterest: string;
}

const initialResponses: QuestionnaireResponses = {
  gender: "",
  currentSchoolYear: "",
  schoolType: "",
  parentsEducation: "",
  childhoodHobbiesTime: "",

  interestScienceMath: "",
  gradesScienceMath: "",
  interestChangeScienceMath: "",
  scienceReference: "",

  familyRecognitionScienceMath: "",
  teachersRecognitionScienceMath: "",
  familyEncouragementStudyOverWork: "",
  admiredTeachersGender: "",

  bestGradesByGender: "",
  moreInterestByGender: "",
  moreInterestInTechnology: "",
  moreSkillWithTechnology: "",
  feelingExcludedTechOrExact: "",
  leftActivityDueGender: "",
  futureCareerArea: "",
  motivesOrder: [""],
  futureProfessionalSelf: "",
  stemCareerInterest: "",
};

export function useQuestionnaireMedio() {
  const [currentSection, setCurrentSection] = useState(1);
  const [responses, setResponses] =
    useState<QuestionnaireResponses>(initialResponses);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSections = 5;

  const submitToGoogleSheets = async (): Promise<boolean> => {
    try {
      const formData = new FormData();
      // Adiciona todos os campos do formulário
      Object.entries(responses).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // Gerar timestamp atual
      formData.append("timestamp", new Date().toISOString());

      const scriptUrl = import.meta.env.VITE_URL_QUESTIONNAIRE_MEDIO_SCRIPT;

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
