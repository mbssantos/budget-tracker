import { ChangeEvent } from "react";

export const inputHandler = (setter: (value: string) => void) => {
  const handler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(e.currentTarget.value);
  };

  return handler;
};

export const inputHandlerNumber = (setter: (value: number) => void) => {
  return inputHandler((value) => {
    return setter(+value);
  });
};
