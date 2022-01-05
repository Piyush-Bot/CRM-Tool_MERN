import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@material-ui/core";
import "./Invoice.css";
import logo from "../../images/LM.png";

const InvoiceTemplate = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = sessionStorage.getItem("feedData");
    const retrivedUser = JSON.parse(user);
    console.log(retrivedUser);
    setUser(retrivedUser);
  }, []);

  //PRINTING..
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //

  return (
    <>
      <div id="invoice">
        <div className="toolbar hidden-print">
          <div className="text-right">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handlePrint}
            >
              Print
            </Button>
          </div>
          <hr />
        </div>

        {/* printing area */}
        <div ref={componentRef} className="invoice overflow-auto">
          <div style={{ minwidth: "600px" }}>
            <header>
              {/* <div className="row"> */}
              <a target="_blank" href="https://laudco.com/">
                <img
                  className="logom"
                  alt="logo"
                  src={logo}
                  data-holder-rendered="true"
                />
              </a>

              <div className="po-details">
                <h2 className="name">PURCHASE ORDER</h2>
                <div>PO No.: {user.pono}</div>
                <div>PO Date: {user.date}</div>
              </div>
            </header>
            <main>
              <div className="row contacts">
                <div className="col invoice-from">
                  <div className="text-gray-light">From:</div>
                  <h4 className="from">LAUDCO MEDIA PRIVATE LIMITED</h4>
                  <div className="details">
                    Awfis Space Solutions, Samrah Plaza, St Marks Rd, Shanthala
                    Nagar, Ashok Nagar, Bengaluru 560001
                    <br />
                    Email :
                    <a href="mailto:synergy@laudco.com">synergy@laudco.com</a>
                    <br />
                    Ph: +91 9606482175
                    <br />
                    GSTN: 29AADCL9618H1Z4
                    <br />
                    PAN: AADCL9618H
                    <br />
                  </div>
                </div>

                <div className="col invoice-to">
                  <div className="text-gray-light">To:</div>
                  <h4 className="to">{user.name}</h4>
                  <div className="details">
                    {user.address}
                    <br />
                    Email :<a href="mailto:{user.email}">{user.email}</a>
                    <br />
                    Ph: {user.phone}
                    <br />
                    GSTN:{user.gstn}
                    <br />
                    PAN: {user.pan} <br />
                  </div>
                </div>
              </div>
              <table border="0" cellspacing="0" cellPadding="0">
                <thead>
                  <tr>
                    <th className="text-center">S.No.</th>
                    <th className="text-center">DESCRIPTION</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Unit Price</th>
                    <th className="text-right">Commercials</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.item?.map((inputField, index) => (
                    <tr>
                      <td className="no">{index + 1}</td>
                      <td className="text-center">
                        <h3>--{inputField.description}</h3>
                      </td>
                      <td className="qty">{inputField.quantity}</td>
                      <td className="unit">{inputField.price}</td>
                      <td className="total">{inputField.commercials}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2"></td>
                    <td colSpan="2">Total without Tax</td>
                    <td>{user?.totalAmt}</td>
                  </tr>
                  <tr>
                    <td colSpan="2"></td>
                    <td colSpan="2">GST @ {user?.gst}%</td>
                    <td>{user?.gstAmt}</td>
                  </tr>
                  <tr>
                    <td colSpan="2"></td>
                    <td colSpan="2">GRAND TOTAL</td>
                    <td>{user?.finalAmt}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="terms">
                <div className="heading">Terms & Condition:</div>
                <div className="term">
                  <ul>
                    <li>
                      The Purchase Order (the “Order”) is an offer by Laudco
                      Media Private Limited (the "Purchaser") to the partyto
                      whom such Order is addressed and such party's applicable
                      affiliates and subsidiaries (the "Seller /Service
                      Provider") to enter into the agreement it describes and it
                      shall be the complete and exclusivestatement of such offer
                      and agreement.
                    </li>
                    <li>{user.term}</li>
                    <li>
                      All invoices shall be paid in accordance with the payment
                      conditions stated in the Purchase Order.Purchaser shall be
                      responsible to make the payment within the timeline as may
                      be prescribed in thePurchase Order, calculated from the
                      date of the receipt of the invoice. In the absence of any
                      specificconditions/timelines, all payments will be made
                      within sixty days from the receipt of the invoice.
                    </li>
                    <li>
                      Confidentiality & Publicity. Except as necessary for its
                      performance under the Order, Seller / ServiceProvider
                      shall not disclose to any person (including but not
                      limited to any company affiliated with Seller /Service
                      Provider and any subcontractor of Seller / Service
                      Provider), reproduce, or use any information furnished by
                      Purchaser to Seller / Service Provider under the Order
                      (whether or not marked as confidentialor proprietary). All
                      information or technical particulars supplied to Seller /
                      Service Provider by Buyer are tobe kept confidential and
                      no part of it should be shared with anyone other than
                      authorized persons. Theliability of the damage caused due
                      to negligence of any of the present or ex- employees would
                      be onSeller / Service Provider's account. Further, Seller
                      / Service Provider shall not issue any news
                      release,advertisement, publicity, or promotional material
                      regarding the Order or Seller / Service
                      Provider'srelationship with Purchaser without Purchaser's
                      prior written consent. The provisions of this
                      Paragraphshall survive the termination or cancellation of
                      any or all Orders.
                    </li>
                    <li>
                      The Order shall be governed by the laws of India. All
                      disputes arising in connection therewith shall beheard
                      only by a court of competent jurisdiction at Bangalore and
                      Courts of Bangalore shall have exclusivejurisdiction over
                      the matters arising out of or in connection with this
                      Order and the prevailing party in anylegal proceeding
                      shall be entitled to recover its reasonable attorneys'
                      fees incurred in connection therewith.
                    </li>
                    <li>
                      The tax amount portion of the invoice shall be paid by
                      Laudco Media Private Limited only after theSupplier has
                      provided sufficient proof that the amount for the Goods
                      and Services Tax charged in theinvoice is declared in Form
                      GSTR-1 and Form GSTR-3 and the taxes have been paid. In
                      case the Supplierfails to pay such taxes or has not
                      provided Laudco Media Private Limited proof of their tax
                      clearance,Laudco Media Private Limited shall withhold the
                      payments for the subsequent month.
                    </li>
                    <li>
                      Invoice to be submitted in original along with: - <br />
                      <ol type="a">
                        <li>
                          PO reference no on the face of the invoice & a copy of
                          the PO attached with the invoice.
                          <br />
                        </li>
                      </ol>
                    </li>
                  </ul>
                </div>
              </div>
            </main>
            <footer>
              Invoice was created on a computer and is valid without the
              signature and seal.
            </footer>
          </div>
          {/* <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom--> */}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate;
