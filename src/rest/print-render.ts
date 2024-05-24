import { PurchaseOrderEntry } from "../types_and_interfaces/purchase-order-entry/purchase-order-entry.type.js";
import { OrderLine } from "../types_and_interfaces/purchase-order-entry/order-line.type.js";
import { OrderLineStringified } from "../types_and_interfaces/purchase-order-entry/order-line-stringified.js";

const maxAmountOfLines = 14;

const emptyLine: OrderLineStringified = {
  product: "",
  supplierRef: "",
  quantity: "",
  unitPrice: "",
  totalPrice: "",
};

const returnValueOnlyIfApplicable = (value: any) => {
  if (value === null || value === undefined) {
    return "";
  }
  return value;
};

const oneLineStringified = (line: OrderLine) => {
  if (line) {
    return {
      product: returnValueOnlyIfApplicable(line.product?.toString()),
      supplierRef: returnValueOnlyIfApplicable(line.supplierRef?.toString()),
      quantity: returnValueOnlyIfApplicable(line.quantity?.toString()),
      unitPrice: returnValueOnlyIfApplicable(line.unitPrice?.toString()),
      totalPrice: returnValueOnlyIfApplicable(line.totalPrice?.toString()),
    };
  }
  return emptyLine;
};

const prepareOrderLines = (lines: OrderLine[]) => {
  const orderLinesStringified: OrderLineStringified[] = [];
  for (let i = 0; i <= maxAmountOfLines; i++) {
    if (lines[i]) {
      orderLinesStringified.push(oneLineStringified(lines[i]));
    } else {
      orderLinesStringified.push(emptyLine);
    }
  }
  return orderLinesStringified;
};

export const printRender = (poEntry: PurchaseOrderEntry, createdDate: Date) => {
  const poEntryInfo = {
    company: poEntry.company?.toString(),
    date: returnValueOnlyIfApplicable(poEntry.date?.getDate()),
    supplier: returnValueOnlyIfApplicable(poEntry.supplier?.toString()),
    supplierAddress: returnValueOnlyIfApplicable(
      poEntry.supplierAddress?.toString()
    ),
    supplierCode: returnValueOnlyIfApplicable(poEntry.supplierCode?.toString()),
    deliveryDate: returnValueOnlyIfApplicable(poEntry.deliveryDate?.getDate()),
    order: returnValueOnlyIfApplicable(poEntry.order?.toString()),
    orderLines: prepareOrderLines(poEntry.orderLines),
    paymentTerms: returnValueOnlyIfApplicable(poEntry.paymentTerms?.toString()),
    otherRemarks: returnValueOnlyIfApplicable(poEntry.otherRemarks?.toString()),
    discount: returnValueOnlyIfApplicable(poEntry.discount?.toString()),
    netTotalValue: returnValueOnlyIfApplicable(
      poEntry.netTotalValue?.toString()
    ),
    priceIncludesVat: returnValueOnlyIfApplicable(
      poEntry.priceIncludesVat?.toString()
    ),
  };

  const {
    company,
    date,
    supplier,
    supplierAddress,
    supplierCode,
    deliveryDate,
    order,
    orderLines,
    paymentTerms,
    otherRemarks,
    discount,
    netTotalValue,
    priceIncludesVat,
  } = poEntryInfo;

  const isCompanyOne = () => {
    if (company === "Marsovin Winery Ltd") {
      return "&#10004;";
    }
    return "";
  };

  const isCompanyTwo = () => {
    if (company === "CassarCamilleri Marketing, Sales & Distribution Ltd") {
      return "&#10004;";
    }
    return "";
  };

  const isCompanyThree = () => {
    if (company === "Marsovin Viticulture Ltd") {
      return "&#10004;";
    }
    return "";
  };

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/print-style.css" />
    <title>Print PO</title>
    <style>
    body {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-style: normal;
      color: #1f2937;
    }

    .container {
      width: 950px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      size: 7in 9.25in;
    }

    header,
    footer,
    div {
      display: grid;
    }

    /* Header */

    .header {
      width: 200px;
      align-self: center;
      display: grid;
      grid-template-columns: 200px 300px;
      grid-template-rows: 160px 40px;
      grid-template-areas:
        "header__logo header__address"
        "header__company header__address";
    }

    .header__logo {
      grid-area: header__logo;
    }

    .header__logo img {
      height: 150px;
      margin-left: 20px;
    }

    .header__address {
      grid-area: header__address;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    .header__company {
      grid-area: header__company;
      font-weight: 600;
      font-size: 23px;
    }

    /* Title */

    .section__title {
      text-align: center;
      font-weight: 700;
      font-size: 26px;
      margin-top: 20px;
    }

    /* Company List */

    .section__company-list ul {
      list-style: none;
    }

    .section__company-list ul li {
      text-align: center;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
    }

    .section__company-list ul li div {
      margin-right: 20px;
    }

    .section__company-list ul li .company {
      width: 380px;
      text-align: left;
    }

    .tickbox {
      height: 20px;
      width: 20px;
      border: 2px solid black;
    }

    /* Supplier Section */

    .section__supplier {
      display: grid;
      grid-template-columns: 500px 500px;
      grid-template-rows: 50px 50px 50px;
      margin-bottom: 20px;
    }

    .section__supplier div {
      display: flex;
      flex-direction: row;
      align-items: end;
    }

    .supplier-name--title,
    .supplier-address--title,
    .supplier-code--title,
    .supplier-date--title,
    .supplier-order--title {
      width: 140px;
    }

    .supplier-name--text,
    .supplier-address--text,
    .supplier-code--text,
    .supplier-date--text,
    .supplier-order--text {
      width: 300px;
      border-bottom: 1px solid black;
    }

    /* PO Entry Lines */

    .section__po-entry-lines table {
      border-collapse: collapse;
    }

    .section__po-entry-lines table th {
      border: 3px solid black;
    }

    .section__po-entry-lines table td {
      height: 25px;
      text-align: center;
      border: 1px solid black;
    }

    /* Bottom Info */

    .section__bottom-info {
      display: grid;
      grid-template-columns: 500px 500px;
      grid-template-rows: 50px 50px 50px;
    }

    .section__bottom-info div {
      display: flex;
      flex-direction: row;
      align-items: end;
    }

    .delivery-date--title,
    .discount--title,
    .payment-terms--title,
    .net-total-value--title,
    .other-remarks--title,
    .price-includes-vat--title {
      width: 140px;
    }


    .delivery-date--text,
    .discount--text,
    .payment-terms--text,
    .net-total-value--text,
    .other-remarks--text,
    .price-includes-vat--text {
      width: 300px;
      border-bottom: 1px solid black;
    }

    /* Footer */

    footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    footer .conditions-header {
      margin-top: 20px;
      height: 20px;
      font-weight: 600;
    }

    footer .signature {
      padding-top: 100px;
    }

    footer .signature-text {
      text-align: center;
      width: 300px;
      border-top: 1px solid black;
      padding-top: 30px;
    }
    </style>
  </head>
  <body>
    <div class="container">
      <header class="header">
        <div class="header__logo">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-50 0 850 672">
  <defs>
    <style>
      .cls-1 {
        fill: #231f20;
        stroke-width: 0px;
      }
    </style>
  </defs>
  <path class="cls-1" d="M509.28,176.95h-60.85c-8.47-8.71-17.74-16.63-27.75-23.66l20.98-57.77s-54.73.09-54.68.04c-32.37-23.83-72.35-37.95-115.61-37.95-108.12,0-195.79,87.62-195.79,195.75,0,35.05,9.22,67.94,25.36,96.38l26.47,37.39c2.66,5.05,5.59,10.02,8.87,14.91l132.95,186.77c-105.88-28.85-183.96-125.05-185.43-239.75l-1.07-1.55c-.95-1.66-1.87-3.35-2.77-5.05-.02.72-.03,1.44-.03,2.16,0,118.81,80.63,218.79,190.14,248.21,109.52-29.42,190.14-129.4,190.14-248.21,0-23.22-3.07-45.72-8.84-67.11l12.96-22.5c8.39,26.58,12.94,54.88,12.94,84.24,0,129.58-87.94,238.59-207.37,270.67-119.42-32.08-207.39-141.09-207.39-270.67,0-11.57.74-22.96,2.11-34.17-5.26-17.64-8.23-36.27-8.55-55.53-8.41,27.99-12.98,57.65-12.98,88.39,0,141.72,96.17,260.96,226.81,296.05,130.62-35.09,226.79-154.33,226.79-296.05,0-37.36-6.7-73.13-18.96-106.23l31.55-54.77ZM432.05,191.92c.18.2.38.38.56.57h0c2.44,2.5,4.85,5.79,7.14,8.44h30.64l-112.57,195.09h-42.52l5.91-33.51-6.05-17.13h35.7l61.89-170.41c6.79,5.16,13.23,10.8,19.28,16.95ZM109.81,317.58c-8.07-20.32-12.33-42.14-12.33-64.22,0-95.88,78.01-173.85,173.89-173.85,37.31,0,72.77,11.69,102.63,33.67l6.91,5.48h28.77l-8.26,22.76c-18.12-9.77-38.11-16.83-59.54-20.6-106.82-18.84-214.11,51.93-229.6,159.29-1.93,13.34-2.72,25.76-2.48,37.48ZM154.36,389.56c-20.54-30.91-26.62-62.73-20.33-106.33,11.81-81.81,86.25-143.52,173.15-143.52,10.32,0,20.72.91,30.87,2.7,19.84,3.51,38.63,10.33,55.73,20.06l-57.95,159.66-28.75.27-28.33-80.37-4.6,4.06c-29.65,24.78-40.46,64.31-37.64,96.5,2.4,35.28,32.74,70.18,32.74,70.18,19.31,23.92,28.02,41.74,27.47,71.71-.31,17.41-11.43,41.45-27.65,65.06l-114.72-159.96ZM298.57,364.54l-6.96,39.27c-2.3-3.2-4.72-6.48-7.4-9.94-8.25-13.62-21.81-29.27-24.53-50.78-3.9-26.08,10.85-54.64,10.85-54.64l28.04,76.09ZM456.4,345.83c0,116.02-78.47,213.68-185.22,242.9,7-9.51,48.44-67.39,48.44-105.46-.18-25.78-4.77-43.34-18.42-65.28h69.29l77.9-135.31c5.21,20.19,8.01,41.35,8.01,63.15Z"/>
</svg>
        </div>
        <div class="header__company">CassarCamilleri</div>
        <div class="header__address">
          <div>
            <div>Wills Street</div>
            <div>Paola, PLA2234</div>
            <div>Malta</div>
          </div>
          <div>
            <div>Tel: 21 824918/19/20</div>
            <div>Tel: 23 662401</div>
            <div>Tel: 21 820576</div>
          </div>
        </div>
      </header>
      <div class="section section__title">Purchase Order # ${createdDate.getFullYear()}-${
    poEntry.orderNumber
  }</div>
      <div class="section section__company-list">
        <ul>
          <li>
            <div class="company">Marsovin Winery Ltd</div>
            <div class="tickbox">${isCompanyOne()}</div>
            <div class="vat">VAT No: MT 1002-2806</div>
          </li>
          <li>
            <div class="company">
              CassarCamilleri Marketing, Sales & Distribution Ltd
            </div>
            <div class="tickbox">${isCompanyTwo()}</div>
            <div class="vat">VAT No: MT 1432-0606</div>
          </li>
          <li>
            <div class="company">Marsovin Viticulture Ltd</div>
            <div class="tickbox">${isCompanyThree()}</div>
            <div class="vat">VAT No: MT 1373-8006</div>
          </li>
        </ul>
      </div>
      <div class="section section__supplier">
        <div class="supplier-name">
          <div class="supplier-name--title">Supplier</div>
          <div class="supplier-name--text">${supplier}</div>
        </div>
        <div class="supplier-code">
          <div class="supplier-code--title">Supplier Code</div>
          <div class="supplier-code--text">${supplierCode}</div>
        </div>
        <div class="supplier-address">
          <div class="supplier-address--title">Address</div>
          <div class="supplier-address--text">${supplierAddress}</div>
        </div>
        <div class="supplier-date">
          <div class="supplier-date--title">Date</div>
          <div class="supplier-date--text">${date}</div>
        </div>
        <div class="supplier-address">
          <div class="supplier-address--title"></div>
          <div class="supplier-address--text"></div>
        </div>
        <div class="supplier-order">
          <div class="supplier-order--title">Order</div>
          <div class="supplier-order--text">${order}</div>
        </div>
      </div>
      <div class="section section__po-entry-lines">
        <table>
          <tr>
            <th>Product</th>
            <th>Supplier Ref</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
          <tr class="table-row-1">
            <td>${orderLines[0]?.product}</td>
            <td>${orderLines[0]?.supplierRef}</td>
            <td>${orderLines[0]?.quantity}</td>
            <td>${orderLines[0]?.unitPrice}</td>
            <td>${orderLines[0]?.totalPrice}</td>
          </tr>
          <tr class="table-row-2">
          <td>${orderLines[1]?.product}</td>
          <td>${orderLines[1]?.supplierRef}</td>
          <td>${orderLines[1]?.quantity}</td>
          <td>${orderLines[1]?.unitPrice}</td>
          <td>${orderLines[1]?.totalPrice}</td>
          </tr>
          <tr class="table-row-3">
          <td>${orderLines[2]?.product}</td>
          <td>${orderLines[2]?.supplierRef}</td>
          <td>${orderLines[2]?.quantity}</td>
          <td>${orderLines[2]?.unitPrice}</td>
          <td>${orderLines[2]?.totalPrice}</td>
          </tr>
          <tr class="table-row-4">
          <td>${orderLines[3]?.product}</td>
          <td>${orderLines[3]?.supplierRef}</td>
          <td>${orderLines[3]?.quantity}</td>
          <td>${orderLines[3]?.unitPrice}</td>
          <td>${orderLines[3]?.totalPrice}</td>
          </tr>
          <tr class="table-row-5">
          <td>${orderLines[4]?.product}</td>
          <td>${orderLines[4]?.supplierRef}</td>
          <td>${orderLines[4]?.quantity}</td>
          <td>${orderLines[4]?.unitPrice}</td>
          <td>${orderLines[4]?.totalPrice}</td>
          </tr>
          <tr class="table-row-6">
          <td>${orderLines[5]?.product}</td>
          <td>${orderLines[5]?.supplierRef}</td>
          <td>${orderLines[5]?.quantity}</td>
          <td>${orderLines[5]?.unitPrice}</td>
          <td>${orderLines[5]?.totalPrice}</td>
          </tr>
          <tr class="table-row-7">
          <td>${orderLines[6]?.product}</td>
          <td>${orderLines[6]?.supplierRef}</td>
          <td>${orderLines[6]?.quantity}</td>
          <td>${orderLines[6]?.unitPrice}</td>
          <td>${orderLines[6]?.totalPrice}</td>
          </tr>
          <tr class="table-row-8">
          <td>${orderLines[7]?.product}</td>
          <td>${orderLines[7]?.supplierRef}</td>
          <td>${orderLines[7]?.quantity}</td>
          <td>${orderLines[7]?.unitPrice}</td>
          <td>${orderLines[7]?.totalPrice}</td>
          </tr>
          <tr class="table-row-9">
          <td>${orderLines[8]?.product}</td>
          <td>${orderLines[8]?.supplierRef}</td>
          <td>${orderLines[8]?.quantity}</td>
          <td>${orderLines[8]?.unitPrice}</td>
          <td>${orderLines[8]?.totalPrice}</td>
          </tr>
          <tr class="table-row-19">
          <td>${orderLines[9]?.product}</td>
          <td>${orderLines[9]?.supplierRef}</td>
          <td>${orderLines[9]?.quantity}</td>
          <td>${orderLines[9]?.unitPrice}</td>
          <td>${orderLines[9]?.totalPrice}</td>
          </tr>
          <tr class="table-row-11">
          <td>${orderLines[10]?.product}</td>
          <td>${orderLines[10]?.supplierRef}</td>
          <td>${orderLines[10]?.quantity}</td>
          <td>${orderLines[10]?.unitPrice}</td>
          <td>${orderLines[10]?.totalPrice}</td>
          </tr>
          <tr class="table-row-12">
          <td>${orderLines[11]?.product}</td>
          <td>${orderLines[11]?.supplierRef}</td>
          <td>${orderLines[11]?.quantity}</td>
          <td>${orderLines[11]?.unitPrice}</td>
          <td>${orderLines[11]?.totalPrice}</td>
          </tr>
          <tr class="table-row-13">
          <td>${orderLines[12]?.product}</td>
          <td>${orderLines[12]?.supplierRef}</td>
          <td>${orderLines[12]?.quantity}</td>
          <td>${orderLines[12]?.unitPrice}</td>
          <td>${orderLines[12]?.totalPrice}</td>
          </tr>
          <tr class="table-row-14">
          <td>${orderLines[13]?.product}</td>
          <td>${orderLines[13]?.supplierRef}</td>
          <td>${orderLines[13]?.quantity}</td>
          <td>${orderLines[13]?.unitPrice}</td>
          <td>${orderLines[13]?.totalPrice}</td>
          </tr>
          <tr class="table-row-15">
          <td>${orderLines[14]?.product}</td>
          <td>${orderLines[14]?.supplierRef}</td>
          <td>${orderLines[14]?.quantity}</td>
          <td>${orderLines[14]?.unitPrice}</td>
          <td>${orderLines[14]?.totalPrice}</td>
          </tr>
        </table>
      </div>
      <div class="section section__bottom-info">
        <div class="delivery-date">
          <div class="delivery-date--title">Delivery Date</div>
          <div class="delivery-date--text">${deliveryDate}</div>
        </div>
        <div class="discount">
          <div class="discount--title">Discount</div>
          <div class="discount--text">${discount}</div>
        </div>
        <div class="payment-terms">
          <div class="payment-terms--title">Payment Terms</div>
          <div class="payment-terms--text">${paymentTerms}</div>
        </div>
        <div class="net-total-value">
          <div class="net-total-value--title">Net Total Value</div>
          <div class="net-total-value--text">${netTotalValue}</div>
        </div>
        <div class="other-remarks">
          <div class="other-remarks--title">Other Remarks</div>
          <div class="other-remarks--text">${otherRemarks}</div>
        </div>
        <div class="price-includes-vat">
          <div class="price-includes-vat--title">Price Includes VAT</div>
          <div class="price-includes-vat--text">${priceIncludesVat}</div>
        </div>
      </div>
      <footer class="footer">
        <div class="conditions">
          <div class="conditions-header"><p>Conditions:</p></div>
          <div class="conditions-list">
            <ul>
              <li>
                <p>
                  Please issue Delivery Note / Invoice to the above indicated
                  company
                </p>
              </li>
              <li>
                <p>Please quote P/O No on Delivery Note / Invoice</p>
              </li>
              <li>
                <p>
                  For Local Deliveries please deliver between 7:30 - 10:45 &
                  11:30 - 15:00
                </p>
              </li>
              <li>
                <p>
                  All deliveries are to be consigned to Stores Personnel only
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="signature">
          <p class="signature-text">Authorised Signature</p>
        </div>
      </footer>
    </div>
  </body>
</html>
`;
};
