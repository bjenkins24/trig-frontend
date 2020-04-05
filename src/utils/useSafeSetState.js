import { useRef, useLayoutEffect, useCallback } from 'react';

const useSafeSetState = setState => {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return useCallback(
    (...args) => (mounted.current ? setState(...args) : undefined),
    [setState]
  );
};

export default useSafeSetState;
