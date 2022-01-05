import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Paper,
  TextField,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useNavigate } from "react-router-dom";
import "./Invoice.css";

//declaration
const INITIAL_USER = {
  pono: "",
  date: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  gstn: "",
  pan: "",
  term: "",
  totalAmt: 0,
  gst: 0,
  gstAmt: 0,
  finalAmt: 0,
  item: [
    {
      id: uuidv4(),
      description: "",
      quantity: "",
      price: "",
      commercials: 0,
    },
  ],
};
//

const InvoiceGenerator = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState(INITIAL_USER);
  useEffect(() => {
    calculateGstAmt(user.gst, user.totalAmt);
  }, [user.gst, user.totalAmt]);

  const calculateGstAmt = (gst, totalAmt) => {
    const gstamount = +gst > 0 ? (+gst / 100) * totalAmt : 0;

    setUser((prevState) => ({
      ...prevState,
      gstAmt: gstamount,
      finalAmt: prevState.totalAmt + gstamount,
    }));
    console.log("finallll", user.totalAmt + gstamount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      pono,
      date,
      name,
      email,
      phone,
      address,
      gstn,
      pan,
      term,
      item,
      gst,
    } = user;
    console.log("finalllllllllll----", user);
    sessionStorage["feedData"] = JSON.stringify(user); //sending data to nxt page
    navigate("/layoutirm/invoicetemp");
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    const gstamount = +user.gst > 0 ? (+user.gst / 100) * user.totalAmt : 0;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
      gstAmt: gstamount,
    }));
  };

  ////////
  const handelItemChange = (id, event) => {
    const newInputFields = user.item.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
        i.commercials = +i.price * +i.quantity;
        const total = user.item.reduce(
          (acc, elm) => (acc += elm.commercials),
          0
        );

        setUser((prevState) => ({
          ...prevState,
          totalAmt: total,
        }));
      }
      return i;
    });

    const gstamount = +user.gst > 0 ? (+user.gst / 100) * user.totalAmt : 0;
    setUser((prevState) => ({
      ...prevState,
      item: [...newInputFields],
      gstAmt: gstamount,
    }));
  };
  //

  //Adding extra Row for Items
  const handleAddFields = () => {
    setUser((prevState) => ({
      ...prevState,
      item: [
        ...prevState.item,
        { id: uuidv4(), description: "", quantity: "", price: "" },
      ],
    }));
  };

  const handleRemoveFields = (id) => {
    const values = [...user.item];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setUser((prevState) => ({
      ...prevState,
      item: [...values],
    }));
  };
  //

  // const classes = useStyles();
  return (
    <>
      <section className="main_section">
        <div className="curve"></div>
      </section>
      <Grid className="invoiceGen_wrapper">
        <Typography gutterBottom variant="h5">
          Purchase Order
        </Typography>
        <Card
          className="PO_from_wrapper"
          component={Paper}
          elevation={6}
          // style={{ maxWidth: 800, margin: "0 auto", padding: "20px 5px" }}
        >
          <CardContent>
            <div className="po_heading">Purchase Order</div>
            <Typography gutterBottom variant="body2">
              Fill the form and download PDF.
            </Typography>
            <br />

            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    label="Po No."
                    name="pono"
                    variant="outlined"
                    fullWidth
                    value={user.pono}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Po Date"
                    name="date"
                    variant="outlined"
                    fullWidth
                    value={user.date}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    required
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={user.name}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    multiline
                    rows={2}
                    variant="outlined"
                    value={user.address}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={user.email}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Phone"
                    variant="outlined"
                    name="phone"
                    value={user.phone}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    label="GSTN"
                    variant="outlined"
                    fullWidth
                    name="gstn"
                    value={user.gstn}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    label="PAN"
                    variant="outlined"
                    fullWidth
                    name="pan"
                    value={user.pan}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>

                <Grid xs={12}>
                  <Typography variant="h5" style={{ marginTop: "20px" }}>
                    Add Item
                  </Typography>
                </Grid>
                {user.item.map((inputField) => (
                  <Grid
                    xs={12}
                    sm={12}
                    key={inputField.id}
                    className="additional"
                  >
                    <Grid xs={12} sm={8} item>
                      <TextField
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        value={inputField.description}
                        onChange={(event) =>
                          handelItemChange(inputField.id, event)
                        }
                      />
                    </Grid>
                    <Grid xs={12} sm={2} item>
                      <TextField
                        required
                        fullWidth
                        name="quantity"
                        type="number"
                        label="Qyt"
                        value={inputField.quantity}
                        onChange={(event) =>
                          handelItemChange(inputField.id, event)
                        }
                      />
                    </Grid>
                    <Grid xs={12} sm={2} item>
                      <TextField
                        required
                        fullWidth
                        name="price"
                        type="number"
                        label="Price"
                        value={inputField.price}
                        onChange={(event) =>
                          handelItemChange(inputField.id, event)
                        }
                      />
                    </Grid>
                    <IconButton
                      disabled={user.item.length === 1}
                      onClick={() => handleRemoveFields(inputField.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={handleAddFields}>
                      <AddIcon />
                    </IconButton>
                  </Grid>
                ))}

                <Grid xs={12} sm={2} item className="additional">
                  <TextField
                    required
                    fullWidth
                    name="gst"
                    type="number"
                    label="GST"
                    value={user.gst}
                    onChange={(event) => handleChangeInput(event)}
                  />
                  %
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    required
                    fullWidth
                    label="Term Point"
                    name="term"
                    value={user.term}
                    onChange={(event) => handleChangeInput(event)}
                    multiline
                    rows={2}
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={12} item>
                  <Button
                    className="buttoninvoice"
                    type="submit"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Send →
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default InvoiceGenerator;
