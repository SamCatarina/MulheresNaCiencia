import { useQuestionnaire } from "../hooks/use-questionnaire";
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
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Questionnaire = () => {
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
  } = useQuestionnaire();

  // Campos obrigatórios por seção
  const requiredFields = {
    1: [
      "fullName",
      "universityType",
      "courseAreaGeneral",
      "courseName",
      "parentsEducation",
      "basicSchoolType",
      "childhoodHobbiesTime",
      "childhoodMainActivities",
    ],
    2: [
      "currentCourseDesired",
      "currentCourseIdentification",
      "currentCourseAreaMatch",
      "currentCourseAreaIdentification",
      "familyInfluence",
      "societalContribution",
      "financialReturn",
      "financialReturnTime",
      "courseAvailability",
      "familyInCourseArea",
      "quickReturnFields",
      "futureProfessionalSelf",
      "stemCareerInterest",
      "stemCareerEverInterest",
      "stemCareerDesistanceReason",
    ],
    3: [
      "schoolExactInterestByGender",
      "preCollegeExactInterestLevel",
      "familySchoolPerformanceValue",
      "teacherPerformanceValue",
      "scienceReference",
      "admiredExactTeachersGender",
      "lostInterestExactSciences",
      "mainReasonLeavingSTEM",
      "feltSTEMNotForMeEver",
      "feelingExcludedTech",
      "feelingExcludedExact",
    ],
    4: [
      "familyStudyIncentive",
      "activityGenderRestriction",
      "professionsByGenderOpinion",
      "professionSuitabilityOpinion",
    ],
  };

  // Verifica se todos os campos obrigatórios da seção estão preenchidos
  const isSectionValid = requiredFields[currentSection].every(
    (field) =>
      responses[field] !== "" &&
      responses[field] !== undefined &&
      responses[field] !== null
  );

  const { toast } = useToast();

  const handleSaveProgress = () => {
    saveProgress();
    toast({
      title: "Progresso Salvo",
      description: "O progresso do seu questionário foi salvo com sucesso.",
    });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Motivos do drag-and-drop persistidos no responses
  const motivesDefault = [
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
  ];

  const motives =
    responses.motivesOrder && Array.isArray(responses.motivesOrder)
      ? responses.motivesOrder
      : motivesDefault;

  const setMotives = (newOrder: string[]) => {
    updateResponse("motivesOrder", newOrder);
  };

  const CourseSelection = () => {
    const onDragEnd = (result: any) => {
      if (!result.destination) return;
      const reorderedMotives = reorder(
        motives,
        result.source.index,
        result.destination.index
      );
      setMotives(reorderedMotives);
    };

    return (
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2">
          Quais foram os principais motivos que influenciaram sua escolha pelo
          curso que você está cursando atualmente? (Arraste para classificar por
          ordem de importância)
        </Label>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                className="space-y-2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {motives.map((motive: string, index: number) => (
                  <Draggable key={motive} draggableId={motive} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      >
                        {motive}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
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
            <Button
              onClick={startNewSurvey}
              className="bg-primary hover:bg-indigo-700"
            >
              Iniciar Novo Questionário
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {/* Section 1: Personal Background */}
          {currentSection === 1 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Informações Pessoais
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Qual o seu nome e sobrenome?
                  </Label>
                  <Input
                    placeholder="Seu nome e sobrenome..."
                    value={responses.fullName}
                    onChange={(e) => updateResponse("fullName", e.target.value)}
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você atualmente está em uma universidade ...
                  </Label>
                  <Select
                    value={responses.universityType}
                    onValueChange={(value) =>
                      updateResponse("universityType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo da sua universidade..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergraduate">Pública</SelectItem>
                      <SelectItem value="graduate">Privada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Qual a área geral do seu curso?
                  </Label>
                  <Select
                    value={responses.courseAreaGeneral}
                    onValueChange={(value) =>
                      updateResponse("courseAreaGeneral", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu estágio de carreira" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exatas">
                        <strong>Exatas e Tecnológicas </strong> (Engenharia,
                        Matemática, Física, Química, Tecnologia da Informação,
                        Estatística, etc.)
                      </SelectItem>
                      <SelectItem value="humanas">
                        <strong>Humanas</strong> (História, Filosofia,
                        Sociologia, Psicologia, Pedagogia, Geografia, Letras,
                        Ciências Sociais, etc.)
                      </SelectItem>
                      <SelectItem value="biologicas">
                        <strong>Biológicas e da Saúde </strong>(Medicina,
                        Enfermagem, Biologia, Farmácia, Veterinária, Nutrição,
                        Odontologia, etc.)
                      </SelectItem>
                      <SelectItem value="sociais">
                        <strong>Sociais Aplicadas </strong>
                        (Administração, Direito, Economia, Comunicação, Ciências
                        Contábeis, Serviço Social, etc.)
                      </SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Qual o seu curso?
                  </Label>
                  <Input
                    placeholder="Digite o nome do seu curso..."
                    value={responses.courseName}
                    onChange={(e) =>
                      updateResponse("courseName", e.target.value)
                    }
                    className="h-10"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Maior escolaridade dos seus pais
                  </Label>
                  <Select
                    value={responses.parentsEducation}
                    onValueChange={(value) =>
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
                      <SelectItem value="nao-sabe">Não sei informar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Em qual tipo de escola você cursou o ensino fundamental e o
                    ensino médio?
                  </Label>
                  <Select
                    value={responses.basicSchoolType}
                    onValueChange={(value) =>
                      updateResponse("basicSchoolType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de escola que você cursou..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="publico-publico">
                        Ambos ensino fundamental e médio em escola pública
                      </SelectItem>
                      <SelectItem value="privado-privado">
                        Ambos ensino fundamental e médio em escola privada
                      </SelectItem>
                      <SelectItem value="publico-privado">
                        Ensino fundamental em escola pública e ensino médio em
                        escola privada
                      </SelectItem>
                      <SelectItem value="privado-publico">
                        Ensino fundamental em escola privada e ensino médio em
                        escola pública
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Durante sua infância e adolescência, você sentia que tinha
                    tempo e condições para praticar seus hobbies e atividades de
                    interesse pessoal?
                  </Label>
                  <Select
                    value={responses.childhoodHobbiesTime}
                    onValueChange={(value) =>
                      updateResponse("childhoodHobbiesTime", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim-tempo-apoio">
                        Sim, sempre tive tempo e apoio para isso.
                      </SelectItem>
                      <SelectItem value="as-vezes">
                        Às vezes, mas nem sempre conseguia me dedicar como
                        gostaria.
                      </SelectItem>
                      <SelectItem value="raramente-responsabilidades">
                        Raramente, pois outras responsabilidades ocupavam meu
                        tempo.
                      </SelectItem>
                      <SelectItem value="nao-raremente">
                        Não, quase nunca tive tempo ou condições.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Quais eram suas principais atividades de interesse na
                    infância e adolescência?
                  </Label>
                  <Select
                    value={responses.childhoodMainActivities}
                    onValueChange={(value) =>
                      updateResponse("childhoodMainActivities", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma ou mais opções..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ler-livros">
                        Ler livros ou revistas
                      </SelectItem>
                      <SelectItem value="brincar-esportes">
                        Brincar ao ar livre / esportes
                      </SelectItem>
                      <SelectItem value="jogar-videogame">
                        Jogar videogame ou usar computador
                      </SelectItem>
                      <SelectItem value="desenhar-pintar">
                        Desenhar, pintar ou fazer trabalhos manuais
                      </SelectItem>
                      <SelectItem value="programar-montar">
                        Programar, montar ou desmontar coisas
                      </SelectItem>
                      <SelectItem value="estudar-por-conta">
                        Estudar por conta própria (além da escola)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Challenges and Barriers */}
          {currentSection === 2 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Sobre a escolha do curso
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    O curso que você está fazendo atualmente é o que sempre
                    desejou cursar?
                  </Label>
                  <Select
                    value={responses.currentCourseDesired}
                    onValueChange={(value) =>
                      updateResponse("currentCourseDesired", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desde-fundamental">
                        Sim, desde o ensino fundamental.
                      </SelectItem>
                      <SelectItem value="desde-medio">
                        Sim, desde o ensino médio.
                      </SelectItem>
                      <SelectItem value="nao-primeira-opcao">
                        Não, não era minha primeira opção.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você se identifica com o curso que está fazendo atualmente?
                  </Label>
                  <Select
                    value={responses.currentCourseIdentification}
                    onValueChange={(value) =>
                      updateResponse("currentCourseIdentification", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim-completamente">
                        Sim, me identifico completamente.
                      </SelectItem>
                      <SelectItem value="sim-parcialmente">
                        Sim, me identifico parcialmente.
                      </SelectItem>
                      <SelectItem value="nao">
                        Não, não me identifico.
                      </SelectItem>
                      <SelectItem value="nao-sabia">
                        Não sei / Estou em dúvida.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    A área do seu curso atual (ex: Humanas, Exatas ou Saúde) é a
                    mesma que você pretendia cursar anteriormente?
                  </Label>
                  <Select
                    value={responses.currentCourseAreaMatch}
                    onValueChange={(value) =>
                      updateResponse("currentCourseAreaMatch", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim-sempre-quis">
                        Sim, sempre quis essa área.
                      </SelectItem>
                      <SelectItem value="sim-considerei-mudar">
                        Sim, mas já considerei mudar de área antes.
                      </SelectItem>
                      <SelectItem value="nao-pensava-outra-area">
                        Não, pensava em cursar outra área.
                      </SelectItem>
                      <SelectItem value="duvidas-area-certa">
                        Ainda tenho dúvidas sobre se estou na área certa.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você se identifica com a área do conhecimento do seu curso
                    (Humanas, Exatas ou Saúde)?
                  </Label>
                  <Select
                    value={responses.currentCourseAreaIdentification}
                    onValueChange={(value) =>
                      updateResponse("currentCourseAreaIdentification", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim-me-identifico">
                        Sim, me identifico com a área.
                      </SelectItem>
                      <SelectItem value="em-parte">
                        Em parte, tenho afinidade com alguns aspectos.
                      </SelectItem>
                      <SelectItem value="nao-muito">
                        Não muito, às vezes penso que outra área combina mais
                        comigo.
                      </SelectItem>
                      <SelectItem value="nao-acredito">
                        Não, acredito que estou na área errada.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você sente que sua escolha de curso ou carreira foi
                    influenciada pelos anseios da sua família?
                  </Label>
                  <Select
                    value={responses.familyInfluence}
                    onValueChange={(value) =>
                      updateResponse("familyInfluence", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim-principal-motivacao">
                        Sim, essa foi uma das principais motivações.
                      </SelectItem>
                      <SelectItem value="sim-em-parte">
                        Sim, em parte influenciou.
                      </SelectItem>
                      <SelectItem value="nao-muito">
                        Não muito, mas considero isso importante.
                      </SelectItem>
                      <SelectItem value="nao-baseado-no-que-queria">
                        Não, escolhi baseado apenas no que eu queria.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <CourseSelection />

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você acredita que o curso que está fazendo contribui de
                    forma significativa para a sociedade? Esse foi um fator na
                    sua escolha de cursá-lo?
                  </Label>
                  <Select
                    value={responses.societalContribution}
                    onValueChange={(value) =>
                      updateResponse("societalContribution", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contribuicao-importante">
                        Sim, acredito que o curso contribui para a sociedade, e
                        isso foi um dos motivos que me levou a escolhê-lo.
                      </SelectItem>
                      <SelectItem value="contribuicao-nao-importante">
                        Sim, acho o curso socialmente relevante, mas essa não
                        foi uma motivação importante na minha escolha.
                      </SelectItem>
                      <SelectItem value="nao-considero-importante">
                        Não considero o curso especialmente relevante para a
                        sociedade, mas me identifiquei com ele por outras
                        razões.
                      </SelectItem>
                      <SelectItem value="nao-influenciou">
                        Não considero o curso relevante socialmente e isso não
                        influenciou minha escolha.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    O potencial de retorno financeiro da profissão influenciou
                    sua escolha de curso?
                  </Label>
                  <Select
                    value={responses.financialReturn}
                    onValueChange={(value) =>
                      updateResponse("financialReturn", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principal-fator">
                        Sim, foi o principal fator na minha escolha.
                      </SelectItem>
                      <SelectItem value="alguma-influencia">
                        Sim, teve alguma influência, mas não foi o principal.
                      </SelectItem>
                      <SelectItem value="nao-influenciou">
                        Não influenciou minha escolha.
                      </SelectItem>
                      <SelectItem value="nao-pensei-sobre">
                        Não pensei sobre isso ao escolher o curso.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    O tempo esperado para alcançar retorno financeiro
                    influenciou sua escolha de curso?
                  </Label>
                  <Select
                    value={responses.financialReturnTime}
                    onValueChange={(value) =>
                      updateResponse("financialReturnTime", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retorno-rapido">
                        Sim, escolhi pensando em retorno rápido.
                      </SelectItem>
                      <SelectItem value="retorno-demorado">
                        Sim, mas aceitei que o retorno seria demorado.
                      </SelectItem>
                      <SelectItem value="nao-influenciou">
                        Não influenciou minha escolha.
                      </SelectItem>
                      <SelectItem value="nao-considerei">
                        Não considerei esse aspecto ao decidir.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    A disponibilidade de cursos na sua região influenciou sua
                    escolha de curso?
                  </Label>
                  <Select
                    value={responses.courseAvailability}
                    onValueChange={(value) =>
                      updateResponse("courseAvailability", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="falta-opcoes">
                        Sim, era o que estava disponível e acabei escolhendo por
                        falta de opções.
                      </SelectItem>
                      <SelectItem value="opcoes-limitadas">
                        As opções eram limitadas, mas esse curso era o que eu
                        queria.
                      </SelectItem>
                      <SelectItem value="nao-influenciou">
                        Não, tive muitas outras opções e escolhi esse por
                        afinidade.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você tem familiares que já atuam ou estudaram na mesma área
                    do seu curso (ex: Humanas, Exatas, Saúde)?
                  </Label>
                  <Select
                    value={responses.familyInCourseArea}
                    onValueChange={(value) =>
                      updateResponse("familyInCourseArea", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mais-de-uma-pessoa">
                        Sim, mais de uma pessoa da minha família está nessa
                        área.
                      </SelectItem>
                      <SelectItem value="uma-pessoa-proxima">
                        Sim, uma pessoa próxima (pai, mãe, irmão etc.).
                      </SelectItem>
                      <SelectItem value="parentes-distantes">
                        Sim, mas são parentes mais distantes.
                      </SelectItem>
                      <SelectItem value="primeiro-da-familia">
                        Não, sou o(a) primeiro(a) da família nessa área.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Na sua opinião, quais áreas profissionais oferecem um
                    retorno financeiro mais rápido na região onde você vive?
                  </Label>
                  <Select
                    value={responses.quickReturnFields}
                    onValueChange={(value) =>
                      updateResponse("quickReturnFields", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma área..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saude">
                        Saúde (ex: Enfermagem, Medicina, Odontologia)
                      </SelectItem>
                      <SelectItem value="educacao">
                        Educação (ex: Pedagogia, Letras, História)
                      </SelectItem>
                      <SelectItem value="engenharia">
                        Engenharia (ex: Civil, Elétrica, Mecânica)
                      </SelectItem>
                      <SelectItem value="tecnologia">
                        Tecnologia da Informação (ex: Computação, Análise de
                        Sistemas)
                      </SelectItem>
                      <SelectItem value="adm-negocios">
                        Administração e Negócios
                      </SelectItem>
                      <SelectItem value="direito">Direito</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <LikertScale
                  question="Consigo me imaginar no futuro como um(a) profissional nas áreas de ciência, engenharia ou tecnologia."
                  value={responses.futureProfessionalSelf}
                  onValueChange={(value) =>
                    updateResponse("futureProfessionalSelf", value)
                  }
                />

                <LikertScale
                  question="Tenho interesse em me tornar um(a) profissional nas áreas de ciência, engenharia ou tecnologia."
                  value={responses.stemCareerInterest}
                  onValueChange={(value) =>
                    updateResponse("stemCareerInterest", value)
                  }
                />

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você já teve interesse em seguir uma carreira na área de
                    STEM (Ciência, Tecnologia, Engenharia ou Matemática)?
                  </Label>
                  <Select
                    value={responses.stemCareerEverInterest}
                    onValueChange={(value) =>
                      updateResponse("stemCareerEverInterest", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                      <SelectItem value="nao-tenho-certeza">
                        Não tenho certeza
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Se respondeu "Sim", o que fez você desistir ou repensar essa
                    escolha?
                  </Label>
                  <Select
                    value={responses.stemCareerDesistanceReason}
                    onValueChange={(value) =>
                      updateResponse("stemCareerDesistanceReason", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um motivo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="falta-identificacao">
                        Falta de identificação com a área
                      </SelectItem>
                      <SelectItem value="dificuldade-exatas">
                        Dificuldade com disciplinas de exatas
                      </SelectItem>
                      <SelectItem value="falta-representatividade">
                        Falta de representatividade ou referências
                      </SelectItem>
                      <SelectItem value="pressao-familiar">
                        Pressão familiar para escolher outra área
                      </SelectItem>
                      <SelectItem value="falta-informacao">
                        Falta de informação sobre carreiras em STEM
                      </SelectItem>
                      <SelectItem value="poucas-oportunidades">
                        Poucas oportunidades na minha região
                      </SelectItem>
                      <SelectItem value="questoes-financeiras">
                        Questões financeiras
                      </SelectItem>
                      <SelectItem value="nao-repensei">
                        Nunca repensei minha escolha
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Role Models and Mentorship */}
          {currentSection === 3 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Sobre interesse em STEM
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Na sua experiência escolar, quem você percebia demonstrar
                    mais interesse por disciplinas da área de exatas (como
                    matemática, física, química ou tecnologia)?
                  </Label>
                  <Select
                    value={responses.schoolExactInterestByGender}
                    onValueChange={(value) =>
                      updateResponse("schoolExactInterestByGender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meninas">Meninas</SelectItem>
                      <SelectItem value="meninos">Meninos</SelectItem>
                      <SelectItem value="nao-diferenca">
                        Não observo diferença
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Antes de entrar no ensino superior, você se interessava por
                    disciplinas da área de exatas (como matemática, física,
                    química ou tecnologia)?
                  </Label>
                  <Select
                    value={responses.preCollegeExactInterestLevel}
                    onValueChange={(value) =>
                      updateResponse("preCollegeExactInterestLevel", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="muito-interesse">
                        Sim, sempre tive muito interesse por essas disciplinas
                      </SelectItem>
                      <SelectItem value="algum-interesse">
                        Tinha algum interesse, mas não era minha área favorita
                      </SelectItem>
                      <SelectItem value="pouco-interesse">
                        Não tinha muito interesse, mas conseguia acompanhar
                      </SelectItem>
                      <SelectItem value="nenhum-interesse">
                        Não gostava nem me identificava com essas disciplinas
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    De que forma sua família valorizava seu desempenho escolar
                    durante sua trajetória na educação básica?
                  </Label>
                  <Select
                    value={responses.familySchoolPerformanceValue}
                    onValueChange={(value) =>
                      updateResponse("familySchoolPerformanceValue", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="valorizava-muito">
                        Valorizava muito e acompanhava de perto minhas notas e
                        aprendizados
                      </SelectItem>
                      <SelectItem value="valorizava-moderadamente">
                        Valorizava, mas sem muita cobrança ou acompanhamento
                        frequente
                      </SelectItem>
                      <SelectItem value="valorizava-eventualmente">
                        Só valorizava quando eu ia muito bem ou muito mal
                      </SelectItem>
                      <SelectItem value="nao-demonstrava-interesse">
                        Não demonstrava muito interesse ou envolvimento com meu
                        desempenho
                      </SelectItem>
                      <SelectItem value="nao-valorizava">
                        Pelo contrário, minha família não valorizava a escola ou
                        os estudos
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    De modo geral, ao longo da sua trajetória escolar, você
                    sentia que seus professores valorizavam seu desempenho?
                  </Label>
                  <Select
                    value={responses.teacherPerformanceValue}
                    onValueChange={(value) =>
                      updateResponse("teacherPerformanceValue", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maioria-valorizava">
                        Sim, a maioria dos meus professores me incentivava e
                        reconhecia meu esforço
                      </SelectItem>
                      <SelectItem value="alguns-valorizavam">
                        Alguns professores valorizavam meu desempenho, outros
                        não demonstravam muito interesse
                      </SelectItem>
                      <SelectItem value="tratavam-neutro">
                        A maioria tratava todos os alunos de forma neutra, sem
                        dar destaque ao desempenho individual
                      </SelectItem>
                      <SelectItem value="poucos-valorizavam">
                        Poucos professores demonstravam valorização ou
                        incentivo, mesmo quando eu me esforçava
                      </SelectItem>
                      <SelectItem value="desempenho-ignorado">
                        Senti que, no geral, meu desempenho foi ignorado ou até
                        desvalorizado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Cite uma referência para você na ciência/matemática
                  </Label>
                  <Input
                    placeholder="Digite o nome do seu curso..."
                    value={responses.scienceReference}
                    onChange={(e) =>
                      updateResponse("scienceReference", e.target.value)
                    }
                    className="h-10"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Os professores das ciências exatas que já admirei, em sua
                    maioria, são:
                  </Label>
                  <Select
                    value={responses.admiredExactTeachersGender}
                    onValueChange={(value) =>
                      updateResponse("admiredExactTeachersGender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">
                        Professores do gênero masculino
                      </SelectItem>
                      <SelectItem value="feminino">
                        Professores do gênero feminino
                      </SelectItem>
                      <SelectItem value="ambos">
                        Admirei igualmente professores de ambos os gêneros
                      </SelectItem>
                      <SelectItem value="nenhum">
                        Não tive professores de exatas que me inspirassem
                        particularmente
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você já sentiu, em algum momento, que perdeu o interesse ou
                    o entusiasmo pelas disciplinas de ciências exatas, como
                    matemática, física, química ou tecnologia?
                  </Label>
                  <Select
                    value={responses.lostInterestExactSciences}
                    onValueChange={(value) =>
                      updateResponse("lostInterestExactSciences", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim-perdi">
                        Sim, em algum momento perdi o interesse ou o entusiasmo
                        por essas disciplinas
                      </SelectItem>
                      <SelectItem value="nao-perdi">
                        Não, sempre mantive o interesse e o entusiasmo por essas
                        disciplinas
                      </SelectItem>
                      <SelectItem value="nunca-tive-interesse">
                        Nunca tive muito interesse ou entusiasmo por essas
                        disciplinas para perder
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    O que mais te afastou das áreas de exatas ou STEM ao longo
                    da sua vida escolar?
                  </Label>
                  <Select
                    value={responses.mainReasonLeavingSTEM}
                    onValueChange={(value) =>
                      updateResponse("mainReasonLeavingSTEM", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dificuldade-conteudo">
                        Dificuldade de entender os conteúdos das disciplinas de
                        exatas
                      </SelectItem>
                      <SelectItem value="nao-era-pra-mim">
                        Acreditava que a área "não era para mim"
                      </SelectItem>
                      <SelectItem value="falta-oportunidades">
                        Falta de oportunidades de estudo ou trabalho na área na
                        minha região
                      </SelectItem>
                      <SelectItem value="falta-apoio-familiar">
                        Ausência de apoio familiar para seguir na área
                      </SelectItem>
                      <SelectItem value="experiencias-negativas">
                        Experiências negativas com professores ou colegas
                      </SelectItem>
                      <SelectItem value="nunca-afastado">
                        Nunca me senti afastado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Você já sentiu, em algum momento, que as áreas de ciência,
                    tecnologia, engenharia ou matemática (STEM) não eram para
                    você?
                  </Label>
                  <Select
                    value={responses.feltSTEMNotForMeEver}
                    onValueChange={(value) =>
                      updateResponse("feltSTEMNotForMeEver", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim-ja-senti">
                        Sim, já senti que essas áreas não combinavam comigo ou
                        que eu não seria capaz.
                      </SelectItem>
                      <SelectItem value="nao-nunca-senti">
                        Não, nunca senti isso, sempre me senti capaz ou
                        interessado(a).
                      </SelectItem>
                      <SelectItem value="nunca-pensei">
                        Nunca pensei sobre isso.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <LikertScale
                  question="Me sinto excluído(a) em conversas sobre tecnologia."
                  value={responses.feelingExcludedTech}
                  onValueChange={(value) =>
                    updateResponse("feelingExcludedTech", value)
                  }
                />

                <LikertScale
                  question="Me sinto excluído(a) em conversas sobre assuntos de exatas (física, matemática, química)"
                  value={responses.feelingExcludedExact}
                  onValueChange={(value) =>
                    updateResponse("feelingExcludedExact", value)
                  }
                />
              </div>
            </div>
          )}

          {/* Section 4: Future Goals */}
          {currentSection === 4 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Sobre opiniões
              </h3>
              <div className="space-y-6">
                <LikertScale
                  question="Minha familía me incentiva mais a continuar meus estudos do que a começar a trabalhar logo."
                  value={responses.familyStudyIncentive}
                  onValueChange={(value) =>
                    updateResponse("familyStudyIncentive", value)
                  }
                />

                <LikertScale
                  question="Já deixei de participar de alguma atividade por achar que não era comum para o gênero com o qual me identifico."
                  value={responses.activityGenderRestriction}
                  onValueChange={(value) =>
                    updateResponse("activityGenderRestriction", value)
                  }
                />

                <LikertScale
                  question="Na sua opinião, existem profissões que são mais adequadas para homens e outras para mulheres? (Exemplos: Enfermagem e Pedagogia para mulheres; Computação e Engenharias para homens.)"
                  value={responses.professionsByGenderOpinion}
                  onValueChange={(value) =>
                    updateResponse("professionsByGenderOpinion", value)
                  }
                />

                <LikertScale
                  question="Você acredita que algumas profissões são indicadas para determinados tipos de pessoas, e que nem todos podem aprender ou exercer essas profissões?"
                  value={responses.professionSuitabilityOpinion}
                  onValueChange={(value) =>
                    updateResponse("professionSuitabilityOpinion", value)
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
              className={currentSection === 1 ? "invisible" : ""}
            >
              <i className="fas fa-arrow-left mr-2"></i>Anterior
            </Button>

            <div className="flex space-x-4 ml-auto">
              <Button
                variant="outline"
                onClick={handleSaveProgress}
                className="bg-secondary hover:bg-cyan-600 "
              >
                <i className="fas fa-save mr-2"></i>Salvar Progresso
              </Button>

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
                  onClick={submitQuestionnaire}
                  className="bg-accent hover:bg-pink-600"
                  disabled={!isSectionValid}
                >
                  <i className="fas fa-paper-plane mr-2"></i>Enviar Questionário
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questionnaire;
