export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Sponsor {
  id: string;
  name: string;
  description: string;
  logo: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "With 15 years of experience in international retirement services, Sarah founded Serenity Haven to create a seamless transition for retirees.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Head of Healthcare Services",
    bio: "Former hospital administrator with a passion for creating comprehensive healthcare solutions for seniors.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "3",
    name: "Lisa Thompson",
    role: "Property Investment Director",
    bio: "Expert in Thai real estate with over a decade of experience in international property investments.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
];

export const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "Bangkok Hospital Phuket",
    description: "Premier healthcare provider offering world-class medical services.",
    logo: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "2",
    name: "Thai Life Insurance",
    description: "Leading insurance provider specializing in retirement and health coverage.",
    logo: "https://images.unsplash.com/photo-1565665681743-6ff01c5181e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "3",
    name: "Phuket Developers Association",
    description: "Network of premium property developers ensuring quality standards.",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
];