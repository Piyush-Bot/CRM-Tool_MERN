import React, { Component } from "react";
import "./dashboard_bd.css";
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
  { id: "platform", label: "Platform", minWidth: 100, align: "center" },
  { id: "category", label: "Category", minWidth: 100, align: "center" },
  { id: "genre", label: "Genre", minWidth: 200 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "followers", label: "Followers", minWidth: 50 },
  { id: "gender", label: "Gender", minWidth: 100 },
  { id: "handle", label: "Handle", minWidth: 50, mmaxWidth: 50 },
  { id: "location", label: "Location", minWidth: 100 },
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
        <div className="dashboardbd_wrapper">
          <div className="filter-container">
            <section className="filter-subscription">
              {/* filters through select */}
              <div className="filter-input-areas">
                <div className="filter-input">
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
                <div className="search-input">
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
                <div className="download">
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
          </div>

          {/* table shown */}

          <div className=" main-table-container ">
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
                                    {column.format && typeof value === "number"
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
      </>
    );
  }
}
