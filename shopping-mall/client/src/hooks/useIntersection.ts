import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const useIntersection = (fetchMoreRef: MutableRefObject<HTMLDivElement>) => {
  const observerRef = useRef<IntersectionObserver>();
  const [intersecting, setIntersecting] = useState(false);
  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setIntersecting(entries.some((entry) => entry.isIntersecting));
      });
    }

    return observerRef.current;
  }, [observerRef.current]);

  useEffect(() => {
    getObserver().observe(fetchMoreRef.current);
  }, [fetchMoreRef.current]);

  return intersecting;
};

export default useIntersection;
