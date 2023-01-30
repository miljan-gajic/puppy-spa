import WaitingList from "@/components/WaitingList/WaitingList";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

export default function Home() {
  // const handleSubmit = async () => {
  //   // goToTopOfThePage();
  //   await addWaitingListEntry({
  //     date: format(new Date(), "yyyy-MM-dd"),
  //     entry: {
  //       arrival: "2022-12-05T22:00:00Z",
  //       id: uuidv4(),
  //       owner: "Sophia Nachbarsson",
  //       nextEntryId: null,
  //       prevEntryId: waitingListItems?.at(-1)?.entries.at(-1)?.id || null,
  //       puppyName: "Blue",
  //       requestedService: "nuttering",
  //       serviced: false,
  //     },
  //   });
  //   await getWaitingListData();
  // };

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
        <WaitingList />
      </main>
    </>
  );
}
