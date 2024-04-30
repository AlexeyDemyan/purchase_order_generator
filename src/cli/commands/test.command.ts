import { Command } from "../../types_and_interfaces/index.js";

export class TestCommand implements Command {
  public getName(): string {
    return '--test'
  }

  public execute(..._parameters: string[]): void {
    console.info('testing the CLI interface...')
  }
}
