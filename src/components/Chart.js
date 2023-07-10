import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";

const Chart = () => {
  const [days, setDays] = useState(7);
  const [crypto, setCrypto] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");
  const [chartType, setChartType] = useState("line");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setData(response.data.prices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [days, crypto, currency]);

  const options = {
    chart: {
      type: chartType,
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
        },
      },
    },
    series: [
      {
        name: "Price",
        data: data.map((price) => [price[0], parseFloat(price[1].toFixed(1))]),
      },
    ],
    xaxis: {
      type: "datetime",
    },
  };

  return (
    <div>
      <div className="row" style={{ display: "flex" }}>
        <br />
        <div
          className="col-3"
          style={{ color: "#F00000   ", paddingTop: "5px" }}
        >
          <label htmlFor="currency">Currency:&nbsp;</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            <option value="inr">INR</option>
            <option value="rub">RUB</option>
            <option value="jpy">JPY</option>
          </select>
        </div>
        <br />
        <div
          className="col-3"
          style={{ color: "#F00000  ", paddingTop: "5px" }}
        >
          <label htmlFor="days">Days:&nbsp;</label>
          <select
            id="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          >
            <option value={1}>1 Days</option>
            <option value={7}>7 Days</option>
            <option value={14}>14 Days</option>
            <option value={30}>30 Days</option>
            <option value={90}>90 Days</option>
            <option value={180}>180 Days</option>
            <option value={365}>365 Days</option>
          </select>
        </div>
        <br />
        <div
          className="col-3"
          style={{ color: "#F00000  ", paddingTop: "5px" }}
        >
          <label htmlFor="crypto">Crypto:&nbsp;
          
          
          
          
          
          
          
          
          
          
          </label>
          <select
            id="crypto"
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="litecoin">Litecoin</option>
            <option value="ripple">Ripple</option>
            <option value="sweth">Sweth</option>
            <option value="tether">Tether</option>
            <option value="solana">Solana</option>
            <option value="dogecoin">Dogecoin</option>
          </select>
        </div>
        <br />
        <div
          className="col-3"
          style={{ color: "#F00000  ", paddingTop: "5px" }}
        >
          <label htmlFor="chartType">Chart Type:&nbsp;</label>
          <select
            id="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="bar">Bar</option>
          </select>
        </div>
      </div>
      <hr />

      {data.length > 0 ? (
        <ApexCharts
          options={options}
          series={options.series}
          type={chartType}
          height={300}
        />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>
  );
};

export default Chart;
