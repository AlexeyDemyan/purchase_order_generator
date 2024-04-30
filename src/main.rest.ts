import { RestApplication, RestConfig } from "./rest/index.js";

async function bootstrap() {
  const config = new RestConfig();

  const restApplication = new RestApplication(config);
  await restApplication.init();
}

bootstrap();
