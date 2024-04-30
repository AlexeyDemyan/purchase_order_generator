import { RestApplication, RestConfig } from "./rest/index.js";
import { MongoDatabaseClient } from "./rest/mongo.database-client.js";

async function bootstrap() {
  const config = new RestConfig();

  const restApplication = new RestApplication(config, new MongoDatabaseClient());
  await restApplication.init();
}

bootstrap();
