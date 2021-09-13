import React, { Component } from "react";
import "./search.css";
import data from "./data.json";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const headers = ["Categories", "Genre", "City", "Gender"];

const columns = [
  { id: "Categories", label: "Categories", minWidth: 100 },
  { id: "Genre", label: "Genre", minWidth: 100 },

  {
    id: "Name",
    label: "Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "Gender",
    label: "Gender",
    minWidth: 100,
    align: "right",
  },
  {
    id: "Age",
    label: "Age",
    minWidth: 50,
    align: "right",
  },
  {
    id: "City",
    label: "City",
    minWidth: 100,
    align: "right",
  },
];
//const [searchTerm, setSearchTerm] = useState({});

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: [],
      filterOption: [],
      filteredData: data,
      page: 0,
      rowsPerPage: 10,
      // searchTerm: [],
    };
  }

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

  optionSelected(e) {
    this.setState({
      filterOption: e.target.value,
    });
  }

  renderTableData(data) {
    return data.map((element, i) => (
      <tr key={i}>
        <td>{element.Categories}</td>
        <td>{element.Genre}</td>
        <td>{element.Name}</td>
        <td>{element.Age}</td>
        <td>{element.City}</td>
        <td>{element.Gender}</td>
      </tr>
    ));
  }
  // display values in input when selected
  getdisplayvalue(data) {
    if (!data.includes('')) {
      const modifiyedVal = data.map((el) => Object.entries(el)[0][1]);
      return modifiyedVal.join(" , ");
    }
    if (data.includes('')) {
      return '';
    }
  }

  renderFilterOptions(filterOption) {
    if (filterOption) {
      let options = Array.from(
        new Set(data.map((element) => element[filterOption]))
      );
      return options.map((option, i) => (
        <option key={i} value={option}>
          {" "}
          {option}{" "}
        </option>
      ));
    }
    return [];
  }

  filterOptionSelected(val) {
    const obj = {};
    val.forEach((el) => {
      Object.assign(obj, el);
    });
    const temp = data.filter(
      (ele) => Object.keys(obj).every((objEl) => ele[objEl] === obj[objEl])
    );
    this.setState((prev) => {
      return {
        ...prev,
        filteredData: temp,
      };
    });
  }

  handleSelectedValue = (value) => {
    if (!value.includes('')) {
      const duplicates = value.map((el) => Object.values(el)[0]).reduce(function(acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
      }, []);
      value = value.filter((el) => !duplicates.includes(Object.values(el)[0]));
      this.setState((prev) => {
        return {
          ...prev,
          selectedOption: [...value],
        };
      });
      this.filterOptionSelected(value);
    }
    if (value.includes('')) {
      this.setState((prev) => {
        return {
          ...prev,
          filteredData: data,
          selectedOption: []
        };
      });
    }
  };
  filterList(e){
    let updateList = data;
    updateList = updateList.filter(item => {
      return item.Name.toLowerCase().search(
        e.target.value.toLowerCase()
        ) !== -1;
    });
    console.log('sdfsdfrf4343', updateList);
    this.setState((prev) => {
      return {
        ...prev,
        filteredData: updateList,
        selectedOption: []
      };
    });
  }
  render() {
    const makeItems = () => {
      let itemList = [];
      headers.forEach((el, i) => {
        let checkUnique = [];
        itemList.push(<ListItemText key={i} primary={el} />);
        data.forEach((elm, index) => {
          checkUnique.push(elm[el]);
        });

        const newArr = [...new Set(checkUnique)];
        newArr.forEach((unique, indexU) => {
          const itemValue = {
            [el]: unique,
          };
          itemList.push(
            <MenuItem value={itemValue} key={unique}>
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
    let { filterOption, filteredData } = this.state;
    return (
      <>
        <div className="row">
          <div className="row">
            <div className="col-md-2">
              <div className="Search">
                <input type="text" placeholder="enter search text" onChange={(e) => this.filterList(e)} />
              </div>
            </div>

            <div className="col-md-2">
              <FormControl>
                <InputLabel htmlFor="grouped-select">Filter By:-</InputLabel>
                <Select
                  className="select"
                  defaultValue=""
                  id="grouped-select"
                  multiple
                  value={this.state.selectedOption}
                  renderValue={(selected) => this.getdisplayvalue(selected)}
                  onChange={(e) => this.handleSelectedValue(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {makeItems()}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-8">hellllllooooooooo</div>
          </div>
          <hr />
          <hr />
          <br />
          <br />
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="container">
                <Paper className="paperroot">
                  <TableContainer className="papercontainer">
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
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
                    count={data.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={(e, n) => this.handleChangePage(e, n)}
                    onRowsPerPageChange={(e) => this.handleChangeRowsPerPage(e)}
                  />
                </Paper>
                {filteredData.length === 0 ? <p>no result found</p> : null}
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </>
    );
  }
}

// const columns = [
//   {
//     title: "Name",
//     field: "name",
//   },
//   { title: "Color", field: "color", filtering: false },
//   { title: "Quantity", field: "quantity", filtering: false },
//   { title: "ID", field: "id", filtering: false, hidden: true }
// ];

// export default function App() {
//   return (

//   );
// }

/*  <div className="Search">
          <input
            type="text"
            placeholder="Search...."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          {data
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.Name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val, key) => {
              return (
                <div className="user">
                  <p>{val.Name}</p>
                </div>
              );
            })}
        </div> */
/*  */

//render(<App />, document.getElementById("root"));

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
        <input type="button" value="Export to CSV (Async)" onClick={this.downloadReport} />
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
