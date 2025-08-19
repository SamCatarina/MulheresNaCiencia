import { allSuggester } from "../data/suggesters";

export default function FooterSection() {

  const suggesters = allSuggester;
  return (
    <section className="bg-alter-background py-4 overflow-hidden mt-16 text-gray-500">
      <div className="max-w">
        <div className="text-center">
          <p className="mb-2">
            Agradecimento a todos que constribuiram para esse projeto!
          </p>

          {/* Marquee */}
          <div className="relative w-full overflow-hidden mb-2">
            <div className="marquee-content flex gap-4 items-center animate-marquee">
              {suggesters.map((suggester, index) => (
                <span
                  key={index}
                  className="mx-8 inline-block whitespace-nowrap break-keep"
                >
                  {suggester.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
