import { useState, useMemo } from "react";
import { allScientists, getAllResearchThemes } from "../data/scientists";
import ScientistCard from "../components/scientist-card";
import SearchFilters from "../components/search-filters";
import { Button } from "../components/ui/button";
import SuggestScientist from "../components/form-sugestion";
import { useRoute } from "wouter";
import ExpandableList from "../components/expandableList";

export default function Career() {
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

        <ExpandableList
          items={[
            {
              title: "Ciência da Computação",
              content:
                "Curso voltado ao estudo de algoritmos, estruturas de dados, inteligência artificial e desenvolvimento de software.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore",
              areas: [
                {
                  label: "Desenvolvedor de Software",
                  url: "https://pt.wikipedia.org/wiki/Desenvolvedor_de_software",
                },
                { label: "Engenheiro de Dados" },
                {
                  label: "Cientista de Dados",
                  url: "https://pt.wikipedia.org/wiki/Cientista_de_dados",
                },
                { label: "Administrador de Sistemas" },
              ],
            },
          ]}
        />
        <ExpandableList
          items={[
            {
              title: "Ciência da Computação",
              content:
                "Curso voltado ao estudo de algoritmos, estruturas de dados, inteligência artificial e desenvolvimento de software.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore",
              areas: [
                {
                  label: "Desenvolvedor de Software",
                  url: "https://pt.wikipedia.org/wiki/Desenvolvedor_de_software",
                },
                { label: "Engenheiro de Dados" },
                {
                  label: "Cientista de Dados",
                  url: "https://pt.wikipedia.org/wiki/Cientista_de_dados",
                },
                { label: "Administrador de Sistemas" },
              ],
            },
          ]}
        />
        <ExpandableList
          items={[
            {
              title: "Ciência da Computação",
              content:
                "Curso voltado ao estudo de algoritmos, estruturas de dados, inteligência artificial e desenvolvimento de software.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore",
              areas: [
                {
                  label: "Desenvolvedor de Software",
                  url: "https://pt.wikipedia.org/wiki/Desenvolvedor_de_software",
                },
                { label: "Engenheiro de Dados" },
                {
                  label: "Cientista de Dados",
                  url: "https://pt.wikipedia.org/wiki/Cientista_de_dados",
                },
                { label: "Administrador de Sistemas" },
              ],
            },
          ]}
        />
        <ExpandableList
          items={[
            {
              title: "Ciência da Computação",
              content:
                "Curso voltado ao estudo de algoritmos, estruturas de dados, inteligência artificial e desenvolvimento de software.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore",
              areas: [
                {
                  label: "Desenvolvedor de Software",
                  url: "https://pt.wikipedia.org/wiki/Desenvolvedor_de_software",
                },
                { label: "Engenheiro de Dados" },
                {
                  label: "Cientista de Dados",
                  url: "https://pt.wikipedia.org/wiki/Cientista_de_dados",
                },
                { label: "Administrador de Sistemas" },
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}
