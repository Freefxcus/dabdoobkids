import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useCreateQueryString() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClearQuery = () => navigate(location.pathname);

  const createQueryString = useCallback(
    (key, value, scroll = true, page) => {
      const params = new URLSearchParams(location.search);

      if (!value) params.delete(key);
      else params.set(key, value);

      if (page) params.set("page", page);

      navigate(
        {
          pathname: location.pathname,
          search: `?${params.toString()}`,
        },
        { state: { scroll } }
      );
    },
    [location, navigate]
  );

  const removeQueryString = useCallback(
    (key) => {
      const params = new URLSearchParams(location.search);
      params.delete(key);
      navigate({
        pathname: location.pathname,
        search: `?${params.toString()}`,
      });
    },
    [location, navigate]
  );

  const handleSelectMoreFilter = (key, currentValue, page = "") => {
    const value = String(currentValue);

    const keysMap = new Map();
    const entries = Array.from(new URLSearchParams(location.search).entries());
    entries.forEach(([key, value]) => keysMap.set(key, value));

    if (keysMap.has(key)) {
      const v = keysMap.get(key);

      if (v.includes(",")) {
        const wordsArray = v.split(",");
        console.log(value);
        console.log(wordsArray);

        if (!wordsArray.includes(value)) keysMap.set(key, `${v},${value}`);
        else {
          const curr = wordsArray.filter((w) => w !== value).join(",");
          console.log(curr);

          keysMap.delete(key);
          keysMap.set(key, curr);
        }
      } else if (v.includes(value)) keysMap.delete(key);
      else {
        keysMap.delete(key);
        keysMap.set(key, `${v},${value}`);
      }
    } else keysMap.set(key, `${value}`);

    createQueryString(key, keysMap.get(key), true, page);
  };

  return {
    createQueryString,
    selectMoreFilters: handleSelectMoreFilter,
    clearQuery: handleClearQuery,
    removeQuery: removeQueryString,
  };
}

export default useCreateQueryString;
