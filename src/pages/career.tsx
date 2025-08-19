import { useState, useMemo } from "react";
import { allScientists, getAllResearchThemes } from "../data/scientists";
import ScientistCard from "../components/scientist-card";
import SearchFilters from "../components/search-filters";
import { Button } from "../components/ui/button";
import SuggestScientist from "../components/form-sugestion";
import { useRoute } from "wouter";
import ExpandableList from "../components/expandableList";

export default function Career() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("Todas as Áreas");
  const [selectedInstitution, setSelectedInstitution] = useState(
    "Todas as Instituições"
  );
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [match, params] = useRoute("#/scientists/:id");
  const id = params?.id;

  const availableThemes = getAllResearchThemes();

  const handleThemeToggle = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };


  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Carreiras na Ciência
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore perfis de mulheres notáveis fazendo contribuições
            significativas para a ciência e tecnologia.
          </p>
        </div>

<ExpandableList items={[{title: "item1", content: "item2"}]}/>
      </div>
    </section>
  );
}
