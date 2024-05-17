import express, { Express } from "express";
import cors from "cors";
import { Config } from "../types_and_interfaces/index.js";
import { DatabaseClient } from "../types_and_interfaces/index.js";
// import { PurchaseOrderEntryModel } from "../schemas/purchase-order-entry.model.js";
// import { mockEntry } from "./mock-entry.js";
import { Controller } from "../types_and_interfaces/index.js";

export class RestApplication {
  private server: Express;

  constructor(
    private readonly config: Config,
    private readonly mongoDatabaseClient: DatabaseClient,
    private readonly poEntryController: Controller
  ) {
    this.server = express();
  }

  private async _initDB() {
    const mongoURI = this.config.get("DB_URI");

    this.mongoDatabaseClient.connect(mongoURI as string);
  }

  private async _initServer() {
    const port = this.config.get("PORT");
    this.server.listen(port);
  }

  private async _initControllers() {
    this.server.use("/po_entries", this.poEntryController.router);
  }

  public async _initMiddleware() {
    this.server.use(express.json());
    this.server.use(cors({origin: "http://localhost:3000"}));
    // this.server.use(express.urlencoded({ extended: false }));
  }

  public async init() {
    console.info("Rest App initialized");
    console.info(`Value of PORT from env: ${this.config.get("PORT")}`);

    console.info("Initializing database...");
    await this._initDB();
    console.info(`Initialized database`);

    console.info("Initializing middleware...");
    await this._initMiddleware();
    console.info("App-level Middleware initialized");

    console.info("Initializing controller(s)...");
    await this._initControllers();
    console.info("Controller(s) initialized");

    console.info("Initializing server...");
    await this._initServer();
    console.info(
      `Server started on http://localhost:${this.config.get("PORT")}`
    );

    this.server.get("/", (_req, res) => {
      res.send("Kif ahna");
    });

    this.server.get("/print", (req, res) => {
      console.log(req);
      res.send(`<h1>Orrajt</h1><br><br><h3>${res}</h3>`);
    })

    this.server.post("/form", (req) => {
      console.log(req.body);
    });

    // const entryWithHighestNumber = await PurchaseOrderEntryModel.findOne().sort(
    //   {
    //     orderNumber: -1,
    //   }
    // );
    // console.log(`item with highest order number is ${entryWithHighestNumber}`);

    // const highestOrderNumber = entryWithHighestNumber?.orderNumber;

    // if (highestOrderNumber) {
    //   const newOrderNumber = highestOrderNumber + 1;
    //   const newPoEntry = await PurchaseOrderEntryModel.create({
    //     orderNumber: newOrderNumber,
    //     user: mockEntry.user,
    //     company: mockEntry.company,
    //   });
    //   console.log(`Newest PO entry is: ${newPoEntry}`);
    // }
  }
}
