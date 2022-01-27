import "./featuredinfo.css";
import { useState, useEffect } from "react";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from "axios";

const FeaturedInfo = () => {
  const [influencer, setInfluencer] = useState({});

  const getInfluencerlist = () => {
    axios
      .get("/getInfluencerlist")
      .then((response) => {
        const obj = {};
        response.data.data.forEach(({ category }) => {
          if (obj.hasOwnProperty(category?.trim())) {
            obj[category] += 1;
          }
          if (!obj.hasOwnProperty(category?.trim())) {
            obj[category] = 0;
          }
        });
        delete obj[null];
        console.log("response1111", obj);
        setInfluencer(obj);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getInfluencerlist();
  }, []);

  return (
    <>
      <div className="featured">
        <div className="featuredItem ">
          <span className="featuredTitle">A</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{influencer.A}</span>
            <span className="featuredMoneyRate">
              -11.4 <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">B</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{influencer.B}</span>
            <span className="featuredMoneyRate">
              -1.4 <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>

        <div className="featuredItem">
          <span className="featuredTitle">C</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{influencer.C}</span>
            <span className="featuredMoneyRate">
              -1.4 <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>

        <div className="featuredItem">
          <span className="featuredTitle">Celebrity</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{influencer.Celeb || 0}</span>
            <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
      </div>
    </>
  );
};

export default FeaturedInfo;
