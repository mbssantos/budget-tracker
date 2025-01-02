import Observable from "@/utils/observable";
import debounce from "lodash/debounce";
import { useEffect } from "react";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    return window.scrollY;
  }
  return 0;
};
type ScrollDirection = "up" | "down" | undefined;

const upObserver = new Observable();
const downObserver = new Observable();

let debHandleScroll: (() => void) | undefined;
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
    upObserver.subscribe(onScrollUp);
    downObserver.subscribe(onScrollDown);

    if (debHandleScroll) {
      return () => {
        // ubsub from observers
        upObserver.unsubscribe(onScrollUp);
        downObserver.unsubscribe(onScrollDown);
      };
    }

    // debounced handler to reduce processor load
    debHandleScroll = debounce(
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
          downObserver.notify();
        } else if ((scrollY === 0 || diff > 0) && scrollDirection !== "up") {
          scrollDirection = "up";
          upObserver.notify();
        }

        prevScrollY = scrollY;
      },
      100,
      { maxWait: 300 }
    );

    window.addEventListener("scroll", debHandleScroll);

    return () =>
      window.removeEventListener("scroll", debHandleScroll as () => void);
  }, []);
};
