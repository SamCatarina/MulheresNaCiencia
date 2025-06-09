import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedField: string;
  onFieldChange: (value: string) => void;
  selectedInstitution: string;
  onInstitutionChange: (value: string) => void;
  selectedThemes: string[];
  onThemeToggle: (theme: string) => void;
  availableThemes: string[];
}

export default function SearchFilters({
  searchTerm,
  onSearchChange,
  selectedField,
  onFieldChange,
  selectedInstitution,
  onInstitutionChange,
  selectedThemes,
  onThemeToggle,
  availableThemes,
}: SearchFiltersProps) {
  const fields = [
    "Todas as Áreas",
    "Biologia",
    "Química",
    "Física",
    "Engenharia",
    "Medicina",
    "Ciência da Computação",
    "Ciências Ambientais",
    "Matemática",
  ];

  const institutions = [
    "Todas as Instituições",
    "MIT",
    "Stanford",
    "Harvard",
    "Caltech",
    "Universidade Yale",
    "Universidade de Oxford",
    "Johns Hopkins",
    "Google Research",
    "Woods Hole",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex flex-col gap-6">
        {/* Search and main filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <Input
                type="text"
                placeholder="Buscar cientistas por nome ou área de pesquisa..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          <Select value={selectedField} onValueChange={onFieldChange}>
            <SelectTrigger className="w-full lg:w-[200px] h-11">
              <SelectValue placeholder="Todas as Áreas" />
            </SelectTrigger>
            <SelectContent>
              {fields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedInstitution}
            onValueChange={onInstitutionChange}
          >
            <SelectTrigger className="w-full lg:w-[200px] h-11">
              <SelectValue placeholder="Todas as Instituições" />
            </SelectTrigger>
            <SelectContent>
              {institutions.map((institution) => (
                <SelectItem key={institution} value={institution}>
                  {institution}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Research themes section */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
            <i className="fas fa-tags text-primary mr-2"></i>
            Temas de Pesquisa
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableThemes.map((theme) => (
              <Badge
                key={theme}
                variant={selectedThemes.includes(theme) ? "default" : "outline"}
                className={`text-base cursor-pointer transition-all hover:shadow-md ${
                  selectedThemes.includes(theme)
                    ? "bg-primary  hover:bg-primary/90"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => onThemeToggle(theme)}
              >
                {theme}
                {selectedThemes.includes(theme) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Badge>
            ))}
          </div>
          {selectedThemes.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-medium">{selectedThemes.length}</span>{" "}
              tema(s) selecionado(s)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
