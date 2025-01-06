/**
 * Nextjs-specific way to handle metadata in nextjs 15
 */
export type GenMetadata<T = unknown> = (
  props: PageProps<T>
) => Metadata | Promise<Metadata>;
