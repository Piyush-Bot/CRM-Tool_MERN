import React, { useState } from "react";
import "./report.css";

import { IoMdChatboxes, IoIosHeart } from "react-icons/io";
import { BsPersonFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
// import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import ReactApexChart from "react-apexcharts";
import { Card, Grid, TextField, Button, Paper } from "@material-ui/core";

const Report = () => {
  //////// --Tranding Info--/////////
  const INITIAL_TRANDING = {
    posts: 0,
    users: 0,
    engagements: 0,
    reach: 0,
    impressions: 0,
  };
  const [tranding, setTranding] = useState(INITIAL_TRANDING);

  //-----***-----//

  //////// --Pie Chart Sentiment
  const INITIAL_SENTIMENT = {
    positive: 0,
    neutral: 0,
  };
  const [sentiment, setSentiment] = useState(INITIAL_SENTIMENT);
  const [series, setSeries] = useState([10, 10]);
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["positive", "nuteral"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  //-----***-----//

  //////// --Pie Chart Social Media Post Type
  const INITIAL_SOCIAL = {
    retweet: 0,
    reply: 0,
    original: 0,
  };
  const [social, setSocial] = useState(INITIAL_SOCIAL);
  const [series2, setSeries2] = useState([10, 10, 10]);
  const options2 = {
    chart: {
      type: "donut",
    },
    labels: ["Retweet", "Reply", "Orginal"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  //-----***-----//

  //////// ------function-----
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setTranding((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSentiment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSocial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitTranding = (e) => {
    e.preventDefault();
    const { posts, users, engagements, reach, impressions } = tranding;
    // setUser([+posts, +users, +engagements, +reach, +impressions]);
  };
  const handleSubmitSentiment = (e) => {
    e.preventDefault();
    const { positive, neutral } = sentiment;
    setSeries([+positive, +neutral]);
  };
  const handleSubmitSocial = (e) => {
    e.preventDefault();
    const { retweet, reply, original } = social;
    setSeries2([+retweet, +reply, +original]);
  };
  //-----***-----//

  return (
    <div className="report_wrapper">
      {/* ------Display------ */}

      <div className="report_title">Twitter Trend Report</div>
      <div className="display_wrapper">
        <Grid className="tranding_info_wrapper">
          <div className="reportItem ">
            <div className="reportMoneyContainer">
              <span className="reportMoney">
                <IoMdChatboxes className="reportIcon " />
                {tranding.posts}
              </span>
            </div>
            <span className="reportTitle">Posts</span>
          </div>
          <div className="reportItem ">
            <div className="reportMoneyContainer">
              <BsPersonFill className="reportIcon " />
              <span className="reportMoney">{tranding.users}</span>
            </div>
            <span className="reportTitle">Users</span>
          </div>

          <div className="reportItem">
            <div className="reportMoneyContainer">
              <span className="reportMoney">
                <IoIosHeart className="reportIcon" />
                {tranding.engagements}
              </span>
            </div>
            <span className="reportTitle">Engagements</span>
          </div>

          <div className="reportItem">
            <div className="reportMoneyContainer">
              <span className="reportMoney">
                <HiSpeakerphone className="reportIcon" />
                {tranding.reach}
              </span>
            </div>
            <span className="reportTitle">Reach</span>
          </div>

          <div className="reportItem">
            <div className="reportMoneyContainer">
              <span className="reportMoney">
                <FaMicrophone className="reportIcon" />
                {tranding.impressions}
              </span>
            </div>
            <span className="reportTitle">Impressions</span>
          </div>
        </Grid>

        <Grid container className="pie_info_wrapper">
          <Grid item xs={6} md={6} className="pie_chart">
            <div className="pie_title">Sentiment Score</div>
            <Card component={Paper} elevation={4}>
              <ReactApexChart
                options={options}
                series={series}
                type="donut"
                height={300}
              />
            </Card>
          </Grid>

          <Grid item xs={6} md={6} className="pie_chart">
            <div className="pie_title">Social Media Post</div>
            <Card component={Paper} elevation={4}>
              <ReactApexChart
                options={options2}
                series={series2}
                type="donut"
                height={300}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
      {/* ------***------ */}

      {/* ------input------ */}
      <Grid container className="input_wrapper">
        <Grid item xs={6}>
          <Card className="tranding_card">
            <div className="form_title">Summary Report</div>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    type="number"
                    label="Posts"
                    name="posts"
                    fullWidth
                    value={tranding.posts}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    type="number"
                    label="Users"
                    name="users"
                    fullWidth
                    value={tranding.users}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    type="number"
                    label="Engagements"
                    name="engagements"
                    fullWidth
                    value={tranding.engagements}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    type="number"
                    label="Reach"
                    name="reach"
                    fullWidth
                    value={tranding.reach}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    type="number"
                    label="Impressions"
                    name="impressions"
                    fullWidth
                    value={tranding.impressions}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmitTranding}
                  >
                    Update →
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card
            style={{ maxWidth: 300, margin: "0 10px", padding: "20px 10px" }}
          >
            <div className="form_title">Sentiment Score</div>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    type="number"
                    label="Positive"
                    name="positive"
                    fullWidth
                    value={sentiment.positive}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    required
                    type="number"
                    label="Neutral"
                    name="neutral"
                    fullWidth
                    value={sentiment.neutral}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmitSentiment}
                  >
                    Update →
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card
            style={{ maxWidth: 300, margin: "0  10px", padding: "20px 10px" }}
          >
            <div className="form_title">Social Media</div>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={4} item>
                  <TextField
                    required
                    type="number"
                    label="Retweet"
                    name="retweet"
                    fullWidth
                    value={social.retweet}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    required
                    type="number"
                    label="Reply"
                    name="reply"
                    fullWidth
                    value={social.reply}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    required
                    type="number"
                    label="Original"
                    name="original"
                    fullWidth
                    value={social.original}
                    onChange={(event) => handleChangeInput(event)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmitSocial}
                  >
                    Update →
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Report;
