import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        placeholder: 'hi@guy.com',
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
          });
      
          if (response.ok) {
            const data = await response.json();
            const { email, username, id } = data.user;
            const user = { email, username, id, randomKey: "🍆💦" };
            
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    })
],
callbacks: {
    session: ({session, token}) => {
        return {
            ...session,
            user: {
                ...session.user,
                id: token.id,
                randomKey: token.randomKey
            }
        }
    },
    jwt: ({ token, user }) => {
        if (user) {
        return { ...token, id: user.id, randomKey: user.randomKey}
        }
        return token
}
}
} 

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

