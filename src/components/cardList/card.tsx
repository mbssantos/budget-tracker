import { Author } from "@/features/cms/types";
import cx from "classnames";
import Image from "next/image";
import AuthorCard from "../authorCard/authorCard";
import { Link } from "../link";
import { Headline, Text } from "../text";
import styles from "./card.module.css";

export type CardProps = {
  key?: string;
  img: string;
  href: string;
  headline: string;
  description: string;
  author?: Author;
};

const Card: React.FC<CardProps> = (props) => {
  const { img, href, headline, description, author } = props;

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.imageWrapper}>
            <Image
              priority
              src={img}
              alt="Background image"
              quality={50}
              width={465}
              height={220}
            />
          </div>
          <div
            className={cx(styles.content, {
              [styles.withAuthorCard]: !!author,
            })}
          >
            <Headline level={3} size={5} className={styles.headline}>
              {headline}
            </Headline>
            <Text>{description}</Text>
          </div>
          {author && <AuthorCard author={author} />}
        </div>
      </div>
    </Link>
  );
};

export default Card;
