import { WAITING_LIST_BASE_URL } from "@/shared/constants";
import { List } from "@/shared/types";
import axios from "axios";

const waitingListApi = axios.create({
  baseURL: WAITING_LIST_BASE_URL,
});

export const waitingListEntriesEndpoint = "/list";

export const getWaitingListEntries = async () => {
  const response = await waitingListApi.get<List[]>(waitingListEntriesEndpoint);
  return response.data;
};
