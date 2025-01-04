/**
 * Format a date for UI presentation
 *
 * @param unixDate
 * @returns
 */
export const getFormattedDate = (unixDate: number) => {
  const date = new Date(unixDate);

  // use new formatter
  if (date.toLocaleString) {
    return date.toLocaleString("en-UK", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  // support legacy browsers
  return `${date.getDate()} / ${date.getUTCMonth()} / ${date.getFullYear()}`;
};
