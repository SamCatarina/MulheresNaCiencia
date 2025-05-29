import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="gradient-primary  py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Celebrating Women in <span className="text-yellow-300">Science</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover the remarkable contributions of women scientists who are shaping our world through innovation, research, and discovery.
          </p>
          <Link href="/scientists">
            <button className="bg-accent hover:bg-pink-600  px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105">
              Explore Scientists
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
