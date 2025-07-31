import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="gradient-primary  py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Celebrando Mulheres na <span className="word-color">Ciência</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Descubra as contribuições notáveis de mulheres cientistas que estão
            moldando nosso mundo através da inovação, pesquisa e descoberta.
          </p>
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
