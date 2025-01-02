import cx from "classnames";
import NextLink from "next/link";
import style from "./link.module.css";

type LinkProps = JSX.IntrinsicElements["a"];

const isExternalHref = (href?: string) => {
  return (
    href?.startsWith("http") ||
    href?.startsWith("www.") ||
    href?.endsWith(".pdf")
  );
};

/**
 * General purpose link tp handle internal vs external navigation
 *
 * @returns
 */
const Link: React.FC<LinkProps> = ({ href = "#", className, ...props }) => {
  return isExternalHref(href) ? (
    <a
      href={href}
      target="_blank"
      className={cx(style.link, className)}
      {...props}
    />
  ) : (
    <NextLink className={cx(style.link, className)} href={href} {...props} />
  );
};

export default Link;
