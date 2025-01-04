import { Button } from "@/components/button";
import { Headline, Text } from "@/components/text";
import { Budget } from "@/features/projects/types";
import { Tag } from "@/features/tags/types";
import { generateId } from "@/utils/generateId";
import { inputHandler, inputHandlerNumber } from "@/utils/inputHandlers";
import { FormEventHandler, useState } from "react";
import styles from "./formStyles.module.css";
import FormTags from "./formTags";

type AddBudgetFormProps = {
  /**
   * Notify parent when something relevant happens
   */
  onAdd: (props: Budget) => void;
};

/**
 * Add budget form
 *
 * @returns
 */
const AddBudgetForm: React.FC<AddBudgetFormProps> = ({ onAdd }) => {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [tags, setTags] = useState<Tag[]>([]);

  const handleClear = () => {
    setTags([]);
    setLabel("");
    setAmount(0);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onAdd({ id: generateId(), label, tags, amount });
  };

  const handleAddTag = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleRemoveTag = (tag: Tag) => {
    const index = tags.findIndex(({ id }) => id === tag.id);
    if (index >= 0) {
      // create a shallow copy to preserve purity
      const shallowCopy = [...tags];

      // remove element
      shallowCopy.splice(index, 1);

      setTags(shallowCopy);
    }
  };

  return (
    <div className={styles.newExpenseFormWrapper}>
      <form className={styles.newExpenseForm} onSubmit={handleSubmit}>
        <Headline level={4} className="m-b-24">
          Add budget
        </Headline>
        <Text Tag="label">
          Name
          <input
            type="text"
            required
            value={label}
            placeholder="Name"
            onChange={inputHandler(setLabel)}
          />
        </Text>
        <Text Tag="label">
          Amount
          <input
            min={0}
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={inputHandlerNumber(setAmount)}
          />
        </Text>

        <FormTags tags={tags} onAdd={handleAddTag} onRemove={handleRemoveTag} />

        <div className={styles.buttonWrapper}>
          <Button level={2} type="button" onClick={handleClear}>
            clear
          </Button>
          <Button level={1}>Add</Button>
        </div>
      </form>
    </div>
  );
};

export default AddBudgetForm;
