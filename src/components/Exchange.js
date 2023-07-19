import React, { useState, useEffect } from "react";

const Exchange = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedSellCurrency, setSelectedSellCurrency] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [selectedBuyCurrency, setSelectedBuyCurrency] = useState("");
  const [buyValue, setBuyValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetching the list of specific cryptocurrencies from CoinGecko API
    const selectedCryptocurrencies = [
      "bitcoin",
      "tether",
      "ripple",
      "solana",
      "dogecoin",
      "ethereum",
      "XRP",
      "avalanche",
      "polygon",
      "litecoin",
      "filecoin",
    ];
    const fetchCryptocurrencies = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/list"
        );
        const data = await response.json();
        const filteredCryptocurrencies = data.filter((crypto) =>
          selectedCryptocurrencies.includes(crypto.id)
        );
        setCryptocurrencies(filteredCryptocurrencies);
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
      }
    };

    fetchCryptocurrencies();
  }, []);

  const handleSellCurrencyChange = (event) => {
    setSelectedSellCurrency(event.target.value);
  };

  const handleSellAmountChange = (event) => {
    const input = event.target.value;
    setSellAmount(input);
    const isValidNumber = /^\d*\.?\d+$/.test(input); // Regex to check if the input is a valid number
    setErrorMessage(isValidNumber ? "" : "Please enter a valid number");
  };

  const handleBuyCurrencyChange = (event) => {
    setSelectedBuyCurrency(event.target.value);
  };

  const handleBuyButtonClick = async () => {
    if (!errorMessage) {
      // Only proceed with fetching the buy value if there are no validation errors
      // Fetching the value of the selected cryptocurrency from CoinGecko API
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedBuyCurrency}&vs_currencies=usd`
        );
        const data = await response.json();
        const value = data[selectedBuyCurrency].usd;
        setBuyValue(value * sellAmount);
      } catch (error) {
        console.error("Error fetching buy value:", error);
      }
    }
  };

  return (
    <div className="row" style={{ backgroundColor: "white", height: "100%" , maxWidth:"100%"}}>
      <h5 style={{ fontWeight: "bolder", padding: "10px" }}>Exchange coins</h5>{" "}
      <br />
      <div className="row" style={{ display: "flex" }}>
        <div className="col-md-6">
          <label>
            <span style={{ color: "orange", fontWeight: "bold" }}>Sell:&nbsp;&nbsp;</span>
            <select
              value={selectedSellCurrency}
              onChange={handleSellCurrencyChange}
            >
              {cryptocurrencies.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </label>
          
        </div>
        <div className="col-md-4">
          <label>
            <input
              type="text"
              placeholder="&nbsp;Enter Value"
              value={sellAmount}
              onChange={handleSellAmountChange} style={{width:"100%"}}
            />
          </label>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
      <div className="row" style={{ display: "flex" }}>
        <div className="col-md-6">
          <label>
            <span style={{ color: "#00CC00", fontWeight: "bold" }}>Buy:&nbsp;&nbsp;</span>
            <select
              value={selectedBuyCurrency}
              onChange={handleBuyCurrencyChange}
            >
              {cryptocurrencies.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="col-md-6">
          <span style={{ color: "#FF6666" }}>
            {buyValue && (
              <p>
                <span style={{ color: "#100000 " }}>Value:</span> {buyValue}
              </p>
            )}
          </span>
        </div>
      </div>
      <br /> <br />
      <div className="row-xl-12" style={{ marginLeft: "120px" }}>
        <button
          onClick={handleBuyButtonClick}
          style={{ width: "150px", alignItems: "center" }}
        >
          Exchange
        </button>
      </div>
      <br />
    </div>
  );
};

export default Exchange;
// echange