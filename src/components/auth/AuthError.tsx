import { ReactNode } from 'react';

interface AuthErrorProps {
  title: string;
  children: ReactNode;
}

export default function AuthError({ title, children }: AuthErrorProps) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {title}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}