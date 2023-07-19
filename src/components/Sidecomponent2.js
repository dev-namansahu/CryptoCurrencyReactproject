import React, { useEffect, useState } from "react";

const CoinGeckoAPI = () => {
  const [currency, setCurrency] = useState("usd");
  const [marketData, setMarketData] = useState([]);
  const [marketchange, setMarketchange] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,dogecoin,tether,litecoin,ripple,solana,sweth,ethereum&vs_currencies=${currency}&include_market_cap=true&include_24hr_change=true`
        );
        const data = await response.json();
        setMarketData(data);
      } catch (error) {
        console.error("Error fetching data from CoinGecko API:", error);
      }
    };

    fetchData();
  }, [currency]);

  useEffect(() => {
    const fetchchange = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,dogecoin,tether,litecoin,ripple,solana,sweth,ethereum&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await response.json();
        setMarketchange(data);
      } catch (error) {
        console.error("Error fetching data from CoinGecko API:", error);
      }
    };

    fetchchange();
  }, []);
  const formatMarketCap = (value) => {
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
    });

    return formatter.format(value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const formatMarketCapChange = (change) => {
    return change.toFixed(2);
  };
  const getColor = (number) => {
    if (number > 0) {
      return 'green';
    } else if (number < 0) {
      return 'orange';
    }
    
    return 'black';
  };
  const getarrow= (number) => {
    if (number > 0) {
      return "▲";
    } else if (number < 0)
     {
      return "▼";
    }return '';};

    
  return (
    <div>
      <table
        style={{
          border: "1px solid black",
          backgroundColor: "white",
          width:"100%",
          padding: "50px",
        }}
      >
        <thead>
          <br />
          <tr style={{ color: "#e60000" }}>
            <p style={{ marginLeft: "10px", fontWeight: "bolder" }}>
              <th>Cryptocurrency by</th>
            </p>
            <p style={{ marginLeft: "10px", fontWeight: "bolder" }}>
              {" "}
              <th>Market Cap ({currency.toUpperCase()})</th>
            </p>
            <td>
              <div>
                <label htmlFor="currency">Select Currency: </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={handleCurrencyChange}
                >
                  <option value="usd">USD</option>
                  <option value="inr">INR</option>
                  <option value="eur">EUR</option>

                  <option value="gbp">GBP</option>
                  <option value="rub">RUB</option>
                  <option value="jpy">JPY</option>
                </select>
              </div>
            </td>
          </tr>
        </thead>{" "}
        <br />
        <tbody style={{ width: "100px" }}>
          <tr>
            <td>
              {Object.entries(marketData).map(([id, coinData]) => (
                <tr key={id} className="tdheight">
                  <td style={{ alignContent: "center" }} className="tdheight">
                    <span className="tablehead" style={{ marginLeft: "10px" }}>
                      {id}
                    </span>{" "}
                    <br></br>
                    <span style={{ marginLeft: "10px", color: "grey" }}>
                      Mkt.Cap
                    </span>{" "}
                    <span style={{ color: "grey" }}>
                      {formatMarketCap(coinData[currency])}
                    </span>{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </td>
                </tr>
              ))}
            </td>
            <td>
              {Object.entries(marketchange).map(([id, coinData]) => (
                   
                <tr key={id} className="tdheight">
                  <td
                    style={{
                      alignContent: "center",
                      paddingTop: "10px",
                      marginTop: "8px",
                      color: getColor(coinData["usd_24h_change"]), fontWeight:"bold"
                    }}
                    className="tdheight"
                  >
                    <p>
                    {getarrow(coinData["usd_24h_change"])}
                        
                      {formatMarketCapChange(coinData["usd_24h_change"]) + "%"}
                    </p>
                    &nbsp;
                  </td>
                </tr>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinGeckoAPI;
