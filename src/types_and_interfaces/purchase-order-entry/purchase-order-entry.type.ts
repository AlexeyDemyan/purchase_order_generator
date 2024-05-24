import { Companies } from "./companies.type.js";
import { OrderLine } from "./order-line.type.js";

export type PurchaseOrderEntry = {
  orderNumber: number;
  user: string;
  company: Companies;
  date: Date;
  supplier: string;
  supplierAddress: string;
  supplierCode?: string;
  deliveryDate?: Date;
  order?: string;
  orderLines: OrderLine[];
  paymentTerms?: string;
  otherRemarks?: string;
  discount: number;
  netTotalValue: number;
  priceIncludesVat: 'Yes' | 'No';
};
