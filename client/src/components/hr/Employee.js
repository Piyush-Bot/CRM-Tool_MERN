import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Card, CardContent, Paper, Grid } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "@mui/material";
import EmployeeForm from "./EmployeeForm";

let rows = [];

const Employee = () => {
  const [openEdit, setOpenEdit] = useState([]);
  const [empdetails, setEmpDetails] = useState("");

  const employeeUpdate = () => {
    axios
      .get("/getEmployees")
      .then((response) => {
        setOpenEdit(new Array(response.data.data.length).fill(false));
        const modifiedData = response.data.data.map((elm, index) => {
          return {
            id: index + 1,
            ...elm,
            doj: new Date(elm.doj).toLocaleDateString(),
            dob: new Date(elm.dob).toLocaleDateString(),
          };
        });
        rows = modifiedData;
        setEmpDetails(modifiedData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    employeeUpdate();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "lastName", headerName: "Last Name", width: 100 },
    { field: "accountAccess", headerName: "Access", width: 100 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "phone", headerName: "Phone", width: 100, type: "number" },
    { field: "department", headerName: "Department", width: 100 },
    { field: "gender", headerName: "Gender", width: 90 },
    { field: "dob", headerName: "DOB", type: "number", width: 90 },
    { field: "doj", headerName: "Joining Date", type: "number", width: 110 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onEdit = (e) => {
          const cloneOpenEdit = [...openEdit];
          cloneOpenEdit[e.id - 1] = true;
          setOpenEdit(cloneOpenEdit);
        };
        const onDelete = (e) => {
          const employeeId = e._id;
          axios
            .delete(`/deleteEmployees/${employeeId}`)
            .then((response) => {
              employeeUpdate();
            })
            .catch(function (error) {
              console.log(error);
            });
        };
        const empFormClose = (id) => {
          employeeUpdate();
          const cloneOpenEdit = [...openEdit];
          cloneOpenEdit[id - 1] = false;
          setOpenEdit(cloneOpenEdit);
        };

        return (
          <>
            <EditIcon onClick={() => onEdit(params.row)} />
            <DeleteIcon onClick={() => onDelete(params.row)} />
            <Dialog
              open={openEdit[params.row.id - 1]}
              onClose={!openEdit[params.row.id - 1]}
            >
              <EmployeeForm
                onClick={() => empFormClose(params.row.id)}
                isEdit={true}
                employeeDetails={params.row}
              />
            </Dialog>
          </>
        );
      },
    },
  ];

  return (
    <div className="leave_wrapper">
      <Grid contanier className="section-one">
        <Grid item xs={6} className="section-one__titleBox">
          <div className="section-one__title1">LIST</div>
          <div className="section-one__title2">Employee Details</div>
          <hr className="divLine" />
          <div className="section-one__para">
            “Be passionate about the culture and the business, and remain
            positive because it inspires others.”
          </div>
        </Grid>
        <Grid item xs={6} className="section-one__banner banner-hero ">
          <img
            alt=""
            src="https://image.freepik.com/free-vector/isometric-template-with-sand-clock-man-working-computer-thinking-about-deadline-3d_1284-28417.jpg"
          />
          images
        </Grid>
        <Grid item xs={12} className="separator">
          <svg
            className="separator__svg"
            width="100%"
            height="400"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="#20232e"
            version="1.1"
          >
            <path d="M 100 100 V 10 L 0 800" />
            <path d="M 30 73 L 100 18 V 10 Z" fill="#20232e" stroke-width="0" />
          </svg>
        </Grid>
      </Grid>
      <div className="section-two">
        <div className="leaveTable">
          <Card className="emp_table_wrapper" component={Paper} elevation={6}>
            <CardContent>
              <div style={{ height: 520, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={8}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Employee;
