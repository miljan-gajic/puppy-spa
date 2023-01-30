import AddingPetSection from "@/components/AddingPetSection/AddingPetSection";
import {
  addWaitingListEntry,
  deleteWaitingListEntry,
  getWaitingListEntries,
  updateWaitingListEntry,
} from "@/features/puppySpaWaitingList";
import type { Entry as EntryType, List } from "@/shared/types";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import Entry from "../Entry/Entry";
import styles from "./WaitingList.module.css";

const WaitingList = () => {
  const [waitingListItems, setWaitingListItems] = useState<List[]>([]);
  const [search, setSearch] = useState("");
  const [openAddingPet, setOpenAddingPet] = useState<boolean>();
  const [showOnlyServiced, setShowOnlyServiced] = useState(true);

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

  let sortedByArrival = (listItem: List) => {
    return listItem.entries.sort(function (a, b) {
      var keyA = new Date(a.arrival),
        keyB = new Date(b.arrival);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  };

  const handleOnDragEnd = (e: any, listItem: List) => {
    const { active, over } = e;
    if (active && over && active?.id !== over?.id) {
      const activeEntry = sortedByArrival(listItem).find(
        (e) => e?.id === active?.id
      );
      const activeIndex = sortedByArrival(listItem).indexOf(
        activeEntry as EntryType
      );

      const overEntry = sortedByArrival(listItem).find(
        (e) => e?.id === over?.id
      );
      const overIndex = sortedByArrival(listItem).indexOf(
        overEntry as EntryType
      );
      arrayMove(sortedByArrival(listItem), activeIndex, overIndex);
    }
  };

  useEffect(() => {
    getWaitingListData();
  }, []);

  return (
    <>
      <div className={styles.openAddPetSectionContainer}>
        <button onClick={handleSetOpenAddingPetSection}>
          Add pet to waiting list
        </button>
        <div>
          <input
            placeholder="Search for the pet..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
      {openAddingPet && <AddingPetSection submit={handleSubmit} />}
      {waitingListItems?.map((listItem) => {
        const filteredListItemBySearch = {
          ...listItem,
          entries: listItem.entries.filter((entry) => {
            if (search === "") {
              return entry;
            }

            if (entry.puppyName.toLowerCase().includes(search.toLowerCase())) {
              return entry;
            }
          }),
        };

        return (
          <DndContext
            key={listItem.id}
            collisionDetection={closestCenter}
            onDragEnd={(e) => handleOnDragEnd(e, filteredListItemBySearch)}
          >
            <h2>
              {format(
                new Date(filteredListItemBySearch.date),
                "dd. MMMM yyyy."
              )}
            </h2>
            <SortableContext
              items={sortedByArrival(filteredListItemBySearch)}
              strategy={verticalListSortingStrategy}
            >
              {sortedByArrival(filteredListItemBySearch).map((entry, idx) => (
                <Entry
                  key={entry.id}
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
            </SortableContext>
          </DndContext>
        );
      })}
    </>
  );
};

export default WaitingList;
