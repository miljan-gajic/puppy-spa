import {
  addWaitingListEntry,
  deleteWaitingListEntry,
  getWaitingListEntries,
  updateWaitingListEntry,
} from "@/api/waitingListApi";
import Entry from "@/components/Entry/Entry";
import { Entry as EntryType, List } from "@/shared/types";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [waitingListItems, setWaitingListItems] = useState<List[]>();

  const getWaitingListData = async () => {
    setWaitingListItems(await getWaitingListEntries());
  };

  const handleSubmit = () => {
    addWaitingListEntry({
      date: "26.01.2023",
      entry: {
        arrival: "2022-12-05T22:00:00Z",
        id: uuidv4(),
        owner: "Sophia Nachbarsson",
        nextEntryId: null,
        prevEntryId: waitingListItems?.at(-1)?.entries.at(-1)?.id || null,
        puppyName: "Blue",
        requestedService: "nuttering",
        serviced: false,
      },
    });
  };

  const handleDelete = () => {
    deleteWaitingListEntry(
      "26.01.2023",
      "cb903a86-d89e-4715-a5fd-a2f9081f1328"
    );
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
      <Head>
        <title>Puppy SPA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.headlineContainer}>
          <div className={styles.puppyLogoContainer}>
            <span role="img" aria-label="🐶" className={styles.puppyLogoSpan}>
              🐶
            </span>
          </div>
          <h1>Puppy SPA</h1>
        </div>
        {waitingListItems?.map((listItem) => {
          return (
            <div key={listItem.id}>
              <h2>{listItem.date}</h2>
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
      </main>
    </>
  );
}
