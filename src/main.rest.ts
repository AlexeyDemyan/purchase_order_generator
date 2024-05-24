import {
  RestApplication,
  RestConfig,
  POEntryController,
  MongoDatabaseClient,
  UserController,
} from "./rest/index.js";

async function bootstrap() {
  const config = new RestConfig();

  const restApplication = new RestApplication(
    config,
    new MongoDatabaseClient(),
    new POEntryController(),
    new UserController()
  );
  await restApplication.init();
}

bootstrap();
