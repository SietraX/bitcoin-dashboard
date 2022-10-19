import * as React from "react";
import clsx from "clsx";
import { usePrevious } from "../../hooks/usePrevious";

import "./style.css";

const BitcoinPrices = () => {
  const [usd, setUsd] = React.useState();
  const [eur, setEur] = React.useState();
  const [gbp, setGbp] = React.useState();

  const prevUsd = usePrevious(usd);
  const prevEur = usePrevious(eur);
  const prevGbp = usePrevious(gbp);

  const fetchPrices = () => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => response.json())
      .then((responseData) => {
        setUsd(responseData.bpi.USD.rate_float.toFixed());
        setEur(responseData.bpi.EUR.rate_float.toFixed());
        setGbp(responseData.bpi.GBP.rate_float.toFixed());
      });
  };

  React.useEffect(() => {
    fetchPrices();
    const intervalId = setInterval(() => fetchPrices(), 5000);

    return () => clearInterval(intervalId);
  }, []);

  React.useLayoutEffect(() => {
    setTimeout(() => {
      document.querySelectorAll(".bitcoin-price").forEach((element) => {
        element.classList.remove("decrease-blinker");
        element.classList.remove("increase-blinker");
      });
    }, 3000);
  }, [usd, eur, gbp]);

  return (
    <div className="bitcoin-prices-container">
      <div> ₿ </div>
      <div
        className={clsx(
          "bitcoin-price",
          prevUsd && prevUsd > usd ? "decrease-blinker" : " ",
          prevUsd && prevUsd < usd ? "increase-blinker" : " "
        )}
      >
        {usd} $
      </div>
      <div
        className={clsx(
          "bitcoin-price",
          prevEur && prevEur > eur ? "decrease-blinker" : " ",
          prevEur && prevEur < eur ? "increase-blinker" : " "
        )}
      >
        {eur} €
      </div>
      <div
        className={clsx(
          "bitcoin-price",
          prevGbp && prevGbp > gbp ? "decrease-blinker" : " ",
          prevGbp && prevGbp < gbp ? "increase-blinker" : " "
        )}
      >
        {gbp} £
      </div>
    </div>
  );
};

export default BitcoinPrices;
