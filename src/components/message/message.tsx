import Info from "@mui/icons-material/Info";
import { Text } from "../text";
import styles from "./message.module.css";

type MessageProps = {
  children: React.ReactNode;
};

const Message: React.FC<MessageProps> = ({ children }) => {
  return (
    <div className={styles.message}>
      <Text size={3}>
        <Info />
      </Text>
      {children}
    </div>
  );
};

export default Message;
