import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";
import Gcc from "../../images/GCC1.png";
import Fsog from "../../images/fsog.png";
import Sm from "../../images/sm_logo.png";
import Lm from "../../images/logo.png";
import Lxw from "../../images/lxw_logo.png";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Gallery() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Example to setup your carousel in react
      </h1>
      <div className="gall">
        <Carousel breakPoints={breakPoints} autoPlaySpeed>
          <Item>
            <img alt="gcc" src={Gcc} />
          </Item>
          <Item>
            <img alt="fsog" src={Fsog} />
          </Item>
          <Item>
            <img alt="sm" src={Sm} />
          </Item>
          <Item>
            <img alt="lm" src={Lm} />
          </Item>
          <Item>
            <img alt="lxw" src={Lxw} />
          </Item>
        </Carousel>
      </div>
    </>
  );
}
export default Gallery;
