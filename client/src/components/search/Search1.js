import React, { useState } from "react";
import Select from "react-select";
import data from "./data.json";

const Search1 = () => {
  // function Search1() {
  const [category, setCategory] = useState(null);
  const [genre, setGenre] = useState(null);
  const [gender, setGender] = useState(null);
  const [location, setLocation] = useState(null);
  const [filteredData, setLink] = useState([]);

  const initialCategoryValue = renderFilterOptions("Categories");
  const initialGenreValue = renderFilterOptions("Genre");
  const initialGenderValue = renderFilterOptions("Gender");
  const initialLocationValue = renderFilterOptions("City");

  function renderFilterOptions(filterOption) {
    let options = Array.from(
      new Set(data.map((element) => element[filterOption]))
    );
    return options;
  }
  /* 
function optionSelected(e) {
    this.setState({
      filterOption: e.target.value,
    });
  } */

  // handle change event of the country dropdown
  const handleCategoryChange = (val) => {
    setCategory(val);
    filterOptionSelected(val, "Categories");
  };
  const handleGenreChange = (val) => {
    setGenre(val);
    filterOptionSelected(val, "Genre");
  };
  const handleGenderChange = (val) => {
    setGender(val);
    filterOptionSelected(val, "Gender");
  };
  const handleLocationChange = (val) => {
    setLocation(val);
    filterOptionSelected(val, "City");
  };

  function renderTableData(data) {
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

  function filterOptionSelected(e, val) {
    console.log("e", e, "val", val);
    let filteredData = data.filter((element) => element[val] == e);
    setLink(filteredData);
  }
  return (
    <>
      <div className="row"></div>
      <br />
      <br />
      <div className="row">
        <div className="col-md-2">
          {/*  <div className="Search">
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
          </div> */}
        </div>
        <div className="col-md-2">
          <b>Category</b>
          <Select
            placeholder="Select Category"
            value={category}
            options={initialCategoryValue}
            onChange={handleCategoryChange}
            getOptionLabel={(x) => x}
            getOptionValue={(x) => x}
          />
        </div>
        <div className="col-md-2">
          <b>Genre</b>
          <Select
            placeholder="Select Genre"
            value={genre}
            options={initialGenreValue}
            onChange={handleGenreChange}
            getOptionLabel={(x) => x}
            getOptionValue={(x) => x}
          />
        </div>
        <div className="col-md-2">
          <b>Gender</b>
          <Select
            placeholder="Select Gender"
            value={gender}
            options={initialGenderValue}
            onChange={handleGenderChange}
            getOptionLabel={(x) => x}
            getOptionValue={(x) => x}
          />
        </div>
        <div className="col-md-2">
          <b>Location</b>
          <Select
            placeholder="Select Location"
            value={location}
            options={initialLocationValue}
            onChange={handleLocationChange}
            getOptionLabel={(x) => x}
            getOptionValue={(x) => x}
          />
        </div>
      </div>
      <hr />
      <br />
      <br />
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="container">
            <table className="table table-hover table-striped">
              <thead>
                <th> Categories </th>
                <th> Genre </th>
                <th> Name </th>
                <th> Age </th>
                <th> City </th>
                <th> Gender </th>
              </thead>
              <tbody>
                {filteredData.length
                  ? renderTableData(filteredData)
                  : renderTableData(data)}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </>
  );
};

export default Search1;
