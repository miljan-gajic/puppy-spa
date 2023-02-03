import { Entry } from "@/shared/types";
import { format } from "date-fns";
import { useForm } from "react-form";
import { v4 as uuidv4 } from "uuid";
import InputField from "../Form/InputField/InputField";
import styles from "./AddingPetSection.module.css";

type Props = {
  submit: (entry: Entry) => void;
  handleSetOpenAddingPetSection: () => void;
};

const AddingPetSection: React.FC<Props> = ({
  submit,
  handleSetOpenAddingPetSection,
}) => {
  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values: Partial<Entry>, instance) => {
      const combined = {
        ...values,
        arrival: format(new Date(), "yyyy-MM-dd"),
        id: uuidv4(),
        nextId: null,
        prevId: null,
        serviced: false,
      };
      submit(combined as Entry);
      handleSetOpenAddingPetSection();
    },
    // debugForm: true,
  });
  return (
    <div className={styles.form}>
      <Form>
        <label>
          Owner:
          <InputField fieldName="owner" />
        </label>
        <label>
          Requested Service:
          <InputField fieldName="requestedService" />
        </label>
        <label>
          Puppy Name:
          <InputField fieldName="puppyName" />
        </label>
        <div className={styles.addButton}>
          <button>Add service</button>
        </div>
      </Form>
    </div>
  );
};

export default AddingPetSection;
