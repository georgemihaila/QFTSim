import { ReactNode } from 'react';

interface CoobSceneProps {
    children: ReactNode;
}

export function CoobScene({ children }: Partial<CoobSceneProps>) {
    return (
        <>
            <mesh>
                <boxGeometry />
            </mesh>
            {children}
        </>
    );
}
