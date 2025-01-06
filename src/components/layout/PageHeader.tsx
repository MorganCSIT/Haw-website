import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  image: string;
  children?: ReactNode;
  minHeight?: string;
}

export default function PageHeader({ 
  title, 
  description, 
  image,
  children,
  minHeight = "500px"
}: PageHeaderProps) {
  return (
    <section className="relative" style={{ minHeight }}>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${image}")` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {description}
            </p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}