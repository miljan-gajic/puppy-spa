export type Entries = {
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
  date: string;
  entries: Entries[];
};
