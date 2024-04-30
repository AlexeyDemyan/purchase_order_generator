import * as Mongoose from "mongoose";
import { DatabaseClient } from "../types_and_interfaces/index.js";

export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor() {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error("MongoDB client already connected");
    }

    console.info("attempting to connect to database");

    this.mongoose = await Mongoose.connect(uri);
    this.isConnected = true;

    console.info("Database connection established");
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error("Not connected to database");
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    console.info("Database connection closed");
  }
}
