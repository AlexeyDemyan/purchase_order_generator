import { Command } from "./command.interface.js";

export class TestCommand implements Command {
  public getName(): string {
    return '--test'
  }

  public execute(..._parameters: string[]): void {
    console.info('testing the CLI interface...')
  }
}
