import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddCandidate from "./components/AddCandidate";
import EditCandidate from "./components/EditCandidate";
import CandidateList from "./components/CandidateList";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/add-candidate">
            <AddCandidate />
          </Route>
          <Route path="/edit-candidate">
            <EditCandidate />
          </Route>
          <Route path="/">
            <CandidateList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}