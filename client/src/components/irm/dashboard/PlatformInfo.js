import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, Paper } from "@material-ui/core";

const PlatformInfo = () => {
  const number = [71, 63, 77];
  const [series, setSeries] = useState(number);
  let optionsCircle4 = {
    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: true,
        hollow: {
          margin: 5,
          size: "48%",
          background: "transparent",
        },
        track: {
          show: false,
        },
        startAngle: -180,
        endAngle: 180,
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["June", "May", "April"],
    legend: {
      show: true,
      floating: true,
      position: "right",
      offsetX: 70,
      offsetY: 240,
    },
  };

  return (
    <>
      <Card component={Paper}>
        <ReactApexChart
          options={optionsCircle4}
          series={series}
          type="radialBar"
          height={370}
          width={400}
        />
      </Card>
    </>
  );
};

export default PlatformInfo;
