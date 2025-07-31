import { useState, useEffect, useCallback } from "react";

function useHashLocation(): [string, (to: string) => void] {
  const getHash = () => window.location.hash.replace(/^#/, "") || "/";

  const [location, setLocation] = useState(getHash);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentHash = getHash();
      if (currentHash !== location) {
        window.location.reload();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [location]);

  const navigate = useCallback(
    (to: string) => {
      if (to !== location) {
        window.location.hash = to;
      }
    },
    [location]
  );

  return [location, navigate];
}

export default useHashLocation;
