import {
  RestApplication,
  RestConfig,
  POEntryController,
  MongoDatabaseClient,
} from "./rest/index.js";

async function bootstrap() {
  const config = new RestConfig();

  const restApplication = new RestApplication(
    config,
    new MongoDatabaseClient(),
    new POEntryController()
  );
  await restApplication.init();
}

bootstrap();
