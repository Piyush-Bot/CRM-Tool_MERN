import React, { Component } from "react";
import "../bd/dashboard_bd.css";
import XLSX from "xlsx";
import axios from "axios";
import Info from "../bd/Info";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Card,
  CardContent,
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { ListItemText, Checkbox, Paper, Button } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InfluencerForm from "./InfluencerForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const Search1 = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "lightblue",
  },
  width: "50%",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "blue",
  padding: "0 1vw",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000",
  padding: "1vh",
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1vw + 2vw)`,
  width: "100%",
}));
const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  bottom: 14,
  right: 30,
});

const headers = ["platform", "category", "gender", "state", "genre"];
const influencer = {
  s_no: "",
  name: "",
  platform: "",
  gender: "",
  handle: "",
  genre: "",
  category: "",
  location: "",
  state: "",
  followers: "",
  email: "",
  contact_no: "",
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
];

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: [],
      filterOption: [],
      filteredData: [],
      data: [],
      columns: this.columns,
      openEdit: [],
      openAdd: false,
    };
  }

  columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "platform", headerName: "Platform", width: 90 },
    { field: "category", headerName: "Category", width: 80 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "gender", headerName: "Gender", width: 90 },
    { field: "followers", headerName: "Followers", width: 90 },
    { field: "location", headerName: "Location", width: 90 },
    { field: "state", headerName: "State", width: 100 },
    { field: "handle", headerName: "Handle", width: 120 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const onEdit = (e) => {
          const cloneOpenEdit = [...this.state.openEdit];
          cloneOpenEdit[e.id - 1] = true;
          this.setState((prevState) => ({
            openEdit: cloneOpenEdit,
          }));
        };

        const onDelete = (e) => {
          const InfluencerId = e._id;
          axios
            .delete(`/deleteInfluencer/${InfluencerId}`)
            .then((response) => {
              this.influencerUpadte();
            })
            .catch(function (error) {
              console.log(error);
            });
        };

        const influencerFormClose = (id) => {
          this.influencerUpadte();
          const cloneOpenEdit = [...this.state.openEdit];
          cloneOpenEdit[id - 1] = false;
          this.setState((prevState) => ({
            openEdit: cloneOpenEdit,
          }));
        };

        return (
          <>
            <EditIcon onClick={() => onEdit(params.row)} />
            <DeleteIcon onClick={() => onDelete(params.row)} />
            <Dialog
              open={this.state.openEdit[params.row.id - 1]}
              onClose={!this.state.openEdit[params.row.id - 1]}
            >
              <InfluencerForm
                onClick={() => influencerFormClose(params.row.id)}
                isEdit={true}
                influencerDetails={params.row}
              />
            </Dialog>
          </>
        );
      },
    },
    {
      field: "contact_no",
      headerName: "Phone No.",
      type: "number",
      width: 120,
    },
    { field: "email", headerName: "Email", width: 240 },
  ];

  influencerUpadte = () => {
    axios.get("/getInfluencerlist").then((response) => {
      const modifiedData = response.data.data.map((elm, index) => {
        return {
          id: index + 1,
          state: elm["state "],
          ...elm,
        };
      });

      this.setState({
        data: modifiedData,
        filteredData: modifiedData,
      });
    });
  };

  influencerAddFromClose = () => {
    this.influencerUpadte();
    this.setState((prevState) => ({
      openAdd: false,
    }));
  };

  componentDidMount() {
    axios.get("/getInfluencerlist").then((response) => {
      const modifiedData = response.data.data.map((elm, index) => {
        return {
          id: index + 1,
          state: elm["state "],
          ...elm,
        };
      });
      influencer.s_no = modifiedData.length + 1;
      this.setState({
        data: modifiedData,
        filteredData: modifiedData,
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
    //if its dosnt work uncomment below line
    // let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "InfluencerData.xlsx");
  };
  // To make clickable handle URL links
  handleClick = (params) => {
    if (params.field === "handle") {
      window.open(params.value, "_blank");
    }
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

    const clonedFilteredData = JSON.parse(JSON.stringify(updateList));
    const filteredList = clonedFilteredData.filter((item) => {
      return (
        item.name
          ?.toLowerCase()
          .includes(e.currentTarget.value?.toLowerCase()) ||
        item.location
          ?.toLowerCase()
          .includes(e.currentTarget.value?.toLowerCase()) ||
        item.genre
          ?.toLowerCase()
          .includes(e.currentTarget.value?.toLowerCase()) ||
        item.platform
          ?.toLowerCase()
          .includes(e.currentTarget.value?.toLowerCase()) ||
        item.followers
          ?.toLowerCase()
          .includes(e.currentTarget.value?.toLowerCase())
      );
    });
    this.setState((prev) => {
      return {
        ...prev,
        filteredData: filteredList,
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
      <div className="bd_wrapper">
        <Grid contanier className="bd_section1">
          <Grid item xs={7} className="bd_section1_textBox">
            <div className="bd_section1_subHeading">
              <hr className="divLine" />
              PEOPLE
            </div>
            <div className="bd_section1_heading">
              Looking for <span>Influencer...!</span>
            </div>
            <div className="bd_section1_para">
              The internet is becoming the town square for the global village of
              tomorrow.
            </div>
          </Grid>
          <Grid item xs={5} className="bd_section1_imageBox">
            <Grid item xs={3} className="bd_section1_imageCol1">
              <img
                alt="img"
                src="https://images.pexels.com/photos/10153211/pexels-photo-10153211.jpeg?cs=srgb&dl=pexels-caroline-veronez-10153211.jpg&fm=jpg"
              />
            </Grid>
            <Grid item xs={9} className="bd_section1_imageCol2">
              <h2> Some Famous People. </h2>
              <Box
                sx={{ height: 450, overflowY: "scroll", position: "relative" }}
              >
                <ImageList variant="masonry" cols={2} gap={12}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </Grid>
          </Grid>
          <div className="custom-shape-divider">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </Grid>
        <Grid contanier className="bd_section2">
          {/* <Grid item xs={3} className="bd_section2_info">
            <Info />
          </Grid> */}

          <Grid item xs={12} className="bd_section2_toolBox">
            <Grid className="bd_section2_tool">
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Filter By-
                </InputLabel>
                <Select
                  defaultValue=""
                  multiple
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
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
              <Search1>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  onChange={(e) => this.filterList(e)}
                />
              </Search1>
              <Button
                onClick={this.downloadExcel}
                variant="contained"
                size="large"
              >
                Download
              </Button>
            </Grid>

            <Grid component={Paper} elevation={6}>
              <Card component={Paper} elevation={6}>
                <CardContent>
                  <div style={{ height: 600, width: "100%" }}>
                    <DataGrid
                      rows={this.state.filteredData}
                      columns={this.state.columns}
                      rowsPerPageOptions={[10, 25, 50, 100]}
                      components={{
                        Toolbar: GridToolbar,
                      }}
                      onCellClick={(params) => this.handleClick(params)}
                      getCellClassName={(params: GridCellParams<number>) => {
                        if (params.field === "handle") {
                          return "handle";
                        }
                        return "";
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <StyledFab color="secondary" aria-label="add">
              <AddIcon onClick={() => this.setState({ openAdd: true })} />
            </StyledFab>
          </Grid>
        </Grid>
        <Dialog open={this.state.openAdd} onClose={!this.state.openAdd}>
          <InfluencerForm
            onClick={() => this.influencerAddFromClose()}
            isEdit={false}
            influencerDetails={influencer}
          />
        </Dialog>
      </div>
    );
  }
}
