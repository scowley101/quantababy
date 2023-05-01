// 'use client';

import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]/route';
import { User } from './user';

// import { LoginButton, LogoutButton } from './auth';
import Feed from './components/Feed';
import Sleep from './components/Sleep';
import Nappy from './components/Nappy';
import Register from './components/Register';

export default async function Home() {
    const session = await getServerSession(authOptions);
    console.log('session is', session);

    if (!session) {
        return <Register />;
    }

    return (
        <>
            <Feed />
            <Sleep />
            <Nappy />
        </>
    );

    // return (
    //   <main>
    // <LoginButton />
    // <LogoutButton />
    //     <h2>Server session</h2>
    //     <pre>{JSON.stringify(session)}</pre>
    //     <h2>Client call</h2>
    //     <User />
    //   </main>
    // )
}
