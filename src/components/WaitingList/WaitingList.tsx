import Entry from "@/components/Entry/Entry";
import {
  deleteWaitingListEntry,
  getWaitingListEntries,
  updateWaitingListEntry,
} from "@/features/puppySpaWaitingList";
import type { Entry as EntryType, List } from "@/shared/types";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";

const WaitingList = () => {
  const [waitingListItems, setWaitingListItems] = useState<List[]>();

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

  useEffect(() => {
    getWaitingListData();
  }, []);

  return (
    <>
      {waitingListItems?.map((listItem) => {
        return (
          <div key={listItem.id}>
            <h2>{format(new Date(listItem.date), "dd. MMMM yyyy.")}</h2>
            <div>
              {listItem.entries.map((entry, idx) => (
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
