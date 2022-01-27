import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Card, Grid, Box, Paper, CardContent } from "@material-ui/core";

const columns = [
  {
    field: "id",
    headerName: "S.No.",
    width: 70,
    headerClassName: "holidayHeader",
  },
  {
    field: "date",
    headerName: "Date",
    width: 130,
    headerClassName: "holidayHeader",
  },
  {
    field: "day",
    headerName: "Day",
    width: 130,
    headerClassName: "holidayHeader",
  },
  {
    field: "holidayName",
    headerName: "Holiday Name",
    width: 150,
    headerClassName: "holidayHeader",
  },
];

const rows = [
  { id: 1, date: "01-01-2022", day: "Saturday", holidayName: "New Year's Day" },
  {
    id: 2,
    date: "14-01-2022",
    day: "Friday",
    holidayName: "Makara Sankranthi",
  },
  { id: 3, date: "26-01-2022", day: "Wednesday", holidayName: "Republic Day" },
  { id: 4, date: "13-04-2022", day: "Wednesday", holidayName: "Udagi" },
  { id: 5, date: "15-04-2022", day: "Friday", holidayName: "Good Friday" },
  { id: 6, date: "01-05-2022", day: "Sunday", holidayName: "May Day" },
  { id: 7, date: "03-05-2022", day: "Tuesday", holidayName: "Eid" },
  { id: 8, date: "09-08-2022", day: "Tuesday", holidayName: "Muharram" },
  { id: 9, date: "15-08-2022", day: "Monday", holidayName: "Independence Day" },
  { id: 10, date: "19-08-2022", day: "Friday", holidayName: "janamashtami" },
  {
    id: 11,
    date: "31-08-2022",
    day: "Wednesday",
    holidayName: "Ganesh Chaturti",
  },
  { id: 12, date: "05-10-2022", day: "Wednesday", holidayName: "Dusshera" },
  { id: 13, date: "24-10-2022", day: "Monday", holidayName: "Diwali" },
  { id: 14, date: "25-10-2022", day: "Tuesday", holidayName: "Diwali" },
  {
    id: 15,
    date: "01-11-2022",
    day: "Tuesday",
    holidayName: "Kannada Rajyothsava",
  },
  {
    id: 16,
    date: "08-11-2022",
    day: "Tuesday",
    holidayName: "Guru Nanak Jayanti",
  },
];

const HolidayList = () => {
  return (
    <>
      <Grid container className="holiday_section1">
        <div className="holiday_titleBox ">
          <div className="holiday_title">Holiday List</div>
        </div>
        <div className="custom-shape-divider-bottom-1641900198">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </Grid>
      <Grid className="holiday_section2">
        <Grid items xs={4} className="holiday_headingBox">
          <div className="holiday_section2_title1">Happy holidays! ...</div>
          <div className="holiday_section2_title2">
            "16 total no. of holidays over year."
          </div>
          <hr className="divLine" />
        </Grid>
        <Grid items xs={8}>
          <Card className="holiday_card" component={Paper} elevation={6}>
            <CardContent>
              <Box
                sx={{
                  height: "67vh",
                  width: "34vw",
                  margin: "0px auto",
                  "& .holidayHeader": {
                    color: "text.primary",
                    fontSize: 18,
                    fontWeight: "medium ",
                    backgroundColor: "#62d3e5",
                  },
                }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={8}
                  rowsPerPageOptions={[5]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default HolidayList;
