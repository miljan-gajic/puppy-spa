import { WAITING_LIST_BASE_URL } from "@/shared/constants";
import { Entry, List } from "@/shared/types";
import axios from "axios";

const waitingListApi = axios.create({
  baseURL: WAITING_LIST_BASE_URL,
});

export const waitingListEntriesEndpoint = "/list";

export const getWaitingListEntries = async () => {
  const response = await waitingListApi.get<List[]>(waitingListEntriesEndpoint);
  return response.data;
};

export const addWaitingListEntry = async ({
  date,
  entry,
}: {
  date: string;
  entry: Entry;
}) => {
  const {
    id,
    arrival,
    nextEntryId,
    owner,
    prevEntryId,
    puppyName,
    requestedService,
    serviced,
  } = entry;

  const entryToBeAdded = {
    id,
    arrival,
    nextEntryId,
    owner,
    prevEntryId,
    puppyName,
    requestedService,
    serviced,
  };

  const savedData = await getWaitingListEntries();

  const findElement = savedData.find((value) => value.date === date);

  let response;

  if (findElement) {
    response = await waitingListApi.patch(`list/${findElement?.id}`, {
      date,
      entries: [...findElement?.entries, entryToBeAdded],
    });
  } else {
    response = response = await waitingListApi.post(
      waitingListEntriesEndpoint,
      {
        date,
        entries: [entryToBeAdded],
      }
    );
  }

  return response.data;
};

export const deleteWaitingListEntry = async (date: string, id: string) => {
  const savedData = await getWaitingListEntries();
  const findElement = savedData.find((value) => value.date === date);

  const findEntryToRemove = findElement?.entries.find(
    (element) => element.id === id
  );

  const filterOutEntryToRemove = findElement?.entries.filter(
    (v) => v.id !== findEntryToRemove?.id
  );

  let response;

  if (filterOutEntryToRemove) {
    response = await waitingListApi.patch(`list/${findElement?.id}`, {
      date,
      entries: [...filterOutEntryToRemove],
    });
  }

  if (filterOutEntryToRemove?.length === 0) {
    response = await waitingListApi.delete(`list/${findElement?.id}`);
  }
  return response;
};

export const updateWaitingListEntry = async (
  date: string,
  id: string,
  entry: Entry
) => {
  const savedData = await getWaitingListEntries();
  const findElement = savedData.find((value) => value.date === date);

  const findEntryToUpdate = findElement?.entries.find(
    (element) => element.id === id
  );

  const filterOutEntryToUpdate = findElement?.entries.filter((v) => {
    return v.id !== findEntryToUpdate?.id;
  });

  let response;

  if (filterOutEntryToUpdate) {
    response = await waitingListApi.patch(`list/${findElement?.id}`, {
      date,
      entries: [...(filterOutEntryToUpdate || []), entry],
    });
  }
  return response;
};
