import { getServerSession } from 'next-auth/react';
import { LoginButton, LogoutButton } from './auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

const Header = async () => {
    // const session = await getServerSession(authOptions);
    // return (
    //     <header>
    //         {session && <LogoutButton />}
    //         {!session && <LoginButton />}
    //     </header>
    // );
};

export default Header;
