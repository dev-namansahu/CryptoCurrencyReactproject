import React from "react";
import Chart from "./Chart";


import Sidecomponent2 from "./Sidecomponent2";
import Piechart from "./Piechart";
import Exchange from "./Exchange";

export default function Maincomp() {
 
  return (
    <>
      <div className="container" id="content-container">
        <div className="row" style={{ display: "flex", margin: "15px" }}>
          <div className="col-8">
            <div className="row" style={{ backgroundColor: "white" }}>
              {/* chart part */}
              <Chart />
            </div>
            <br />
            <div className="row">
              <div className="col-6">
                {/* Portfolio part */}
                <Piechart />
              </div>
              <div className="col-6">
                {/* Echange Coins Part */}
                <Exchange />
              </div>
            </div>
           
          </div>
          <div className="col-4 " style={{ height: "100%" }}>
            {/* SideTable Part  */}
            <Sidecomponent2 />
          </div>
        </div>
      </div>
    </>
  );
}