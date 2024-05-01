import express, { Express } from "express";
import { Config } from "../types_and_interfaces/index.js";
import { MongoDatabaseClient } from "./mongo.database-client.js";
import { PurchaseOrderEntryModel } from "../schemas/purchase-order-entry.model.js";
import { mockEntry } from "./mock-entry.js";

export class RestApplication {
  private server: Express;

  constructor(
    private readonly config: Config,
    private readonly mongoDatabaseClient: MongoDatabaseClient
  ) {
    this.server = express();
  }

  private async _initDB() {
    const mongoURI = this.config.get("DB_URI");

    this.mongoDatabaseClient.connect(mongoURI as string);
  }

  private async _initServer(){
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  public async init() {
    console.info("Rest App initialized");
    console.info(`Value of PORT from env: ${this.config.get("PORT")}`);

    console.info("Initializing database...");
    await this._initDB();
    console.info(`Initialized database`);

    console.info('Initializing server...');
    await this._initServer();
    console.info(`Server started on http://localhost:${this.config.get('PORT')}`)

    const entryWithHighestNumber = await PurchaseOrderEntryModel.findOne().sort(
      {
        orderNumber: -1,
      }
    );
    console.log(`item with highest order number is ${entryWithHighestNumber}`);

    const highestOrderNumber = entryWithHighestNumber?.orderNumber;

    if (highestOrderNumber) {
      const newOrderNumber = highestOrderNumber + 1;
      const newPoEntry = await PurchaseOrderEntryModel.create({
        orderNumber: newOrderNumber,
        user: mockEntry.user,
        company: mockEntry.company,
      });
      console.log(`Newest PO entry is: ${newPoEntry}`);
    }
  }
}
