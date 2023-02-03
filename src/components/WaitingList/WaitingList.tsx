import ActionSection from "@/components/ActionSection/ActionSection";
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
import { useCallback, useEffect, useMemo, useState } from "react";
import Entry from "../Entry/Entry";
import styles from "./WaitingList.module.css";

const WaitingList = () => {
  const [waitingListItems, setWaitingListItems] = useState<List[]>([]);
  const [search, setSearch] = useState("");
  const [openAddingPet, setOpenAddingPet] = useState<boolean>();
  const [showOnlyServiced, setShowOnlyServiced] = useState<boolean>();

  const getWaitingListData = async () => {
    const itemsFromDb = await getWaitingListEntries();
    const sortedItemsByArrival = itemsFromDb.reduce<List[]>((acc, cValue) => {
      return [
        ...acc,
        {
          ...cValue,
          entries: cValue.entries.sort((a, b) => {
            if (new Date(a.arrival) < new Date(b.arrival)) return -1;
            if (new Date(a.arrival) > new Date(b.arrival)) return 1;
            return 0;
          }),
        },
      ];
    }, []);
    setWaitingListItems(sortedItemsByArrival);
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

  function sortedByArrival(listItem: List) {
    return listItem.entries.sort(function (a, b) {
      let keyA = new Date(a.arrival),
        keyB = new Date(b.arrival);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

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

      const movedList = waitingListItems.map((item) => {
        if (item.id === listItem.id) {
          return {
            ...listItem,
            entries: arrayMove<EntryType>(
              listItem.entries,
              activeIndex,
              overIndex
            ),
          };
        }
        return item;
      });

      setWaitingListItems(movedList);
    }
  };

  const servicedEntries = useMemo(() => {
    return waitingListItems?.reduce<List[]>((acc, cValue) => {
      return [
        ...acc,
        {
          ...cValue,
          entries: cValue.entries.filter(
            (entry) => entry.serviced === showOnlyServiced
          ),
        },
      ];
    }, []);
  }, [waitingListItems, showOnlyServiced]);

  const searchableWaitingList = useMemo(() => {
    return (showOnlyServiced ? servicedEntries : waitingListItems).reduce<
      List[]
    >((acc, cValue) => {
      return [
        ...acc,
        {
          ...cValue,
          entries: cValue.entries.filter((entry) => {
            if (search === "") {
              return entry;
            }

            if (entry.puppyName.toLowerCase().includes(search.toLowerCase())) {
              return entry;
            }
          }),
        },
      ];
    }, []);
  }, [waitingListItems, search]);

  useEffect(() => {
    getWaitingListData();
  }, [showOnlyServiced]);

  return (
    <>
      <ActionSection
        search={search}
        setSearch={setSearch}
        handleSetOpenAddingPetSection={handleSetOpenAddingPetSection}
        showOnlyServiced={showOnlyServiced}
        setShowOnlyServiced={setShowOnlyServiced}
      />
      {openAddingPet && (
        <AddingPetSection
          submit={handleSubmit}
          handleSetOpenAddingPetSection={handleSetOpenAddingPetSection}
        />
      )}
      {searchableWaitingList?.map((listItem) => {
        return (
          <section
            key={listItem.id}
            className={`${styles.listItem} ${
              listItem.entries.length === 0 ? styles.hideElement : ""
            }`}
          >
            <DndContext
              key={listItem.id}
              collisionDetection={closestCenter}
              onDragEnd={(e) => handleOnDragEnd(e, listItem)}
            >
              {listItem.entries.length > 0 && (
                <h2>{format(new Date(listItem.date), "dd. MMMM yyyy.")}</h2>
              )}
              <SortableContext
                items={listItem.entries.map((en) => ({ id: en.id }))}
                strategy={verticalListSortingStrategy}
              >
                {listItem.entries.map((entry, idx) => (
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
          </section>
        );
      })}
    </>
  );
};

export default WaitingList;
