export enum LogType {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export type LogDetails = {
  className: string;
  methodName: string;
  logType: LogType;
  message: string;
};
export interface Observer {
  notify(logDetails: LogDetails): void;
}
