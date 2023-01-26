import { getWaitingListEntries } from "@/api/waitingListApi";
import { List } from "@/shared/types";
import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<List[]>();

  const waiting = async () => {
    setData(await getWaitingListEntries());
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
    </>
  );
}
