import { CliApplication, HelpCommand, TestCommand } from "./cli/index.js";

function bootstrap() {
  const cliApplicaton = new CliApplication();
  cliApplicaton.registerCommands([new HelpCommand(), new TestCommand()]);

  cliApplicaton.processCommand(process.argv);
}

bootstrap();
