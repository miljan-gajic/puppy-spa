import styles from "./Container.module.css";

type Props = {
  children: React.ReactElement | React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return (
    <>
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
      <main className={styles.mainContainer}>{children}</main>;
    </>
  );
};

export default Container;
