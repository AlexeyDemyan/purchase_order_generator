import { Schema, Document, model } from "mongoose";
import { PurchaseOrderEntry } from "../types_and_interfaces/purchase-order-entry/purchase-order-entry.type.js";

export interface PurchaseOrderEntryDocument
  extends PurchaseOrderEntry,
    Document {}

// gonna write simple types for now

const purchaseOrderEntrySchema = new Schema({
  orderNumber: Number,
  user: String,
  company: String,
  date: Date,
  supplier: String,
  supplierAddress: String,
  supplierCode: String,
  deliveryDate: Date,
  order: String,
  orderLines: Array,
  paymentTerms: String,
  otherRemarks: String,
  discount: Number,
  netTotalValue: Number,
  priceIncludesVAT: Boolean,
});

export const PurchaseOrderEntryModel = model<PurchaseOrderEntryDocument>(
  "Purchase Order Entry",
  purchaseOrderEntrySchema
);
