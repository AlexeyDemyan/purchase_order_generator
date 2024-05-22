import { PurchaseOrderEntry } from "../types_and_interfaces/purchase-order-entry/purchase-order-entry.type.js";
import { OrderLine } from "../types_and_interfaces/purchase-order-entry/order-line.type.js";

const returnValueOnlyIfApplicable = (value: any) => {
  if (value === null || value === undefined) {
    return "";
  }
  return value;
};

const oneLineStringified = (line: OrderLine) => {
  return {
    product: returnValueOnlyIfApplicable(line.product),
    supplierRef: returnValueOnlyIfApplicable(line.supplierRef),
    quantity: returnValueOnlyIfApplicable(line.quantity),
    unitPrice: returnValueOnlyIfApplicable(line.unitPrice),
    totalPrice: returnValueOnlyIfApplicable(line.totalPrice),
  };
};

// const prepareOrderLines = (lines: OrderLine[]) => {
//   const orderLinesStringified = [];
//   lines.forEach((line) => {
//     orderLinesStringified.push(oneLineStringified(line))
//   });
// };

export const printRender = (poEntry: PurchaseOrderEntry, createdDate: Date) => {
  const poEntryInfo = {
    company: poEntry.company,
    date: returnValueOnlyIfApplicable(poEntry.date),
    supplier: returnValueOnlyIfApplicable(poEntry.supplier),
    supplierAddress: returnValueOnlyIfApplicable(poEntry.supplierAddress),
    supplierCode: returnValueOnlyIfApplicable(poEntry.supplierCode),
    deliveryDate: returnValueOnlyIfApplicable(poEntry.deliveryDate),
    order: returnValueOnlyIfApplicable(poEntry.order),
    orderLine: oneLineStringified(poEntry.orderLines[0]),
    paymentTerms: returnValueOnlyIfApplicable(poEntry.paymentTerms),
    otherRemarks: returnValueOnlyIfApplicable(poEntry.otherRemarks),
    discount: returnValueOnlyIfApplicable(poEntry.discount),
    netTotalValue: returnValueOnlyIfApplicable(poEntry.netTotalValue),
    priceIncludesVat: returnValueOnlyIfApplicable(poEntry.priceIncludesVat),
  };

  const {
    company,
    date,
    supplier,
    supplierAddress,
    supplierCode,
    deliveryDate,
    order,
    orderLine,
    paymentTerms,
    otherRemarks,
    discount,
    netTotalValue,
    priceIncludesVat,
  } = poEntryInfo;

  const isCompanyOne = () => {
    if (company === "Company_1") {
      return "&#10004;";
    }
    return "";
  };

  const isCompanyTwo = () => {
    if (company === "Company_2") {
      return "&#10004;";
    }
    return "";
  };

  const isCompanyThree = () => {
    if (company === "Company_3") {
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
    }

    .section__company-list ul li div {
      margin-right: 20px;
    }

    .section__company-list ul li .company {
      width: 380px;
      text-align: left;
    }

    .tickbox {
      height: 10px;
      width: 10px;
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
        <div class="header__logo"><img src="../../static/logo.png" alt="logo" /></div>
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
            <td>${orderLine.product}</td>
            <td>${orderLine.supplierRef}</td>
            <td>${orderLine.quantity}</td>
            <td>${orderLine.unitPrice}</td>
            <td>${orderLine.totalPrice}</td>
          </tr>
          <tr class="table-row-2">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-3">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-4">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-5">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-6">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-7">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-8">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-9">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-10">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-11">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-12">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-13">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-14">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-15">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-16">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="table-row-17">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
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
