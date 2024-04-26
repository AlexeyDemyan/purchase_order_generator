#!/usr/bin/env node
import {
  CliApplication,
  HelpCommand,
  TestCommand,
  GetDataCommand,
} from "./cli/index.js";

function bootstrap() {
  const cliApplicaton = new CliApplication();
  cliApplicaton.registerCommands([
    new HelpCommand(),
    new TestCommand(),
    new GetDataCommand(),
  ]);

  cliApplicaton.processCommand(process.argv);
}

bootstrap();
