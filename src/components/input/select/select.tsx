import cx from "classnames";
import { ChangeEventHandler } from "react";
import styles from "./select.module.css";

export type SelectOption<T> = {
  label: string;
  value?: T;
};

export type SelectProps<T> = Omit<
  JSX.IntrinsicElements["select"],
  "onSelect" | "value"
> & {
  options?: SelectOption<T>[];
  onSelect?: (value: T) => void;
  value: T;
};

function Select<T extends string | number>({
  value,
  onSelect,
  className,
  options = [],
  ...rest
}: SelectProps<T>) {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const isNumberOption =
      typeof options?.[options.length - 1]?.value === "number";
    const value = e.target.value;

    // return type appropriate value
    if (isNumberOption && value !== undefined) {
      return onSelect?.(+value as T);
    }

    return onSelect?.(value as T);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={cx(styles.select, className)}
      {...rest}
    >
      {options.map(({ label, value }) => (
        <option key={`${label}-${value}`} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Select;
