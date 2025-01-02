import { Author } from "@/features/cms/types";
import Image from "next/image";
import { Text } from "../text";
import styles from "./authorCard.module.css";

type AuthorCardProps = {
  author: Author;
};

/**
 * Returns a generic Author Card with simple params
 *
 * @returns Author Card Component
 */
const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const { name, role, avatar } = author;

  return (
    <div className={styles.authorCard}>
      <div>
        <Image src={avatar} alt="avatar" width={32} height={32} />
      </div>
      <div>
        <Text>{name}</Text>
        <br />
        <Text size={5}>{role}</Text>
      </div>
    </div>
  );
};

export default AuthorCard;
