import { useState, useEffect, useCallback } from "react";

export const useInfiniteScroll = (loadMore, hasMore) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
      hasMore &&
      !isLoading
    ) {
      setIsLoading(true);
      loadMore().finally(() => setIsLoading(false));
    }
  }, [loadMore, hasMore, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return isLoading;
};
export default useInfiniteScroll;
