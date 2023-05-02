import { ReactNode } from 'react';

interface VisualSceneProps {
  children: ReactNode;
}

export function VisualScene({ children }: VisualSceneProps) {
  return (
    <>
      {children}
    </>
  );
}
