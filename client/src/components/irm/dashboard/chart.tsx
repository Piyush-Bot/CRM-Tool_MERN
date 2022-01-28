import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "",
    Instagram: 0,
    Youtube: 0,
    amt: 0,
  },
  {
    name: "Jan",
    Instagram: 5,
    Youtube: 8,
    amt: 20,
  },
  {
    name: "Feb",
    Instagram: 6,
    Youtube: 9,
    amt: 20,
  },
  {
    name: "March",
    Instagram: 20,
    Youtube: 3,
    amt: 20,
  },
  {
    name: "April",
    Instagram: 10,
    Youtube: 6,
    amt: 20,
  },
  {
    name: "May",
    Instagram: 14,
    Youtube: 8,
    amt: 20,
  },
  {
    name: "June",
    Instagram: 3,
    Youtube: 4,
    amt: 20,
  },
  {
    name: "July",
    Instagram: 7,
    Youtube: 13,
    amt: 20,
  },
  {
    name: "Aug",
    Instagram: 3,
    Youtube: 4,
    amt: 20,
  },
  {
    name: "Sept",
    Instagram: 9,
    Youtube: 17,
    amt: 20,
  },
  {
    name: "Oct",
    Instagram: 10,
    Youtube: 12,
    amt: 20,
  },
  {
    name: "Nov",
    Instagram: 3,
    Youtube: 6,
    amt: 20,
  },
  {
    name: "Dec",
    Instagram: 10,
    Youtube: 16,
    amt: 20,
  },
];

export default function Chart() {
  return (
    <LineChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 10,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Instagram"
        stroke="#ed3e0c"
        strokeDasharray="5 5"
      />
      <Line
        type="monotone"
        dataKey="Youtube"
        stroke="#020024"
        strokeDasharray="3 4 5 2"
      />
    </LineChart>
  );
}
