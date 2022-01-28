import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  Box,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from "@mui/material";

const InfluencerForm = (props) => {
  const [influencer, setInfluencer] = useState(props.influencerDetails);

  const addInfluencerData = (e) => {
    e.preventDefault();
    const isPhoneValid = phoneValidation();
    if (isPhoneValid) {
      axios
        .post("/addinfluencer", {
          ...influencer,
        })
        .then(function (response) {
          props.onClick();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInfluencer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setInfluencer({
      s_no: "",
      name: "",
      firstName: "",
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
    });
  };
  const phoneValidation = () => {
    const regex = /^[0-9]{10}$/i;
    return !(
      !influencer.contact_no || regex.test(influencer.contact_no) === false
    );
  };
  const editInfluencerData = (e) => {
    e.preventDefault();
    const payload = {
      ...influencer,
    };
    delete payload["_id"];
    axios
      .put(`/getInfluencerlist/${influencer._id}`, payload)
      .then(function (response) {
        props.onClick();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        mx: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <CloseIcon
        onClick={() => {
          props.onClick();
        }}
      />
      <Box sx={{ my: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              required
              fullWidth
              disabled
              type="number"
              name="s_no"
              label="S.No."
              value={influencer.s_no}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              required
              fullWidth
              name="name"
              label="Name"
              value={influencer.name}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                aria-label="type"
                name="gender"
                value={influencer.gender}
                onChange={handleInputs}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Others"
                  control={<Radio />}
                  label="Others"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="location"
              label="Location"
              value={influencer.location}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="state"
              label="State"
              value={influencer.state}
              onChange={handleInputs}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Platform</InputLabel>
              <Select
                label="platform"
                name="platform"
                value={influencer.platform}
                onChange={handleInputs}
              >
                <MenuItem value={"Instagram"}>Instagram</MenuItem>
                <MenuItem value={"YouTube"}>YouTube</MenuItem>
                <MenuItem value={"Twitter"}>Twitter</MenuItem>
                <MenuItem value={"LinkedIn"}>EmploLinkedInyee</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              autoFocus
              name="genre"
              label="Genre"
              value={influencer.genre}
              onChange={handleInputs}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="category"
                value={influencer.category}
                onChange={handleInputs}
              >
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="followers"
              label="Followers"
              value={influencer.followers}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="handle"
              label="Handle"
              value={influencer.handle}
              onChange={handleInputs}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="email"
              name="email"
              label="Email Address"
              value={influencer.email}
              onChange={handleInputs}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="ContactNo."
              name="contact_no"
              type="number"
              value={influencer.contact_no}
              onChange={handleInputs}
            />
          </Grid>

          <Grid item xs={12} className="actionButtons">
            {props.isEdit ? (
              <Button
                variant="contained"
                endIcon={<EditIcon />}
                onClick={editInfluencerData}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={addInfluencerData}
              >
                Send
              </Button>
            )}
            {props.isEdit ? (
              <Button
                onClick={props.onClick}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={clearForm}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Reset
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default InfluencerForm;
