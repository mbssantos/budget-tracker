import cx from "classnames";
import { Text } from "../text";
import styles from "./button.module.css";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  /**
   * For usage in poor contrast background
   */
  alt?: boolean;
  level?: 0 | 1 | 2;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  level = 0,
  className = "",
  alt = false,
  ...props
}) => {
  const content =
    typeof children !== "string" ? children : <Text>{children}</Text>;

  return (
    <button
      className={cx(
        styles.button,
        {
          [styles.primary]: level === 1,
          [styles.alt]: alt,
        },
        className
      )}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
