import { Button } from "@/components/button";
import { Headline, Text } from "@/components/text";
import { Tag } from "@/features/tags/types";
import { inputHandler, inputHandlerNumber } from "@/utils/inputHandlers";
import { FormEventHandler, useState } from "react";
import ProjectService from "../../../projectsService";
import styles from "./newExpenseForm.module.css";
import NewExpenseTags from "./newExpenseTags";

type NewExpenseFormProps = {
  /**
   * Project id
   */
  pid: string;

  /**
   * Notify parent when something relevant happens
   */
  onChange: () => void;
};

const NewExpenseForm: React.FC<NewExpenseFormProps> = ({ pid, onChange }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [tags, setTags] = useState<Tag[]>([]);

  const handleClear = () => {
    setName("");
    setDate("");
    setAmount(0);
    setTags([]);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // assume form validation catches all user errors
    ProjectService.addExpense(pid, {
      name,
      tags,
      amount,
      isPayed: false,
      dueDate: new Date(date).getTime(),
    });

    onChange();
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
    <form className={styles.newExpenseForm} onSubmit={handleSubmit}>
      <Headline level={3}>Add expense</Headline>
      <Text Tag="label">
        Name
        <input
          type="text"
          required
          value={name}
          placeholder="Expense name"
          onChange={inputHandler(setName)}
        />
      </Text>
      <Text Tag="label">
        Amount
        <input
          min={0}
          type="number"
          placeholder="Amount expended"
          value={amount}
          onChange={inputHandlerNumber(setAmount)}
        />
      </Text>
      <Text Tag="label">
        Due date
        <input
          required
          type="date"
          value={date}
          onChange={inputHandler(setDate)}
        />
      </Text>

      <NewExpenseTags
        tags={tags}
        onAdd={handleAddTag}
        onRemove={handleRemoveTag}
      />

      <div className={styles.buttonWrapper}>
        <Button level={2} type="button" onClick={handleClear}>
          clear
        </Button>
        <Button level={1}>Add</Button>
      </div>
    </form>
  );
};

export default NewExpenseForm;
