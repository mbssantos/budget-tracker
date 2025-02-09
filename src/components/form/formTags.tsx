import { Text } from "@/components/text";
import TagService from "@/features/tags/tagService";
import { Tag as TagType } from "@/features/tags/types";
import { inputHandler } from "@/utils/inputHandlers";
import cx from "classnames";
import { MouseEventHandler, useEffect, useState } from "react";
import Tag from "../tag/tag";
import styles from "./formTags.module.css";
// import Tag from "../tag/tag";

type FormTagsProps = {
  tags: TagType[];
  onAdd: (tag: TagType) => void;
  onRemove: (tag: TagType) => void;
};

const FormTags: React.FC<FormTagsProps> = ({ tags, onAdd, onRemove }) => {
  const [tag, setTag] = useState<string>("");
  const [suggestions, setSuggestions] = useState<TagType[]>([]);

  const currentTagIds = tags.map((tag) => tag.id);

  useEffect(() => {
    // update suggestions as user types.
    // we could add a debounce or only search after n characters but for this exercise it looks better
    // to show it immediately
    setSuggestions(TagService.search(tag, 5));
  }, [tag]);

  // creates a bound event handler
  const handleTagSelect: (
    selectedTag: TagType
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

    // create new user tag
    const [newTag] = TagService.create(tag);

    // clear input
    setTag("");

    // call handler
    onAdd(newTag);
  };

  return (
    <div className={styles.formTags}>
      <div className={styles.newTagsInput}>
        <Text Tag="label">
          Tags
          <input
            type="text"
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
                <Text>Create tag &quot;{tag}&quot;</Text>
              </div>
            )}
          </div>
        </div>
      </div>

      {tags.length > 0 && (
        <div className={styles.tagList}>
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} onClick={onRemove} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormTags;
