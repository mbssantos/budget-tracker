import { ChangeEventHandler } from "react";

export const inputHandler = (setter: (value: string) => void) => {
  const handler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setter(e.currentTarget.value);
  };

  return handler;
};

export const inputHandlerNumber = (setter: (value: number) => void) => {
  return inputHandler((value) => {
    return setter(+value);
  });
};
