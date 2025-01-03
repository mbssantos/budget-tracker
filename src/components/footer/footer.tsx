import { WithLocale } from "@/types";
import { Link } from "../link";
import { Headline, Text } from "../text";
import styles from "./footer.module.css";

const translations = {
  en: {
    contactUs: "Contact Us",
    arr: "All rights reserved",
    usefulLinks: "Useful links",
    getInTouch: "Get in touch",
    sendMessage: "Send message",
  },
  pt: {
    contactUs: "Contactos",
    arr: "Todos os direitos reservados",
    usefulLinks: "Links uteis",
    getInTouch: "Entre em contacto",
    sendMessage: "Enviar mensagem",
  },
};

const Footer: React.FC<WithLocale> = ({ locale }) => {
  const keys = translations[locale];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerContent}>
          <Headline level={4} size={5}>
            Hi, I&apos;m a footer.
          </Headline>
          <div>
            <Headline level={6} className={styles.headline}>
              {keys.getInTouch}
            </Headline>
            <Link href={`/${locale}/contact-us`}>
              <Text>{keys.sendMessage}</Text>
            </Link>
          </div>
          <div>
            <Headline level={6} className={styles.headline}>
              {keys.usefulLinks}
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
