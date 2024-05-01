import { Config } from "../types_and_interfaces/index.js";
import { MongoDatabaseClient } from "./mongo.database-client.js";
import { PurchaseOrderEntryModel } from "../schemas/purchase-order-entry.model.js";

export class RestApplication {
  constructor(
    private readonly config: Config,
    private readonly mongoDatabaseClient: MongoDatabaseClient
  ) {}

  private async _initDB() {
    const mongoURI = this.config.get("DB_URI");

    this.mongoDatabaseClient.connect(mongoURI as string);
  }

  public async init() {
    console.info("Rest App initialized");
    console.info(`Value of PORT from env: ${this.config.get("PORT")}`);

    console.info("Initializing database...");
    await this._initDB();
    console.info(`Initialized database`);

    const entryWithHighestNumber = await PurchaseOrderEntryModel.findOne().sort(
      { orderNumber: -1 }
    );
    console.log(`item with highest order number is ${entryWithHighestNumber}`);

    const highestOrderNumber = entryWithHighestNumber?.orderNumber;

    if (highestOrderNumber) {
      const newOrderNumber = highestOrderNumber + 1;
      const newPoEntry = await PurchaseOrderEntryModel.create({
        orderNumber: newOrderNumber,
      });
      console.log(newPoEntry);
    }
  }
}
