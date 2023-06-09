import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { User } from './user';
// import { LoginButton, LogoutButton } from './auth';
import Feed from './components/Feed';
import Sleep from './components/Sleep';
import Nappy from './components/Nappy';

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <>
            <Feed user={session.user} />
            <Sleep user={session.user} />
            <Nappy user={session.user} />
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
