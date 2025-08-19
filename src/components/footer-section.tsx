import { Link } from "wouter";

const scientistNames = [
  "Marie Curie",
  "Ada Lovelace",
  "Rosalind Franklin",
  "Chien-Shiung Wu",
  "May-Brdhdhitt Moser",
  "Emmanudfhdfhelle Charpentier",
  "Katherdfhine Johnson",
  "Marie Curie",
  "Ada Ldfovelace",
  "Rosalhdind Franklin",
  "Chienfhd-Shiung Wu",
  "May-Brfhitt Moser",
  "Emmanudfelle Charpentier",
  "Katherhdine Johnson",
  "Marie fhCurie",
  "Ada Lodfhvelace",
  "Rosalindhiung Wu",
  "May-Brifhtt Moser",
  "Emmanuedfhdfhlle Charpentier",
  "Katheridne Johnson",
];

export default function FooterSection() {
  return (
    <section className="bg-alter-background py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-4">
            Agradecimento a todos que constribuiram para esse projeto!
          </p>

          {/* Marquee */}
          <div className="relative w-full overflow-hidden mb-4">
            <div className="marquee-content flex gap-4 items-center animate-marquee">
              {scientistNames.map((name, index) => (
                <span key={index} className="mx-8 inline-block whitespace-nowrap break-keep">
                  {name}
                </span>
              ))}
            </div>
          </div>

          <Link href="#/scientists">
            <button className="bg-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105">
              Explorar Cientistas
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
