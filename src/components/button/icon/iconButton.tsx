import cx from "classnames";
import Text, { FontSize } from "../../text/text";
import Button, { ButtonProps } from "../button";
import styles from "./iconButton.module.css";

type IconProps = ButtonProps & {
  label?: string;
  size?: FontSize;
};

const IconButton: React.FC<IconProps> = ({
  label,
  children,
  className,
  size = 4,
  ...props
}) => {
  return (
    <Button className={cx("centered", styles.iconButton, className)} {...props}>
      <>
        <Text size={size} className={"centered"}>
          {children}
        </Text>
        {label && (
          <Text className={styles.label} size={4}>
            {label}
          </Text>
        )}
      </>
    </Button>
  );
};

export default IconButton;
