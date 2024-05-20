import { PurchaseOrderEntry } from "../types_and_interfaces/purchase-order-entry/purchase-order-entry.type.js";

export const printRender = (poEntry: PurchaseOrderEntry) => `<!DOCTYPE html>
<html lang="en">
<head>
<style>
  h1{color: red}
  h2{color: blue}
</style>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Red H1</h1>
  <h2>${poEntry.supplier}</h2>
</body>
</html>
`;
