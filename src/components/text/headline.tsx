import cx from "classnames";
import styles from "./headline.module.css";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type TextProps = JSX.IntrinsicElements["h1"] & {
  level?: Level;
  size?: Level;
  children: React.ReactNode;
};

/**
 * General purpose Headline tool
 *
 * @returns
 */
const Headline: React.FC<TextProps> = ({
  children,
  level = 1,
  size = level,
  className,
  ...props
}) => {
  const Tag: keyof JSX.IntrinsicElements = `h${level}`;

  return (
    <Tag
      className={cx(
        {
          [styles.h1]: size === 1,
          [styles.h2]: size === 2,
          [styles.h3]: size === 3,
          [styles.h4]: size === 4,
          [styles.h5]: size === 5,
          [styles.h6]: size === 6,
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Headline;
