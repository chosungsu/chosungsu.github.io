import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {children}
    </div>
  );
} 