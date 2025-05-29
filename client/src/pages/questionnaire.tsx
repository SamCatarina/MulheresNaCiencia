import { useQuestionnaire } from "@/hooks/use-questionnaire";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import LikertScale from "@/components/ui/likert-scale";

export default function Questionnaire() {
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

  const { toast } = useToast();

  const handleSaveProgress = () => {
    saveProgress();
    toast({
      title: "Progress Saved",
      description: "Your questionnaire progress has been saved successfully.",
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-4">
              <i className="fas fa-check-circle text-green-500 text-6xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your responses have been submitted successfully. Thank you for contributing to our understanding of women's experiences in science.
            </p>
            <Button onClick={startNewSurvey} className="bg-primary hover:bg-indigo-700">
              Start New Survey
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Personal Research Survey</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Help us understand the experiences and perspectives of women in science through this comprehensive survey.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentSection} of {totalSections} sections</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Section 1: Personal Background */}
          {currentSection === 1 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">Personal Background</h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">What is your current career stage?</Label>
                  <Select value={responses.careerStage} onValueChange={(value) => updateResponse('careerStage', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your career stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergraduate">Undergraduate Student</SelectItem>
                      <SelectItem value="graduate">Graduate Student</SelectItem>
                      <SelectItem value="postdoc">Postdoctoral Researcher</SelectItem>
                      <SelectItem value="early-career">Early Career Professional</SelectItem>
                      <SelectItem value="mid-career">Mid-Career Professional</SelectItem>
                      <SelectItem value="senior">Senior Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Which field of science do you work in or study?</Label>
                  <Select value={responses.scienceField} onValueChange={(value) => updateResponse('scienceField', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="biology">Biology/Life Sciences</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="medicine">Medicine/Health Sciences</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="environmental">Environmental Science</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">What initially inspired you to pursue science?</Label>
                  <Textarea
                    placeholder="Share your inspiration story..."
                    value={responses.inspiration}
                    onChange={(e) => updateResponse('inspiration', e.target.value)}
                    className="h-24"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Challenges and Barriers */}
          {currentSection === 2 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">Challenges and Barriers</h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3">What challenges have you faced as a woman in science? (Select all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { value: "bias", label: "Gender bias" },
                      { value: "work-life-balance", label: "Work-life balance" },
                      { value: "mentorship", label: "Lack of mentorship" },
                      { value: "funding", label: "Funding difficulties" },
                      { value: "representation", label: "Lack of representation" },
                      { value: "networking", label: "Limited networking opportunities" },
                    ].map((challenge) => (
                      <div key={challenge.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={challenge.value}
                          checked={responses.challenges.includes(challenge.value)}
                          onCheckedChange={(checked) => updateArrayResponse('challenges', challenge.value, checked as boolean)}
                        />
                        <Label htmlFor={challenge.value} className="text-sm">{challenge.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">How supportive is your current work/study environment?</Label>
                  <RadioGroup value={responses.environmentSupport} onValueChange={(value) => updateResponse('environmentSupport', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very-supportive" id="very-supportive" />
                      <Label htmlFor="very-supportive">Very supportive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="somewhat-supportive" id="somewhat-supportive" />
                      <Label htmlFor="somewhat-supportive">Somewhat supportive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="neutral" id="neutral" />
                      <Label htmlFor="neutral">Neutral</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsupportive" id="unsupportive" />
                      <Label htmlFor="unsupportive">Unsupportive</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Role Models and Mentorship */}
          {currentSection === 3 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">Role Models and Mentorship</h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Do you have female role models in science?</Label>
                  <RadioGroup value={responses.hasRoleModels} onValueChange={(value) => updateResponse('hasRoleModels', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="role-models-yes" />
                      <Label htmlFor="role-models-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="role-models-no" />
                      <Label htmlFor="role-models-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="few" id="role-models-few" />
                      <Label htmlFor="role-models-few">Very few</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Who are your scientific inspirations? (Name specific people or describe qualities)</Label>
                  <Textarea
                    placeholder="Tell us about your scientific inspirations..."
                    value={responses.inspirations}
                    onChange={(e) => updateResponse('inspirations', e.target.value)}
                    className="h-24"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">How important is mentorship in your career development?</Label>
                  <Select value={responses.mentorshipImportance} onValueChange={(value) => updateResponse('mentorshipImportance', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select importance level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="extremely">Extremely important</SelectItem>
                      <SelectItem value="very">Very important</SelectItem>
                      <SelectItem value="moderately">Moderately important</SelectItem>
                      <SelectItem value="slightly">Slightly important</SelectItem>
                      <SelectItem value="not">Not important</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Future Goals */}
          {currentSection === 4 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">Future Goals and Aspirations</h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">What are your primary career goals for the next 5 years?</Label>
                  <Textarea
                    placeholder="Describe your career aspirations..."
                    value={responses.careerGoals}
                    onChange={(e) => updateResponse('careerGoals', e.target.value)}
                    className="h-24"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3">Which areas would you like to see more women represented in? (Select all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { value: "leadership", label: "Leadership positions" },
                      { value: "research", label: "Research teams" },
                      { value: "industry", label: "Industry positions" },
                      { value: "academia", label: "Academic faculty" },
                      { value: "policy", label: "Science policy" },
                      { value: "entrepreneurship", label: "Entrepreneurship" },
                    ].map((area) => (
                      <div key={area.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={area.value}
                          checked={responses.representationNeeds.includes(area.value)}
                          onCheckedChange={(checked) => updateArrayResponse('representationNeeds', area.value, checked as boolean)}
                        />
                        <Label htmlFor={area.value} className="text-sm">{area.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Work-Life Integration */}
          {currentSection === 5 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">Work-Life Integration</h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">How do you manage work-life balance in your scientific career?</Label>
                  <Textarea
                    placeholder="Share your strategies and experiences..."
                    value={responses.workLifeBalance}
                    onChange={(e) => updateResponse('workLifeBalance', e.target.value)}
                    className="h-24"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3">What support systems are most important to you? (Select all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { value: "family", label: "Family support" },
                      { value: "colleagues", label: "Supportive colleagues" },
                      { value: "flexible-work", label: "Flexible work arrangements" },
                      { value: "childcare", label: "Childcare support" },
                      { value: "mental-health", label: "Mental health resources" },
                      { value: "professional-networks", label: "Professional networks" },
                    ].map((support) => (
                      <div key={support.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={support.value}
                          checked={responses.supportSystems.includes(support.value)}
                          onCheckedChange={(checked) => updateArrayResponse('supportSystems', support.value, checked as boolean)}
                        />
                        <Label htmlFor={support.value} className="text-sm">{support.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Percepções e Autoavaliação (Escala Likert) */}
          {currentSection === 6 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">Percepções e Autoavaliação</h3>
              <div className="space-y-8">
                <LikertScale
                  question="Tenho confiança nas minhas habilidades científicas e técnicas."
                  value={responses.confidenceInAbilities}
                  onValueChange={(value) => updateResponse('confidenceInAbilities', value)}
                />

                <LikertScale
                  question="Sinto que pertenço ao ambiente científico em que trabalho/estudo."
                  value={responses.feelingBelonging}
                  onValueChange={(value) => updateResponse('feelingBelonging', value)}
                />

                <LikertScale
                  question="Meu local de trabalho/estudo é inclusivo e acolhedor para mulheres."
                  value={responses.workplaceInclusion}
                  onValueChange={(value) => updateResponse('workplaceInclusion', value)}
                />

                <LikertScale
                  question="Tenho acesso igualitário a oportunidades de crescimento profissional."
                  value={responses.accessToOpportunities}
                  onValueChange={(value) => updateResponse('accessToOpportunities', value)}
                />

                <LikertScale
                  question="Meu nível de estresse relacionado ao trabalho/estudos é manejável."
                  value={responses.stressLevel}
                  onValueChange={(value) => updateResponse('stressLevel', value)}
                  options={[
                    { value: "1", label: "Muito alto" },
                    { value: "2", label: "Alto" },
                    { value: "3", label: "Moderado" },
                    { value: "4", label: "Baixo" },
                    { value: "5", label: "Muito baixo" },
                  ]}
                />

                <LikertScale
                  question="Estou satisfeita com o progresso da minha carreira científica."
                  value={responses.careerSatisfaction}
                  onValueChange={(value) => updateResponse('careerSatisfaction', value)}
                />
              </div>
            </div>
          )}

          {/* Section 7: Experiências e Motivações */}
          {currentSection === 7 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">Experiências e Motivações</h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3">Você já vivenciou alguma das seguintes situações? (Marque todas que se aplicam)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { value: "gender-bias", label: "Preconceito de gênero" },
                      { value: "pay-gap", label: "Diferença salarial" },
                      { value: "exclusion", label: "Exclusão de grupos/projetos" },
                      { value: "questioning-competence", label: "Questionamento da competência" },
                      { value: "lack-recognition", label: "Falta de reconhecimento" },
                      { value: "harassment", label: "Assédio (qualquer tipo)" },
                    ].map((experience) => (
                      <div key={experience.value} className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200">
                        <Checkbox
                          id={experience.value}
                          checked={responses.discriminationExperiences.includes(experience.value)}
                          onCheckedChange={(checked) => updateArrayResponse('discriminationExperiences', experience.value, checked as boolean)}
                        />
                        <Label htmlFor={experience.value} className="text-sm">{experience.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3">O que mais te motiva na sua carreira científica? (Marque todas que se aplicam)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { value: "discovery", label: "Fazer descobertas" },
                      { value: "problem-solving", label: "Resolver problemas complexos" },
                      { value: "helping-society", label: "Ajudar a sociedade" },
                      { value: "recognition", label: "Reconhecimento profissional" },
                      { value: "collaboration", label: "Trabalhar em equipe" },
                      { value: "innovation", label: "Inovar e criar" },
                    ].map((motivation) => (
                      <div key={motivation.value} className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200">
                        <Checkbox
                          id={motivation.value}
                          checked={responses.motivationFactors.includes(motivation.value)}
                          onCheckedChange={(checked) => updateArrayResponse('motivationFactors', motivation.value, checked as boolean)}
                        />
                        <Label htmlFor={motivation.value} className="text-sm">{motivation.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3">Quais são suas principais preocupações sobre o futuro? (Marque todas que se aplicam)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { value: "job-security", label: "Segurança no emprego" },
                      { value: "work-life-balance", label: "Equilíbrio vida-trabalho" },
                      { value: "funding", label: "Financiamento para pesquisas" },
                      { value: "discrimination", label: "Discriminação contínua" },
                      { value: "career-advancement", label: "Progressão na carreira" },
                      { value: "family-planning", label: "Planejamento familiar" },
                    ].map((worry) => (
                      <div key={worry.value} className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200">
                        <Checkbox
                          id={worry.value}
                          checked={responses.futureWorries.includes(worry.value)}
                          onCheckedChange={(checked) => updateArrayResponse('futureWorries', worry.value, checked as boolean)}
                        />
                        <Label htmlFor={worry.value} className="text-sm">{worry.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 8: Reflexões Finais */}
          {currentSection === 8 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">Reflexões Finais</h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Que conselho você daria para jovens mulheres considerando uma carreira em ciência?</Label>
                  <Textarea
                    placeholder="Compartilhe sua sabedoria e encorajamento..."
                    value={responses.advice}
                    onChange={(e) => updateResponse('advice', e.target.value)}
                    className="h-24"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Que mudanças você mais gostaria de ver na comunidade científica?</Label>
                  <Textarea
                    placeholder="Descreva sua visão para mudanças positivas..."
                    value={responses.desiredChanges}
                    onChange={(e) => updateResponse('desiredChanges', e.target.value)}
                    className="h-24"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Há algo mais que gostaria de compartilhar sobre sua experiência?</Label>
                  <Textarea
                    placeholder="Comentários adicionais opcionais..."
                    value={responses.additionalThoughts}
                    onChange={(e) => updateResponse('additionalThoughts', e.target.value)}
                    className="h-24"
                  />
                </div>
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
              <i className="fas fa-arrow-left mr-2"></i>Previous
            </Button>
            
            <div className="flex space-x-4 ml-auto">
              <Button variant="outline" onClick={handleSaveProgress} className="bg-secondary hover:bg-cyan-600 text-white">
                <i className="fas fa-save mr-2"></i>Save Progress
              </Button>
              
              {currentSection < totalSections ? (
                <Button onClick={goToNextSection} className="bg-primary hover:bg-indigo-700">
                  Next<i className="fas fa-arrow-right ml-2"></i>
                </Button>
              ) : (
                <Button onClick={submitQuestionnaire} className="bg-accent hover:bg-pink-600">
                  <i className="fas fa-paper-plane mr-2"></i>Submit Survey
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
