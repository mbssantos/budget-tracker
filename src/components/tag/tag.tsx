import { Tag as TagType } from "@/features/tags/types";
import { getColorFromString } from "@/utils/getColorFromString";
import { Close } from "@mui/icons-material";
import { Text } from "../text";
import styles from "./tag.module.css";

type TagProps = { tag: TagType; onClick?: (tag: TagType) => void };

const Tag: React.FC<TagProps> = ({ tag, onClick }) => {
  return (
    <button
      key={tag.id}
      className={styles.tag}
      onClick={onClick?.bind(null, tag)}
      style={{ backgroundColor: getColorFromString(tag.label) }}
    >
      <Text>
        {tag.label}
        {onClick && <Close />}
      </Text>
    </button>
  );
};

export default Tag;
