import { useEffect, useState } from "react";

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  if (!object) {
    return {};
  }
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(data: T[]) => {
  const [personList, setPersonList] = useState<T[]>(data);

  const clear = () => {
    setPersonList([]);
  };
  const removeIndex = (index: number) => {
    const newPerson = [...personList];
    newPerson.splice(index, 1);
    setPersonList(newPerson);
  };
  const add = (value: T) => {
    setPersonList([value, ...personList]);
  };
  return { data, clear, removeIndex, add };
};
