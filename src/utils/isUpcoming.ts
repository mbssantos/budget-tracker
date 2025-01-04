/**
 * Arbitrary time to consider something due
 */
const dueTimeInDays = 15;
const dueTimestamp = Date.now() + dueTimeInDays * 24 * 60 * 60 * 1000;

/**
 *
 * @param dueDate the date to test
 * @returns
 */
export const isUpcoming = (dueDate: number) => {
  return dueDate < dueTimestamp;
};
