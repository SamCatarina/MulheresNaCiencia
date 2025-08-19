import { useState } from "react";
import { Link } from "wouter";
import ScientistModal, { Scientist } from "./scientists-modal";

interface ScientistCardProps {
  scientist: Scientist;
  featured?: boolean;
}

export default function ScientistCard({
  scientist,
  featured = false,
}: ScientistCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (featured) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img
            src={scientist.image}
            alt={scientist.name}
            className="w-full h-56 object-cover rounded-lg"
          />
          <div className="absolute top-3 right-3">
            <div className="bg-primary  px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{scientist.name}</h3>
          <p className="text-primary font-medium mb-2">{scientist.field}</p>

          {scientist.researchThemes && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {scientist.researchThemes.slice(0, 3).map((theme, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs border border-slate-200"
                  >
                    {theme}
                  </span>
                ))}
                {scientist.researchThemes.length > 3 && (
                  <span className="text-slate-500 text-xs px-2 py-1">
                    +{scientist.researchThemes.length - 3} mais
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500">{scientist.institution}</span>
              {scientist.publications && (
                <span className="text-gray-400 text-xs">
                  {scientist.publications.length} publicações
                </span>
              )}
            </div>
            <button className="bg-primary  px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Ver Perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 hover:border-primary/20">
      <div className="relative mb-3">
        <img
          src={scientist.image}
          alt={scientist.name}
          className="w-full h-48 object-cover object-top rounded-lg"
        />
      </div>

      <h3 className="font-semibold text-lg mb-1">{scientist.name}</h3>
      <p className="text-primary text-sm font-medium mb-1">{scientist.field}</p>
      <p className="text-gray-600 text-sm mb-2">{scientist.institution}</p>

      {scientist.researchThemes && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {scientist.researchThemes.slice(0, 2).map((theme, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs border border-blue-200"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {scientist.publications && (
          <span className="text-gray-400 text-xs">
            {scientist.publications.length} pub.
          </span>
        )}
        <button
          className="text-primary text-sm font-medium hover:underline"
          onClick={() => setIsOpen(true)}
        >
          Ver Detalhes
        </button>
        <ScientistModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          scientist={scientist}
        />
      </div>
    </div>
  );
}
