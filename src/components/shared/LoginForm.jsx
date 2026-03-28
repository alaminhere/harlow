'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { errorMessage } from '@/libs/errorMessage';
import { handleActionAlert } from '@/libs/handleAlert';

const LoginForm = ({ callbackUrl, error }) => {
  const route = useRouter();
  const [pending, setPending] = useState(false);
  const callback = callbackUrl || '/dashboard';

  useEffect(() => {
    if (!error) return;
    handleActionAlert(false, errorMessage(error));
    route.replace('/login');
  }, [error, route]);

  const handleGoogleLogin = async () => {
    try {
      setPending(true);
      await signIn('google', { callbackUrl: callback });
    } catch (err) {
      handleActionAlert(false, 'Something went wrong, please try again!!!');
      setPending(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <Button
        variant="outline"
        disabled={pending}
        onClick={handleGoogleLogin}
        className="w-full h-11 hover:border-border-hover"
      >
        <Image src="/images/google.png" alt="Google" width={20} height={20} />
        {pending ? 'Redirecting...' : 'Continue with Google'}
      </Button>
      <p className="text-xs text-text-muted">
        We only use your Google account to sign you in.
      </p>
    </div>
  );
};

export default LoginForm;
