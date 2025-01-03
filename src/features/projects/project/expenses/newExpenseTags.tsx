import { Text } from "@/components/text";
import TagService from "@/features/tags/tagService";
import { Tag } from "@/features/tags/types";
import { inputHandler } from "@/utils/inputHandlers";
import Close from "@mui/icons-material/Close";
import cx from "classnames";
import { MouseEventHandler, useEffect, useState } from "react";
import styles from "./newExpenseTags.module.css";

type NewExpenseTagsProps = {
  onAdd: (tag: Tag) => void;
  onRemove: (tag: Tag) => void;

  tags: Tag[];
};

const NewExpenseTags: React.FC<NewExpenseTagsProps> = ({
  tags,
  onAdd,
  onRemove,
}) => {
  const [tag, setTag] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Tag[]>([]);

  const currentTagIds = tags.map((tag) => tag.id);

  useEffect(() => {
    // update suggestions as user types.
    // we could add a debounce or only search after n characters but for this exercise it looks better
    // to show it immediately
    setSuggestions(TagService.search(tag, 5));
  }, [tag]);

  // crates a bound event handler
  const handleTagSelect: (
    selectedTag: Tag
  ) => MouseEventHandler<HTMLDivElement> = (selectedTag) => (e) => {
    // blur to hide autocomplete
    e?.currentTarget?.blur?.();

    // call handler
    onAdd(selectedTag);

    // clear input
    setTag("");
  };

  const handleCreateTag: MouseEventHandler<HTMLDivElement> = (e) => {
    // blur to hide autocomplete
    e?.currentTarget?.blur?.();

    // crate new user tag
    const [newTag] = TagService.create(tag);

    // clear input
    setTag("");

    // call handler
    onAdd(newTag);
  };

  return (
    <form className={styles.newExpenseTags}>
      <div className={styles.newExpenseTagsInput}>
        <Text Tag="label">
          Tags
          <input
            type="string"
            value={tag}
            className={styles.input}
            onChange={inputHandler(setTag)}
            // prevent submitting parent forms when settings tags
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            placeholder="Start typing to see suggestions"
          />
        </Text>

        <div className={styles.autocompleteWrapper}>
          <div className={styles.autocomplete}>
            {suggestions.map((tag) => {
              const alreadyAdded = currentTagIds.includes(tag.id);

              return (
                <div
                  key={tag.id}
                  tabIndex={0}
                  className={cx({
                    [styles.disabled]: alreadyAdded,
                  })}
                  onClick={!alreadyAdded ? handleTagSelect(tag) : undefined}
                >
                  <Text>
                    {alreadyAdded ? "(added) " : ""}
                    {tag.label}
                  </Text>
                </div>
              );
            })}

            {suggestions.length === 0 && tag.length > 0 && (
              <div tabIndex={0} onClick={handleCreateTag}>
                <Text>Crate tag "{tag}"</Text>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.tagList}>
        {tags.map((tag) => (
          <button
            key={tag.id}
            className={styles.removeTagButton}
            onClick={onRemove.bind(null, tag)}
          >
            <Text>
              {tag.label}
              <Close />
            </Text>
          </button>
        ))}
      </div>
    </form>
  );
};

export default NewExpenseTags;
