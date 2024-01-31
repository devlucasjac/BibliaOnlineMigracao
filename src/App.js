import Bible from "./pages/Bible/index";
import CurrentBook from "./context/CurrentBook";

import "./App.css";

function App() {
  return (
    <div className="App">
      <CurrentBook.Provider>
        <Bible></Bible>
      </CurrentBook.Provider>
    </div>
  );
}

export default App;
