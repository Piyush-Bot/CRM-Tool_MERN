import React, { Component } from "react";
import "./irmtool.css";
// import data from "./data.json";
import XLSX from "xlsx";
import axios from "axios";
import {
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@material-ui/core";

const headers = ["platform", "category", "genre", "gender", "location"];

const columns = [
  { id: "platform", label: "Platform", minWidth: 50, align: "center" },
  { id: "category", label: "Category", minWidth: 50, align: "center" },
  { id: "genre", label: "Genre", minWidth: 150 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "gender", label: "Gender", minWidth: 50 },
  { id: "followers", label: "Followers", minWidth: 50 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "handle", label: "Handle", minWidth: 50 },
  { id: "contact_no", label: "Contact No.", minWidth: 100 },
  { id: "email", label: "Email", maxWidth: 50 },
];

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: [],
      filterOption: [],
      filteredData: [],
      page: 0,
      rowsPerPage: 10,
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get("/influencerlist", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({
          data: response.data.data,
          filteredData: response.data.data,
        });
      });
  }

  // export button
  downloadExcel = () => {
    const newData = this.state.filteredData.map((row) => {
      delete row.tableData;
      return row;
    });

    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Influencer");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "InfluencerData.xlsx");
  };

  //pagination
  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: +event.target.value,
    });
  };

  //filters
  optionSelected(e) {
    this.setState({
      filterOption: e.target.value,
    });
  }

  getdisplayvalue(data) {
    if (!data.includes("")) {
      const modifiyedVal = data.map((el) => Object.entries(el)[0][1]);
      return modifiyedVal.join(" , ");
    }
    if (data.includes("")) {
      return "";
    }
  }

  filterOptionSelected(val) {
    const obj = {};
    val.forEach((el) => {
      Object.assign(obj, el);
    });
    const temp = this.state.data.filter((ele) =>
      Object.keys(obj).every((objEl) => ele[objEl] === obj[objEl])
    );
    this.setState((prev) => {
      return {
        ...prev,
        filteredData: temp,
      };
    });
  }

  handleSelectedValue = (value) => {
    if (!value.includes("")) {
      const duplicates = value
        .map((el) => Object.values(el)[0])
        .filter((e, i, a) => a.indexOf(e) !== i);
      value = value.filter((el) => !duplicates.includes(Object.values(el)[0]));
      this.setState((prev) => {
        return {
          ...prev,
          selectedOption: [...value],
        };
      });
      this.filterOptionSelected(value);
    }
    if (value.includes("")) {
      this.setState((prev) => {
        return {
          ...prev,
          filteredData: this.state.data,
          selectedOption: [],
        };
      });
    }
  };

  filterList(e) {
    let updateList = this.state.data;
    updateList = updateList.filter((item) => {
      return (
        item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1 ||
        item.location.toLowerCase().search(e.target.value.toLowerCase()) !==
          -1 ||
        item.genre.toLowerCase().search(e.target.value.toLowerCase()) !== -1 ||
        item.platform.toLowerCase().search(e.target.value.toLowerCase()) !==
          -1 ||
        item.followers.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
      /* let keys = Object.keys(item);
      for (let i = 0; i < keys.length; i++) {
        if (
          item[keys[i]] &&
          typeof item[keys[i]] != "number" &&
          item[keys[i]].toLowerCase().search(e.target.value.toLowerCase()) !==
            -1
        ) {
          return item[keys[i]].toLowerCase();
        }
      } */
    });

    this.setState((prev) => {
      return {
        ...prev,
        filteredData: updateList,
        selectedOption: [],
      };
    });
  }

  //checkbox
  render() {
    const makeItems = () => {
      let itemList = [];
      headers.forEach((el, i) => {
        let checkUnique = [];
        itemList.push(<ListItemText key={i} primary={el} />);
        this.state.data.forEach((elm, index) => {
          checkUnique.push(elm[el]);
        });

        let newArr = [...new Set(checkUnique)];
        let fileteredArr = newArr.filter((element) => {
          return element && element !== "";
        });

        fileteredArr.forEach((unique, indexU) => {
          const itemValue = {
            [el]: unique,
          };
          itemList.push(
            <MenuItem value={itemValue} key={indexU}>
              <Checkbox
                checked={this.state.selectedOption.some(
                  (val) => val[el] === itemValue[el]
                )}
              />
              <ListItemText key={indexU} primary={unique} />
            </MenuItem>
          );
        });
      });
      return itemList;
    };

    //viewpart
    let { filterOption, filteredData } = this.state;
    return (
      <>
        <div className="search__wrapper">
          <div className="tool-container">
            <section className="tool_area">
              <p className="tool_area_heading">
                <h1>Influencer List</h1>
                <small>Use Filters</small>
              </p>

              {/* filters through select */}
              <div className="tool-input-areas">
                <div className="tool-input">
                  <span id="basic-addon1">Filter By:-</span>
                  <Select
                    placeholder="Username"
                    aria-label="Username"
                    // aria-describedby="basic-addon1"
                    defaultValue=""
                    multiple
                    value={this.state.selectedOption}
                    renderValue={(selected) => this.getdisplayvalue(selected)}
                    onChange={(e) => this.handleSelectedValue(e.target.value)}
                  >
                    <MenuItem id="selectItems" value="">
                      <em>None</em>
                    </MenuItem>
                    {makeItems()}
                  </Select>
                </div>

                {/* search here */}
                <div className="search-irm">
                  <div className="input-icons">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Search Name"
                      onChange={(e) => this.filterList(e)}
                    />
                    <i className="fa fa-search icon"></i>
                  </div>
                </div>

                {/* download button */}
                <div className="download-input">
                  <Button
                    onClick={this.downloadExcel}
                    variant="contained"
                    size="large"
                  >
                    Download
                  </Button>
                </div>
              </div>
            </section>
            {/* <div className="custom-shape-divider-bottom-1631877305">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div> */}
          </div>

          {/* table shown */}

          <div className=" main-table-area row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="table-container">
                <Paper className="paperroot">
                  <TableContainer className="papercontainer">
                    <Table
                      title="Influencer Table1"
                      stickyHeader
                      aria-label="sticky table"
                    >
                      <TableHead>
                        <TableRow title="Heading Row">
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.filteredData
                          .slice(
                            this.state.page * this.state.rowsPerPage,
                            this.state.page * this.state.rowsPerPage +
                              this.state.rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.Name}
                                title="Body Row"
                              >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={this.state.data.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={(e, n) => this.handleChangePage(e, n)}
                    onRowsPerPageChange={(e) => this.handleChangeRowsPerPage(e)}
                  />
                </Paper>
                {filteredData.length === 0 ? <p>no result found</p> : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

{
  /* 
import React, { Component } from 'react';
import { CSVLink } from "react-csv";
 
const headers = [
  { label: "Name", key: "name" },
  { label: "Username", key: "username" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Website", key: "website" }
];
 
className AsyncCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.csvLinkEl = React.createRef();
  }
 
  getUserList = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json());
  }
 
  downloadReport = async () => {
    const data = await this.getUserList();
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  }
 
  render() {
    const { data } = this.state;
 
    return (
      <div>
        <input type="button" value="Export to CSV (Async)"  onClick={this.downloadReport} />
        <CSVLink
          headers={headers}
          filename="Clue_Mediator_Report_Async.csv"
          data={data}
          ref={this.csvLinkEl}
        />
      </div>
    );
  }
}
 
export default AsyncCSV;
 */
}
