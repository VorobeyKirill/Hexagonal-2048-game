import { useEffect, useRef } from 'react';

export const usePrevProps = <K>(value: K) => {
  const ref = useRef<K>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
