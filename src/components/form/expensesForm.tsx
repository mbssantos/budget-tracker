import { Button } from "@/components/button";
import { Headline, Text } from "@/components/text";
import { Budget, Expense } from "@/features/projects/types";
import { Tag } from "@/features/tags/types";
import { generateId } from "@/utils/generateId";
import { inputHandler, inputHandlerNumber } from "@/utils/inputHandlers";
import { FormEventHandler, useMemo, useState } from "react";
import Select, { SelectOption } from "../input/select/select";
import styles from "./formStyles.module.css";
import FormTags from "./formTags";

type NewExpenseFormProps = {
  /**
   * Notify parent when expense is added
   */
  onAdd: (props: Expense) => void;

  budgets: Pick<Budget, "id" | "label">[];
};

/**
 * Add expense form
 *
 * @returns
 */
const AddExpenseForm: React.FC<NewExpenseFormProps> = ({ onAdd, budgets }) => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [budgetId, setBudgetId] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const budgetSelectOptions = useMemo(() => {
    const opts = budgets.map(
      ({ id: value, label }) => ({ value, label } as SelectOption<string>)
    );

    // add unselected as first option
    opts.unshift({ label: "-", value: "-1" });

    return opts;
  }, [budgets]);

  const handleClear = () => {
    setTags([]);
    setName("");
    setAmount(0);
    setDueDate("");
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onAdd({
      id: generateId(),
      name,
      tags,
      amount,
      budgetId,
      isPaid: false,
      dueDate: new Date(dueDate).getTime(),
    });
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
      <div className="mw-full">
        <div className="m-t-48">
          <form className={styles.newExpenseForm} onSubmit={handleSubmit}>
            <Headline level={3}>Add expense</Headline>
            <Text Tag="label">
              Name
              <input
                type="text"
                required
                value={name}
                placeholder="Name"
                onChange={inputHandler(setName)}
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
            <Text Tag="label">
              Due date
              <input
                required
                type="date"
                value={dueDate}
                onChange={inputHandler(setDueDate)}
              />
            </Text>

            <Text Tag="label">
              Budget source
              <Select
                value={budgetId}
                options={budgetSelectOptions}
                onChange={inputHandler(setBudgetId)}
              />
            </Text>

            <FormTags
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
        </div>
      </div>
    </div>
  );
};

export default AddExpenseForm;
