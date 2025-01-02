import styles from "./cardList.module.css";

type CardListProps = {
  children: React.ReactNode;
};

const CardList: React.FC<CardListProps> = ({ children }) => {
  return <div className={styles.cardList}>{children}</div>;
};

export default CardList;
