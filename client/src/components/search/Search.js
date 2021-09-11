import React, { Component } from "react";
import "./search.css";
import data from "./data.json";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";

import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

const headers = ["Categories", "Genre", "City", "Gender"];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default class Search extends Component {
  //const [searchTerm, setSearchTerm] = useState({});
  constructor() {
    super();
    this.state = {
      selectedOption: [],
      filterOption: [],
      filteredData: data,
    };
  }

  optionSelected(e) {
    this.setState({
      filterOption: e.target.value,
    });
  }

  // classes = useStyles();
  abc(e) {
    this.setState({
      selectedOption: [...this.state.selectedOption, ...e.target.value],
    });
    console.log(e.target.value);
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

  getdisplayvalue(data) {
    const modifiyedVal = data.map((el) => Object.entries(el)[0][1]);
    return modifiyedVal.join(" , ");
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
    console.log("val", val);

    const obj = {};
    val.forEach((el) => {
      Object.assign(obj, el);
    });
    // return obj;
    const temp = data.filter(
      (ele) => Object.keys(obj).every((objEl) => ele[objEl] === obj[objEl])
      // ele.Categories === obj.Categories &&
      // ele.Genre === obj.Genre &&
      // ele.Gender === obj.Gender
      // // ele.City === obj.City
    );
    console.log("data---------", data);
    console.log("1111", temp, obj);
    this.setState((prev) => {
      return {
        ...prev,
        filteredData: temp,
      };
    });
  }

  handleSelectedValue = (value) => {
    // const prev = [...value];
    console.log("valeeeeeeee", value);
    this.setState((prev) => {
      return {
        ...prev,
        selectedOption: [...value],
      };
    });

    this.filterOptionSelected(value);
  };

  render() {
    const makeItems = () => {
      let itemList = [];
      //[[],[],[],[]]
      headers.forEach((el, i) => {
        let checkUnique = [];
        itemList.push(<ListItemText primary={el} />);
        data.forEach((elm, index) => {
          checkUnique.push(elm[el]);
        });

        const newArr = [...new Set(checkUnique)];
        // console.log('newArr', newArr);
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
              <ListItemText primary={unique} />
            </MenuItem>
          );
        });
      });

      return itemList;
    };

    let { filterOption, filteredData } = this.state;
    return (
      <div>
        <div>
          <FormControl>
            <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
            <Select
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

        <br />
        <table>
          <thead>
            <th> Categories </th>
            <th> Genre </th>
            <th> Name </th>
            <th> Age </th>
            <th> City </th>
            <th> Gender </th>
          </thead>
          <tbody>
            {filteredData.length ? this.renderTableData(filteredData) : null}
          </tbody>
        </table>
        {filteredData.length == 0 ? <p>no result found</p> : null}
      </div>
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
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function GroupedSelect() {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
        <Select native defaultValue="" id="grouped-native-select">
          <option aria-label="None" value="" />
          <optgroup label="Category 1">
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
          </optgroup>
          <optgroup label="Category 2">
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
          </optgroup>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Category 1</ListSubheader>
          <MenuItem value={1}>Option 1</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <ListSubheader>Category 2</ListSubheader>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
*/
