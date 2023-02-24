import React from "react";

const CoinTracker = () => {
  const [basePrice, setBasePrice] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [coins, setCoins] = React.useState([]); //배열로 초기화해야 17번 라인의 coins.lengh가 오류나지 않는다.
  const [selectedCoin, setSelectedCoin] = React.useState(undefined);
  const [currency, setCurrency] = React.useState(0);
  const [result, setResult] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      let response = await fetch(
        "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
      );
      let json = await response.json();
      setBasePrice(json[0].basePrice);

      response = await fetch("https://api.coinpaprika.com/v1/tickers");
      json = await response.json();
      setCoins(json);
      setLoading(false);
    })();
  }, []);

  const onChangeInput = (event) => {
    setCurrency(Number(event.target.value));
    if (selectedCoin) {
      setResult(
        Number(event.target.value) / (selectedCoin.quotes.USD.price * basePrice)
      );
    }
  };

  const onChangeSelect = (event) => {
    const resultCoin = coins.find((coin) => coin.name === event.target.value);
    setSelectedCoin(resultCoin);
    if(currency){
      setResult(currency / (resultCoin.quotes.USD.price * basePrice));
    }
  };

  return (
    <div>
      <h3>{coins.length} Coins</h3>
      <h4>Exchange Rate: {basePrice} KRW</h4>
      {loading ? <span>Loading...</span> : null}
      <input type="number" onChange={onChangeInput} />
      <select onChange={onChangeSelect}>
        <option value="">--select coin--</option>
        {coins.map((coin) => (
          <option value={coin.name} key={coin.id}>
            {coin.name}
          </option>
        ))}
      </select>
      <h4>{Number(result).toFixed(5)} Coin</h4>
      <ul>
        {coins.map((coin)=>
          <li key={coin.id}>
            {coin.name} ({coin.symbol}) {Math.round(Number(coin.quotes.USD.price * basePrice)).toLocaleString("ko-KR")} KRW
          </li>
        )};
      </ul>
    </div>
  );
};

export default CoinTracker;
