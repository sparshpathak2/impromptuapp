"use client"
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProviderProps {
    children: ReactNode;
    session: any; // Adjust the type according to your session object type
}

const Provider = ({ children, session }: ProviderProps) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider
