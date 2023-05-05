'use client';

import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }) => (
    <SessionProvider>{children}</SessionProvider>
);
