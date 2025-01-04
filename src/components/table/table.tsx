import { Text } from "@/components/text";
import styles from "./table.module.css";

type TableProps = {
  th: string[];
  children: React.ReactNode;
};

const Table: React.FC<TableProps> = ({ th, children }) => {
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            {th.map((th, index) => (
              <th key={`${th}-${index}`}>
                <Text size={3}>{th}</Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
