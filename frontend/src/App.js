import { BrowserRouter as Router, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Metrics from "./components/Metrics";
function App() {
  return (
    <>
      <Router>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/metrics/:id" exact>
          <Metrics />
        </Route>

      </Router>

    </>
  );
}

export default App;
