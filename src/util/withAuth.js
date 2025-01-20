import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (Component) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/signin'); // Redirect unauthenticated users
      }
    }, [router]);

    return <Component {...props} />;
  };
};

export default withAuth;
