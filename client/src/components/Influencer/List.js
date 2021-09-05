import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

const InfluencerList = () => {
  const [userData, setUserData] = useState([]);

  const handleDelete = (id) => {
    //console.log(id);
    setUserData(userData.filter((item) => item.id !== id));
  };

  const userList = async () => {
    try {
      const res = await fetch("/getdatal", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await res.json();
      console.log(data);
      data = data.data.map((el, i) => {
        return {
          id: i + 1,
          ...el,
        };
      });
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userList();
    console.log(userList);
  }, []);

  //data
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "email",
      width: 150,
      editable: true,
    },
    {
      field: "work",
      headerName: "Work ",
      width: 150,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 110,
      editable: true,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/login/" + params.row.id}>
              <button>Edit</button>
            </Link>
            <DeleteOutline onClick={() => handleDelete(params.row.id)} />{" "}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-2">SideBar</div>

        <div className="col-md-10">
          <div className="row">
            <div className="col-md-9">
              Influencer List
              <h1>InfluencerList</h1>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={userData}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            </div>
            <div className="col-md-3">
              <h2>INF_ right</h2>
              <p>
                Material UI is a component library for React teeming with
                powerful components that you should be using in your projects.
                If you're just looking to create a good looking app, Material UI
                can provide you with solid pre-styled components that will get
                the job done.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h2>Recent</h2>
              <p>
                Material UI is a component library for React teeming with
                powerful components that you should be using in your projects.
                If you're just looking to create a good looking app, Material UI
                can provide you with solid pre-styled components that will get
                the job done.
              </p>
            </div>
            <div className="col-md-8">
              <h2>Campaign</h2>
              <p>
                Material UI is a component library for React teeming with
                powerful components that you should be using in your projects.
                If you're just looking to create a good looking app, Material UI
                can provide you with solid pre-styled components that will get
                the job done.
              </p>
              <br></br>
            </div>
          </div>
          <div className="row">
            <h5>end-of-list</h5>
            <p>
              Material UI is a component library for React teeming with powerful
              components that you should be using in your projects. If you're
              just looking to create a good looking app, Material UI can provide
              you with solid pre-styled components that will get the job done.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluencerList;
