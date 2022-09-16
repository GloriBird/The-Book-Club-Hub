import React, { useEffect, useState } from "react";

const useBookResults = (value, delay) => {
  const [dbValue, setDbValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDbValue(value);
    }, delay);

    return () => {
      clearTimeout(timeOut);
    };
  }, [value, delay]);

  return dbValue;
};

export default useBookResults;
