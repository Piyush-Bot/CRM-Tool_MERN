import React, { useState, Component } from "react";
import ReactApexChart from "react-apexcharts";

// const AA = () => {
//   const data = [121, 102, 80, 208, 30];
//   const [series, setSeries] = useState(data);
//   const options = {
//     plotOptions: {
//       bar: {
//         columnWidth: "45%",
//         distributed: true,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     legend: {
//       show: false,
//     },
//     xaxis: {
//       categories: [
//         ["John", "Doe"],
//         ["Joe", "Smith"],
//         ["Jake", "Williams"],
//         "Amber",
//         ["Peter", "Brown"],
//       ],
//       labels: {
//         style: {
//           colors: "2b2d3e",
//           fontSize: "12px",
//         },
//       },
//     },
//   };
//   return (
//     <div id="chart">
//       <ReactApexChart
//         options={options}
//         series={series}
//         type="bar"
//         height={350}
//       />
//     </div>
//   );
// };

// export default AA;

export default class aa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          data: [121, 102, 80, 208, 30],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },

        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ["John", "Doe"],
            ["Joe", "Smith"],
            ["Jake", "Williams"],
            "Amber",
            ["Peter", "Brown"],
          ],
          labels: {
            style: {
              colors: "2b2d3e",
              fontSize: "12px",
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}
