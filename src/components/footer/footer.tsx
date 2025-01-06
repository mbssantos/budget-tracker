import { WithLocale } from "@/types";
import { Link } from "../link";
import { Headline, Text } from "../text";
import styles from "./footer.module.css";

const Footer: React.FC<WithLocale> = ({ locale }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerContent}>
          <Headline level={4} size={5}>
            Hi, I&apos;m a footer.
          </Headline>
          <div>
            <Headline level={6} className={styles.headline}>
              Get in touch
            </Headline>
            <Link href={`/contact-us`}>
              <Text>Send message</Text>
            </Link>
          </div>
          <div>
            <Headline level={6} className={styles.headline}>
              Useful links
            </Headline>

            <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
              <Text>Super interesting resource</Text>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
