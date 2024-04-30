import { Config } from "../types_and_interfaces/index.js";

export class RestApplication {
  constructor(private readonly config: Config) {}

  public async init() {
    console.info("Rest App initialized");
    console.log(`Value of PORT from env: ${this.config.get("PORT")}`);
  }
}
