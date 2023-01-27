import {
  addWaitingListEntry,
  deleteWaitingListEntry,
  getWaitingListEntries,
  updateWaitingListEntry,
} from "@/api/waitingListApi";
import { List } from "@/shared/types";
import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<List[]>();

  const waiting = async () => {
    setData(await getWaitingListEntries());
  };

  const handleSubmit = () => {
    addWaitingListEntry({
      date: "26.01.2023",
      entry: {
        arrival: "2022-12-05T22:00:00Z",
        id: uuidv4(),
        owner: "Sophia Nachbarsson",
        nextEntryId: null,
        prevEntryId: data?.at(-1)?.entries.at(-1)?.id || null,
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

  const handleUpdate = () => {
    updateWaitingListEntry(
      "26.01.2023",
      "265cf4a2-3369-4325-81ef-8445be9fbe64",
      {
        arrival: "2022-12-05T22:00:00Z",
        id: uuidv4(),
        owner: "Sophia Nachbarsson",
        nextEntryId: null,
        prevEntryId: data?.at(-1)?.entries.at(-1)?.id || null,
        puppyName: "Blue",
        requestedService: "nuttering",
        serviced: true,
      }
    );
  };

  useEffect(() => {
    waiting();
  }, []);

  return (
    <>
      <Head>
        <title>Puppy SPA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}></main>
      <button
        style={{
          width: 200,
          height: 50,
          backgroundColor: "white",
          color: "black",
          marginRight: "2rem",
        }}
        onClick={handleSubmit}
      >
        Click me to add
      </button>
      <button
        style={{
          width: 200,
          height: 50,
          backgroundColor: "white",
          color: "red",
          marginRight: "2rem",
        }}
        onClick={handleDelete}
      >
        Click me to delete
      </button>
      <button
        style={{
          width: 200,
          height: 50,
          backgroundColor: "white",
          color: "orange",
        }}
        onClick={handleUpdate}
      >
        Click me to update
      </button>
    </>
  );
}
