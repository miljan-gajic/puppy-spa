import styles from "./ActionSection.module.css";

type Props = {
  handleSetOpenAddingPetSection: () => void;
  setShowOnlyServiced: (checked: boolean) => void;
  setSearch: (search: string) => void;
  showOnlyServiced: boolean | undefined;
  search: string;
};

const ActionSection: React.FC<Props> = ({
  handleSetOpenAddingPetSection,
  showOnlyServiced,
  setSearch,
  setShowOnlyServiced,
  search,
}) => {
  return (
    <>
      <div className={styles.openAddPetSectionContainer}>
        <button onClick={handleSetOpenAddingPetSection}>
          Add pet to waiting list
        </button>
        <div>
          <label htmlFor="showServiced">
            Show only serviced entries
            <input
              type="checkbox"
              name="showServiced"
              id="showServiced"
              checked={showOnlyServiced}
              onChange={(e) => setShowOnlyServiced(e.target.checked)}
            />
          </label>
        </div>
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
    </>
  );
};

export default ActionSection;
