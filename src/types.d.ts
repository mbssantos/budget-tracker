/**
 * Allowed locales
 */
export type Locale = "en" | "pt";

/**
 * Nextjs-specific way to handle locales in nextjs 15
 */
export type PageProps<T = unknown> = {
  params: Promise<
    T & {
      lang: Locale;
    }
  >;
};

/**
 * Nextjs-specific way to handle metadata in nextjs 15
 */
export type GenMetadata<T = unknown> = (
  props: PageProps<T>
) => Promise<Metadata>;

/**
 * Inject locale to components
 */
export type WithLocale<T = unknown> = T & {
  locale: Locale;
};
