import fs from "fs";
import path from "path";

class CustomError extends Error {
  public className: string;
  public methodName: string;
  public customMessage: string;
  public timestamp: string;

  constructor(
    instance: any,
    methodName: string,
    message: string,
    customMessage: string,
  ) {
    super(message);
    this.className = instance.constructor.name;
    this.methodName = methodName;
    this.customMessage = customMessage;
    this.timestamp = new Date().toISOString();
    this.logError();
  }

  private logError(): void {
    const logMessage = `
      ClassName: ${this.className},
      MethodName: ${this.methodName},
      Message: ${this.message},
      CustomMessage: ${this.customMessage},
      Timestamp: ${this.timestamp}
      \n
    `;

    console.error(logMessage);

    const logDirectory = path.resolve(__dirname, "..", "loggers");
    const logFilePath = path.join(logDirectory, "error.log");

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    fs.appendFileSync(logFilePath, logMessage, "utf8");
  }
}

export default CustomError;
