import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function useAuthCheck(redirect = true) {
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:5000/api/check-auth', {
      credentials: 'include'
    }).then((res) => {
      if (res.status === 401) {
        toast.error('Ви не авторизовані');
        if (redirect) router.push('/');
      }
    });
  }, []);
}
