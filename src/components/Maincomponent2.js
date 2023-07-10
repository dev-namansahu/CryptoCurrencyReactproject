import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import back from "./image/bACK.jpg";

export default function Maincomponent2({ searchTerm, onBackClick }) {
  const [cryptoData, setCryptoData] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.coingecko.com/api/v3/coins/${searchTerm.toLowerCase()}`
  //       );
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [searchTerm]);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  // const { image } = data;

  useEffect(() => {
    // Function to fetch cryptocurrency data from the CoinGecko API
    const fetchCryptoData = async () => {
      try {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `https://api.coingecko.com/api/v3/coins/${searchTerm.toLowerCase()}`
            );
            setData(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchData();
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${searchTerm.toLowerCase()}`
        );
        if (!response.ok) {
          throw new Error("Cryptocurrency not found.");
        }
        const data = await response.json();
        setCryptoData(data);
        setError("");
      } catch (error) {
        setCryptoData(null);
        setError("Invalid cryptocurrency name.");
      }
    };

    if (searchTerm) {
      fetchCryptoData();
    }
  }, [searchTerm]);

  if (error) {
    return (
      <div>
        <button onClick={onBackClick}>Back</button> <br />
        {error}
      </div>
    );
  }

  if (!cryptoData) {
    return null; // You can also return a loading spinner or a message while data is fetched.
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  const { image } = data;

  const { name: cryptoName, market_data } = cryptoData;
  const { current_price, price_change_percentage_24h } = market_data;

  return (
    <>
      <div
        
        style={{
          backgroundImage: `url(${back})`,
          backgroundRepeat: "no-repeat",
          width: "1290px",
        }}
      >
        {" "}
        <button onClick={onBackClick}>Back</button>
        <div className="container" style={{ paddingLeft: "420px" }}>
         
          <div className="row">
            <div className="row">
              <div>
                <h1 style={{ color: "gold", fontFamily: "Dancing Script" , fontSize:"45px"}}>
                  {cryptoName.toUpperCase()}
                </h1>
                <br />
                <div>
                  <img src={image.large} style={{}} alt={cryptoName} />
                </div>
                <br />

                <p style={{ color: "white" , fontSize:"25px"}}>
                  Market Value: ${current_price.usd}
                </p>
                <br />
                <p style={{ color: "white" , fontSize:"25px" }}>
                  Symbol: {cryptoData.symbol.toUpperCase()}
                </p>
                <br />
                <p style={{ color: "white" , fontSize:"25px"}}>
                  Percentage Market Change in 24 hours:{" "}
                  {price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
