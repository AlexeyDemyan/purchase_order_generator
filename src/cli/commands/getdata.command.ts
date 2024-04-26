import got from 'got';
import { Command } from "./command.interface.js";

export class GetDataCommand implements Command {
  public getName(): string {
    return "--getdata";
  }

  public execute(...parameters: string[]): void {
    const [filepath, url] = parameters;

    console.log(filepath)
    console.log(url)
  }
}
