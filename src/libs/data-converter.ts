import { MockServerData } from "../types/index.js";

export class MockServerDataConverter {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const user = this.mockData.user;
    const numberStringed = this.mockData.number.toString();

    return `${user}, ${numberStringed}`;
  }
}
