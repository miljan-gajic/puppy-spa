import WaitingList from "@/components/WaitingList/WaitingList";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Puppy SPA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.main}>
        <WaitingList />
      </section>
    </>
  );
}
