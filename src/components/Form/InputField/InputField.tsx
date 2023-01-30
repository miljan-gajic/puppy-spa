import { useField } from "react-form";
import styles from "./InputField.module.css";

type Props = {
  fieldName: string;
};

const InputField: React.FC<Props> = ({ fieldName }) => {
  const validate = async (instance: any) => {
    if (!fieldName) {
      return "A name is required";
    }
  };
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField(fieldName, {
    validate,
  });
  return (
    <>
      <input {...getInputProps()} className={styles.inputField} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
};

export default InputField;
