import { useState } from 'react';
import { teamMembers } from '../data/team';
import { partnerships } from '../data/partnerships';
import PartnershipSection from '../components/home/PartnershipSection';
import { Award, Clock, Heart, Globe, Users, Target } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Every service we provide is tailored to meet your unique needs and preferences."
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Building strong connections within our expatriate community for mutual support."
  },
  {
    icon: Globe,
    title: "Cultural Integration",
    description: "Helping you embrace and adapt to Thai culture while maintaining comfort."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Committed to delivering the highest standards in all our services."
  }
];

const milestones = [
  {
    year: "2020",
    title: "Foundation",
    description: "Established with a vision to transform retirement living in Phuket."
  },
  {
    year: "2021",
    title: "Community Growth",
    description: "Expanded services and built strong partnerships with local providers."
  },
  {
    year: "2022",
    title: "Service Excellence",
    description: "Launched comprehensive healthcare and property management services."
  },
  {
    year: "2023",
    title: "Innovation",
    description: "Introduced integrated digital solutions for seamless service delivery."
  }
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Story
              </h1>
              <p className="text-xl text-white/90">
                Dedicated to creating exceptional retirement experiences in Thailand's paradise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-12">Mission & Vision</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To provide comprehensive support and services that enable retirees to live their dream life in Phuket with comfort, security, and peace of mind.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading provider of integrated retirement solutions in Thailand, setting new standards in expatriate care and support services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                  <Icon className="h-12 w-12 text-teal-600 mb-6" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals working to make your transition to Phuket seamless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-teal-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones in our mission to transform retirement living
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative pl-8 pb-12 last:pb-0">
                <div className="absolute left-0 top-0 h-full w-px bg-teal-200">
                  <div className="absolute left-0 top-0 -ml-1.5 h-4 w-4 rounded-full bg-teal-600" />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm ml-8">
                  <span className="text-teal-600 font-semibold">{milestone.year}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnershipSection />
    </div>
  );
}