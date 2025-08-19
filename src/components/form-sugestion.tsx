import { useState } from "react";
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
import { useToast } from "../hooks/use-toast";

const initialForm = {
  name: "",
  field: "",
  fieldOther: "",
  institution: "",
  achievement: "",
  researchThemes: "",
  link: "",
  reason: "",
  suggesterName: ""
};

export default function SuggestScientist() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [querNomeNosAgradecimentos, setQuerNomeNosAgradecimentos] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use import.meta.env para variáveis de ambiente no Vite
      const url = import.meta.env.VITE_URL_SUGESTION_SCRIPT;
      if (!url) {
        throw new Error("environment variable is not set");
      }
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: form.name,
          field: form.field,
          fieldOther: form.fieldOther,
          institution: form.institution,
          achievement: form.achievement,
          researchThemes: form.researchThemes,
          link: form.link,
          reason: form.reason,
          suggesterName: form.suggesterName,
        }),
      });

      setSubmitted(true);
      toast({
        title: "Sugestão enviada!",
        description:
          "Obrigado por sugerir uma cientista. Sua contribuição será analisada.",
      });
      setForm(initialForm);
    } catch (error) {
      console.error("Erro ao enviar:", error);
      toast({
        title: "Erro ao enviar sugestão",
        description: "Tente novamente em instantes.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-4">
              <i className="fas fa-check-circle text-green-500 text-6xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              Obrigado!
            </h3>
            <p className="text-gray-600 mb-6">
              Sua sugestão foi enviada com sucesso. Agradecemos por contribuir
              para a visibilidade das mulheres na ciência!
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-primary hover:bg-indigo-700"
            >
              Sugerir outra cientista
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-alter-background mt-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sugira uma Cientista
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Indique uma mulher cientista para ser incluída em nosso diretório.
            Sua sugestão será analisada pela equipe.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8 space-y-6"
        >
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Nome completo da cientista
            </Label>
            <Input
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nome completo"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Área de atuação
            </Label>
            <Select
              value={form.field}
              onValueChange={(value) => handleChange("field", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Biologia">Biologia</SelectItem>
                <SelectItem value="Química">Química</SelectItem>
                <SelectItem value="Física">Física</SelectItem>
                <SelectItem value="Engenharia">Engenharia</SelectItem>
                <SelectItem value="Medicina">Medicina</SelectItem>
                <SelectItem value="Ciência da Computação">
                  Ciência da Computação
                </SelectItem>
                <SelectItem value="Ciências Ambientais">
                  Ciências Ambientais
                </SelectItem>
                <SelectItem value="Matemática">Matemática</SelectItem>
                <SelectItem value="Outra">Outra</SelectItem>
              </SelectContent>
            </Select>

            {form.field === "Outra" && (
              <div className="mt-4">
                <Label className="text-sm font-medium text-gray-700 mb-2">
                  Qual é a área?
                </Label>
                <Input
                  value={form.fieldOther || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, fieldOther: e.target.value }))
                  }
                  placeholder="Digite a área de atuação"
                />
              </div>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Instituição
            </Label>
            <Input
              required
              value={form.institution}
              onChange={(e) => handleChange("institution", e.target.value)}
              placeholder="Instituição atual"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Principais conquistas
            </Label>
            <Textarea
              required
              value={form.achievement}
              onChange={(e) => handleChange("achievement", e.target.value)}
              placeholder="Descreva as principais conquistas ou contribuições"
              className="h-24"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Temas de pesquisa (separados por vírgula)
            </Label>
            <Input
              value={form.researchThemes}
              onChange={(e) => handleChange("researchThemes", e.target.value)}
              placeholder="Ex: Inteligência Artificial, Biotecnologia"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Link para currículo online
            </Label>
            <Input
              value={form.link}
              onChange={(e) => handleChange("link", e.target.value)}
              placeholder="URL (Lattes, ResearchGate, etc)"
              type="url"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Por que essa cientista deve ser incluída?
            </Label>
            <Textarea
              required
              value={form.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              placeholder="Conte-nos por que ela merece destaque"
              className="h-24"
            />
          </div>
          <div>



            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">
                Você gostaria que seu nome fosse incluído nos agradecimentos?
              </Label>
              <Select
                value={querNomeNosAgradecimentos}
                onValueChange={(e) => {
                const value = e;
                setQuerNomeNosAgradecimentos(value);
                // limpa o campo se selecionar "Não"
                if (value === "não") {
                  handleChange("suggesterName", "");
                }
              }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">Sim</SelectItem>
                  <SelectItem value="não">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {querNomeNosAgradecimentos === "sim" && (
              <Textarea
                required
                value={form.suggesterName}
                onChange={(e) => handleChange("suggesterName", e.target.value)}
                placeholder="Digite seu nome e sobrenome"
                className="h-24 mt-4"
              />
            )}
          </div>
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-primary hover:bg-indigo-700 px-8 py-3 rounded-lg font-medium"
            >
              Enviar Sugestão
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
