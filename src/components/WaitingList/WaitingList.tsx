import AddingPetSection from "@/components/AddingPetSection/AddingPetSection";
import Entry from "@/components/Entry/Entry";
import {
  addWaitingListEntry,
  deleteWaitingListEntry,
  getWaitingListEntries,
  updateWaitingListEntry,
} from "@/features/puppySpaWaitingList";
import type { Entry as EntryType, List } from "@/shared/types";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import styles from "./WaitingList.module.css";

const WaitingList = () => {
  const [waitingListItems, setWaitingListItems] = useState<List[]>();
  const [openAddingPet, setOpenAddingPet] = useState<boolean>();

  const getWaitingListData = async () => {
    setWaitingListItems(await getWaitingListEntries());
  };

  const handleDelete = async (date: string, id: string) => {
    await deleteWaitingListEntry(date, id);
    await getWaitingListData();
  };

  const handleUpdate = useCallback(
    (date: string, id: string, entry: EntryType) => {
      updateWaitingListEntry(date, id, entry);
    },
    [updateWaitingListEntry]
  );

  const handleSubmit = async (entry: EntryType) => {
    // goToTopOfThePage();
    await addWaitingListEntry({
      date: format(new Date(), "yyyy-MM-dd"),
      entry,
    });
    await getWaitingListData();
  };

  const handleSetOpenAddingPetSection = () => setOpenAddingPet(!openAddingPet);

  useEffect(() => {
    getWaitingListData();
  }, []);

  return (
    <>
      <div className={styles.openAddPetSectionContainer}>
        <button onClick={handleSetOpenAddingPetSection}>
          Add pet to waiting list
        </button>
      </div>
      {openAddingPet && <AddingPetSection submit={handleSubmit} />}
      {waitingListItems?.map((listItem) => {
        return (
          <div key={listItem.id}>
            <h2>{format(new Date(listItem.date), "dd. MMMM yyyy.")}</h2>
            <div>
              {listItem.entries
                .sort(function (a, b) {
                  var keyA = new Date(a.arrival),
                    keyB = new Date(b.arrival);
                  // Compare the 2 dates
                  if (keyA < keyB) return -1;
                  if (keyA > keyB) return 1;
                  return 0;
                })
                .map((entry, idx) => (
                  <Entry
                    key={idx}
                    listEntry={entry}
                    date={listItem.date}
                    id={entry.id}
                    prevEntryId={
                      waitingListItems?.at(-1)?.entries.at(-1)?.id || null
                    }
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default WaitingList;
