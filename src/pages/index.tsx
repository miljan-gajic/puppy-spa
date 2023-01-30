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
      <header className={styles.menuBar}>
        <div className={styles.headlineContainer}>
          <div className={styles.puppyLogoContainer}>
            <span role="img" aria-label="🐶" className={styles.puppyLogoSpan}>
              🐶
            </span>
          </div>
          <h2>Puppy SPA waiting list</h2>
          <div className={styles.puppyLogoContainer}>
            <span role="img" aria-label="🐶" className={styles.puppyLogoSpan}>
              🐶
            </span>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <WaitingList />
      </main>
    </>
  );
}
