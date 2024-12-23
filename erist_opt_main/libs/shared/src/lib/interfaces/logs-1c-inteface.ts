export interface ILogData {
  processed: ILogEntry[];
  errorUpsert: ILogEntry[];
  created: ILogEntry[];
  errorCreated: ILogEntry[];
  updated: ILogEntry[];
  errorUpdated: ILogEntry[];
}

interface ILogEntry {
  id1c: string;
  name?: string;
  errorMessage?: string;
  timestamp: string;
}
