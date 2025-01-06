import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  image: string;
  children?: ReactNode;
}

export default function PageHeader({ title, description, image, children }: PageHeaderProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${image}")` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              {description}
            </p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}