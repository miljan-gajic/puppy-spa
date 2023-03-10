import { Entry } from "@/shared/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PetsIcon from "@mui/icons-material/Pets";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCallback, useState } from "react";
import styles from "./Entry.module.css";

// Adding a separate piece of state is the only way to make the Draggable item work
// https://github.com/clauderic/dnd-kit/issues/172#issuecomment-810521878
// Its still buggy but works after clicked twice on action items  like DELETE or SERVICED checkbox
type Props = {
  listEntry: Entry;
  date: string;
  id?: string;
  prevEntryId: string | null;
  isMoving: boolean;
  handleDelete: (date: string, id: string) => void;
  handleUpdate: (date: string, id: string, entry: Entry) => void;
};

const Entry: React.FC<Props> = ({
  listEntry,
  date,
  id,
  prevEntryId,
  handleDelete,
  isMoving,
  handleUpdate,
}) => {
  const [changeServiced, setChangeServiced] = useState<boolean>(
    listEntry.serviced
  );
  const { listeners, setNodeRef, transform, transition } = useSortable({
    id: id as string,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleOnChangeServiced = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isItChecked = e.currentTarget.checked;
      setChangeServiced(isItChecked);
      console.log("this is called");
      handleUpdate(date, id || "", {
        arrival: listEntry.arrival,
        id: listEntry.id,
        owner: listEntry.owner,
        nextEntryId: null,
        prevEntryId,
        puppyName: listEntry.puppyName,
        requestedService: listEntry.requestedService,
        serviced: isItChecked,
      });
    },
    [handleUpdate, listEntry, changeServiced, prevEntryId, isMoving]
  );

  const handleRemoveEntry = useCallback(() => {
    handleDelete(date, id || "");
  }, [date, id]);

  return (
    <div ref={setNodeRef} style={style} {...(!isMoving ? listeners : {})}>
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
            onChange={(e) => handleOnChangeServiced(e)}
          />
        </label>
        <div className={styles.entry}>{listEntry.owner}</div>
        <div className={styles.actionButtonsContainer} title="Remove Entry">
          <button>
            <RemoveIcon
              fontSize="large"
              color="error"
              onClick={handleRemoveEntry}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Entry;
