import { DotenvParseOutput, config } from "dotenv";
import { Config } from "../types_and_interfaces/index.js";

export class RestConfig implements Config {
  private readonly config: NodeJS.ProcessEnv;

  constructor() {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error(`Cannot read .env file. Perhaps the file does not exist`);
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    console.info(".env file found and successfully parsed!");
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
