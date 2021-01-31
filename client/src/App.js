import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <h1>Hello</h1>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
