export type Author = {
  role: string;
  name: string;
  description: string;
  avatar: string;
};

export type WithAllLocales<T> = {
  [A in keyof T]: {
    en: T[A];
    pt: T[A];
  };
};
