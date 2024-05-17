import { Schema, Document, model } from "mongoose";
import { PurchaseOrderEntry } from "../types_and_interfaces/purchase-order-entry/purchase-order-entry.type.js";

export interface PurchaseOrderEntryDocument
  extends PurchaseOrderEntry,
  Document {
    createdAt: Date,
    updatedAt: Date,
  }

// gonna write simple types for now

const purchaseOrderEntrySchema = new Schema({
  orderNumber: {
    type: Number,
    unique: true,
    index: true,
  },
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
  priceIncludesVat: String,
}, {timestamps: true});

export const PurchaseOrderEntryModel = model<PurchaseOrderEntryDocument>(
  "PO_Entry",
  purchaseOrderEntrySchema
);
