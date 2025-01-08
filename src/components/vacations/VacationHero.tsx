export default function VacationHero() {
  return (
    <div className="relative h-[60vh] min-h-[500px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1522764725576-4cbbbf12c16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 pt-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Plan for activities in Paradise
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experience Phuket your way with our fully supported vacation
              packages. From cultural experiences to relaxing retreats, we'll
              take care of everything.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
