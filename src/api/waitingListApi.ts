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
