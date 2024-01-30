import BibleReader from "./components/BibleReader/index";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BibleReader bible="acf" book="gn"></BibleReader>
    </div>
  );
}

export default App;
