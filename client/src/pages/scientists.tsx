import { useState, useMemo } from "react";
import { allScientists, getAllResearchThemes } from "@/data/scientists";
import ScientistCard from "@/components/scientist-card";
import SearchFilters from "@/components/search-filters";
import { Button } from "@/components/ui/button";
import SuggestScientist from "@/components/form-sugestion";
import { useRoute } from "wouter";

export default function Scientists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("Todas as Áreas");
  const [selectedInstitution, setSelectedInstitution] = useState(
    "Todas as Instituições"
  );
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [match, params] = useRoute("/scientists/:id");
  const id = params?.id;

  const availableThemes = getAllResearchThemes();

  const handleThemeToggle = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };

  const filteredScientists = useMemo(() => {
    return allScientists.filter((scientist) => {
      const matchesSearch =
        scientist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (scientist.research &&
          scientist.research
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (scientist.researchThemes &&
          scientist.researchThemes.some((theme) =>
            theme.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      const matchesField =
        selectedField === "Todas as Áreas" || scientist.field === selectedField;
      const matchesInstitution =
        selectedInstitution === "Todas as Instituições" ||
        scientist.institution === selectedInstitution;
      const matchesThemes =
        selectedThemes.length === 0 ||
        (scientist.researchThemes &&
          selectedThemes.some((theme) =>
            scientist.researchThemes!.includes(theme)
          ));

      return (
        matchesSearch && matchesField && matchesInstitution && matchesThemes
      );
    });
  }, [searchTerm, selectedField, selectedInstitution, selectedThemes]);

  const visibleScientists = filteredScientists.slice(0, visibleCount);

  console.log("Filtered Scientists:", filteredScientists);

  return (
    
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Diretório de Cientistas
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore perfis de mulheres notáveis fazendo contribuições
            significativas para a ciência e tecnologia.
          </p>
        </div>

        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedField={selectedField}
          onFieldChange={setSelectedField}
          selectedInstitution={selectedInstitution}
          onInstitutionChange={setSelectedInstitution}
          selectedThemes={selectedThemes}
          onThemeToggle={handleThemeToggle}
          availableThemes={availableThemes}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleScientists.map((scientist) => (
            <ScientistCard key={scientist.id} scientist={scientist} />
          ))}
        </div>

        {visibleScientists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhuma cientista encontrada com os critérios selecionados.
            </p>
          </div>
        )}

        {visibleCount < filteredScientists.length && (
          <div className="text-center mt-8">
            <Button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-primary hover:bg-indigo-700  px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Carregar Mais Cientistas
            </Button>
          </div>
        )}
      </div>
      <SuggestScientist />
    </section>
  );
}
