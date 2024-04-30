import { Command } from "../../types_and_interfaces/index.js";

export class HelpCommand implements Command {
  public getName(): string {
    return "--help";
  }

  public execute(..._parameters: string[]): void {
    console.info(`
      Available Command list:
        --help
        --test
    `)
  }
}
