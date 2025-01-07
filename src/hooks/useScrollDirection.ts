import debounce from "lodash/debounce";
import { useEffect } from "react";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    return window.scrollY;
  }
  return 0;
};

type ScrollDirection = "up" | "down" | undefined;

let prevScrollY = getInitialState();
let scrollDirection: ScrollDirection;

/**
 * Defines how much the user has to scroll up for the event handler to be called
 */
const scrollToleranceUp = 250;

/**
 * Defines how much the user has to scroll down for the event handler to be called
 * Lower values mean more calls
 */
const scrollToleranceDown = 10;

type UseScrollProps = {
  onScrollDown: () => void;
  onScrollUp: () => void;
};

/**
 * Scroll direction hook
 */
export const useScrollDirection = ({
  onScrollDown,
  onScrollUp,
}: UseScrollProps) => {
  useEffect(() => {
    // debounced handler to reduce load
    const debouncedScrollHandler = debounce(
      () => {
        const scrollY = window.scrollY;
        let diff = prevScrollY - scrollY;

        if (diff < 0) {
          diff = Math.min(0, diff + scrollToleranceDown);
        } else {
          diff = Math.max(0, diff - scrollToleranceUp);
        }

        if (diff < 0 && scrollDirection !== "down") {
          scrollDirection = "down";
          onScrollDown();
        } else if ((scrollY === 0 || diff > 0) && scrollDirection !== "up") {
          scrollDirection = "up";
          onScrollUp();
        }

        prevScrollY = scrollY;
      },
      100,
      { maxWait: 300 }
    );

    window.addEventListener("scroll", debouncedScrollHandler);

    return () =>
      window.removeEventListener(
        "scroll",
        debouncedScrollHandler as () => void
      );
  }, [onScrollUp, onScrollDown]);
};
