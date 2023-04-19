'use client';

import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => (
    <button type="button" onClick={() => signIn()}>
        Sign in
    </button>
);

export const LogoutButton = () => (
    <button type="button" onClick={() => signOut()}>
        Sign out
    </button>
);
