export default function StatsSection() {
  const stats = [
    { value: "500+", label: "Women Scientists", color: "text-primary" },
    { value: "25", label: "Research Fields", color: "text-secondary" },
    { value: "10,000+", label: "Publications", color: "text-accent" },
    { value: "150+", label: "Awards & Honors", color: "text-green-500" },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
