import { LogDetails, LogType, Observer } from "./Observer";
import fs from "node:fs";
import path from "node:path";

export class Logger implements Observer {
  private persist: boolean;
  private logFilePath: string;
  private logDirectory: string;

  constructor(persist = false) {
    this.persist = persist;
    this.logFilePath = "logs.log";
    this.logDirectory = path.resolve(__dirname, "repositories");

    if (this.persist) {
      if (!fs.existsSync(this.logDirectory)) {
        fs.mkdirSync(this.logDirectory);
      }
    }
  }

  notify({ className, methodName, logType, message }: LogDetails): void {
    const timestamp = new Date().toISOString();

    let logMessage = `[${logType}] [${timestamp}] [${className}] [${methodName}]`;
    logMessage += `\n   [Message]: ${message} \n`;

    switch (logType) {
      case LogType.INFO:
        console.info(logMessage);
        break;
      case LogType.WARN:
        console.warn(logMessage);
        break;
      case LogType.ERROR:
        console.error(logMessage);
        break;
    }

    if (this.persist) {
      this.saveLogToFile(logMessage);
    }
  }

  private saveLogToFile(logMessage: string): void {
    fs.appendFileSync(
      path.join(this.logDirectory, this.logFilePath),
      logMessage,
      "utf-8",
    );
  }
}
