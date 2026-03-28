import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/userSchema';
import connectDb from './connectDb';

const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    signIn: async ({ user, account }) => {
      if (!user.email) return false;
      if (account.provider === 'google') {
        await connectDb();
        const exists = await User.findOne({ email: user.email });
        if (!exists) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            isVerified: true,
          });
        }
        return true;
      }
      return false;
    },

    jwt: async ({ token, user }) => {
      await connectDb();
      const email = user?.email || token.email || token.user?.email;

      if (!email) return token;
      const userByEmail = await User.findOne({ email: email }).select(
        '-password',
      );
      if (userByEmail) {
        token.user = userByEmail;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.token = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
};

export default authOptions;
