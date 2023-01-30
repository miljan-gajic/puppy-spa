export type Entry = {
  arrival: string;
  id: string;
  nextEntryId: string | null;
  owner: string;
  prevEntryId: string | null;
  puppyName: string;
  requestedService: string;
  serviced: boolean;
};

export type List = {
  id: string;
  date: string;
  entries: Array<Entry>;
};
