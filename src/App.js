import BitcoinPrices from "./components/BitcoinPrices";
import Timer from "./components/Timer";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <BitcoinPrices />
      <Timer />
    </div>
  );
}
