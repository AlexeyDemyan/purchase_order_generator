import { Config } from "../types_and_interfaces/index.js";
import { MongoDatabaseClient } from "./mongo.database-client.js";

export class RestApplication {
  constructor(
    private readonly config: Config,
    private readonly mongoDatabaseClient: MongoDatabaseClient
  ) {}

  private async _initDB() {
    const mongoURI = this.config.get('DB_URI');

    this.mongoDatabaseClient.connect(mongoURI as string);
  }

  public async init() {
    console.info("Rest App initialized");
    console.info(`Value of PORT from env: ${this.config.get("PORT")}`);

    console.info('Initializing database...');
    await this._initDB();
    console.info(`Initialized database`);
  }
}
