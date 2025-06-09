import { featuredScientists } from "@/data/scientists";
import ScientistCard from "./scientist-card";

export default function FeaturedScientists() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cientistas adicionadas recentemente
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Conheça algumas das mulheres extraordinárias fazendo grandes
            descobertas em suas áreas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredScientists.map((scientist) => (
            <ScientistCard key={scientist.id} scientist={scientist} />
          ))}
        </div>
      </div>
    </section>
  );
}
