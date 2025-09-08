import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { useToast } from "../hooks/use-toast";
import LikertScale from "../components/ui/likert-scale";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SquareCheckbox } from "../components/ui/roundCheckbox";
import FooterSection from "../components/footer-section";
import { useQuestionnaireMedio } from "../hooks/use-questionnaireMedio";

const QuestionnaireMedio = () => {
  const {
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
  } = useQuestionnaireMedio();

  // Campos obrigatórios por seção
  const requiredFields: { [key: string]: string[] } = {
    "2": [
      "gender", // Gênero
      "currentSchoolYear", // Ano escolar
      "schoolType", // Tipo de escola (pública/privada/etc)
      "parentsEducation", // Escolaridade dos responsáveis
      "childhoodHobbiesTime", // Tempo para hobbies e interesses na infância
    ],

    "3": [
      "interestScienceMath", // Interesse atual
      "gradesScienceMath", // Desempenho escolar
      "interestChangeScienceMath", // Mudança no interesse ao longo do tempo
      "scienceReference", // Referência pessoal na ciência/matemática
    ],

    "4": [
      "familyRecognitionScienceMath", // Reconhecimento da família
      "teachersRecognitionScienceMath", // Reconhecimento dos professores
      "familyEncouragementStudyOverWork", // Incentivo da família (estudar vs trabalhar)
      "admiredTeachersGender", // Gênero dos professores admirados
    ],

    "5": [
      "bestGradesByGender", // Quem tira as melhores notas
      "moreInterestByGender", // Quem tem mais interesse
      "moreInterestInTechnology", // Interesse em tecnologia por gênero
      "moreSkillWithTechnology", // Habilidade em tecnologia por gênero
      "feelingExcludedTechOrExact", // Sentimento de exclusão
      "leftActivityDueGender", // Já deixou de participar por ser "incomum para o gênero"
      "futureCareerArea", // Área de interesse profissional
      "futureProfessionalSelf", // Imagem de si no futuro profissional
      "stemCareerInterest", // Interesse em seguir carreira nas áreas STEM
    ],
  };

  const activities = [
    { label: "Ler livros ou revistas", value: "ler-livros" },
    { label: "Brincar ao ar livre / esportes", value: "brincar-esportes" },
    { label: "Jogar videogame ou usar computador", value: "jogar-videogame" },
    {
      label: "Desenhar, pintar ou fazer trabalhos manuais",
      value: "desenhar-pintar",
    },
    {
      label: "Programar, montar ou desmontar coisas",
      value: "programar-montar",
    },
    {
      label: "Estudar por conta própria (além da escola)",
      value: "estudar-por-conta",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSection]);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  // Verifica se todos os campos obrigatórios da seção estão preenchidos
  // Permitir indexação por string (corrige erro TS)
  const [consentimento, setConsentimento] = useState<string | null>(null);
  const responsesAny = responses as { [key: string]: any };

  const isSectionValid =
    currentSection === 1
      ? consentimento === "sim"
      : requiredFields[String(currentSection)].every((field) => {
          const value = responsesAny[field];

          // Valida arrays obrigatórios
          if (["childhoodMainActivities", "motivesOrder"].includes(field)) {
            return Array.isArray(value) && value.length > 0;
          }

          // Validação padrão
          return value !== "" && value !== undefined && value !== null;
        }) &&
        // Validação condicional para desinteresse em STEM
        (currentSection !== 3 ||
          responsesAny["stemCareerEverInterest"] !== "sim" ||
          (responsesAny["stemCareerDesistanceReason"] !== "" &&
            responsesAny["stemCareerDesistanceReason"] !== undefined &&
            responsesAny["stemCareerDesistanceReason"] !== null));

  const { toast } = useToast();

  // Motivos do drag-and-drop persistidos no responses
  const futureProfessionMotives = [
    "Tenho afinidade com a área ou me interesso pelos temas relacionados",
    "Me identifico com o tipo de trabalho ou profissional da área",
    "Recebo influência de familiares (pais, responsáveis, parentes)",
    "Recebo influência de amigos(as) ou conhecidos(as)",
    "Sinto pressão da família para seguir determinada área",
    "Acredito que essa profissão oferece boa remuneração ou estabilidade",
    "É uma área de fácil acesso para mim (proximidade, nota, bolsa, etc.)",
    "Tive poucas opções disponíveis na hora de decidir",
    "Escolhi por não saber exatamente o que queria fazer",
    "Já tive experiências anteriores que me influenciaram (curso técnico, estágio, trabalho)",
  ];

  const CourseSelection = () => {
    const selectedMotives =
      responses.motivesOrder && Array.isArray(responses.motivesOrder)
        ? responses.motivesOrder
        : [];

    const unselectedMotives = futureProfessionMotives.filter(
      (motive) => !selectedMotives.includes(motive)
    );

    const handleClick = (motive: string) => {
      let updated: string[];

      if (selectedMotives.includes(motive)) {
        // Se já está selecionado, remove da lista
        updated = selectedMotives.filter((m) => m !== motive);
      } else {
        // Adiciona ao final da lista (último clique)
        updated = [...selectedMotives, motive];
      }

      updateResponse("motivesOrder", updated);
    };

    return (
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          Quais foram os principais motivos que influenciaram sua escolha pelo
          curso que você está cursando atualmente?
          <br />
          (Clique para elencar em ordem de importância — o 1º é o mais
          importante, selecione pelo menos 3)
        </Label>

        <ul className="space-y-2">
          {selectedMotives.map((motive, index) => (
            <li
              key={motive}
              onClick={() => handleClick(motive)}
              className="flex items-center gap-2 cursor-pointer border border-primary bg-primary/10 rounded-md px-3 py-2 hover:bg-primary/20 transition"
            >
              <span className="text-sm font-bold text-primary w-6">
                {index + 1}.
              </span>
              <span className="text-sm text-gray-800">{motive}</span>
            </li>
          ))}

          {unselectedMotives.map((motive) => (
            <li
              key={motive}
              onClick={() => handleClick(motive)}
              className="flex items-center gap-2 cursor-pointer border border-input rounded-md px-3 py-2 hover:bg-muted transition"
            >
              <span className="w-6" /> {/* Reservar espaço para o número */}
              <span className="text-sm text-gray-800">{motive}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-4">
              <i className="fas fa-check-circle text-green-500 text-6xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              Obrigado!
            </h3>
            <p className="text-gray-600 mb-6">
              Suas respostas foram enviadas com sucesso. Obrigado por contribuir
              para nossa compreensão das experiências das mulheres na ciência.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pesquisa Pessoal
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ajude-nos a entender as experiências e perspectivas das mulheres na
            ciência através desta pesquisa abrangente.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>
              {currentSection} de {totalSections} seções
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {currentSection === 1 && (
            <div className="space-y-6">
              <div className="text-gray-700 text-base space-y-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  Pesquisa sobre o interesse na área de STEM
                </h3>

                <p>
                  Agradecemos por dedicar seu tempo para participar desta
                  pesquisa!
                </p>

                <p>
                  A presença de mulheres nas áreas de STEM (Ciência, Tecnologia,
                  Engenharia e Matemática) é fundamental para o avanço
                  científico e tecnológico com mais diversidade, inclusão e
                  representatividade. Ainda assim, a participação feminina
                  nessas áreas permanece desproporcional, reflexo de desafios
                  históricos, sociais e culturais.
                </p>

                <p>
                  Este estudo tem como objetivo compreender a trajetória, os
                  interesses e os fatores que influenciaram — positiva ou
                  negativamente — a relação de mulheres com as áreas de STEM ao
                  longo de suas vidas. A pesquisa foca especialmente em
                  estudantes de cursos superiores na cidade de Salgueiro,
                  Pernambuco, buscando identificar como experiências pessoais,
                  escolares, sociais e familiares impactaram a escolha (ou não)
                  por essas áreas.
                </p>

                <p>
                  Esta pesquisa é voltada para{" "}
                  <span className="font-medium">
                    dicentes do ensino superior.
                  </span>
                </p>

                <p>
                  Ao enviar este formulário,{" "}
                  <span className="font-medium">
                    nenhuma informação pessoal identificável
                  </span>{" "}
                  (como nome ou e-mail) será coletada.
                </p>

                <p>
                  Todas as respostas são{" "}
                  <span className="font-medium">confidenciais</span> e
                  analisadas apenas de forma agregada. Os dados serão utilizados
                  exclusivamente para fins acadêmicos, sempre garantindo o
                  anonimato dos participantes.
                </p>

                <p>
                  Em caso de dúvidas, você pode entrar em contato com a
                  pesquisadora responsável:
                </p>

                <div className="pl-4 border-l-2 border-gray-300 text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">
                      Catarina Cysneiros Sampaio
                    </span>
                  </p>
                  <p>Discente de Ciência da Computação</p>
                  <p>
                    Universidade Federal do Vale do Rio São Francisco (UNIVASF),
                    Salgueiro - PE
                  </p>
                  <p>
                    <a
                      href="mailto:felipe.guilherme@univasf.edu.br"
                      className="text-blue-600 hover:underline"
                    >
                      catarina.sampaio@discente.univasf.edu.br
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Você concorda em participar da pesquisa?
                </Label>
                <Select
                  value={consentimento || ""}
                  onValueChange={(value) => setConsentimento(value)}
                >
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Selecione uma opção..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim, concordo</SelectItem>
                    <SelectItem value="nao">Não, não concordo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {consentimento === "nao" && (
                <p className="text-red-600 text-sm">
                  Você precisa aceitar participar para iniciar o questionário.
                </p>
              )}
            </div>
          )}

          {/* Section 2: Informações Pessoais */}
          {currentSection === 2 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Informações Pessoais
              </h3>
              <div className="space-y-6">
                {/* gender */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Qual gênero você se identifica?
                  </Label>
                  <Select
                    value={responses.gender}
                    onValueChange={(value: any) =>
                      updateResponse("gender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genero-masculino">
                        Masculino
                      </SelectItem>
                      <SelectItem value="genero-feminino">Feminino</SelectItem>
                      <SelectItem value="genero-outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* currentSchoolYear */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Em que ano/série você está atualmente?
                  </Label>
                  <Select
                    value={responses.currentSchoolYear}
                    onValueChange={(value: any) =>
                      updateResponse("currentSchoolYear", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8-fundamental">
                        8º ano do Ensino Fundamental
                      </SelectItem>
                      <SelectItem value="9-fundamental">
                        9º ano do Ensino Fundamental
                      </SelectItem>
                      <SelectItem value="1-medio">
                        1º ano do Ensino Médio
                      </SelectItem>
                      <SelectItem value="2-medio">
                        2º ano do Ensino Médio
                      </SelectItem>
                      <SelectItem value="3-medio">
                        3º ano do Ensino Médio
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* schoolType */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você atualmente estuda em uma escola
                  </Label>
                  <Select
                    value={responses.schoolType}
                    onValueChange={(value: any) =>
                      updateResponse("schoolType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo da sua escola..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="publica">Pública</SelectItem>
                      <SelectItem value="privada">Privada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* parentsEducation */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Maior escolaridade dos seus pais
                  </Label>
                  <Select
                    value={responses.parentsEducation}
                    onValueChange={(value: any) =>
                      updateResponse("parentsEducation", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a maior escolaridade dos seus pais..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        Nunca estudou / Analfabeto
                      </SelectItem>
                      <SelectItem value="fundamental-incompleto">
                        Ensino Fundamental Incompleto
                      </SelectItem>
                      <SelectItem value="fundamental-completo">
                        Ensino Fundamental Completo
                      </SelectItem>
                      <SelectItem value="medio-incompleto">
                        Ensino Médio Incompleto
                      </SelectItem>
                      <SelectItem value="medio-completo">
                        Ensino Médio Completo
                      </SelectItem>
                      <SelectItem value="superior-incompleto">
                        Ensino Superior Incompleto
                      </SelectItem>
                      <SelectItem value="superior-completo">
                        Ensino Superior Completo
                      </SelectItem>
                      <SelectItem value="pos">
                        Pós-graduação (Especialização)
                      </SelectItem>
                      <SelectItem value="mestrado">Mestrado</SelectItem>
                      <SelectItem value="doutorado">Doutorado</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                      <SelectItem value="nao-sabe">Não sei informar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* childhoodHobbiesTime */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Quando você era criança ou estava no início da adolescência,
                    sentia que tinha tempo e apoio para fazer as coisas de que
                    gostava, como hobbies ou outras atividades do seu interesse?
                  </Label>
                  <Select
                    value={responses.childhoodHobbiesTime}
                    onValueChange={(value: any) =>
                      updateResponse("childhoodHobbiesTime", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim-tempo-apoio">
                        Sim, sempre tive tempo e apoio pra isso.
                      </SelectItem>
                      <SelectItem value="as-vezes">
                        Às vezes, mas nem sempre conseguia fazer como queria.
                      </SelectItem>
                      <SelectItem value="raramente-responsabilidades">
                        Raramente, porque tinha outras coisas pra fazer que
                        ocupavam meu tempo.
                      </SelectItem>
                      <SelectItem value="nao-raremente">
                        Não, quase nunca tinha tempo ou condições.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Interesse e Desempenho em Ciências/Matemática */}
          {currentSection === 3 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Interesse e Desempenho em Ciências/Matemática
              </h3>
              <div className="space-y-6">
                {/* interestScienceMath */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Tenho interesse nas disciplinas de ciências naturais (física
                    e química) e matemática.
                  </Label>
                  <Select
                    value={responses.interestScienceMath}
                    onValueChange={(value: any) =>
                      updateResponse("interestScienceMath", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concordo-plenamente">
                        Concordo plenamente
                      </SelectItem>
                      <SelectItem value="concordo">Concordo</SelectItem>
                      <SelectItem value="neutro">
                        Nem concordo, nem discordo
                      </SelectItem>
                      <SelectItem value="discordo">Discordo</SelectItem>
                      <SelectItem value="discordo-plenamente">
                        Discordo plenamente
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* gradesScienceMath */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    De modo geral, obtenho boas notas nas disciplinas de
                    ciências naturais, como física e química, além de
                    matemática.
                  </Label>
                  <Select
                    value={responses.gradesScienceMath}
                    onValueChange={(value: any) =>
                      updateResponse("gradesScienceMath", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concordo-plenamente">
                        Concordo plenamente
                      </SelectItem>
                      <SelectItem value="concordo">Concordo</SelectItem>
                      <SelectItem value="neutro">
                        Nem concordo, nem discordo
                      </SelectItem>
                      <SelectItem value="discordo">Discordo</SelectItem>
                      <SelectItem value="discordo-plenamente">
                        Discordo plenamente
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* interestChangeScienceMath */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Sinto que, ao longo do tempo, meu interesse e entusiasmo por
                    ciências e matemática:
                  </Label>
                  <Select
                    value={responses.interestChangeScienceMath}
                    onValueChange={(value: any) =>
                      updateResponse("interestChangeScienceMath", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perdi-muito">
                        Diminuíram muito
                      </SelectItem>
                      <SelectItem value="perdi-pouco">
                        Diminuíram um pouco
                      </SelectItem>
                      <SelectItem value="mantive">
                        Mantive o mesmo interesse
                      </SelectItem>
                      <SelectItem value="nunca-tive">
                        Nunca tive interesse
                      </SelectItem>
                      <SelectItem value="aumentou">
                        Aumentaram com o tempo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* scienceReference */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Cite uma referência para você na ciências exatas. (Caso não
                    lembre de algum, digite apenas " . ")
                  </Label>
                  <Input
                    placeholder="Digite o nome de um cientista..."
                    value={responses.scienceReference}
                    onChange={(e) =>
                      updateResponse("scienceReference", e.target.value)
                    }
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Reconhecimento e Incentivo */}
          {currentSection === 4 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Reconhecimento e Incentivo
              </h3>
              <div className="space-y-6">
                {/* familyRecognitionScienceMath */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Minha família valoriza e reconhece meu esforço nas
                    disciplinas de ciências e matemática.
                  </Label>
                  <Select
                    value={responses.familyRecognitionScienceMath}
                    onValueChange={(value: any) =>
                      updateResponse("familyRecognitionScienceMath", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reconhecem-muito">
                        Reconhecem e valorizam muito
                      </SelectItem>
                      <SelectItem value="reconhecem-razoavel">
                        Reconhecem e valorizam de forma razoável
                      </SelectItem>
                      <SelectItem value="reconhecem-pouco">
                        Reconhecem e valorizam pouco
                      </SelectItem>
                      <SelectItem value="nao-reconhecem">
                        Não costumam reconhecer ou valorizar
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* teachersRecognitionScienceMath */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Meus professores valorizam e reconhecem meu esforço nas
                    disciplinas de ciências e matemática.
                  </Label>
                  <Select
                    value={responses.teachersRecognitionScienceMath}
                    onValueChange={(value: any) =>
                      updateResponse("teachersRecognitionScienceMath", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reconhecem-muito">
                        Reconhecem e valorizam muito
                      </SelectItem>
                      <SelectItem value="reconhecem-bastante">
                        Reconhecem e valorizam bastante
                      </SelectItem>
                      <SelectItem value="reconhecem-razoavel">
                        Reconhecem e valorizam de forma razoável
                      </SelectItem>
                      <SelectItem value="reconhecem-pouco">
                        Reconhecem e valorizam pouco
                      </SelectItem>
                      <SelectItem value="nao-reconhecem">
                        Não costumam reconhecer ou valorizar
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* familyEncouragementStudyOverWork */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Minha família me incentiva mais a estudar e fazer faculdade
                    do que a começar a trabalhar logo.
                  </Label>
                  <Select
                    value={responses.familyEncouragementStudyOverWork}
                    onValueChange={(value: any) =>
                      updateResponse("familyEncouragementStudyOverWork", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="muito">
                        Incentiva muito mais estudar e fazer faculdade
                      </SelectItem>
                      <SelectItem value="razoavel">
                        Incentiva um pouco mais estudar e fazer faculdade
                      </SelectItem>
                      <SelectItem value="igual">
                        Incentiva igualmente estudar/faculdade e trabalhar
                      </SelectItem>
                      <SelectItem value="mais-trabalho">
                        Incentiva mais começar a trabalhar logo
                      </SelectItem>
                      <SelectItem value="nao-incentiva">
                        Não incentiva nenhuma das opções
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* admiredTeachersGender */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Os professores das ciências exatas que admiro/ já admirei,
                    em sua maioria, são:
                  </Label>
                  <Select
                    value={responses.admiredTeachersGender}
                    onValueChange={(value: any) =>
                      updateResponse("admiredTeachersGender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meninos">Homens</SelectItem>
                      <SelectItem value="meninas">Mulheres</SelectItem>
                      <SelectItem value="sem-diferenca">
                        Não observo diferença
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Percepções, Exclusão e Futuro */}
          {currentSection === 5 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Percepções, Exclusão e Futuro
              </h3>
              <div className="space-y-6">
                {/* bestGradesByGender */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Em geral, observo que quem costuma ter melhores notas em
                    ciências e matemática são:
                  </Label>
                  <Select
                    value={responses.bestGradesByGender}
                    onValueChange={(value: any) =>
                      updateResponse("bestGradesByGender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meninos">Meninos</SelectItem>
                      <SelectItem value="meninas">Meninas</SelectItem>
                      <SelectItem value="sem-diferenca">
                        Não observo diferença
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* moreInterestByGender */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Em geral, observo que quem costuma ter mais interesse em
                    ciências e matemática são:
                  </Label>
                  <Select
                    value={responses.moreInterestByGender}
                    onValueChange={(value: any) =>
                      updateResponse("moreInterestByGender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meninos">Meninos</SelectItem>
                      <SelectItem value="meninas">Meninas</SelectItem>
                      <SelectItem value="sem-diferenca">
                        Não observo diferença
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* moreInterestInTechnology */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Em geral, percebo que quem possui mais interesse por
                    artefatos tecnológicos (computadores, celulares e outros)
                    são:
                  </Label>
                  <Select
                    value={responses.moreInterestInTechnology}
                    onValueChange={(value: any) =>
                      updateResponse("moreInterestInTechnology", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meninos">Meninos</SelectItem>
                      <SelectItem value="meninas">Meninas</SelectItem>
                      <SelectItem value="sem-diferenca">
                        Não observo diferença
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* moreSkillWithTechnology */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Em geral, percebo que quem possui mais habilidade com
                    artefatos tecnológicos são:
                  </Label>
                  <Select
                    value={responses.moreSkillWithTechnology}
                    onValueChange={(value: any) =>
                      updateResponse("moreSkillWithTechnology", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meninos">Meninos</SelectItem>
                      <SelectItem value="meninas">Meninas</SelectItem>
                      <SelectItem value="sem-diferenca">
                        Não observo diferença
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* feelingExcludedTechOrExact */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Costumo me sentir excluído(a) em conversas sobre tecnologia
                    ou sobre assuntos de exatas (como física, matemática e
                    química):
                  </Label>
                  <Select
                    value={responses.feelingExcludedTechOrExact}
                    onValueChange={(value: any) =>
                      updateResponse("feelingExcludedTechOrExact", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excluido-exatas-apenas">
                        Me sinto excluído(a) em conversas sobre exatas, mas não
                        sobre tecnologia
                      </SelectItem>
                      <SelectItem value="excluido-tecnologia-apenas">
                        Me sinto excluído(a) em conversas sobre tecnologia, mas
                        não sobre exatas
                      </SelectItem>
                      <SelectItem value="excluido-ambos">
                        Me sinto excluído(a) em conversas sobre ambos os temas
                      </SelectItem>
                      <SelectItem value="nao-excluido">
                        Não me sinto excluído(a) em nenhum dos dois
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* leftActivityDueGender */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você já deixou de participar de alguma atividade por achar
                    que não era comum para o gênero com o qual se identifica?
                  </Label>
                  <Select
                    value={responses.leftActivityDueGender}
                    onValueChange={(value: any) =>
                      updateResponse("leftActivityDueGender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sempre">Sempre</SelectItem>
                      <SelectItem value="frequentemente">
                        Frequentemente
                      </SelectItem>
                      <SelectItem value="às-vezes">Às vezes</SelectItem>
                      <SelectItem value="raramente">Raramente</SelectItem>
                      <SelectItem value="nunca">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* futureCareerArea */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você já tem uma ideia de qual área pretende seguir no
                    futuro?
                  </Label>
                  <Select
                    value={responses.futureCareerArea}
                    onValueChange={(value: any) =>
                      updateResponse("futureCareerArea", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exatas">
                        Área de Exatas (como engenharia, tecnologia, matemática,
                        etc.)
                      </SelectItem>
                      <SelectItem value="biologicas">
                        Área de Ciências Biológicas e da Saúde (como medicina,
                        enfermagem, biologia, etc.)
                      </SelectItem>
                      <SelectItem value="humanas">
                        Área de Ciências Humanas e Sociais (como direito,
                        história, psicologia, etc.)
                      </SelectItem>
                      <SelectItem value="artes">
                        Artes, Design ou áreas criativas
                      </SelectItem>
                      <SelectItem value="outra">Outra área</SelectItem>
                      <SelectItem value="nao-sabe">
                        Ainda não pensei sobre isso / Não sei
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* futureProfessionalSelf */}
                <LikertScale
                  question="Consigo me imaginar no futuro como um(a) profissional nas áreas de ciência, engenharia ou tecnologia."
                  value={responses.futureProfessionalSelf}
                  onValueChange={(value) =>
                    updateResponse("futureProfessionalSelf", value)
                  }
                />
                {/* stemCareerInterest */}
                <LikertScale
                  question="Tenho interesse em me tornar um(a) profissional nas áreas de ciência, engenharia ou tecnologia."
                  value={responses.stemCareerInterest}
                  onValueChange={(value) =>
                    updateResponse("stemCareerInterest", value)
                  }
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={goToPreviousSection}
              className={currentSection === (1 || 2) ? "invisible" : ""}
            >
              <i className="fas fa-arrow-left mr-2"></i>Anterior
            </Button>

            <div className="flex space-x-4 ml-auto">
              {currentSection < totalSections ? (
                <Button
                  onClick={goToNextSection}
                  className="bg-primary hover:bg-indigo-700"
                  disabled={!isSectionValid}
                >
                  Próximo<i className="fas fa-arrow-right ml-2"></i>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsSubmitButtonDisabled(true);
                    submitQuestionnaire();
                  }}
                  className="bg-accent hover:bg-pink-600"
                  disabled={!isSectionValid || isSubmitButtonDisabled}
                >
                  <i className="fas fa-paper-plane mr-2"></i>Enviar Questionário
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </section>
  );
};

export default QuestionnaireMedio;
