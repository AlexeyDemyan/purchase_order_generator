import { Users } from "./users.type.js";
import { Companies } from "./companies.type.js";
import { OrderLine } from "./order-line.type.js";

export type PurchaseOrderEntry = {
  orderNumber: number;
  user: Users;
  company: Companies;
  date: Date;
  supplier: string;
  supplierAddress: string;
  supplierCode?: string;
  deliveryDate?: Date | string;
  order?: string;
  orderLines: OrderLine[];
  paymentTerms?: string;
  otherRemarks?: string;
  discount: number;
  netTotalValue: number;
  priceIncludesVAT: string;
};
