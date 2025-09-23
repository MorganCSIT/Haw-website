import { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
  className?: string;
}

export default function MainContent({ children, className = '' }: MainContentProps) {
  return (
    <main id="main-content" className={`flex-grow ${className}`}>
      {children}
    </main>
  );
}