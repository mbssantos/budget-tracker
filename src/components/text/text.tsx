import cx from "classnames";
import styles from "./text.module.css";

type Tags = Pick<JSX.IntrinsicElements, "span" | "p" | "label">;

export type FontSize = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type TextProps<K extends keyof Tags> = JSX.IntrinsicElements[K] & {
  Tag?: K;
  size?: FontSize;
  center?: boolean;
};

/**
 * General purpose, customizable typography component
 * @returns
 */
const Text = <K extends keyof Tags>(props: TextProps<K>) => {
  const {
    Tag = "span" as K,
    size = 4,
    className,
    center,
    children,
    ...extra
  } = props;

  return (
    // @ts-expect-error -- can't get the types right
    <Tag
      className={cx(
        styles.text,
        {
          [styles.size1]: size === 1,
          [styles.size2]: size === 2,
          [styles.size3]: size === 3,
          [styles.size4]: size === 4,
          [styles.size5]: size === 5,
          [styles.size6]: size === 6,
          [styles.size7]: size === 7,
          [styles.center]: center,
        },
        className
      )}
      {...extra}
    >
      {children}
    </Tag>
  );
};

export default Text;
