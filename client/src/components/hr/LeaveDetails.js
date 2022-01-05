import "./Hr.css";

import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { makeStyles } from "@material-ui/styles";
import { classicNameResolver, isClassExpression } from "typescript";

const useStyles = makeStyles((them) => ({
  wrapper: {
    marginTop: "65px",
    padding: "10px 50px",
    height: "100%",
    width: "100%",
  },
}));
var dateFilterParams = {
  filters: [
    {
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterDate, cellValue) {
          if (cellValue == null) return -1;
          return getDate(cellValue) - filterDate;
        },
      },
    },
    {
      filter: "agSetColumnFilter",
      filterParams: {
        comparator: function (a, b) {
          return getDate(a) - getDate(b);
        },
      },
    },
  ],
};
function getDate(value) {
  var dateParts = value.split("/");
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
}

const LeaveDetails = () => {
  const classes = useStyles();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => params.api.setRowData(data);

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  return (
    <div className={classes.wrapper}>
      <h3>Employee Leave Application Details</h3>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-balham"
      >
        <AgGridReact
          defaultColDef={{
            flex: 1,
            minWidth: 200,
            resizable: true,
            menuTabs: ["filterMenuTab"],
          }}
          sideBar={{ toolPanels: ["filters"] }}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <AgGridColumn field="athlete" filter="agMultiColumnFilter" />
          <AgGridColumn
            field="country"
            filter="agMultiColumnFilter"
            filterParams={{
              filters: [
                {
                  filter: "agTextColumnFilter",
                  filterParams: { defaultOption: "startsWith" },
                },
                { filter: "agSetColumnFilter" },
              ],
            }}
          />
          <AgGridColumn
            field="gold"
            filter="agMultiColumnFilter"
            filterParams={{
              filters: [
                { filter: "agNumberColumnFilter" },
                { filter: "agSetColumnFilter" },
              ],
            }}
          />
          <AgGridColumn
            field="date"
            filter="agMultiColumnFilter"
            filterParams={dateFilterParams}
          />
        </AgGridReact>
      </div>
    </div>
  );
};

export default LeaveDetails;
