import { Entry } from "@/shared/types";
import AddIcon from "@mui/icons-material/Add";
import PetsIcon from "@mui/icons-material/Pets";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCallback, useState } from "react";
import styles from "./Entry.module.css";

type Props = {
  listEntry: Entry;
  date: string;
  id?: string;
  prevEntryId: string | null;
  handleDelete: () => void;
  handleUpdate: (date: string, id: string, entry: Entry) => void;
};

const Entry: React.FC<Props> = ({
  listEntry,
  date,
  id,
  prevEntryId,
  handleDelete,
  handleUpdate,
}) => {
  const [changeServiced, setChangeServiced] = useState<boolean>(
    listEntry.serviced
  );

  const handleOnChangeServiced = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isItChecked = e.currentTarget.checked;
      setChangeServiced(isItChecked);
      handleUpdate(date, id || "", {
        arrival: listEntry.arrival,
        id: listEntry.id,
        owner: listEntry.owner,
        nextEntryId: null,
        prevEntryId,
        puppyName: listEntry.puppyName,
        requestedService: listEntry.requestedService,
        serviced: changeServiced,
      });
    },
    [handleUpdate, listEntry, changeServiced, prevEntryId]
  );

  return (
    <>
      <div className={styles.entryContainer}>
        <div className={styles.entry}>
          <PetsIcon fontSize="medium" />
          {listEntry.puppyName}
        </div>
        <div className={`${styles.entry} ${styles.entry__reqService}`}>
          <span>Requested service:</span>
          <span>{listEntry.requestedService}</span>
        </div>
        <label htmlFor="serviced">
          Serviced
          <input
            type="checkbox"
            name="serviced"
            id="serviced"
            checked={changeServiced || false}
            onChange={handleOnChangeServiced}
          />
        </label>
        <div className={styles.entry}>{listEntry.owner}</div>
        <div className={styles.actionButtonsContainer}>
          <button>
            {" "}
            <AddIcon fontSize="large" />
          </button>
          <button>
            <RemoveIcon fontSize="large" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Entry;
