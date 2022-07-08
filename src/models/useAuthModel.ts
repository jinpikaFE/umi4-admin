import { useState } from 'react';

export default function useAuthModel() {
  const [authCompon, setAuthCompon] = useState<Compon.ComponEntity[]>([]);

  return {
    authCompon,
    setAuthCompon,
  };
}
