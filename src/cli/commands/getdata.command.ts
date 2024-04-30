import got from "got";
import { appendFile } from "node:fs";
import { Command } from "../../types_and_interfaces/command.interface.js";
import { MockServerData } from "../../types_and_interfaces/index.js";
import { MockServerDataConverter } from "../../libs/index.js";

export class GetDataCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Cannot load data from ${url}`);
    }
  }

  private async write(filepath: string) {
    const mockServerDataConverter = new MockServerDataConverter(
      this.initialData
    );

    await appendFile(
      filepath,
      `${mockServerDataConverter.generate()}`,
      () => {}
    );
  }

  public getName(): string {
    return "--getdata";
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filepath, url] = parameters;

    try {
      await this.load(url);
      await this.write(filepath);
      console.info(`File ${filepath} was created`)
    } catch (error: unknown) {
      console.error(`Cannot generate data`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
