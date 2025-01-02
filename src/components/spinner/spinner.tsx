import Refresh from "@mui/icons-material/Refresh";
import styles from "./spinner.module.css";

/**
 * General purpose loading indicator
 * @returns
 */
const Spinner = () => {
  return <Refresh className={styles.spinner} />;
};

export default Spinner;
