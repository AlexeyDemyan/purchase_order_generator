import { RestApplication } from "./rest/index.js";

async function bootstrap() {
  const restApplication = new RestApplication();
  await restApplication.init();
}

bootstrap();
