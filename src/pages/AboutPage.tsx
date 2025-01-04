import { teamMembers, sponsors } from '../data/team';

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="relative h-[40vh] min-h-[300px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                About Us
              </h1>
              <p className="text-xl text-white/90">
                Meet the team behind Serenity Haven and our mission to create exceptional experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-xl text-gray-600">
                Founded in 2020, Serenity Haven was born from a vision to create a seamless 
                transition for retirees and investors looking to make Phuket their home.
              </p>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Leadership Team</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <div key={member.id} className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-teal-600 mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 -mx-6 px-6 py-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Partners</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Working with industry leaders to deliver exceptional service and care
                </p>
              </div>
              
              <div className="grid gap-8">
                {sponsors.map((sponsor) => (
                  <div 
                    key={sponsor.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 bg-gray-50 p-8 flex items-center justify-center">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-24 w-auto object-contain filter saturate-0 hover:saturate-100 transition-all duration-300"
                        />
                      </div>
                      <div className="md:w-2/3 p-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{sponsor.name}</h3>
                        <p className="text-gray-600">{sponsor.description}</p>
                        <button className="mt-4 text-teal-600 hover:text-teal-700 font-medium">
                          Learn more →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}