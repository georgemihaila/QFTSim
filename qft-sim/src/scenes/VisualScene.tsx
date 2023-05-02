import { ReactNode } from 'react';

interface VisualSceneProps {
  children: ReactNode;
}

export function VisualScene({ children }: VisualSceneProps) {
  return (
    <>
      <h1>VisualScene</h1>
      {children}
    </>
  );
}
