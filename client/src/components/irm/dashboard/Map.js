import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";
import LinearGradient from "./LinerGradient";
import axios from "axios";

const INDIA_TOPO_JSON = require("./india.topo.json");
const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937], // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  "#3f51b5 ",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
];
const DEFAULT_COLOR = "#2076D2 ";
const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};
const geographyStyle = {
  default: {
    outline: "#2a2a2a",
  },
  hover: {
    fill: "#d5dcf9",
    transition: "all 250ms",
    outline: "#2a2a2a",
  },
  pressed: {
    outline: "#2a2a2a",
  },
};

// will generate random heatmap data on every call
// const getHeatMapData = () => {
//   return [
//     { id: "AP", state: "Andhra Pradesh", value: getRandomInt() },
//     { id: "AR", state: "Arunachal Pradesh", value: getRandomInt() },
//     { id: "AS", state: "Assam", value: getRandomInt() },
//     { id: "BR", state: "Bihar", value: getRandomInt() },
//     { id: "CT", state: "Chhattisgarh", value: getRandomInt() },
//     { id: "GA", state: "Goa", value: 21 },
//     { id: "GJ", state: "Gujarat", value: 22 },
//     { id: "HR", state: "Haryana", value: getRandomInt() },
//     { id: "HP", state: "Himachal Pradesh", value: 24 },
//     { id: "JH", state: "Jharkhand", value: 26 },
//     { id: "KA", state: "Karnataka", value: 27 },
//     { id: "KL", state: "Kerala", value: getRandomInt() },
//     { id: "MP", state: "Madhya Pradesh", value: getRandomInt() },
//     { id: "MH", state: "Maharashtra", value: getRandomInt() },
//     { id: "MN", state: "Manipur", value: getRandomInt() },
//     { id: "ML", state: "Meghalaya", value: 59 },
//     { id: "MZ", state: "Mizoram", value: getRandomInt() },
//     { id: "NL", state: "Nagaland", value: 59 },
//     { id: "OR", state: "Odisha", value: 59 },
//     { id: "PB", state: "Punjab", value: getRandomInt() },
//     { id: "RJ", state: "Rajasthan", value: getRandomInt() },
//     { id: "SK", state: "Sikkim", value: getRandomInt() },
//     { id: "TN", state: "Tamil Nadu", value: getRandomInt() },
//     { id: "TG", state: "Telangana", value: getRandomInt() },
//     { id: "TR", state: "Tripura", value: 14 },
//     { id: "UT", state: "Uttarakhand", value: getRandomInt() },
//     { id: "UP", state: "Uttar Pradesh", value: 15 },
//     { id: "WB", state: "West Bengal", value: 17 },
//     { id: "WB", state: "West Bengal", value: 17 },
//     { id: "AN", state: "Andaman and Nicobar Islands", value: getRandomInt() },
//     { id: "CH", state: "Chandigarh", value: getRandomInt() },
//     { id: "DN", state: "Dadra and Nagar Haveli", value: 19 },
//     { id: "DD", state: "Daman and Diu", value: 20 },
//     { id: "DL", state: "Delhi", value: 59 },
//     { id: "JK", state: "Jammu and Kashmir", value: 25 },
//     { id: "LA", state: "Ladakh", value: getRandomInt() },
//     { id: "LD", state: "Lakshadweep", value: getRandomInt() },
//     { id: "PY", state: "Puducherry", value: getRandomInt() },
//   ];
// };

const stateCount = [
  { id: "AP", state: "Andhra Pradesh", value: 0 },
  { id: "AR", state: "Arunachal Pradesh", value: 0 },
  { id: "AS", state: "Assam", value: 0 },
  { id: "BR", state: "Bihar", value: 0 },
  { id: "CT", state: "Chhattisgarh", value: 0 },
  { id: "GA", state: "Goa", value: 0 },
  { id: "GJ", state: "Gujarat", value: 0 },
  { id: "HR", state: "Haryana", value: 0 },
  { id: "HP", state: "Himachal Pradesh", value: 0 },
  { id: "JH", state: "Jharkhand", value: 0 },
  { id: "KA", state: "Karnataka", value: 0 },
  { id: "KL", state: "Kerala", value: 0 },
  { id: "MP", state: "Madhya Pradesh", value: 0 },
  { id: "MH", state: "Maharashtra", value: 0 },
  { id: "MN", state: "Manipur", value: 0 },
  { id: "ML", state: "Meghalaya", value: 0 },
  { id: "MZ", state: "Mizoram", value: 0 },
  { id: "NL", state: "Nagaland", value: 0 },
  { id: "OR", state: "Odisha", value: 0 },
  { id: "PB", state: "Punjab", value: 0 },
  { id: "RJ", state: "Rajasthan", value: 0 },
  { id: "SK", state: "Sikkim", value: 0 },
  { id: "TN", state: "Tamil Nadu", value: 0 },
  { id: "TG", state: "Telangana", value: 0 },
  { id: "TR", state: "Tripura", value: 0 },
  { id: "UT", state: "Uttarakhand", value: 0 },
  { id: "UP", state: "Uttar Pradesh", value: 0 },
  { id: "WB", state: "West Bengal", value: 0 },
  { id: "AN", state: "Andaman and Nicobar Islands", value: 0 },
  { id: "CH", state: "Chandigarh", value: 0 },
  { id: "DN", state: "Dadra and Nagar Haveli", value: 0 },
  { id: "DD", state: "Daman and Diu", value: 0 },
  { id: "DL", state: "Delhi", value: 0 },
  { id: "JK", state: "Jammu and Kashmir", value: 0 },
  { id: "LA", state: "Ladakh", value: 0 },
  { id: "LD", state: "Lakshadweep", value: 0 },
  { id: "PY", state: "Puducherry", value: 0 },
];

const Map = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [data, setData] = useState(stateCount);

  const influencerState = () => {
    axios
      .get("/getInfluencerlist")
      .then((response) => {
        response.data.data.forEach((elm, indexx) => {
          const index = stateCount.findIndex((el) =>
            elm.state
              ? el.state
                  .toLowerCase()
                  .trim()
                  .includes(elm.state.toLowerCase().trim())
              : false
          );
          if (index > -1) {
            stateCount[index].value = stateCount[index].value + 1;
          }
        });
        setData(stateCount);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    influencerState();
  }, []);

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0),
  };

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 0 }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  const onChangeButtonClick = () => {
    setData(stateCount);
  };

  return (
    //  <VectorMap
    //   map={"in_mill"}
    //   backgroundColor="transparent"
    //   focusOn={{
    //     x: 0.5,
    //     y: 0.5,
    //     scale: 0,
    //     animate: false
    //   }}
    //   zoomOnScroll={true}
    //   containerStyle={{
    //   width: "100%",
    //   height: "500px"
    //   }}
    //   onRegionClick={console.log(countryCode)
    //>

    <div className="full-width-height container">
      {/* <h1 className="no-margin center">States</h1> */}
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <div className="map-size">
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={250}
          height={200}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const current = data.find((s) => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <LinearGradient data={gradientData} />
      </div>
    </div>
  );
};

export default Map;
