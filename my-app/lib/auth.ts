import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Email',
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
          placeholder: 'example@example.com',
        },
        passwd: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.passwd)
          return null;

        console.log('🚀  credentials:', credentials);
        const { email } = credentials;
        const user = { id: '1', email, name: 'Hong' } as User;
        return user;
      },
    }),

    Google,
    GitHub,
  ],
  // callback 받은 후 처리
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const didLogin = !!auth?.user;
      console.log(
        '🚀 auth.ts > callbacks > authorized - didLogin:',
        didLogin,
        nextUrl.pathname
      );

      if (nextUrl.pathname.startsWith('/about')) {
        return didLogin;
      }
      if (didLogin) return Response.redirect(new URL('/about', nextUrl));

      return true;
    },
  },
});
