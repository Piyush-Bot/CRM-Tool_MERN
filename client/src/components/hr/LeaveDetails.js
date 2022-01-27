import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Card, CardContent, Paper, Grid } from "@material-ui/core";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Confirmation from "../shared/Confirmation.modal";

let rows = [];

const LeaveDetails = () => {
  // approverId must be fetch from either session or Db
  const approverId = "61e6cc8e421f25c0fbaad31e";
  const [leavedetails, setLeaveDetails] = useState("");
  const [openConformation, setOpenConformation] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "empId", headerName: "EmpId", width: 70 },
    { field: "name", headerName: "Name", width: 70 },
    { field: "leaveType", headerName: "Leave Type", width: 100 },
    { field: "fDate", headerName: "From Date", width: 100, type: "number" },
    { field: "tDate", headerName: "To Date", width: 100, type: "number" },
    { field: "leaveStatus", headerName: "Leave Status", width: 100 },
    { field: "reason", headerName: "Reason", width: 100 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onApprove = (e) => {
          const cloneOpenEdit = [...openConformation];
          cloneOpenEdit[params.row.id - 1] = true;
          setOpenConformation(cloneOpenEdit);
        };
        const onReject = (e) => {
          if (params.row.leaveStatus === "Pending") {
            modifyLeaves("Rejected", params.row._id);
          }
        };

        const handleClose = (value) => {
          if (value === "Approved") {
            axios
              .put(`/updateLeaves/${params.row._id}`, {
                status: value,
              })
              .then((response) => {
                getLeaves();
              });
          }
          const cloneOpenEdit = [...openConformation];
          cloneOpenEdit[params.row.id - 1] = false;
          setOpenConformation(cloneOpenEdit);
        };
        return (
          <>
            <DoneIcon onClick={onApprove} />
            <ClearIcon onClick={onReject} />
            <Confirmation
              name={params.row.name}
              reason={params.row.reason}
              open={openConformation[params.row.id - 1]}
              onClose={handleClose}
            />
          </>
        );
      },
    },
  ];

  const modifyLeaves = (status, rowId) => {
    axios
      .put(`/updateLeaves/${rowId}`, {
        status: status,
      })
      .then((response) => {
        getLeaves();
      });
  };

  const getLeaves = () => {
    axios.get(`/getLeaves/${approverId}`).then((response) => {
      setOpenConformation(new Array(response.data.data.length).fill(false));
      const modifiedData = response.data.data.map((elm, index) => {
        return {
          id: index + 1,
          ...elm,
          fDate: new Date(elm.fDate).toLocaleDateString(),
          tDate: new Date(elm.tDate).toLocaleDateString(),
          action: "",
        };
      });
      rows = modifiedData;
      setLeaveDetails(modifiedData);
    });
  };

  useEffect(() => {
    getLeaves();
  }, []);

  return (
    <div className="leave_wrapper">
      <Grid contanier className="section-one">
        <Grid item xs={6} className="section-one__titleBox">
          <div className="section-one__title1">EMPLOYEE</div>
          <div className="section-one__title2">Leave Details</div>
          <hr className="divLine" />
          <div className="section-one__para">
            Your happiness is our number one priority! Feel free to reach out
            with any questions or concerns - We can’t wait to see you soon!
          </div>
        </Grid>
        <Grid item xs={6} className="section-one__banner banner-hero ">
          <img
            alt=""
            src="https://images.pexels.com/photos/4792282/pexels-photo-4792282.jpeg?cs=srgb&dl=pexels-anete-lusina-4792282.jpg&fm=jpg"
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
          <Card className="leave_table_wrapper" component={Paper} elevation={6}>
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

export default LeaveDetails;
