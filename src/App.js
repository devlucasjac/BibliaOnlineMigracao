import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Bible from "./pages/Bible/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Bible />} />
      </Routes>
    </Router>
  );
}

export default App;
